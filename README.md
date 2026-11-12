# Evolvelabx

Implementation of the supplied website PRD, built on the existing React 19 / TypeScript / Vite checkout. Express provides a private SQLite enquiry database, staff content management and a retryable CRM delivery queue. Node 24+ is required (its built-in SQLite API currently emits an experimental warning).

## Run locally

```powershell
npm install
node scripts/setup-local.mjs
npm run dev
```

Open http://127.0.0.1:3002. The frontend uses a fixed port and reports an error if it is occupied, rather than silently moving the preview. Set `DEV_PORT` to override it. The API uses 3001 and Vite forwards `/api`, `/sitemap.xml` and `/robots.txt` to it. Development dependencies use a cache per frontend port (`node_modules/.vite-dev-3002` by default); render tests use a separate `node_modules/.vite-tests` cache so tests and other dev servers cannot invalidate React modules in an open browser. The API watcher is scoped to `server/` to avoid restart loops when Vite writes its dependency cache.

If the page is blank, run `node scripts/check-dev.mjs`. This checks the actual browser module graph, styles and API, including React dependency URLs; an HTML-only health check cannot detect a broken JavaScript dependency cache.

Local setup creates an ignored `.env` with random admin/editor tokens and will never replace an existing `.env`. Open that file locally to copy a token for `/admin`. A downloadable HTML capabilities overview is available in the footer; it is also printable from a browser.

## Implemented

- Responsive white-and-green homepage with mint, blue, lavender and peach capability cards. Cards reveal once on scroll and provide hover/focus feedback. The approach is an interactive five-step tab interface with keyboard navigation and animated transitions. Motion respects the visitor's reduced-motion preference.
- Service and solution listings/details, work concepts, searchable and filterable insights, About/approach, contact, policy drafts and a 404 page. Deep links and browser history use real paths. The shorter homepage focuses on the core offer, industry solutions, approach and consultation; duplicate captions, article previews, extra banners and demonstration sections have been removed. Articles remain available through Insights.
- Accessible native consultation dialog and contact form. Required fields, consent, honeypot, request references, server validation, time zones, meeting requests, failure states and duplicate prevention. No simulated success or confirmed appointments.
- Private persistent leads with default team assignment, administrator status/owner updates and audit records. No lead data is returned through public content APIs.
- Staff workspace at `/admin`: drafts, plain-text editing, previews, publication, archiving and revision history. Administrators publish/archive and manage leads; editors create drafts. Staff access tokens remain in memory and are cleared on sign-out/reload.
- Opt-in aggregate analytics and campaign attribution. No form bodies in analytics. Preference controls are available in the footer.
- Production response security headers, server-rendered route metadata, canonical URLs, Organization structured data, sitemap, robots and HTTP 404 status. Set `APP_URL` for canonical URLs and sitemap generation.
- WebP images (about 101–146 KB each), lazy-loaded editorial images and staff workspace chunk.

Existing demo components remain in the source tree for reference but are not imported into the new application. Their invented proof, addresses and simulated portal are not part of the running site.

## Staff and integrations

Set independent `ADMIN_TOKEN` and `EDITOR_TOKEN` secrets in `.env`, then enter the corresponding token at `/admin`. Do not put these values in any `VITE_` variable. No default password is shipped. The local token interface is **not** a complete production identity system: deploy behind an MFA identity gateway and establish named staff identity and token rotation before launch.

Optional `CRM_WEBHOOK_URL` must be HTTPS. Every lead is first committed locally, then queued for delivery. The adapter receives the lead ID as `Idempotency-Key`, the submitted brief and assigned owner. Failed deliveries retry with exponential delay (up to one hour); the receiver must deduplicate on lead ID. `CRM_WEBHOOK_TOKEN` is optional bearer authentication. No provider is configured or contacted by default. Store provider secrets on the server only.

Consultations currently support **meeting requests**, including preferred date/time and IANA time zone. No availability is invented. Live calendar availability, provider acceptance, transactional confirmation email and delivery monitoring still need approved providers and credentials. A successful website submission means the request is in the database; it does not mean a calendar invitation or email was sent. Default owners (`advisory`, `training`, `partnerships`) must be assigned to named team members operationally.

## Verification

```powershell
npm run lint
npm test
npm run build
npm start
```

Production serves the built frontend and API together on `API_PORT` (default 3001). Put it behind an HTTPS reverse proxy and persist `DATABASE_PATH` on durable disk. `npm run preview` only previews static assets and does not run the enquiry backend; use `npm start` for full production checks.

Tests cover consent/validation, meeting status, idempotency, private staff data, roles, publication/archive privacy, revisions, origin checks, storage failures, rate limiting, invalid dates, analytics data minimization, database reopen/restore and rendering public routes. Browser automation was unavailable in this session; manual visual, keyboard, screen-reader and viewport checks remain required. Core Web Vitals and WCAG conformance have not been certified.

## Backups and restoration

```powershell
node scripts/backup.mjs
node scripts/backup.mjs C:/backups/evolvelabx-snapshot.sqlite
```

Creates a consistent SQLite snapshot with `VACUUM INTO` and verifies `PRAGMA integrity_check`. Refuses to overwrite an existing file. Keep snapshots private, encrypted and off-device in production. The test suite verifies reopening a copied snapshot. To restore: stop the API, preserve the current database and WAL/SHM files, set `DATABASE_PATH` to the verified snapshot, and restart. Schedule backups and a real staging recovery drill before public launch; no external backup schedule is created automatically.

## Production launch dependencies

Confirm brand/legal entity, domain, official email/social channels, available offerings, named lead owners and a staffed response window. Replace policy drafts after legal review and specify retention/deletion procedures and approved processors. No client case studies, logos, endorsements or measured results are claimed. Concepts stay labelled until genuine projects are approved.

Choose and configure CRM, calendar and email delivery; set an HTTPS `APP_URL`; add MFA and individual staff identity; confirm durable hosting, encrypted backup storage, monitoring and rollback. Current rate limiting is process-local and keyed to the direct socket, so proxy trust and distributed rate limiting need configuration for scaled hosting. SQLite suits a single server; migration to PostgreSQL and a hosted CMS remains available if operational scale requires it.

Public publishing and provider provisioning have not been performed. The future client portal, invoicing, support tickets and multilingual platform remain outside the MVP, as specified in the PRD.
