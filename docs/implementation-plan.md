# Evolvelabx implementation plan

Goal: implement the supplied November 2026 corporate website PRD in the existing React/TypeScript checkout.

Architecture: retain Vite and React; add an Express API with SQLite persistence (Node 24 built-in SQLite). Keep public content separate from private leads. Use environment-configured staff credentials and external provider endpoints; never pretend a requested meeting is confirmed.

Design (updated to the user's latest direction): white #FFFFFF and green #087443, with soft green #F1F8F3 surfaces and dark green #153C2C text. Spacious sections, rounded service/industry cards and a shorter homepage. Existing imagery remains labelled as illustrative. No invented customers, metrics, certifications or locations.

Alternative: Next.js with a hosted CMS/Postgres matches the proposed stack but requires migration and provider selection. Existing React plus a server preserves the checkout and supplies locally verifiable behavior now. Hosted CRM/calendar/email remain configurable and require account details.

- [x] Replace demo-only runtime with routable Home, Services/detail, Solutions/detail, Work/detail, Insights/detail, About, Contact, legal and 404 pages.
- [x] Build responsive navigation, native modal enquiry flow, filters and illustrative work.
- [x] Test then implement server validation, consent, honeypot, origin checks, rate limiting, idempotency, persistent lead assignment and consultation requests.
- [x] Add authenticated content drafts/preview/publish/archive, revisions and staff lead status management; roles enforced server-side.
- [x] Add opt-in aggregate attribution events, metadata and sitemap. Document external integration and production launch prerequisites.
- [x] Verify API tests, public route rendering and type checking. Initial production build passed; final verification recorded in README.
- [ ] Browser navigation/form/mobile visual QA: unavailable browser/native-app automation; explicit outstanding manual check.

Review focus: invalid and duplicate forms; failed persistence must never show success; no private data in public content; browser back/deep links; narrow screens and keyboard focus.

Production decisions pending: verified entity/contact/domain, approved case studies, provider credentials, staff ownership, legal approval, HTTPS/reverse proxy, MFA at identity gateway, off-device backup and restore drill. This implementation must report these as open, not claim launch approval.
