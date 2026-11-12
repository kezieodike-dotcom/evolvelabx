import 'dotenv/config';
// Node 24 provides the local SQLite runtime; provider credentials stay server-side.
import { createApp, deliverOutbox } from './app.mjs';
const { app, db } = createApp();
const server = app.listen(Number(process.env.API_PORT || 3001), process.env.HOST || '127.0.0.1', () => console.log(`Evolvelabx API: http://localhost:${process.env.API_PORT || 3001}`));
let delivering = false;
const timer = setInterval(async () => { if (delivering) return; delivering = true; try { await deliverOutbox(db); } catch { console.error('Check CRM configuration.'); } finally { delivering = false; } },30000);
process.on('SIGINT',()=> { clearInterval(timer); server.close(()=> { db.close(); process.exit(0); }); });
