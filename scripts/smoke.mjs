import assert from 'node:assert/strict';
import { createApp } from '../server/app.mjs';
process.env.APP_URL='https://example.org';
const {app,db}=createApp({database:':memory:',adminToken:'smoke-only-token'});
const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
try {
  for(const path of ['/','/services/consulting','/solutions/hospitality','/contact','/admin']){
    const response=await fetch(base+path);assert.equal(response.status,200,path);const html=await response.text();assert.match(html,/<title>.+EVOLVELABX<\/title>/);assert.match(html,/rel="canonical"/);assert.match(html,/application\/ld\+json/);assert.equal(response.headers.get('x-frame-options'),'DENY');
    if(path==='/admin')assert.equal(response.headers.get('x-robots-tag'),'noindex');
    if(path==='/services/consulting')assert.match(html,/<title>Technology consulting/);
  }
  assert.equal((await fetch(base+'/missing')).status,404);
  const sitemap=await (await fetch(base+'/sitemap.xml')).text();assert.match(sitemap,/https:\/\/example.org\/services\/training/);assert.doesNotMatch(sitemap,/\/admin/);
  const profile=await fetch(base+'/company-profile.html');assert.equal(profile.status,200);
  const lead=await fetch(base+'/api/leads',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://example.org'},body:JSON.stringify({name:'Smoke Test',email:'smoke@example.org',company:'Local QA',country:'Nigeria',interest:'consulting',message:'Test consultation request for end-to-end server verification.',consent:true,requestId:'smoke-test-0001'})});assert.equal(lead.status,201);const receipt=await lead.json();assert.match(receipt.id,/EVX-/);assert.equal(db.prepare('SELECT count(*) AS count FROM leads').get().count,1);
  console.log('Production HTTP smoke checks passed: metadata, canonical, structured data, headers, sitemap, 404, profile and persistent enquiry receipt.');
} finally {await new Promise(resolve=>server.close(resolve));db.close();}
