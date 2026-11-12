export type ServicePillar = 
  | 'consulting'
  | 'software'
  | 'automation'
  | 'training';

export type IndustryType = 
  | 'hospitality'
  | 'retail'
  | 'corporate'
  | 'ngo'
  | 'education';

export interface ServiceDetail {
  id: ServicePillar;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  targetAudience: string[];
  problemsSolved: string[];
  deliverables: string[];
  processStages: { phase: string; description: string }[];
  clientRequirements: string[];
  slaSupport: string;
  image?: string;
}

export interface IndustrySolution {
  id: IndustryType;
  name: string;
  badgeTitle: string;
  tagline: string;
  summary: string;
  businessChallenges: string[];
  coreModules: { title: string; desc: string }[];
  integrations: string[];
  demonstratedProof: string;
  image?: string;
  hasInteractiveDemo?: boolean;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: IndustryType | 'logistics';
  industryLabel: string;
  location: string;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  solution: string;
  techStack: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  duration: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: 
    | 'Digital Transformation'
    | 'AI and Automation'
    | 'Software Engineering'
    | 'Hospitality Technology'
    | 'Business Operations'
    | 'Technology Training';
  summary: string;
  content: string[];
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  keyTakeaways: string[];
}

export interface ConsultationSubmission {
  id: string;
  fullName: string;
  businessEmail: string;
  companyName: string;
  country: string;
  serviceInterest: string;
  projectSummary: string;
  budgetRange: string;
  preferredDate: string;
  preferredTime: string;
  timeZone: string;
  meetingFormat: 'virtual' | 'onsite';
  consentAccepted: boolean;
  submittedAt: string;
  status: 'New' | 'Assigned' | 'Discovery Scheduled' | 'Proposal In Review';
}

export interface RoiAssessmentResult {
  industry: string;
  estimatedEfficiencyGain: string;
  weeklyHoursSaved: number;
  recommendedArchitecture: string;
  suggestedTimeline: string;
  primaryPillars: string[];
}
