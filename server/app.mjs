import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import { randomUUID, createHash, timingSafeEqual } from 'node:crypto';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { catalog } from './catalog.mjs';

export function createApp({ database = process.env.DATABASE_PATH || 'data/evolvelabx.sqlite', adminToken = process.env.ADMIN_TOKEN, editorToken = process.env.EDITOR_TOKEN } = {}) {
  if (database !== ':memory:') mkdirSync(dirname(resolve(database)), { recursive: true });
  const db = new DatabaseSync(database);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
    CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, request_id TEXT UNIQUE, fingerprint TEXT, created_at TEXT, owner TEXT, status TEXT, payload TEXT);
    CREATE TABLE IF NOT EXISTS content (slug TEXT PRIMARY KEY, kind TEXT, title TEXT, summary TEXT, body TEXT, status TEXT, updated_at TEXT);
    CREATE TABLE IF NOT EXISTS revisions (id INTEGER PRIMARY KEY, slug TEXT, actor TEXT, payload TEXT, created_at TEXT);
    CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY, actor TEXT, action TEXT, entity TEXT, created_at TEXT);
    CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, name TEXT, path TEXT, campaign TEXT, created_at TEXT);
    CREATE TABLE IF NOT EXISTS outbox (id INTEGER PRIMARY KEY, lead_id TEXT, attempts INTEGER DEFAULT 0, sent INTEGER DEFAULT 0, next_attempt INTEGER DEFAULT 0);`);
  const app = express();
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.set({ 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'DENY', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()', 'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; connect-src 'self' ws:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" });
    if (process.env.NODE_ENV === 'production') res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    if (req.path.startsWith('/api/')) res.set('Cache-Control', 'no-store');
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.headers.origin) {
      const allowed = process.env.APP_URL ? new URL(process.env.APP_URL).origin : `http://${req.headers.host}`;
      const dev = process.env.NODE_ENV !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1):300[0-9]$/.test(req.headers.origin);
      if (req.headers.origin !== allowed && !dev) return res.status(403).json({ error: 'This request origin is not allowed.' });
    }
    next();
  });
  app.use(express.json({ limit: '32kb' }));
  const limits = new Map();
  app.use('/api', (req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/admin')) return next();
    const key = req.socket.remoteAddress;
    const now = Date.now();
    for (const [ip, value] of limits) if (now > value.until) limits.delete(ip);
    const entry = limits.get(key) || { count: 0, until: now + 60000 };
    limits.set(key, entry);
    if (++entry.count > 50) return res.status(429).set('Retry-After', '60').json({ error: 'Too many requests. Please try again in a minute.' });
    next();
  });
  const audit = (actor, action, entity) => db.prepare('INSERT INTO audit(actor,action,entity,created_at) VALUES(?,?,?,?)').run(actor, action, entity, new Date().toISOString());
  const same = (a, b) => !!b && timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest());
  app.use('/api/admin', (req, res, next) => {
    const token = req.headers.authorization?.replace(/^Bearer /, '') || '';
    req.role = same(token, adminToken) ? 'admin' : same(token, editorToken) ? 'editor' : null;
    if (!req.role) return res.status(401).json({ error: 'A valid staff access token is required.' });
    if (req.role === 'editor' && !req.path.startsWith('/content') && !req.path.startsWith('/revisions')) return res.status(403).json({ error: 'Administrator access required.' });
    next();
  });
  const text = (v, max = 200) => typeof v === 'string' ? v.trim().slice(0, max) : '';
  app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
  app.post('/api/leads', (req, res) => {
    const b = req.body || {};
    const data = Object.fromEntries(['name','email','company','country','interest','message','budget','date','time','timezone','intent','source','campaign'].map(key => [key, text(b[key], key === 'message' ? 5000 : 200)]));
    const errors = {};
    for (const key of ['name','email','company','country','interest','message']) if (data[key].length < 2) errors[key] = 'Please complete this field.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid business email.';
    if (data.message.length < 20) errors.message = 'Please describe your project in at least 20 characters.';
    if (!['consulting','software','automation','websites','training','hospitality','partnership','other'].includes(data.interest)) errors.interest = 'Select a listed service.';
    if (b.consent !== true) errors.consent = 'Please acknowledge the privacy notice.';
    if (b.website) errors.website = 'Submission could not be accepted.';
    if (!/^[\w-]{8,100}$/.test(b.requestId || '')) errors.requestId = 'Refresh the page and try again.';
    if (data.date && (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(Date.parse(data.date)) || data.date < new Date().toISOString().slice(0,10))) errors.date = 'Choose a future date.';
    if (data.date && Number.isFinite(Date.parse(data.date)) && new Date(data.date).toISOString().slice(0,10) !== data.date) errors.date = 'Choose a valid calendar date.';
    if (data.date && !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time)) errors.time = 'Choose your preferred time.';
    if (data.date) { try { new Intl.DateTimeFormat('en', { timeZone: data.timezone }); } catch { errors.timezone = 'Choose a valid time zone.'; } }
    if (Object.keys(errors).length) return res.status(400).json({ error: 'Please check the highlighted fields.', fields: errors });
    const fingerprint = createHash('sha256').update(JSON.stringify([data.email.toLowerCase(), data.message, data.interest, data.date, data.time, data.timezone])).digest('hex');
    const existing = db.prepare("SELECT * FROM leads WHERE request_id=? OR (fingerprint=? AND created_at>?)").get(b.requestId, fingerprint, new Date(Date.now()-86400000).toISOString());
    if (existing) return res.json({ id: existing.id, bookingStatus: JSON.parse(existing.payload).bookingStatus, duplicate: true });
    const id = `EVX-${randomUUID().slice(0,8).toUpperCase()}`;
    const owner = data.interest === 'training' ? 'training' : data.interest === 'partnership' ? 'partnerships' : 'advisory';
    const payload = { ...data, consent: true, consentVersion: '2026-11-12', bookingStatus: data.date ? 'requested' : 'not-requested' };
    db.exec('BEGIN');
    try {
      db.prepare('INSERT INTO leads VALUES(?,?,?,?,?,?,?)').run(id, b.requestId, fingerprint, new Date().toISOString(), owner, 'new', JSON.stringify(payload));
      db.prepare('INSERT INTO outbox(lead_id) VALUES(?)').run(id);
      audit('visitor', 'lead.created', id);
      db.exec('COMMIT');
    } catch (error) { db.exec('ROLLBACK'); throw error; }
    res.status(201).json({ id, bookingStatus: payload.bookingStatus });
  });
  app.get('/api/content', (_, res) => res.json([...db.prepare("SELECT * FROM content WHERE status='published'").all(), ...db.prepare("SELECT slug,kind,status FROM content WHERE status='archived'").all()]));
  app.get('/api/admin/content', (_, res) => res.json(db.prepare('SELECT * FROM content ORDER BY updated_at DESC').all()));
  app.get('/api/admin/revisions/:slug', (req, res) => res.json(db.prepare('SELECT * FROM revisions WHERE slug=? ORDER BY id DESC').all(req.params.slug)));
  app.post('/api/admin/content', (req, res) => {
    const b = req.body || {};
    if (!/^[a-z0-9-]{1,100}$/.test(b.slug) || !['service','solution','insight','work'].includes(b.kind) || !text(b.title) || !text(b.body,20000) || !['draft','published','archived'].includes(b.status)) return res.status(400).json({ error: 'Provide a valid slug, kind, title, body and status.' });
    const previous = db.prepare('SELECT * FROM content WHERE slug=?').get(b.slug);
    if (req.role === 'editor' && (b.status !== 'draft' || previous?.status === 'published')) return res.status(403).json({ error: 'Only administrators can publish, archive or replace published content.' });
    const item = { slug: b.slug, kind: b.kind, title: text(b.title), summary: text(b.summary,500), body: text(b.body,20000), status: b.status, updated_at: new Date().toISOString() };
    db.exec('BEGIN');
    try {
      db.prepare('INSERT OR REPLACE INTO content VALUES(?,?,?,?,?,?,?)').run(...Object.values(item));
      db.prepare('INSERT INTO revisions(slug,actor,payload,created_at) VALUES(?,?,?,?)').run(item.slug, req.role, JSON.stringify(item), item.updated_at);
      audit(req.role, `content.${item.status}`, item.slug);
      db.exec('COMMIT');
    } catch (error) { db.exec('ROLLBACK'); throw error; }
    res.status(201).json(item);
  });
  app.get('/api/admin/leads', (_, res) => res.json(db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all().map(row => ({ ...JSON.parse(row.payload), id: row.id, owner: row.owner, status: row.status, created_at: row.created_at }))));
  app.post('/api/admin/leads/:id', (req, res) => {
    const { status, owner } = req.body;
    if (!['new','assigned','contacted','qualified','closed'].includes(status) || !text(owner)) return res.status(400).json({ error: 'Select a valid status and owner.' });
    const result = db.prepare('UPDATE leads SET status=?, owner=? WHERE id=?').run(status,text(owner),req.params.id);
    if (!result.changes) return res.status(404).json({ error: 'Lead not found.' });
    audit(req.role,'lead.updated',req.params.id);
    res.json({ ok:true });
  });
  app.post('/api/events', (req,res) => {
    const b = req.body || {};
    if (b.consent !== true || !['page_view','consultation_open','lead_submitted'].includes(b.name)) return res.status(400).json({ error:'Consent required.' });
    db.prepare('INSERT INTO events(name,path,campaign,created_at) VALUES(?,?,?,?)').run(b.name,text(b.path).split('?')[0],text(b.campaign,100),new Date().toISOString());
    res.status(204).end();
  });
  app.get('/api/admin/events', (_,res) => res.json(db.prepare('SELECT name,path,count(*) AS count FROM events GROUP BY name,path').all()));
  app.get('/sitemap.xml', (_,res) => {
    if (!process.env.APP_URL) return res.status(503).type('text').send('Set APP_URL to generate canonical sitemap URLs.');
    const prefix={service:'services',solution:'solutions',work:'work',insight:'insights'};
    const archived=db.prepare("SELECT kind,slug FROM content WHERE status='archived'").all().map(row=>`/${prefix[row.kind]}/${row.slug}`);
    const routes = [...new Set([...Object.keys(catalog).filter(path=>path!='/admin'&&!archived.includes(path)),...db.prepare("SELECT kind,slug FROM content WHERE status='published'").all().map(row => `/${prefix[row.kind]}/${row.slug}`)])];
    res.type('xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(path=>`<url><loc>${new URL(path,process.env.APP_URL).href.replaceAll('&','&amp;')}</loc></url>`).join('')}</urlset>`);
  });
  app.get('/robots.txt', (_,res)=>res.type('text').send(`User-agent: *\nDisallow: /admin\nDisallow: /api/\n${process.env.APP_URL ? `Sitemap: ${new URL('/sitemap.xml',process.env.APP_URL).href}` : ''}`));
  app.use('/api', (_,res)=>res.status(404).json({error:'Endpoint not found.'}));
  app.use(express.static(resolve('dist'), { maxAge: '1h', index:false }));
  app.get('*', (req,res)=> {
    const path=req.path.replace(/\/$/,'')||'/';
    const [,section,slug]=path.split('/');
    const kind=({services:'service',solutions:'solution',work:'work',insights:'insight'})[section];
    const stored=kind&&slug?db.prepare('SELECT * FROM content WHERE kind=? AND slug=?').get(kind,slug):null;
    const found=stored?.status==='archived'?false:!!catalog[path]||stored?.status==='published';
    const title=`${found?(stored?.status==='published'?stored.title:catalog[path]):'Page not found'} | EVOLVELABX`;
    const description=stored?.status==='published'?stored.summary:'We advise, build, automate and enable. Technology consulting, software engineering, AI automation and training for your business.';
    const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
    let html=readFileSync(resolve('dist/index.html'),'utf8').replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${escape(description)}" />`).replace(/<meta property="og:title"[^>]*>/,`<meta property="og:title" content="${escape(title)}" />`).replace(/<meta property="og:description"[^>]*>/,`<meta property="og:description" content="${escape(description)}" />`);
    if(path==='/admin'||!found)res.set('X-Robots-Tag','noindex');
    if(process.env.APP_URL)html=html.replace('</head>',`<link rel="canonical" href="${escape(new URL(path,process.env.APP_URL).href)}" /><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'EVOLVELABX',url:new URL('/',process.env.APP_URL).href}).replaceAll('<','\\u003c')}</script></head>`);
    res.status(found?200:404).type('html').send(html);
  });
  app.use((error,req,res,next)=> { console.error('Request failed:', error.code || error.type || 'internal'); res.status(error.type === 'entity.too.large' ? 413 : error instanceof SyntaxError ? 400 : 500).json({ error: 'Unable to process this request. Please try again.' }); });
  return { app, db };
}

export async function deliverOutbox(db) {
  const endpoint = process.env.CRM_WEBHOOK_URL;
  if (!endpoint) return;
  if (!endpoint.startsWith('https://')) throw new Error('CRM webhook must use HTTPS');
  const rows = db.prepare('SELECT * FROM outbox WHERE sent=0 AND next_attempt<? LIMIT 10').all(Date.now());
  for (const row of rows) {
    const lead = db.prepare('SELECT * FROM leads WHERE id=?').get(row.lead_id);
    try {
      const response = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json','Idempotency-Key':lead.id, ...(process.env.CRM_WEBHOOK_TOKEN ? { Authorization:`Bearer ${process.env.CRM_WEBHOOK_TOKEN}` } : {})}, body:JSON.stringify({ ...JSON.parse(lead.payload), id:lead.id, owner:lead.owner }), signal:AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('Delivery rejected');
      db.prepare('UPDATE outbox SET sent=1 WHERE id=?').run(row.id);
    } catch { db.prepare('UPDATE outbox SET attempts=attempts+1,next_attempt=? WHERE id=?').run(Date.now()+Math.min(3600000,30000*2**Math.min(row.attempts,7)),row.id); }
  }
}
