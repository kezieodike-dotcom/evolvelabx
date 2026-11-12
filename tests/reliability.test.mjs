import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { createApp } from '../server/app.mjs';

async function withApi(run, options={}) {
  const {app,db}=createApp({database:':memory:',adminToken:'test-admin',...options});
  const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
  const request=(path,body,headers={})=>fetch(`http://127.0.0.1:${server.address().port}${path}`,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',...headers},...(body?{body:JSON.stringify(body)}:{})});
  try{await run(request,db);}finally{await new Promise(resolve=>server.close(resolve));db.close();}
}
const valid={name:'Test Buyer',email:'buyer@example.org',company:'Example',country:'Nigeria',interest:'consulting',message:'We would like help connecting our business systems.',consent:true,requestId:'reliability-0001'};
test('records survive reopen and a SQLite snapshot can be restored',async()=>{
  const directory=mkdtempSync(join(tmpdir(),'evx-')); const database=join(directory,'leads.sqlite');
  try {
    await withApi(async(request,db)=>{assert.equal((await request('/api/leads',valid)).status,201);db.prepare('VACUUM INTO ?').run(join(directory,'backup.sqlite'));},{database});
    const restored=new DatabaseSync(join(directory,'backup.sqlite'));assert.equal(restored.prepare('SELECT count(*) AS count FROM leads').get().count,1);restored.close();
    await withApi(async(request)=>{const res=await request('/api/admin/leads',null,{Authorization:'Bearer test-admin'});assert.equal((await res.json()).length,1);},{database});
  } finally {rmSync(directory,{recursive:true,force:true});}
});
test('storage failure returns failure rather than success',async()=>withApi(async(request,db)=>{
  db.exec('DROP TABLE leads');const response=await request('/api/leads',valid);assert.equal(response.status,500);assert.equal((await response.json()).id,undefined);
}));
test('rate limiting bounds repeated writes',async()=>withApi(async request=>{
  for(let i=0;i<50;i++)assert.equal((await request('/api/leads',{})).status,400);
  assert.equal((await request('/api/leads',valid)).status,429);
}));
test('invalid calendar date and unknown service are rejected',async()=>withApi(async request=>{
  assert.equal((await request('/api/leads',{...valid,date:'2099-02-31',time:'10:00',timezone:'Africa/Lagos'})).status,400);
  assert.equal((await request('/api/leads',{...valid,interest:'invented-service'})).status,400);
}));
test('analytics requires consent and discards form content',async()=>withApi(async(request,db)=>{
  assert.equal((await request('/api/events',{name:'page_view',path:'/'})).status,400);
  assert.equal((await request('/api/events',{name:'page_view',path:'/services?email=private@example.org',campaign:'direct',email:'private@example.org',consent:true})).status,204);
  const row=db.prepare('SELECT * FROM events').get();assert.equal(row.path,'/services');assert.equal(row.email,undefined);
}));
