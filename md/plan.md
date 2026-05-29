# Fintech / Stablecoin Infrastructure Hub — Plan

> A working hub to track the companies building the new money-movement stack:
> stablecoin payment APIs, on/off-ramps, neo-banks, and DeFi-native banks.
> Goal: understand who does what, how they differ, and collect links in one place.

Last updated: 2026-05-31

---

## 1. Why this hub

The "stablecoin rails" space is consolidating fast (Stripe bought Bridge for $1.1B;
Visa partnered with BVNK; Ethena + Ether.fi are turning DeFi protocols into banks).
There are ~5 distinct layers, and most companies blur into each other. This hub:

1. Maps each company to the **layer(s)** it actually operates in.
2. Records **how each one is differentiated** (chains, regions, license, customer type).
3. Keeps a single, curated **link list** so research isn't scattered across tabs.
4. Becomes the seed for whatever we build next (a public directory site, a comparison
   tool, a newsletter, or our own product in this space).

---

## 2. The map — 5 layers of the stack

Think of money moving from a person's bank account → onto a chain → across borders →
into a yield product → back out to spend. Different companies own different segments.

| Layer | What it does | Players in our list |
|-------|--------------|---------------------|
| **L1 — On/Off-ramps** | Fiat ⇄ crypto at the edge (card, bank → USDC) | Ramp Network |
| **L2 — Payment orchestration / APIs** | Accept, store, convert, pay out stablecoins via API ("Stripe for stablecoins") | Bridge, BVNK, Sphere, Conduit |
| **L3 — Cross-border settlement** | Move value B2B across borders, settle in minutes | Sphere, Conduit, BVNK |
| **L4 — Synthetic dollars / yield** | Issue a yield-bearing dollar asset | Ethena (USDe) |
| **L5 — Consumer neo-banks** | Account + card + savings for end users | Neo-banks (Revolut/Nubank/Chime), Ether.fi (DeFi), UR Global |

Most of our target companies sit in **L2/L3**. Ethena is the **L4** ingredient that
neo-banks (L5) plug in for yield. Ramp is the **L1** edge. This is the key insight:
**they're complements as much as competitors.**

---

## 3. How they work differently (the differentiation matrix)

| Company | Layer | Core product | Customer | Key differentiator | Region focus |
|---------|-------|--------------|----------|--------------------|--------------|
| **Bridge** | L2 | Stablecoin orchestration + issuance API | Developers / platforms | Owned by Stripe; can mint your own stablecoin + share T-bill yield | Global |
| **BVNK** | L2/L3 | Enterprise stablecoin payments + virtual accounts | Enterprises, fintechs | Enterprise SLAs (99.9% uptime), $30B annualized volume, Visa partner | EU + US |
| **Sphere** | L2/L3 | Cross-border payments API ("stablecoin sandwich") + SphereNet | B2B import/export, fintech treasury | Solana-based permissioned ledger; settle <30 min, 160+ markets | LatAm-heavy |
| **Conduit** | L3 | Cross-border B2B payments on stablecoins | Businesses in emerging markets | Emerging-market corridors (LatAm/Africa) | Emerging markets |
| **Ramp Network** | L1 | Embeddable fiat on/off-ramp widget | Wallets, exchanges, dApps | Best-in-class UX checkout; MiCA + US MTL licensed | EU + US |
| **Ethena** | L4 | USDe synthetic dollar (delta-neutral) + sUSDe yield | Protocols, neo-banks | Crypto-backed (not fiat reserves); ~5% APY; $14B+ TVL | Global / on-chain |
| **Ether.fi** | L5 (DeFi) | Stake (savings) + Liquid (invest) + Cash (card) | Crypto-native consumers | Spend against staked ETH without selling; crypto credit card | Global / US card |

> The "stablecoin sandwich" (Sphere) = local currency → USD stablecoin → destination
> currency. Better liquidity/rates than thin direct FX pairs. Conduit does the same
> pattern for emerging-market corridors.

---

## 4. The four business questions to answer per company

For every project we add, fill in these four fields (this is the schema in `projects.md`):

1. **What layer(s) do they own?** (L1–L5 above)
2. **Who pays them, and for what?** (FX spread / SaaS fee / interchange / yield share)
3. **What's their moat?** (licenses, chains, region, distribution, a parent like Stripe)
4. **Who do they depend on?** (Circle/USDC, Tether, banking partners, a chain)

---

## 5. Open questions / things to research next

- [ ] Pricing — what does each actually charge? (bps on volume vs flat SaaS)
- [ ] Licensing map — who holds which licenses (MTLs, MiCA/CASP, EMI, trust charter)?
- [ ] Which stablecoins each supports (USDC / USDT / USDe / EURC / own-issued)
- [ ] Volume / traction numbers (BVNK = $30B annualized; get others)
- [ ] Where the neo-banks (Revolut, Nubank, Chime, Monzo) fit and whether they're
      adopting these rails or building their own
- [ ] The Stripe / Circle / Visa / Mastercard "platform" players sitting above all of this
- [ ] Regulatory backdrop: US GENIUS Act / stablecoin legislation, EU MiCA

---

## 6. Build plan for the hub itself

**Phase 0 — Knowledge base (now)**
- [x] Folder + `plan.md`
- [x] `projects.md` — structured directory with links
- [ ] One note file per company under `projects/` as we go deep

**Phase 1 — Organize**
- [ ] Tag every project by layer + region + customer type
- [ ] Add the comparison matrix as data (so it can drive a UI later)

**Phase 2 — Publish (optional)**
- [ ] Decide format: static directory site / Notion / comparison tool
- [ ] Design note: avoid the generic dark+neon "crypto" template look — make it a
      clean, editorial, opinionated directory (think a16z/Stripe-doc clarity)

**Phase 3 — Our angle**
- [ ] Decide what *we* build: a directory, a "which rail should I use?" tool,
      a research newsletter, or an actual product in an underserved layer

---

## 7. How to add a new project

1. Add a row to the table in `projects.md` with the four fields from §4.
2. Drop the canonical link(s) in the **Links** section there.
3. If it's worth a deep dive, create `projects/<name>.md`.
4. If it changes the landscape, update the layer map in §2 here.

See `projects.md` for the live list and all links.

---

## 8. Page architecture — deep dives (the expansion)

We're moving from a one-page directory to a multi-page hub. Three page types:

```
/                      Home — masthead + stack diagram + cards (cards link out)
/layer/[id]            Category deep-dive   (L1…L5) — the layer explained + its players + how they differ
/project/[slug]        Product deep-dive    (per company)
```

### 8a. Category page (`/layer/[id]`) — answer "what is this layer?"
- What this layer does + why it exists (the problem it solves).
- Where it sits in the flow (the segment of money movement it owns).
- The players in it, as cards, **with the axis they compete on** (e.g. ramps compete
  on fees + local rails + UX; synthetic dollars compete on yield source + risk).
- A short "how to tell them apart" paragraph — the real differentiator.

### 8b. Product page (`/project/[slug]`) — answer "what is this company, deeply?"
Each product page carries a consistent anatomy:

1. **Header** — name, one-line tagline, which layer(s), link to site.
2. **What it is** — 2–3 sentence plain-English overview.
3. **How it works** — the actual mechanism, step by step.
4. **Differentiators** — 3–4 bullets: why pick this over a peer.
5. **Business model** — who pays them and for what (FX spread / SaaS / interchange / yield).
6. **Key facts** — founded, HQ, funding, backers, chains, stablecoins, traction.
7. **Depends on / risks** — what could break it (banking partner, a chain, funding rate).
8. **Links** — site, docs, and notable coverage.

### 8c. Data model
All of the above lives in `web/lib/projects.ts` (typed). The markdown in `md/` is the
human research scratchpad; `projects.ts` is the structured, UI-driving version. Keep both
in sync. Each project gets a stable `slug` used in its URL.

### 8d. Research depth checklist (per product)
For every product, we want to nail: **mechanism, money model, moat, dependencies, traction,
funding/owner.** A product page is "done" when all eight anatomy sections are filled with
verified facts (no `[verify]` left).

**Status (researched vs. to-verify):**
- ✅ Solid: Bridge, BVNK, Ramp, MoonPay, Transak, Coinbase Onramp, Ethena, Ether.fi, Ondo, Revolut
- 🟡 Needs a verify pass: Sphere, Conduit, Rain, Mural, Felix, Mountain, Sky, Nubank, UR Global

### 8e. Branding
- Name: **Rails**. A custom SVG favicon (parallel-rails mark) shows in the browser tab.
- Keep the editorial light/dark theme. No generic crypto-template look.

### 8f. Roadmap update
- [x] Home page with stack diagram + cards
- [x] Light/dark theme + favicon
- [x] Expand to ≥4 researched companies per layer
- [x] Category deep-dive pages (`/layer/[id]`)
- [x] Product deep-dive pages (`/project/[slug]`)
- [ ] Clear all `[verify]` flags on the 🟡 products
- [ ] Add the "how it's built / APIs" deep dive per product (§9)
- [ ] (Later) search/filter, comparison view, "which rail should I use?" tool

---

## 9. Builder's track — how each works, the APIs, and how to build it

The directory answers *who* and *what*. This track answers **how** — so the hub becomes
useful to a developer, not just an analyst. For each product (and each layer) we want a
"builder's view" capturing the technical surface.

### 9a. What to capture per product (the builder schema)
For every company, document:

1. **Architecture** — the moving parts (custody, chains, banking partner, KYC vendor,
   ledger). A one-paragraph "how the money actually flows" + a simple diagram.
2. **API surface** — the core endpoints/objects they expose. e.g.:
   - Ramps (Ramp/MoonPay/Transak): `widget/session` create, quote, transaction status webhooks, off-ramp address.
   - Orchestration (Bridge/BVNK): `customers`, `virtual_accounts`, `transfers`, `payouts`, `liquidation_addresses`, webhooks.
   - Card issuing (Rain): `cardholders`, `cards`, `authorizations`, spend webhooks.
   - Synthetic dollars (Ethena/Ondo): mint/redeem flow, staking (sUSDe), on-chain contract ABIs.
3. **Auth & keys** — API key model, sandbox vs. production, signing/webhook verification.
4. **Integration shape** — hosted widget vs. headless API vs. SDK vs. smart contract.
5. **Compliance hooks** — what KYC/KYB/Travel-Rule data you must pass.
6. **Quotas / fees in code** — how pricing shows up at the API (spread vs. explicit fee).
7. **A minimal "hello world"** — the smallest flow that moves $1 end-to-end.

### 9b. What to capture per layer (how you'd build one)
A "build your own ___" note per layer — the reference architecture if you were to build a
competitor:

- **L1 ramp:** card acquiring + KYC + liquidity/market-maker + payout rails + a widget.
- **L2 orchestration:** wallets-as-a-service + chain nodes/indexers + banking partner +
  ledger + compliance + a clean API.
- **L3 cross-border:** FX/liquidity + local payout partners per corridor + treasury +
  the "stablecoin sandwich" engine.
- **L4 synthetic dollar:** collateral + custody/exchange (or T-bill broker) + a mint/redeem
  contract + a yield/rebase mechanism + attestations.
- **L5 neo-bank:** BIN sponsor / card issuer + a ledger + KYC + an embedded L1–L4 provider
  + an app.

### 9c. How this lands in the product
- Add a **"How it's built"** section to each `/project/[slug]` page: architecture,
  API surface, integration shape, and a code snippet.
- Add a **"Build your own"** section to each `/layer/[id]` page: the reference stack above.
- Extend `web/lib/projects.ts` with optional fields: `architecture`, `apiSurface[]`,
  `integration`, `codeSnippet`, `buildNotes`.

### 9d. Research method (per product)
1. Read the official **API docs / developer portal** (primary source).
2. Note the auth model, the 5–8 core endpoints, and the smallest end-to-end flow.
3. Capture pricing-as-API and compliance requirements.
4. Write the minimal snippet; flag anything unverified with `[verify]`.

**Priority order (best docs first):** Bridge, BVNK, Ramp, MoonPay, Transak,
Coinbase Onramp, Ethena, Ondo → then the 🟡 set.
