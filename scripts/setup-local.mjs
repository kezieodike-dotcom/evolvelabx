import { randomBytes } from 'node:crypto';
import { existsSync, writeFileSync } from 'node:fs';
if(existsSync('.env')){console.log('.env already exists; no changes made.');}
else {
  writeFileSync('.env',`API_PORT=3001\nHOST=127.0.0.1\nDATABASE_PATH=data/evolvelabx.sqlite\nADMIN_TOKEN=${randomBytes(32).toString('hex')}\nEDITOR_TOKEN=${randomBytes(32).toString('hex')}\n`,{mode:0o600,flag:'wx'});
  console.log('Created ignored local .env with independent random staff tokens. Open .env locally to access the staff workspace. Never commit this file.');
}
