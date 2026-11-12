import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { catalog } from '../server/catalog.mjs';
test('public routes render their page, meaningful heading, navigation and no invented proof',async()=>{
  const vite=await createServer({cacheDir:'node_modules/.vite-tests',server:{middlewareMode:true,hmr:false},appType:'custom'});
  const original=globalThis.location;
  try {
    const {default:App}=await vite.ssrLoadModule('/src/App.tsx');
    for(const path of Object.keys(catalog).filter(p=>p!='/admin')) {
      globalThis.location=new URL(`http://localhost:3002${path}`);
      const html=renderToString(createElement(App));
      assert.match(html,/<h1[ >]/,path);
      assert.match(html,/Main navigation/,path);
      assert.doesNotMatch(html,/99\.98|₦2\.4B|Verified Impact|NDPA 2023 Compliant/,path);
      if(path.startsWith('/services/'))assert.match(html,/What we can deliver/,path);
    }
    globalThis.location=new URL('http://localhost:3002/missing');
    assert.match(renderToString(createElement(App)),/404/);
  } finally {globalThis.location=original;await vite.close();}
});
