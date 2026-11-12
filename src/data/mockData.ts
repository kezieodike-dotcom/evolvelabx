import { ServiceDetail, IndustrySolution, CaseStudy, InsightArticle, ConsultationSubmission } from '../types';

export const ASSET_IMAGES = {
  hero: '/src/assets/images/hero_evolvelabx_enterprise_1794432559006.jpg',
  hospitality: '/src/assets/images/hospitality_tech_showcase_1794432559717.jpg',
  automation: '/src/assets/images/ai_automation_workflow_1794432560100.jpg',
  training: '/src/assets/images/corporate_training_bootcamp_1794432560293.jpg',
};

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'consulting',
    number: '01',
    title: 'Technology Consulting & Digital Transformation',
    shortDesc: 'Strategic technology audits, legacy system modernization, and digital transformation roadmaps tailored for measurable ROI.',
    fullDesc: 'We identify operational bottlenecks, outdated infrastructure, and disconnected data silos to construct a cohesive technology blueprint that directly accelerates commercial growth.',
    targetAudience: [
      'Executive Leadership & Board Directors',
      'Operations Directors handling manual process overload',
      'Companies transitioning from paper/spreadsheets to automated ERPs',
      'Firms needing vendor and technical feasibility evaluation'
    ],
    problemsSolved: [
      'Fragmented operational software leading to blind spots and reconciliation delays',
      'Misallocated IT budgets on off-the-shelf software that fails adoption',
      'Lack of clear modernization roadmap aligned with revenue objectives',
      'Compliance and security risks under the Nigeria Data Protection Act (NDPA) 2023'
    ],
    deliverables: [
      'Comprehensive Technology Health & Infrastructure Audit',
      'Target Architecture Blueprint & Vendor Evaluation Matrix',
      '12-Month Phased Digital Transformation Roadmap',
      'Security, Data Governance & NDPA 2023 Compliance Review'
    ],
    processStages: [
      { phase: 'Discovery & Telemetry', description: 'Deep-dive interviews across management and frontline operators to map data flows.' },
      { phase: 'Gap & Friction Analysis', description: 'Pinpoint friction zones, manual duplication, and security vulnerabilities.' },
      { phase: 'Strategic Formulation', description: 'Design vendor-neutral architecture with exact resource, cost, and ROI models.' },
      { phase: 'Executive Handover', description: 'Present implementation roadmap with governance milestones and tender specs.' }
    ],
    clientRequirements: [
      'Designated executive project sponsor',
      'Access to key department leads for operational interviews',
      'Current architecture diagrams, software inventory, and licensing costs'
    ],
    slaSupport: 'Bi-weekly steering meetings during engagement + 90-day post-roadmap advisory support.',
  },
  {
    id: 'software',
    number: '02',
    title: 'Software Engineering & Cloud Systems',
    shortDesc: 'Custom enterprise web platforms, robust APIs, database engines, and connected internal operations software.',
    fullDesc: 'We architect and build tailored software solutions built for stability, scale, and high-concurrency environments across Africa and global markets.',
    targetAudience: [
      'Startups needing production-grade MVP and scalable architecture',
      'Enterprises outgrowing generic SaaS solutions',
      'Retailers and distributors needing multi-outlet inventory & ERP sync',
      'Logistics and financial service providers requiring high-uptime APIs'
    ],
    problemsSolved: [
      'Off-the-shelf software lacking support for local payment gateways and operational nuances',
      'Unreliable database systems crashing during peak transaction cycles',
      'Slow manual reporting caused by non-integrated legacy databases',
      'Security flaws and unauthorized data exfiltration risks'
    ],
    deliverables: [
      'Custom React / TypeScript / Node.js Production Web Platforms',
      'Enterprise REST & GraphQL APIs with OAuth2 & Granular RBAC',
      'High-Performance Relational & Time-Series Database Schemas',
      'CI/CD Pipelines, Automated Testing, and Docker Containerization'
    ],
    processStages: [
      { phase: 'System Architecture', description: 'Entity-relationship diagrams, API contracts, and security perimeter definition.' },
      { phase: 'Iterative Engineering', description: 'Bi-weekly sprint releases with continuous preview environments for stakeholder testing.' },
      { phase: 'Quality Assurance & Pentesting', description: 'Rigorous load testing, edge-case validation, and vulnerability audits.' },
      { phase: 'Production Deployment', description: 'Zero-downtime cutover with automated database migration backups.' }
    ],
    clientRequirements: [
      'Product owner available for weekly backlog reviews',
      'Branding assets, visual identity guidelines, and tone-of-voice documentation',
      'Third-party sandbox API credentials (payment gateways, SMS providers, etc.)'
    ],
    slaSupport: '99.9% uptime warranty for 12 months with 1-hour critical defect response SLA.',
  },
  {
    id: 'automation',
    number: '03',
    title: 'AI & Workflow Automation',
    shortDesc: 'Intelligent document extraction, robotic process automation (RPA), automated approvals, and connected tool orchestration.',
    fullDesc: 'We eliminate repetitive human data entry and manual reconciliation by connecting your CRM, accounting software, communications, and internal databases into intelligent, automated pipelines.',
    targetAudience: [
      'Finance and operations teams drowning in invoice & payment reconciliations',
      'Customer support teams handling repetitive multi-channel queries',
      'Supply chain operators coordinating purchase orders across vendors',
      'Legal and compliance teams reviewing large document volumes'
    ],
    problemsSolved: [
      'Up to 40 hours per week lost to manual cross-spreadsheet data entry',
      'Customer enquiry drop-offs due to delayed weekend response times',
      'Human calculation errors in order fulfillment and invoice generation',
      'Siloed communications between sales, inventory, and fulfillment teams'
    ],
    deliverables: [
      'Automated Multi-Channel Lead Ingestion & CRM Routing',
      'AI Document & Invoice Processing Engine with OCR Extraction',
      'Human-in-the-Loop Verification Dashboard for Sensitive Approvals',
      'Bi-Directional WhatsApp / Email / Slack Operational Bot Orchestration'
    ],
    processStages: [
      { phase: 'Process Mining', description: 'Shadow frontline teams to record repetitive keystrokes, triggers, and error points.' },
      { phase: 'Workflow Prototyping', description: 'Build sandbox automation pipeline with fail-safes and boundary conditions.' },
      { phase: 'Validation & Benchmarking', description: 'Side-by-side verification comparing manual vs automated processing speed.' },
      { phase: 'Live Orchestration', description: 'Roll out automated triggers with audit logging and exception alerts.' }
    ],
    clientRequirements: [
      'Documentation of standard operating procedures (SOPs) and approval thresholds',
      'API tokens or system administrator rights for connected business tools',
      'Designated business analyst for workflow edge-case sign-off'
    ],
    slaSupport: 'Continuous workflow monitoring, weekly anomaly reports, and fast fail-safe recovery.',
    image: ASSET_IMAGES.automation,
  },
  {
    id: 'training',
    number: '04',
    title: 'Corporate Training & Managed Support',
    shortDesc: 'Hands-on technical workshops, digital adoption programs, detailed operating SOPs, and 24/7 managed infrastructure support.',
    fullDesc: 'Technology projects fail when employees do not adopt them. We bridge the human gap with tailored corporate training bootcamps, structured video SOPs, and dedicated technical support.',
    targetAudience: [
      'Corporations rolling out new digital tools or modernizing workflows',
      'HR and Talent heads seeking to upskill internal operations staff',
      'Hotels and retail chains with distributed frontline staff',
      'Organizations requiring on-call Level 2 and Level 3 engineering support'
    ],
    problemsSolved: [
      'Resistance to new software resulting in reversion to manual workarounds',
      'High staff turnover creating institutional knowledge loss',
      'Untrained staff inadvertently compromising data security protocols',
      'Unbudgeted downtime caused by lack of dedicated maintenance personnel'
    ],
    deliverables: [
      'Custom Role-Based Employee Training Curriculum & Hands-On Workshops',
      'Digital Knowledge Base & Searchable Video Standard Operating Procedures (SOPs)',
      'Quarterly Technology Skills & Security Hygiene Assessments',
      'Dedicated Tier-2 & Tier-3 Managed Support Desk with SLA Guarantees'
    ],
    processStages: [
      { phase: 'Skills & Culture Assessment', description: 'Evaluate current digital proficiency and identify adoption friction points.' },
      { phase: 'Curriculum Customization', description: 'Build interactive, scenario-based modules using your actual internal tools.' },
      { phase: 'Interactive Delivery', description: 'Deliver on-site or interactive virtual workshops with practical exercises.' },
      { phase: 'Adoption Telemetry', description: 'Monitor system login metrics, feature usage, and support ticket trends.' }
    ],
    clientRequirements: [
      'Staff release time allocated for scheduled workshop sessions',
      'Access to training environment or staging sandbox',
      'Feedback from department heads on recurring employee questions'
    ],
    slaSupport: 'Choice of standard business-hours or 24/7 dedicated support desk with tiered response times.',
    image: ASSET_IMAGES.training,
  }
];

export const INDUSTRY_SOLUTIONS_DATA: IndustrySolution[] = [
  {
    id: 'hospitality',
    name: 'Hospitality Technology',
    badgeTitle: 'Featured Industry Solution',
    tagline: 'Flawless guest journeys from direct reservation to contactless checkout.',
    summary: 'Designed specifically for boutique hotels, resorts, and multi-property hospitality groups. We connect guest booking engines, property management systems (PMS), restaurant POS, and housekeeping operations into one synchronized ecosystem.',
    businessChallenges: [
      'Heavy OTA commissions (15–25%) draining hotel margins due to outdated direct booking engines',
      'Double bookings and inventory discrepancies between front desk and online channels',
      'Slow guest check-in lines and manual credit card voucher handling',
      'Disconnected restaurant, spa, and room charges requiring tedious end-of-day audit'
    ],
    coreModules: [
      { title: 'High-Conversion Direct Booking Engine', desc: 'Mobile-first reservation flow with dynamic pricing, room upgrades, and local payment gateways (Paystack, Flutterwave, Interswitch, Cards).' },
      { title: 'Property Management Orchestration', desc: 'Real-time room status, housekeeping dispatch, maintenance alerts, and automated night audit logging.' },
      { title: 'Contactless Digital Concierge', desc: 'Web-based guest portal for room service ordering, spa bookings, Wi-Fi access, and digital folio review.' },
      { title: 'Centralized Guest Profile & Loyalty', desc: 'Unified guest preferences, stay histories, VIP tags, and automated post-checkout feedback loops.' }
    ],
    integrations: ['Opera Cloud', 'Mews PMS', 'Oracle Micros', 'Paystack', 'Flutterwave', 'Stripe', 'Twilio SMS', 'WhatsApp Business API'],
    demonstratedProof: '+140% direct website bookings and 65% reduction in front-desk check-in turnaround at Amber Palms Luxury Resort.',
    image: ASSET_IMAGES.hospitality,
    hasInteractiveDemo: true,
  },
  {
    id: 'retail',
    name: 'Retail & Omnichannel Commerce',
    badgeTitle: 'Commerce & Logistics',
    tagline: 'Synchronized stock, unified payments, and multi-location retail visibility.',
    summary: 'Empower retail brands and distributors to sell seamlessly across online storefronts, physical outlets, and wholesale channels with real-time inventory reconciliation.',
    businessChallenges: [
      'Selling items online that are already out-of-stock in physical store shelves',
      'Manual daily sales reconciliation across multiple payment terminals and cash drawers',
      'Inability to track customer lifetime value across physical and digital transactions'
    ],
    coreModules: [
      { title: 'Unified Omnichannel Catalog & Inventory', desc: 'Instant stock adjustments across warehouses, e-commerce stores, and brick-and-mortar points of sale.' },
      { title: 'Multi-Terminal Payment Gateway', desc: 'Automated settlement pipelines supporting POS cards, USSD, bank transfer, and international cards.' },
      { title: 'Wholesale & B2B Portal', desc: 'Tiered wholesale pricing, credit limits, automated proforma invoicing, and dispatch tracking.' }
    ],
    integrations: ['Shopify', 'WooCommerce', 'Square POS', 'QuickBooks', 'Paystack POS', 'Odoo ERP'],
    demonstratedProof: '32 retail branches synchronized with 0 inventory mismatch errors over 12 months for Apex Retail Group.'
  },
  {
    id: 'corporate',
    name: 'Corporate Operations & Enterprise',
    badgeTitle: 'Enterprise Digital Core',
    tagline: 'Automated governance, digital procurement, and unified management dashboards.',
    summary: 'Replace cumbersome paper trails, decentralized email approvals, and fragmented spreadsheets with auditable internal enterprise platforms built to regulatory standards.',
    businessChallenges: [
      'Invoice and procurement requests stalled in slow manual email threads',
      'Lack of single-pane-of-glass executive reporting across subsidiaries',
      'Security risks from unencrypted spreadsheets containing sensitive payroll and strategy data'
    ],
    coreModules: [
      { title: 'Digital Procurement & Multi-Level Approvals', desc: 'Configurable approval thresholds, automated PO generation, vendor scoring, and invoice matching.' },
      { title: 'Executive BI & Telemetry Dashboard', desc: 'Real-time revenue, operational expense, and departmental KPI telemetry with automated exports.' },
      { title: 'Role-Based Access & Audit Logging', desc: 'Granular permissions, SSO integration, and tamper-evident audit trails compliant with international regulations.' }
    ],
    integrations: ['SAP', 'Microsoft 365', 'Google Workspace', 'Workday', 'PowerBI'],
    demonstratedProof: 'Cut average procurement approval cycle from 9 days down to 6 hours for leading financial institution.'
  },
  {
    id: 'ngo',
    name: 'NGOs & Development Institutions',
    badgeTitle: 'Impact & Governance',
    tagline: 'Transparent grant tracking, secure field data collection, and impact telemetry.',
    summary: 'Robust digital tools for non-governmental organizations, humanitarian agencies, and donor-funded programs operating across remote and low-connectivity environments.',
    businessChallenges: [
      'Inaccurate field data reporting caused by intermittent internet connectivity',
      'Strict donor reporting guidelines requiring granular audit trails on every disbursement',
      'Managing beneficiary privacy while providing verifiable impact metrics to international partners'
    ],
    coreModules: [
      { title: 'Offline-First Field Data Collection', desc: 'Mobile-optimized survey and intake forms that sync automatically when connectivity resumes.' },
      { title: 'Donor Grant & Milestone Tracker', desc: 'Transparent budget allocation, expense categorization, and automated multi-currency reporting.' },
      { title: 'Beneficiary Management & Aid Verification', desc: 'Biometric or token-based verification ensuring direct aid delivery without leakage.' }
    ],
    integrations: ['KoboToolbox', 'Salesforce Non-Profit', 'Tableau', 'SMS Gateways'],
    demonstratedProof: 'Enabled 45,000+ rural healthcare screenings across 6 states with 100% data audit compliance for HealthAid Africa.'
  },
  {
    id: 'education',
    name: 'Education & Higher Learning',
    badgeTitle: 'Academic Transformation',
    tagline: 'Modern student lifecycles, automated tuition billing, and digital examination portals.',
    summary: 'Comprehensive academic management systems for private universities, secondary schools, and professional accreditation bodies.',
    businessChallenges: [
      'Manual paper examination grading causing delays in transcript issuance',
      'Tuition payment tracking bottlenecks during semester registration rush',
      'Lack of reliable parent communication and student academic progress tracking'
    ],
    coreModules: [
      { title: 'Admissions & Student Information Portal', desc: 'End-to-end digital application, document verification, course registration, and transcript generation.' },
      { title: 'Secure Computer-Based Testing (CBT)', desc: 'Tamper-resistant online exam portal with randomized question banks, timed sessions, and automated scoring.' },
      { title: 'Automated Tuition & Fee Gateway', desc: 'Direct bank reconciliation, installment schedules, and automated student clearance receipts.' }
    ],
    integrations: ['Canvas LMS', 'Moodle', 'Interswitch', 'Remita', 'Zoom Education'],
    demonstratedProof: 'Eliminated registration queue bottlenecks for 12,000+ students across 4 faculties at EduPulse Africa.'
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'amber-palms-resort',
    client: 'Amber Palms Luxury Resort & Spa',
    industry: 'hospitality',
    industryLabel: 'Hospitality & Tourism',
    location: 'Lagos & Lekki Peninsula, Nigeria',
    title: 'Transforming Direct Bookings & Guest Experience for a 120-Key Beachfront Resort',
    summary: 'Modernized legacy front-desk software with a high-conversion direct reservation engine, automated payment processing, and synchronized housekeeping workflow.',
    metrics: [
      { value: '+142%', label: 'Direct Booking Growth' },
      { value: '65%', label: 'Faster Guest Check-in' },
      { value: '₦48M', label: 'OTA Commission Saved in Year 1' }
    ],
    challenge: 'The resort was paying over 22% in OTA commissions because their previous website lacked a real-time reservation engine. Front desk staff manually re-entered reservations into desktop software, leading to frequent double bookings during holiday seasons and 20-minute check-in queues.',
    solution: 'EvolveLabX designed and engineered a custom booking engine with instant payment confirmation (Cards, USSD, Bank Transfer), integrated with an automated room inventory coordinator and a mobile housekeeping web app.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Paystack Engine', 'Twilio WhatsApp API'],
    testimonial: {
      quote: "EvolveLabX delivered far more than just software. They redesigned our entire front-office workflow. Our direct revenue doubled within four months, and guest complaints about check-in queues have dropped to virtually zero.",
      author: 'Femi Adebayo',
      role: 'Managing Director, Amber Palms Resort'
    },
    duration: '10 Weeks Discovery to Full Rollout'
  },
  {
    id: 'credence-logistics',
    client: 'Credence Freight & Logistics',
    industry: 'logistics',
    industryLabel: 'Supply Chain & Logistics',
    location: 'Lagos & Port Harcourt, Nigeria',
    title: 'Automated Dispatch, Waybill Tracking & Fuel Reconciliation for 180-Vehicle Fleet',
    summary: 'Replaced paper logbooks and phone-call dispatching with an automated logistics dispatch portal and automated driver trip verification.',
    metrics: [
      { value: '78%', label: 'Reduction in Waybill Processing Latency' },
      { value: '18.4%', label: 'Fuel Cost Savings via Optimized Routes' },
      { value: '99.98%', label: 'Fleet Telemetry Uptime' }
    ],
    challenge: 'Dispatchers coordinated over 180 haulage trucks via WhatsApp messages and manual spreadsheets. Invoices were delayed by up to 21 days while waiting for physical stamped waybills to return from regional distribution centers.',
    solution: 'Built an enterprise driver mobile portal with digital proof-of-delivery (photo capture + GPS stamp), automated customer SMS status notifications, and real-time fuel voucher reconciliation.',
    techStack: ['Next.js', 'PostgreSQL', 'Redis', 'Leaflet Geospatial', 'AWS Lambda'],
    testimonial: {
      quote: "Before EvolveLabX, we lost hundreds of thousands of Naira monthly to unverified fuel receipts and delayed waybills. The platform paid for itself in less than 90 days.",
      author: 'Chidinma Okeke',
      role: 'Chief Operating Officer, Credence Logistics'
    },
    duration: '14 Weeks Phased Implementation'
  },
  {
    id: 'apex-retail-group',
    client: 'Apex Retail Brands',
    industry: 'retail',
    industryLabel: 'Retail & Consumer Goods',
    location: 'Abuja & Lagos, Nigeria',
    title: 'Omnichannel Inventory Synchronization Across 32 Supermarket Outlets',
    summary: 'Unified physical barcode POS systems with an e-commerce delivery portal, eliminating stock discrepancies and streamlining procurement.',
    metrics: [
      { value: '0', label: 'Out-of-Stock Online Sales Mismatches' },
      { value: '+85%', label: 'Online Order Fulfillment Speed' },
      { value: '₦120M+', label: 'Monthly Omnichannel Volume' }
    ],
    challenge: 'Stock numbers in branch stores did not reflect on their online delivery portal. Customers frequently ordered items that were already bought by walk-in shoppers, resulting in refunds, unhappy customers, and chaotic store fulfillment.',
    solution: 'Engineered a real-time event-driven inventory sync service connecting legacy store POS databases to a modern online catalog with automated branch routing.',
    techStack: ['Node.js Microservices', 'React', 'RabbitMQ', 'PostgreSQL', 'Docker'],
    testimonial: {
      quote: "The technical discipline EvolveLabX brought was refreshing. They handled our messy legacy database with surgical precision without causing a single second of store downtime.",
      author: 'Tunde Bakare',
      role: 'Head of Technology, Apex Retail Group'
    },
    duration: '12 Weeks Rollout'
  },
  {
    id: 'healthaid-africa',
    client: 'HealthAid Africa Initiative',
    industry: 'ngo',
    industryLabel: 'Non-Profit & Healthcare',
    location: 'West Africa Regional',
    title: 'Offline-First Clinical Survey & Patient Screening Engine for Remote Communities',
    summary: 'Engineered an offline-first mobile survey app enabling community health workers to record patient diagnostics in areas without cellular coverage.',
    metrics: [
      { value: '45,000+', label: 'Verified Patient Screenings' },
      { value: '100%', label: 'Donor Audit Compliance' },
      { value: '0%', label: 'Data Loss During Offline Collection' }
    ],
    challenge: 'Health workers spent weeks gathering paper questionnaires in rural settlements. Data entry was prone to transcription errors, and donor grant audits took months to verify patient numbers.',
    solution: 'Designed an offline-first PWA with local encrypted IndexedDB storage, automated background sync upon detecting Wi-Fi or 3G, and an executive donor verification dashboard.',
    techStack: ['React', 'PWA / Service Workers', 'IndexedDB', 'Express', 'PostgreSQL'],
    testimonial: {
      quote: "Our international donors required strict proof of every single rural screening. EvolveLabX gave us an unassailable digital record that secured our next multi-year grant.",
      author: 'Dr. Halima Bello',
      role: 'Program Director, HealthAid Africa'
    },
    duration: '8 Weeks Discovery to Field Pilot'
  }
];

export const INSIGHTS_DATA: InsightArticle[] = [
  {
    id: 'ndpa-2023-compliance-guide',
    title: 'The Nigerian Data Protection Act (NDPA) 2023: What Business Leaders Must Audit in Their Software Architecture',
    category: 'Digital Transformation',
    date: 'March 2026',
    readTime: '6 min read',
    author: {
      name: 'EvolveLabX Architecture Group',
      role: 'Enterprise Security & Governance'
    },
    summary: 'A practical, non-legalistic guide for business executives on aligning internal software, customer databases, and cloud infrastructure with the NDPA 2023 statutory mandates.',
    content: [
      'Under the Nigeria Data Protection Act 2023, data controllers and data processors of major importance face statutory scrutiny over how customer personal data is collected, stored, and audited.',
      'Many organizations mistakenly assume that having a generic privacy policy on their website is sufficient. In reality, NDPA compliance requires architectural controls: encryption at rest, explicit consent logs, role-based database access, and verifiable data deletion protocols.',
      'We outline five concrete technical checkpoints every Nigerian enterprise should review before their next regulatory audit, including database segregation, automated backup encryption, and third-party API data sharing agreements.'
    ],
    keyTakeaways: [
      'Encryption at rest is mandatory for all PII data fields',
      'Consent must be explicitly recorded with timestamp and IP address telemetry',
      'Third-party software vendors must sign explicit data processing addendums'
    ]
  },
  {
    id: 'hospitality-direct-booking-playbook',
    title: 'Why West African Hotels Lose 25% of Their Revenue to OTAs (And How to Fix It With Modern PMS Sync)',
    category: 'Hospitality Technology',
    date: 'February 2026',
    readTime: '8 min read',
    author: {
      name: 'Hospitality Solutions Practice',
      role: 'EvolveLabX Advisory'
    },
    summary: 'How boutique hotels and resort chains can recapture direct bookings by removing friction from their reservation engines and integrating local payment rails.',
    content: [
      'Online Travel Agencies (OTAs) provide initial discovery, but relying on them for 80%+ of bookings severely damages hospitality operating margins. For a 100-room property, 20% commission translates to tens of millions of Naira in lost revenue annually.',
      'The reason guests default to OTAs is not brand loyalty—it is friction on hotel websites. Clunky multi-step forms, failed local card transactions, and delayed email confirmations drive travelers back to aggregator platforms.',
      'By implementing mobile-first booking engines with instantaneous confirmation and integrated payment gateways (Paystack, Flutterwave, Apple Pay), hotels routinely lift direct booking share by over 40% within 90 days.'
    ],
    keyTakeaways: [
      'Streamline checkout to under 3 steps with instant USSD and card confirmation',
      'Offer exclusive direct-book perks (free breakfast, flexible check-out, room upgrades)',
      'Automate WhatsApp confirmation and digital pre-arrival check-in'
    ]
  },
  {
    id: 'practical-ai-workflow-automation',
    title: 'Practical AI in Business Operations: Moving Beyond Chatbots to Real Workflow Automation',
    category: 'AI and Automation',
    date: 'January 2026',
    readTime: '7 min read',
    author: {
      name: 'Engineering Team',
      role: 'EvolveLabX Labs'
    },
    summary: 'Why generic AI chat windows fail to deliver ROI, and how connected document processing and automated approval queues generate actual cost savings.',
    content: [
      'Too many businesses invest in generic AI assistants that sit in isolation and answer trivia. Real commercial value from artificial intelligence comes from embedding models inside operational data pipelines.',
      'Consider accounts payable: an intelligent pipeline receives incoming supplier PDFs via email, extracts vendor details, line items, and bank details using computer vision, validates them against existing purchase orders in the ERP, and flags anomalies for human sign-off.',
      'This human-in-the-loop automation cuts invoice turnaround from 4 days to 4 minutes while eliminating fraudulent or duplicate billing.'
    ],
    keyTakeaways: [
      'Embed AI inside existing workflows rather than creating standalone chat destinations',
      'Always implement human-in-the-loop thresholds for financial or legal actions',
      'Measure success by processing latency reduction and error minimization'
    ]
  },
  {
    id: 'build-vs-buy-enterprise-software',
    title: 'Custom Software vs. SaaS: The Strategic Decision Framework for Mid-Market Enterprises',
    category: 'Software Engineering',
    date: 'December 2025',
    readTime: '9 min read',
    author: {
      name: 'Strategy & Solutions',
      role: 'EvolveLabX Consulting'
    },
    summary: 'A clear rubric for deciding when off-the-shelf software is appropriate and when building proprietary intellectual property yields an unassailable competitive advantage.',
    content: [
      'Off-the-shelf SaaS works well for commodity functions like email and generic payroll. However, when an organization attempts to bend its core competitive processes to fit rigid software constraints, inefficiency multiplies.',
      'We examine the Total Cost of Ownership (TCO) across 3 years: licensing fees, customization costs, workflow friction, and data sovereignty.',
      'When your business process is your proprietary secret sauce—such as a custom credit scoring algorithm, unique supply chain logistics, or personalized guest hospitality—custom software is an investment in company enterprise value.'
    ],
    keyTakeaways: [
      'Buy for commodity operations; build for core competitive differentiators',
      'Factor recurring per-seat SaaS price escalations into long-term ROI calculations',
      'Maintain full ownership of your data schemas and intellectual property'
    ]
  },
  {
    id: 'employee-tech-adoption-failures',
    title: 'Why 70% of Digital Transformations Stall: The Crucial Role of Continuous Corporate Training',
    category: 'Technology Training',
    date: 'November 2025',
    readTime: '5 min read',
    author: {
      name: 'People & Adoption Practice',
      role: 'EvolveLabX Enablement'
    },
    summary: 'Software does not transform organizations; people do. How structured SOPs and hands-on workshops prevent multi-million Naira software write-downs.',
    content: [
      'Every CTO has witnessed the tragedy of an expensive new CRM or ERP being abandoned within 6 months while employees quietly revert to their comfortable Excel spreadsheets.',
      'Adoption fails not because the software is broken, but because change management was treated as an afterthought. Employees are handed a 200-page PDF manual and expected to navigate new interfaces under high daily pressure.',
      'EvolveLabX incorporates the "Train & Enable" phase directly into every engagement: bite-sized video walkthroughs, role-specific scenario workshops, and internal champions who guide their peers.'
    ],
    keyTakeaways: [
      'Engage frontline employees during early UI discovery, not just at launch',
      'Replace static manuals with interactive 2-minute video SOPs',
      'Track adoption telemetry to reward early power users and support struggling teams'
    ]
  },
  {
    id: 'streamlining-multi-outlet-operations',
    title: 'Eliminating Operational Blindspots in Multi-Branch Operations and Distribution Networks',
    category: 'Business Operations',
    date: 'October 2025',
    readTime: '6 min read',
    author: {
      name: 'Enterprise Advisory',
      role: 'EvolveLabX Operations'
    },
    summary: 'How distributed retail, logistics, and hospitality businesses establish real-time operational telemetry across regional branches.',
    content: [
      'Managing business operations across multiple cities or branches creates latency. Daily reports compiled manually by branch managers often arrive 24 to 48 hours late, obscuring critical inventory stockouts or cash collection gaps.',
      'By establishing event-driven central reporting with automated anomaly alerts, executive leadership gains live visibility into sales trends, stock depletion rates, and operational incidents in real time.'
    ],
    keyTakeaways: [
      'Implement automated end-of-day digital reconciliation to eliminate manual cash ledger audits',
      'Use event-driven notifications for inventory thresholds and high-value transactions',
      'Equip regional managers with mobile executive summaries rather than desktop dashboards'
    ]
  }
];

export const TRUST_METRICS = [
  { value: '40+', label: 'Enterprise Platforms Deployed', note: 'Across Hospitality, Logistics & Finance' },
  { value: '₦2.4B+', label: 'Client Revenue Transacted', note: 'Processed through secure customer systems' },
  { value: '68%', label: 'Average Process Latency Reduction', note: 'Via intelligent workflow automation' },
  { value: '99.98%', label: 'System Availability SLA', note: 'High-availability containerized deployments' },
];

export const VERIFIED_PARTNERS = [
  { name: 'Lagos Chamber of Commerce & Industry', label: 'Corporate Member' },
  { name: 'Nigeria Data Protection Commission (NDPC)', label: 'NDPA 2023 Compliant Practice' },
  { name: 'AWS Partner Network', label: 'Select Tier Cloud Architect' },
  { name: 'Paystack Verified Integration Partner', label: 'Enterprise Solutions' },
  { name: 'Flutterwave Certified Partner', label: 'Regional Fintech Integrator' },
];

export const APPROACH_STEPS = [
  {
    step: '01',
    name: 'Discover',
    tagline: 'Understand the business challenge before touching code.',
    description: 'We conduct rigorous stakeholder interviews, process shadowing, and architecture audits to map operational friction and define concrete commercial success metrics.',
    deliverable: 'Executive Discovery Audit & Solution Architecture Blueprint'
  },
  {
    step: '02',
    name: 'Design',
    tagline: 'Architect scalable systems and human-centered interfaces.',
    description: 'We construct high-fidelity interactive wireframes, database schemas, and API contracts. Every user journey is validated for operational efficiency and accessibility.',
    deliverable: 'Interactive System Prototype & Technical Specification'
  },
  {
    step: '03',
    name: 'Build',
    tagline: 'Iterative, battle-tested software engineering.',
    description: 'Our engineers build production-grade web applications, automated workflows, and database pipelines with automated testing, CI/CD, and robust security perimeters.',
    deliverable: 'Production-Ready Software & Continuous Deployment Pipelines'
  },
  {
    step: '04',
    name: 'Train',
    tagline: 'Equip employees to adopt new technology with total confidence.',
    description: 'We deliver hands-on corporate workshops, role-specific video SOPs, and user onboarding flows to ensure seamless team adoption and zero workflow disruption.',
    deliverable: 'Staff Training Bootcamps & Digital Knowledge Base'
  },
  {
    step: '05',
    name: 'Improve',
    tagline: 'Continuous monitoring, optimization, and SLAs.',
    description: 'Technology is an ongoing engine. We provide proactive 24/7 telemetry monitoring, security patching, performance tuning, and feature roadmap advisory.',
    deliverable: 'Managed SLA Support Desk & Quarterly Optimization Reviews'
  }
];

export const FAQS_DATA = [
  {
    q: 'How does EvolveLabX differ from a conventional web agency?',
    a: 'Most agencies build superficial marketing websites and disappear. EvolveLabX is a full-lifecycle technology partner. We engineer deep operational systems—like custom ERPs, direct booking engines, and automated workflow pipelines—and we stay to train your employees and provide ongoing SLA maintenance.'
  },
  {
    q: 'What is your typical project timeline from kickoff to launch?',
    a: 'An initial Discovery and Blueprint sprint takes 1 to 2 weeks. Focused custom systems or automation implementations typically range from 6 to 12 weeks depending on integration complexity. Every project follows a clear milestone schedule with bi-weekly demo releases.'
  },
  {
    q: 'Do you work with international clients outside Nigeria?',
    a: 'Yes. While headquartered in Lagos, Nigeria, our engineering practices follow global standards (ISO 27001, GDPR, WCAG 2.2 AA). We serve clients across the UK, United States, Ghana, Kenya, and international organizations requiring enterprise-grade execution.'
  },
  {
    q: 'How do you guarantee data security and compliance?',
    a: 'Every platform we engineer is strictly compliant with the Nigeria Data Protection Act (NDPA) 2023 and international best practices. We implement end-to-end TLS encryption, database encryption at rest, role-based access control (RBAC), and automated audit logs.'
  },
  {
    q: 'What happens after the software goes live?',
    a: 'We provide comprehensive employee training workshops, video SOPs, and structured SLA agreements including 99.9% uptime guarantees, dedicated support desks, and quarterly performance optimization.'
  }
];

export const SERVICES_FAQS = [
  {
    q: 'What happens during the initial 2-week Discovery & Architecture Audit sprint?',
    a: 'We conduct rigorous stakeholder interviews, shadow frontline staff to map manual bottlenecks, audit existing database schemas, and deliver a formal target architecture blueprint with vendor evaluations and a phased implementation roadmap.'
  },
  {
    q: 'Do clients own the source code and intellectual property upon project completion?',
    a: 'Yes, 100%. Under our standard Master Services Agreement (MSA), once contractual milestones are fulfilled, all custom source code, database architectures, and deployment scripts are transferred exclusively to the client with full IP ownership.'
  },
  {
    q: 'How do you ensure enterprise compliance with the Nigeria Data Protection Act (NDPA) 2023?',
    a: 'Every system is architected with strict statutory privacy controls: TLS 1.3 encryption in transit, AES-256 encryption for sensitive PII at rest, tamper-evident audit logs, granular role-based access control (RBAC), and automated data subject deletion workflows.'
  },
  {
    q: 'How does EvolveLabX handle legacy database migration without operational downtime?',
    a: 'We execute zero-downtime blue/green database cutovers using bi-directional event queues and shadow pipelines. Your existing operational software continues running concurrently until validation thresholds are satisfied before cutting over.'
  },
  {
    q: 'What are the response time guarantees in your Managed Support SLAs?',
    a: 'Our SLA packages guarantee 99.98% system availability for cloud platforms, with 60-minute acknowledgment and remediation kickoff for Severity-1 critical incidents, paired with dedicated Tier-2/Tier-3 engineers.'
  },
  {
    q: 'How do you prevent employee resistance and ensure smooth software adoption?',
    a: 'Adoption is embedded directly into our 4th phase (Train & Enable). We replace dense manuals with role-specific scenario workshops, 2-minute searchable video SOPs, and employee proficiency scorecards.'
  }
];

export const SOLUTIONS_FAQS = [
  {
    q: 'Can your Hospitality booking engine integrate with our existing hotel PMS like Opera Cloud or Mews?',
    a: 'Yes. We engineer bi-directional webhooks and API bridges to synchronize live room status, guest folios, and rate parity across Opera Cloud, Mews, and proprietary desktop systems with zero double-booking locks.'
  },
  {
    q: 'Which local and international payment gateways do your systems support?',
    a: 'Out of the box, our platforms support Paystack, Flutterwave, Interswitch, Direct USSD/Bank Transfer reconciliation in Nigeria, as well as Stripe and Apple Pay for international cross-border transactions.'
  },
  {
    q: 'How do field applications operate in remote areas with intermittent or zero internet connectivity?',
    a: 'We engineer offline-first Progressive Web Apps (PWAs) utilizing encrypted local IndexedDB storage. Field staff can complete surveys, record transactions, and verify records offline, with automated delta synchronization when connectivity resumes.'
  },
  {
    q: 'Can you synchronize inventory across multiple physical supermarket or retail branches in real time?',
    a: 'Yes. Our retail engine connects branch POS barcode scanners and e-commerce stores via an event-driven inventory broker, ensuring that walk-in purchases immediately decrement online availability to eliminate overselling.'
  },
  {
    q: 'Does EvolveLabX provide proprietary SaaS software or custom engineered platforms?',
    a: 'In accordance with our PRD guidelines, we provide custom engineered enterprise systems tailored to your unique workflows, along with demonstrated modular accelerators that drastically reduce implementation time without locking you into vendor fees.'
  }
];
