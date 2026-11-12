import assert from 'node:assert/strict';
const base=process.argv[2] || 'http://127.0.0.1:3002';
const seen=new Set();
async function check(path){
  if(seen.has(path))return;
  seen.add(path);
  const response=await fetch(new URL(path,base),{signal:AbortSignal.timeout(45000),cache:'no-store'});
  assert.equal(response.status,200,`${path}: ${response.status} ${response.statusText}`);
  const body=await response.text();
  assert.doesNotMatch(body,/Outdated Optimize Dep/);
  const imports=[...body.matchAll(/(?:from\s*|import\s*)["']((?:\/|\.\.?\/)[^"']+)["']/g)].map(match=>{const url=new URL(match[1],new URL(path,base));return url.pathname+url.search;});
  await Promise.all([...new Set(imports)].map(check));
}
await check('/src/main.tsx');
assert.ok([...seen].some(path=>path.includes('react-dom_client')), 'React DOM dependency must be checked');
assert.ok([...seen].some(path=>path.includes('react_jsx-dev-runtime')), 'JSX runtime must be checked');
const health=await fetch(new URL('/api/health',base),{signal:AbortSignal.timeout(10000)});
assert.equal(health.status,200);
assert.equal((await health.json()).status,'ok');
console.log(`Verified ${seen.size} browser module/style requests and the API at ${base}. No stale dependency responses.`);
