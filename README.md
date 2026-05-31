# Rails — the money-movement stack

**Live:** https://railsmap.vercel.app/

**Rails** is a research hub and directory mapping the companies rebuilding how money
moves: stablecoin payment APIs, fiat on/off-ramps, cross-border settlement, synthetic
dollars, and neo-banks (both fiat-native and DeFi-native).

The thesis: these companies sit in **five distinct layers** and are mostly
**complements, not competitors**. Rails groups every project by the layer it actually
owns, then gives each one a deep-dive page explaining how it works, how it makes money,
and what it depends on.

---

## Repository structure

| Path | What's in it |
|------|--------------|
| [`README.md`](./README.md) | This file. |
| [`md/`](./md) | Research notes — the human-readable source of truth. |
| [`md/plan.md`](./md/plan.md) | The plan: layer map, differentiation matrix, open questions, page architecture, roadmap. |
| [`md/projects.md`](./md/projects.md) | The directory in prose: every company, how they differ, and all links. |
| [`web/`](./web) | The Next.js frontend that renders the directory. |
| [`web/lib/projects.ts`](./web/lib/projects.ts) | **Structured data** driving the UI (layers + projects + deep-dive content). |
| [`web/app/page.tsx`](./web/app/page.tsx) | Landing page — hero, the stack, and the company directory. |
| [`web/app/layer/[id]/page.tsx`](./web/app/layer/%5Bid%5D/page.tsx) | Category deep-dive pages (`/layer/L1` … `/layer/L5`). |
| [`web/app/project/[slug]/page.tsx`](./web/app/project/%5Bslug%5D/page.tsx) | Per-company deep-dive pages (`/project/bridge`, …). |
| [`web/app/globals.css`](./web/app/globals.css) | The editorial theme (light + dark) and all styling. |
| [`web/components/`](./web/components) | `SiteHeader`, `Logo`, and the light/dark `ThemeToggle`. |
| [`web/app/icon.svg`](./web/app/icon.svg) | The Rails favicon shown in the browser tab. |

> **Styling note:** the frontend uses **plain CSS** (CSS variables + one `globals.css`),
> not Tailwind or any utility framework. There is no Tailwind config to break.

---

## The five layers

| Layer | What it does | Companies |
|-------|--------------|-----------|
| **L1** | On/off-ramps (fiat ⇄ crypto) | Ramp, MoonPay, Transak, Coinbase Onramp |
| **L2** | Payment orchestration & APIs | Bridge, BVNK, Sphere, Rain, Mural Pay |
| **L3** | Cross-border settlement | BVNK, Sphere, Conduit, Mural Pay, Felix Pago |
| **L4** | Synthetic dollars & yield | Ethena, Ondo, Mountain, Sky |
| **L5** | Neo-banks | Ether.fi, Revolut, Nubank, UR Global |

Full reasoning and the differentiation matrix live in [`md/plan.md`](./md/plan.md).

---

## Running the frontend

```bash
cd web
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build (static)
```

Requires Node 18+ (developed on Node 23). The site has a **light/dark toggle** in the
header — it defaults to your system preference and remembers your choice.

### Pages

- `/` — landing: hero, the 5-layer stack diagram, and the full company directory.
- `/layer/[id]` — category deep-dive (what the layer does, what they compete on, the players).
- `/project/[slug]` — company deep-dive (what it is, how it works, business model, key facts, risks).

---

## Adding or editing a company

1. Add or edit the entry in [`web/lib/projects.ts`](./web/lib/projects.ts) — this drives
   every page and route automatically (no manual routing needed).
2. Mirror the change in [`md/projects.md`](./md/projects.md) so the notes stay in sync.
3. Each entry needs: `slug`, `layers`, `tagline`, `whatItIs`, `howItWorks`,
   `differentiators`, `businessModel`, `dependsOn`, `risks`, `keyFacts`, and `links`.
4. Unresearched names go in the `BACKLOG` (shown as **"On the radar"**) until written up.

---

## Status

Each layer has **≥4 companies**. Entries marked `to-research` (a "verify" tag in the UI)
still need a fact-checking pass — see the checklist in
[`md/plan.md` §8d](./md/plan.md). Solidly researched: Bridge, BVNK, Ramp, MoonPay,
Transak, Coinbase Onramp, Ethena, Ether.fi, Ondo, Revolut.
