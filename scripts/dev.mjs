import { spawn } from 'node:child_process';
import 'dotenv/config';
const port=process.env.DEV_PORT || '3002';
console.log(`Evolvelabx dev supervisor PID ${process.pid}`);
const children = [spawn(process.execPath,['--watch-path=server','server/index.mjs'],{stdio:'inherit'}),spawn(process.execPath,['node_modules/vite/bin/vite.js','--port',port,'--strictPort','--host','127.0.0.1'],{stdio:'inherit'})];
let stopping=false;
function stop(code=0){if(stopping)return;stopping=true;process.exitCode=code;for(const child of children)child.kill();}
for (const child of children) {child.on('error',error=>{console.error(error.message);stop(1);});child.on('exit',code=>stop(code || 0));}
process.on('SIGINT',()=>stop());
process.on('SIGTERM',()=>stop());
