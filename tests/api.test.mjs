import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/app.mjs';

test('lead validation, durable assignment, idempotency and private staff access', async () => {
  const { app, db } = createApp({ database: ':memory:', adminToken: 'test-secret', editorToken: 'editor-secret' });
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const request = (path, body, token) => fetch(base + path, { method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  try {
    assert.equal((await request('/api/leads', {})).status, 400);
    const lead = { name: 'Test Buyer', email: 'buyer@example.org', company: 'Example Ltd', country: 'Nigeria', interest: 'training', message: 'We need a workshop for our operations team.', consent: true, requestId: 'test-request-001', source: '/services/training', timezone: 'Africa/Lagos', date: '2099-12-01', time: '10:00' };
    assert.equal((await request('/api/leads', { ...lead, consent: false })).status, 400);
    assert.equal((await request('/api/leads', { ...lead, website: 'spam.example' })).status, 400);
    const first = await request('/api/leads', lead);
    assert.equal(first.status, 201);
    const saved = await first.json();
    assert.equal(saved.bookingStatus, 'requested');
    assert.equal((await (await request('/api/leads', lead)).json()).id, saved.id);
    assert.equal((await request('/api/admin/leads')).status, 401);
    assert.equal((await request('/api/admin/leads', null, 'editor-secret')).status, 403);
    const leads = await (await request('/api/admin/leads', null, 'test-secret')).json();
    assert.equal(leads.length, 1);
    assert.equal(leads[0].owner, 'training');
    assert.equal((await request('/api/admin/content', { slug: 'example', title: 'Draft', kind: 'insight', summary: 'Preview only', body: 'Draft content', status: 'draft' }, 'editor-secret')).status, 201);
    assert.equal((await (await request('/api/content')).json()).length, 0);
    assert.equal((await request('/api/admin/content', { slug: 'example', title: 'Published', kind: 'insight', summary: 'Live', body: 'Published content', status: 'published' }, 'editor-secret')).status, 403);
    assert.equal((await request('/api/admin/content', { slug: 'example', title: 'Published', kind: 'insight', summary: 'Live', body: 'Published content', status: 'published' }, 'test-secret')).status, 201);
    assert.equal((await (await request('/api/content')).json())[0].title, 'Published');
    assert.equal((await (await request('/api/admin/revisions/example', null, 'test-secret')).json()).length, 2);
    assert.equal((await request('/api/admin/content', { slug: 'example', title: 'Archived', kind: 'insight', summary: 'Removed', body: 'Private archived body', status: 'archived' }, 'test-secret')).status, 201);
    const archived = await (await request('/api/content')).json();
    assert.equal(archived[0].status, 'archived');
    assert.equal(archived[0].body, undefined);
    assert.equal((await fetch(base + '/api/leads', { method: 'POST', headers: { Origin: 'https://evil.example', 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })).status, 403);
  } finally { await new Promise(resolve => server.close(resolve)); db.close(); }
});
