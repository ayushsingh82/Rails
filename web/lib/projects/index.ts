import type { Project, LayerId, Layer } from "./types";
import { LAYERS } from "./layers";
import { L1_PROJECTS } from "./l1";
import { L2_PROJECTS } from "./l2";
import { L3_PROJECTS } from "./l3";
import { L4_PROJECTS } from "./l4";
import { L5_PROJECTS } from "./l5";

export * from "./types";
export { LAYERS } from "./layers";
export { L1_PROJECTS, L2_PROJECTS, L3_PROJECTS, L4_PROJECTS, L5_PROJECTS };

// Every project, grouped into per-layer modules (l1–l5) for easier restructuring.
// A company lives in the file of its primary (first) layer; `layers` still lists all.
export const PROJECTS: Project[] = [
  ...L1_PROJECTS,
  ...L2_PROJECTS,
  ...L3_PROJECTS,
  ...L4_PROJECTS,
  ...L5_PROJECTS,
];

// Helpers
export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function projectsByLayer(id: LayerId): Project[] {
  return PROJECTS.filter((p) => p.layers.includes(id));
}

export function getLayer(id: string): Layer | undefined {
  return LAYERS.find((l) => l.id === id);
}

// Names on the radar but not yet written up — shown as a backlog strip.
export const BACKLOG: Record<string, string[]> = {
  "L1 — Ramps & aggregators": ["Onramper", "Stripe Onramp", "Paybis"],
  "L2 — Infra & issuance": ["Circle", "Tether", "Brale", "Paxos", "Iron"],
  "L3 — Cross-border / payouts": ["dLocal", "Alfred", "RedotPay"],
  "L4 — Synthetic dollars": ["Hashnote (USYC)", "BlackRock (BUIDL)", "Usual (USD0)"],
  "L5 — Neo-banks": ["Chime", "Monzo", "N26", "Cash App", "Coinbase"],
  "Platform layer": ["Visa", "Mastercard", "Circle", "Stripe"],
};
