// Data model for Rails. Mirrors md/projects.md — keep them in sync.
// `projects.ts` is the structured, UI-driving version; md/ is the research scratchpad.

export type LayerId = "L1" | "L2" | "L3" | "L4" | "L5";

export interface Layer {
  id: LayerId;
  title: string;
  blurb: string;
  // Deep-dive content for /layer/[id]
  what: string;
  whereItSits: string;
  competeOn: string;
  tellApart: string;
  // Builder's track (§9): how you'd build one of these
  buildYourOwn?: string[];
}

export interface KeyFact {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ApiEndpoint {
  name: string;
  desc: string;
}

export interface CodeSnippet {
  lang: string;
  caption: string;
  code: string;
}

// Optional "How it's built" content for a project (builder's track, §9).
export interface BuilderTrack {
  architecture: string;
  integration: string;
  apiSurface: ApiEndpoint[];
  snippet?: CodeSnippet;
  buildNotes?: string[];
}

// One product line within a multi-product company (e.g. ether.fi's Stake / Liquid / Cash).
export interface ProductBreakdown {
  name: string;
  tagline: string;
  whatItIs: string;
  mechanics: string[];
  stats?: KeyFact[];
}

// A headed sub-section for the interview-grade deep dive (architecture, flows, etc).
export interface DeepDiveSection {
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface Project {
  slug: string;
  name: string;
  url: string;
  layers: LayerId[];
  product: string;
  customer: string;
  moat: string;
  region: string;
  status: "researched" | "to-research";
  // Deep-dive content for /project/[slug]
  tagline: string;
  whatItIs: string;
  howItWorks: string[];
  differentiators: string[];
  businessModel: string;
  dependsOn: string[];
  risks: string[];
  keyFacts: KeyFact[];
  links: ProjectLink[];
  // Optional builder's track — "How it's built" (§9)
  builder?: BuilderTrack;
  // Optional interview-grade deep dive
  products?: ProductBreakdown[];
  deepDive?: DeepDiveSection[];
  contracts?: KeyFact[];
}
