import type { Project } from "./types";

export const L3_PROJECTS: Project[] = [
  {
    slug: "mural-pay",
    name: "Mural Pay",
    url: "https://www.muralpay.com/",
    layers: ["L3", "L2"],
    product: "Global stablecoin accounts (GSAs) + payments API: payins, payouts, invoicing; bulk payouts (up to 350 per request).",
    customer: "Businesses, fintechs, banks, marketplaces (LatAm-heavy)",
    moat: "Stablecoin ⇄ local-currency last-mile across LatAm + global, with built-in KYB/KYC and one-API Global Stablecoin Accounts.",
    region: "LatAm + global",
    status: "researched",
    tagline: "Global accounts. Real-time payments. One API.",
    whatItIs:
      "Mural Pay is a business-first global payments platform built on stablecoins. Companies, fintechs, and banks open Global Stablecoin Accounts (GSAs) through a single API, fund them in fiat or stablecoins, and pay out to bank accounts in local currency or to wallets in stablecoins. It's aimed at cross-border B2B operations — paying contractors and vendors — with built-in compliance and bulk runs of many payments per request. Founded by Palantir alumni, it has processed $200M+ in stablecoin payment volume.",
    howItWorks: [
      "Register an end-user (the 'Organization') via the API and pass them through hosted KYB/KYC; an Account is auto-provisioned on approval.",
      "Fund the account (payin) in fiat via ACH/Wire (USD), SEPA (EUR), or local rails (e.g. PSE/Nequi for COP) — auto-converted to USDC/USDT — or deposit stablecoins directly.",
      "Create a payout request: FIAT payouts settle to a recipient's bank in local currency; BLOCKCHAIN payouts send stablecoins to a wallet. Batch up to 350 payouts in one request.",
      "Execute the payout (with a separate transfer-api-key for client-custodial, or a signed payload for end-user-custodial); exchange rates lock at execution.",
      "Track balance changes and payout state via webhooks and the transactions API.",
    ],
    differentiators: [
      "Bulk contractor/vendor payouts at scale — up to 350 payouts per request, with optional per-recipient developer fees withheld automatically.",
      "Last-mile coverage across LatAm corridors (COP, ARS, MXN, BRL, CLP, PEN, BOB, CRC) plus USD/EUR/ZAR, with KYB/KYC built in.",
      "Two custody models (client-custodial vs. end-user-custodial with browser-SDK signing) let platforms choose who controls funds.",
      "A single API spanning payins, payouts, invoicing, and virtual stablecoin accounts — not just one of those.",
    ],
    businessModel: "FX spread on stablecoin ⇄ local-currency conversion + per-payout fees; platforms can also layer their own developer fees on top.",
    dependsOn: [
      "Local banking + payout partners (last-mile in each currency)",
      "Stablecoin liquidity (USDC/USDT)",
      "Supported chains (Ethereum, Polygon, Base, Celo)",
      "Wallet/key infrastructure (Turnkey) for custodial signing",
    ],
    risks: [
      "Emerging-market FX volatility + local-rail liquidity in LatAm corridors.",
      "Compliance/licensing burden as a regulated money-movement provider across many jurisdictions.",
      "Early stage relative to Bridge/BVNK — single $5.6M seed (2022); must show it can scale volume and corridors.",
    ],
    keyFacts: [
      { label: "Founded", value: "2022 — Sinclair Toffa (CEO, ex-Palantir), Chris Fernandes (CTO)" },
      { label: "Funding", value: "$5.6M seed (2022) — Digital Currency Group, Galaxy Digital, Firstminute, AlleyCorp, 186 Ventures, Predictive VP" },
      { label: "Volume", value: "$200M+ processed; ~5,000+ stablecoin payments/month [verify current]" },
      { label: "Currencies", value: "USD, EUR, COP, ARS, MXN, BRL, CLP, PEN, BOB, CRC, ZAR (40+ claimed)" },
      { label: "Bulk", value: "Up to 350 payouts per request" },
      { label: "Stablecoins / chains", value: "USDC, USDT on Ethereum, Polygon, Base, Celo" },
    ],
    links: [
      { label: "Site", url: "https://www.muralpay.com/" },
      { label: "Stablecoin API", url: "https://www.muralpay.com/stablecoin-api" },
      { label: "Developer docs", url: "https://developers.muralpay.com/docs/overview" },
      { label: "Create a payout request", url: "https://developers.muralpay.com/docs/create-a-payout-request" },
      { label: "Sandbox environment", url: "https://developers.muralpay.com/docs/sandbox-environment" },
      { label: "Turnkey case study", url: "https://www.turnkey.com/case-studies/mural-pay-cross-border-payments" },
    ],
    builder: {
      architecture:
        "Mural sits between stablecoin rails and local banking systems. The core object is the Account (a Global Stablecoin Account) provisioned automatically once an Organization clears KYB/KYC. Accounts hold USDC/USDT (on Ethereum/Polygon/Base/Celo) and expose payin methods (digital wallet, USD ACH/Wire, EUR SEPA, COP PSE/Nequi). Outflows are PayoutRequests — each FIAT (to a bank, last-mile in local currency) or BLOCKCHAIN (to a wallet). Custody is configurable: client-custodial (Mural holds keys; you execute with a transfer-api-key) or end-user-custodial (the end user's key signs the payout via Mural's Browser SDK, powered by Turnkey). Money movement is two-phase: create the request (locks nothing, status AWAITING_EXECUTION) then execute (locks the FX rate). Balance/credit/debit events stream back via webhooks.",
      integration:
        "REST API authenticated with a Bearer API key, plus an On-Behalf-Of header naming the target Organization. A separate transfer-api-key gates payout execution/cancellation so a leaked read key can't move funds. A Sandbox mirrors production (auto-approves KYC, auto-completes payouts without real settlement). IP allowlists (CIDR) can restrict access. For end-user custody, the Browser SDK signs the payout payload client-side.",
      apiSurface: [
        { name: "POST /api/organizations", desc: "Register an end-user (individual/business); then drive KYB/KYC via the kyc-link. Approval auto-provisions an Account." },
        { name: "GET /api/accounts", desc: "List/fetch Global Stablecoin Accounts — wallet addresses, balances, and payin (deposit) instructions per rail." },
        { name: "POST /api/payins/payin", desc: "Initiate a deposit; fiat (ACH/Wire/SEPA/PSE) auto-converts to USDC/USDT. Pair with /payins/exchange-rate for quotes." },
        { name: "POST /api/payouts/payout", desc: "Create a payout request with a sourceAccountId and a payouts[] array (FIAT or BLOCKCHAIN) — up to 350 per request." },
        { name: "POST /api/payouts/payout/{id}/execute", desc: "Execute a created request (transfer-api-key for client-custodial; signed payload for end-user-custodial). Locks the FX rate." },
        { name: "POST /api/payouts/fees/token-to-fiat", desc: "Quote fees + FX before executing (also fiat-to-token); rates lock only at execution." },
        { name: "POST /api/webhooks", desc: "Subscribe to account credit/debit + payout status events (AWAITING_EXECUTION → PENDING → EXECUTED/FAILED)." },
      ],
      snippet: {
        lang: "ts",
        caption: "Create a bulk fiat payout request (USDC → local-currency bank payouts) via REST.",
        code: `const res = await fetch('https://api.muralpay.com/api/payouts/payout', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${MURAL_API_KEY}\`,
    'Content-Type': 'application/json',
    'On-Behalf-Of': ORGANIZATION_ID,        // which Organization is paying
  },
  body: JSON.stringify({
    sourceAccountId: SOURCE_ACCOUNT_ID,      // a Global Stablecoin Account
    memo: 'May contractor run',
    payouts: [                               // up to 350 per request
      {
        amount: { tokenSymbol: 'USDC', tokenAmount: 100 },
        payoutDetails: {
          type: 'fiat',
          bankName: 'Bancolombia',
          fiatAndRailDetails: {
            type: 'cop',                      // pay out in Colombian pesos
            accountType: 'CHECKING',
            bankAccountNumber: '1234567890',
          },
        },
        recipientInfo: {
          type: 'individual',
          firstName: 'Javier',
          lastName: 'Gomez',
          email: 'javier@example.com',
        },
      },
    ],
  }),
});

const { id } = await res.json();             // status: AWAITING_EXECUTION

// Phase 2: execute to lock FX + send (client-custodial model)
await fetch(\`https://api.muralpay.com/api/payouts/payout/\${id}/execute\`, {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${MURAL_API_KEY}\`,
    'transfer-api-key': MURAL_TRANSFER_KEY,  // separate key gates fund movement
  },
});`,
      },
      buildNotes: [
        "Two-phase by design: creating a payout reserves nothing and the FX rate locks only at /execute — quotes can expire, so execute promptly or re-quote.",
        "Keep the transfer-api-key out of any read-only path; it's the only thing standing between a leaked Bearer key and moved money.",
        "Build against the Sandbox first — it auto-approves KYC and auto-completes payouts so you can test the full lifecycle without real settlement.",
        "Treat webhooks as the source of truth for payout state (AWAITING_EXECUTION → PENDING → EXECUTED/FAILED/CANCELED), not the synchronous create response.",
        "[verify against live docs — endpoint host (api. vs app.), exact 350-payout cap, and the full local-currency list evolve]",
      ],
    },
    deepDive: [
      {
        heading: "Payout flow & last-mile settlement",
        body:
          "A payout is two objects in sequence: a PayoutRequest you create, then an execution that commits it. This split exists because cross-border FX is time-sensitive — Mural quotes a rate but only locks it when you execute, so the platform isn't exposed to rate drift between request and send.",
        bullets: [
          "FIAT payouts settle to a recipient's local bank account (COP, MXN, BRL, ARS, etc.) — Mural converts the account's USDC/USDT to local currency and pushes it over domestic rails.",
          "BLOCKCHAIN payouts send stablecoins straight to a wallet on Ethereum/Polygon/Base/Celo.",
          "Status lifecycle: AWAITING_EXECUTION → PENDING → EXECUTED (or FAILED/CANCELED), surfaced via webhooks.",
          "Some corridors require supporting documents (invoices, contracts) attached to the payout for compliance.",
        ],
      },
      {
        heading: "Bulk-payout architecture",
        body:
          "The payouts[] array is the core scale primitive: one request can carry up to ~350 individual payouts, each with its own recipient, amount, currency, and rail. This collapses a contractor/vendor run into a single API call and a single execution.",
        bullets: [
          "Each line item is independently routed (different recipients, currencies, FIAT vs. BLOCKCHAIN) but shares one sourceAccountId.",
          "Per-recipient developer fees can be withheld automatically from each payout and remitted back to the platform — a built-in monetization hook.",
          "One execution step commits the whole batch, so the FX rate is locked across the run at execution time.",
        ],
      },
      {
        heading: "Compliance & custody (KYB/KYC)",
        body:
          "Compliance is a gate, not an afterthought: no Account exists until its Organization clears verification. Mural offers hosted KYC links so platforms can pass their end-users through without handling the documents themselves.",
        bullets: [
          "Individual KYC: name, DOB, address, government ID, tax ID. Business KYB: legal name, entity type, formation docs, tax ID, UBO documentation.",
          "Account auto-provisions only on approval — KYB/KYC is the prerequisite for both funding and payouts.",
          "Two custody models: client-custodial (Mural/platform holds keys, execute with transfer-api-key) vs. end-user-custodial (end-user key signs via the Browser SDK, backed by Turnkey).",
          "Operational guardrails: IP allowlists (CIDR), a separate transfer key for fund movement, and a full-parity Sandbox.",
        ],
      },
      {
        heading: "FX & emerging-market risk",
        body:
          "Mural's value is concentrated in the last mile of LatAm and other emerging-market corridors — exactly where it carries the most risk. The stablecoin leg is fast and global; the local-currency leg depends on banking partners and local liquidity that can be thin or volatile.",
        bullets: [
          "FX spread on stablecoin ⇄ local currency is the main revenue line, but local-currency volatility (ARS, COP) compresses or threatens margins.",
          "Last-mile reach depends on local banking partners per currency — a partner outage degrades a whole corridor.",
          "Regulatory regimes for money movement differ sharply by country, raising licensing and compliance cost as corridors expand.",
          "At a single $5.6M seed, Mural is earlier-stage than Bridge/BVNK; distribution and corridor depth, not the rail itself, are the battleground.",
        ],
      },
    ],
  },
  {
    slug: "conduit",
    name: "Conduit",
    url: "https://conduitpay.com/",
    layers: ["L3", "L2"],
    product:
      "One API + no-code treasury dashboard to move money across stablecoins, USD, and local currencies — cross-border B2B payments as a SWIFT alternative.",
    customer: "Import/export businesses, fintechs & enterprises in emerging markets",
    moat:
      "Deepest emerging-market last-mile (40+ countries in Africa via Onafriq; LatAm + Asia), 8 US banking partners, USDC issuer Circle as an investor.",
    region: "Emerging markets (LatAm, Africa, Asia)",
    status: "researched",
    tagline: "Cross-border B2B payments on stablecoin rails — an alternative to SWIFT.",
    whatItIs:
      "Conduit is a cross-border B2B payments network that blends stablecoins, USD, and local currencies behind a single API (plus a no-code treasury dashboard). It connects banks, local payment rails, and blockchains so businesses — especially import/export firms in Latin America, Africa, and Asia — can settle in minutes instead of days, at lower cost than correspondent banking. It raised a $36M Series A in May 2025 co-led by Dragonfly and Altos, with Circle Ventures among the backers.",
    howItWorks: [
      "A business funds a Conduit USD account (provisioned T+0 via API) with fiat or stablecoins (USDC/USDT/USDH).",
      "Stablecoin sandwich: Conduit converts the funding into a USD stablecoin as the cross-border settlement leg, then into the destination local currency.",
      "Last-mile payout lands via local rails — PIX (Brazil), SPEI (Mexico), SEPA Instant (EU), FedNow/RTP/Fedwire (US), plus mobile money and bank accounts across 40+ African countries via Onafriq.",
      "Built-in KYB/AML, sanctions screening, and transaction monitoring run on every flow; status is pushed back to integrators via webhooks.",
      "Finance teams can run the same flows manually through the no-code treasury dashboard instead of the API.",
    ],
    differentiators: [
      "Deepest last-mile reach in frontier corridors — Africa coverage (40+ countries via the Onafriq partnership, ~23 with local rails) that broad players lack.",
      "One API spans fiat rails (FedNow, Fedwire, SWIFT, SPEI, PIX, SEPA) AND stablecoins — not stablecoin-only.",
      "Circle (USDC issuer) is an investor; 8 US banking partners give redundant execution paths.",
      "Positioned explicitly as a SWIFT replacement for B2B trade, not a consumer remittance app.",
    ],
    businessModel: "FX spread on conversion + fees on transfer/payment volume; infrastructure fees for embedded USD accounts.",
    dependsOn: [
      "US banking partners (8) for fiat execution",
      "Local payout rails + partners (Onafriq for Africa; PIX/SPEI/SEPA networks)",
      "Stablecoin liquidity (USDC/USDT/USDH; Circle)",
      "Underlying blockchains for the settlement leg",
    ],
    risks: [
      "Regulatory + FX/liquidity volatility in frontier corridors (LatAm, Africa).",
      "Last-mile is partner-dependent (e.g. Onafriq) — concentration in key payout relationships.",
      "Competes with Bridge/Stripe, BVNK, and Sphere as orchestration and cross-border converge.",
      "[verify] money-transmitter / VASP licensing posture per market — not publicly detailed.",
    ],
    keyFacts: [
      { label: "Founded", value: "2021 (Boston & Montreal)" },
      { label: "Founders", value: "Kirill Gertman (co-founder/CEO; ex-Eco, Arival Bank)" },
      { label: "Funding", value: "$36M Series A, May 2025 (co-led Dragonfly + Altos; Circle Ventures, DCG, Sound, Commerce, Portage) — ~$53M total [verify]" },
      { label: "Volume", value: "Billions/yr; ~$10B+ annualized cited; saved clients 60,000+ settlement hours and $55M+ in fees [verify]" },
      { label: "Traction", value: "100+ clients, ~57 employees, 105% YoY client growth; African customers +80% Q3→Q4 2025 [verify]" },
      { label: "Corridors", value: "LatAm + Africa (40+ countries via Onafriq) + Asia; 100+ countries served" },
      { label: "Rails", value: "PIX, SPEI, SEPA Instant, FedNow, RTP, Fedwire, SWIFT, TED + USDC/USDT/USDH" },
      { label: "Layer", value: "Cross-border settlement (L3), with orchestration API (L2)" },
    ],
    links: [
      { label: "Site", url: "https://conduitpay.com/" },
      { label: "Send (cross-border B2B)", url: "https://conduitpay.com/send" },
      { label: "API docs", url: "https://docs.conduit.financial/" },
      { label: "Series A announcement", url: "https://conduitpay.com/blog/conduit-raises-36m-in-series-a" },
      { label: "Onafriq partnership", url: "https://finance.yahoo.com/news/conduit-onafriq-partner-enable-stablecoin-061532070.html" },
      { label: "Series A (Business Wire)", url: "https://www.businesswire.com/news/home/20250528156066/en/Conduit-Raises-$36-Million-Series-A-to-Scale-Use-of-Stablecoins-for-Cross-Border-Payments" },
    ],
    builder: {
      architecture:
        "Conduit sits between US banking partners, local payout rails/partners, and the chains. A platform integrates a single REST API; Conduit provisions USD accounts (T+0), runs KYB/AML + sanctions screening, sources stablecoin liquidity, executes the cross-border stablecoin leg, and pays out via the right local rail. A 'Clients/Subsidiaries' model lets a platform onboard its own business customers (sub-accounts) under its master account — so fintechs can embed Conduit and resell USD accounts + payouts. Transaction state is delivered via webhooks. A sandbox exposes simulation endpoints (compliance, KYB, deposit) so integrators can test flows without real money.",
      integration:
        "Server-side REST API authenticated with API credentials (keys), plus a no-code treasury dashboard for non-developers. Typical flow: onboard a customer/counterparty (KYB), attach a payment method, request a quote, then create a transaction; subscribe to webhooks for status. OpenAPI specs are published (openapi-external.yaml). Built to be 'AI-first'/agent-friendly per their docs.",
      apiSurface: [
        { name: "POST /accounts (Accounts)", desc: "Provision/get USD accounts and fetch deposit instructions (T+0 account creation via API). [verify exact path]" },
        { name: "POST /clients (Clients/Subsidiaries)", desc: "Create and manage sub-accounts for a platform's own business customers; list client accounts + deposit instructions." },
        { name: "POST /customers (Customers)", desc: "Create a customer, attach control persons, generate a KYB link, submit for onboarding, run liveness checks." },
        { name: "POST /counterparties (Counterparties)", desc: "Create/list payees (recipients), attach/remove payment methods and KYC/KYB documents." },
        { name: "POST /quotes (Quotes)", desc: "Create a quote — locks the FX rate/route for a cross-border conversion before executing." },
        { name: "POST /transactions (Transactions)", desc: "Create, get, and list transactions (the actual money movement / payout). Supports attaching supporting documents." },
        { name: "POST /webhooks (Webhooks)", desc: "Create/manage webhook subscriptions for transaction + compliance status events." },
        { name: "Simulations (Sandbox)", desc: "Simulate compliance, customer KYB, and deposits to test integrations end-to-end. [verify exact paths]" },
      ],
      snippet: {
        lang: "ts",
        caption: "Quote then execute a cross-border payout (USD funding → local-currency last-mile).",
        code: `const BASE = 'https://api.conduit.financial';
const headers = {
  'Authorization': \`Bearer \${CONDUIT_API_KEY}\`, // [verify auth scheme]
  'Content-Type': 'application/json',
};

// 1. Lock an FX rate / route for the corridor.
const quote = await fetch(\`\${BASE}/quotes\`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    source: { currency: 'USD', amount: '10000' },   // funded in USD / stablecoin
    destination: { currency: 'BRL' },               // pay out via PIX in Brazil
    counterpartyId: 'cp_123',
  }),
}).then((r) => r.json());

// 2. Execute the transfer against the quote; track via webhook.
const txn = await fetch(\`\${BASE}/transactions\`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    quoteId: quote.id,
    counterpartyId: 'cp_123',
    reference: 'invoice-2026-0042',
  }),
}).then((r) => r.json());

console.log(txn.id, txn.status); // poll, or rely on the webhook as source of truth`,
      },
      buildNotes: [
        "Treat the webhook (not the API response) as the source of truth for settlement status — last-mile payout can complete asynchronously.",
        "Quotes are time-bound: create a quote, then reference its id on the transaction so the FX rate is honored.",
        "Use the Clients/Subsidiaries model if you're a platform reselling USD accounts + payouts to your own business customers (vs. Customers/Counterparties for direct flows).",
        "[verify against docs.conduit.financial — exact endpoint paths, auth scheme, and request shapes; the OpenAPI spec (openapi-external.yaml) is the authoritative reference].",
      ],
    },
    deepDive: [
      {
        heading: "Corridor flow (the stablecoin sandwich, B2B edition)",
        body:
          "Conduit's core move is the classic three-leg conversion, but wired for business trade rather than consumer remittance and spanning both fiat and stablecoin rails on each side.",
        bullets: [
          "Fund: a business deposits into a Conduit USD account (provisioned T+0 via API) in fiat or stablecoins (USDC/USDT/USDH).",
          "Bridge: value crosses the border as a USD stablecoin — the fast, cheap settlement leg that bypasses SWIFT correspondent hops.",
          "Payout: Conduit converts into the destination local currency and disburses on the right local rail (PIX, SPEI, SEPA Instant, FedNow/RTP, or mobile money).",
          "Speed: instant rails (PIX/SPEI/SEPA Instant/FedNow) settle in seconds-to-minutes; SWIFT/Fedwire are offered as fallback (0–8h).",
          "Claimed impact: 60,000+ settlement hours and $55M+ in fees saved for clients. [verify]",
        ],
      },
      {
        heading: "Last-mile reach (Africa via Onafriq; LatAm rails)",
        body:
          "The defensible piece is payout reach in markets where banking rails are slow or thin. Conduit partners for last-mile rather than rebuilding each country.",
        bullets: [
          "Onafriq partnership connects USDC settlement to 40+ African countries' bank accounts AND mobile-money wallets, enabling same-day payouts into multiple markets.",
          "Onafriq also provides collections, card issuing/processing, agent banking, and FX/treasury — broadening Conduit's African footprint.",
          "LatAm: native instant rails PIX (Brazil) and SPEI (Mexico); Asia expansion underway.",
          "African customer count grew ~80% from Q3 to Q4 2025. [verify]",
        ],
      },
      {
        heading: "Treasury & embedded USD accounts",
        body:
          "Beyond one-off transfers, Conduit packages a treasury surface — both a no-code dashboard for finance teams and an embeddable 'Global USD API' for platforms.",
        bullets: [
          "Global USD API: fintechs/enterprises embed USD accounts + payment rails into their own products and resell to business customers via the Clients/Subsidiaries model.",
          "No-code treasury dashboard: finance teams move money across stablecoins/USD/local currencies without writing code.",
          "Virtual accounts in USD plus EUR/GBP for receiving; named pay-ins to bank accounts, IBANs, and wallets.",
          "[verify whether Conduit pays/passes through any yield on idle USD balances — not confirmed].",
        ],
      },
      {
        heading: "Compliance & risk",
        body:
          "As a regulated-money-movement layer in frontier corridors, compliance is core surface area, and the risk profile is FX/liquidity- and partner-driven.",
        bullets: [
          "Built-in KYB/AML, sanctions screening, and transaction monitoring; per-country support tiers (Supported / Enhanced Due Diligence / Not Supported) across 100+ countries.",
          "Sandbox simulations (compliance, KYB, deposit) let integrators test onboarding + screening paths.",
          "8 US banking partners provide redundant fiat execution; Circle backing aligns USDC liquidity.",
          "Key risks: emerging-market FX/liquidity volatility, last-mile partner concentration (e.g. Onafriq), and per-market licensing exposure [verify licensing posture].",
        ],
      },
    ],
  },
  {
    slug: "felix-pago",
    name: "Félix Pago",
    url: "https://www.felixpago.com/en",
    layers: ["L3", "L5"],
    product: "Stablecoin-funded remittances sent through an AI assistant inside WhatsApp.",
    customer: "US-based Latino immigrants sending money home to LatAm",
    moat:
      "Distribution via WhatsApp (no app to download) + a conversational AI agent, settled on USDC rails with dLocal/Bitso last-mile. ~$3B annualized volume; QED-backed.",
    region: "US → Mexico, Guatemala, Honduras, El Salvador, Dominican Republic (expanding)",
    status: "researched",
    tagline: "Remittances over WhatsApp, settled in stablecoins.",
    whatItIs:
      "Félix lets US-based Latino immigrants send money home through a chat with an AI assistant inside WhatsApp — no separate app, no website. The sender funds with a US card/bank; Félix converts the value to USDC and settles cross-border on stablecoin rails, then a local payout partner (dLocal / Bitso) pays out in local currency direct to a bank or cash pickup. Transfers land in minutes (~99% success) instead of next-day, and the stablecoin rail is completely invisible to the end user.",
    howItWorks: [
      "Sender messages Félix in WhatsApp; a conversational AI assistant (handling Spanish, slang, and voice notes) collects the amount, recipient, and payout method.",
      "Funding leg: the sender pays with a US card/bank, processed through Stripe (Payments + Connect for multi-party orchestration); KYC/AML runs on first use.",
      "Settlement leg: Félix converts the USD to USDC via Bridge/Circle liquidity and moves it cross-border on stablecoin rails — no correspondent banking, no SWIFT.",
      "Payout (last-mile) leg: dLocal (and earlier Bitso) off-ramps the USDC into local currency and pays the recipient direct-to-bank or cash pickup, typically in under two minutes.",
      "The recipient never touches crypto or an app — they just receive local-currency funds; the sender gets confirmation back in the same WhatsApp thread.",
    ],
    differentiators: [
      "Distribution via WhatsApp — meets users in the app they already live in, with zero download and a conversational (not form-based) UX.",
      "AI agent handles slang, cultural nuance, and voice messages — lowering friction for a demographic underserved by app-based incumbents.",
      "Stablecoin (USDC) settlement makes the cross-border leg near-instant and cheap, but stays invisible to sender and recipient.",
      "Minutes-not-days delivery with ~99% success and (per Stripe) ~90% card authorization — high for the remittance category.",
      "Vertically composed: Stripe funding + Bridge/Circle USDC + dLocal/Bitso payout, stitched into a single chat flow.",
    ],
    businessModel:
      "Transparent remittance fee per transfer + FX spread on the USD→local-currency conversion. New funding earmarked to add savings and credit products on top of the remittance base (cross-sell to an engaged user base).",
    dependsOn: [
      "WhatsApp / Meta (WhatsApp Business / Cloud API) — the entire distribution + UX surface",
      "An LLM / conversational-AI layer (intent, language, voice)",
      "Stripe (Payments + Connect) for the US funding leg",
      "USDC + Bridge / Circle for stablecoin liquidity and cross-border settlement",
      "dLocal (and Bitso) for regulated local-currency payout (last-mile)",
      "Money-transmitter licensing / partner sponsorship across corridors",
    ],
    risks: [
      "Platform dependence: the whole business rides on WhatsApp/Meta policy, API access, and pricing — a single point of distribution risk.",
      "Remittance + money-transmission regulation across many corridors; the multi-party compliance setup is operationally complex.",
      "Last-mile + FX concentration: leans heavily on dLocal for payout and on USDC/Bridge for the rail.",
      "Card-funding fraud and chargebacks on the inbound US leg.",
      "Crowded US→LatAm corridor (Remitly, Wise, MoneyGram, plus crypto-native rivals) — distribution and trust are the battleground, not the rail.",
    ],
    keyFacts: [
      { label: "Founded", value: "2021 — Manuel Godoy (CEO) & Bernardo Garcia (COO), Wharton MBAs; Miami / SF" },
      { label: "Series A", value: "$15.5M (May 2024) — Castle Island Ventures, HTwenty, others" },
      { label: "Series B", value: "$75M (Apr 2025) — led by QED Investors; Monashees, Switch Ventures, Castle Island, HTwenty, Endeavor/General Catalyst [verify exact syndicate]" },
      { label: "Volume", value: "~$3B annualized PV (2025, per Stripe); >$1B in the prior year; ~20% avg monthly tx growth, 12× revenue 2023→2024" },
      { label: "Corridors", value: "US → Mexico, Guatemala, Honduras, El Salvador, Dominican Republic; expanding to Colombia, Ecuador, Peru, Nicaragua" },
      { label: "Rail", value: "USDC settlement (Bridge/Circle) + dLocal / Bitso last-mile payout; Stripe funding" },
      { label: "Speed", value: "Payout typically <2 min, ~99% success; ~90% card auth (Stripe)" },
    ],
    links: [
      { label: "Site", url: "https://www.felixpago.com/en" },
      { label: "Stripe case study", url: "https://stripe.com/customers/felix" },
      { label: "Circle case study", url: "https://www.circle.com/case-studies/felix" },
      { label: "dLocal × Félix (press)", url: "https://www.dlocal.com/press-releases/dlocal-and-felix-launch-instant-stablecoin-funded-whatsapp-remittances-across-latin-america/" },
      { label: "Stellar × Bitso × Félix case study", url: "https://stellar.org/case-studies/felix-bitso" },
      { label: "Why QED invested", url: "https://www.qedinvestors.com/blog/why-we-invested-in-felix-pago" },
      { label: "Series B ($75M, Bloomberg)", url: "https://www.bloomberg.com/news/articles/2025-04-03/qed-leads-75-million-series-b-for-remittance-startup-felix-pago" },
    ],
    builder: {
      architecture:
        "Félix is a consumer remittance app with NO public developer API — what's interesting is how the stack is composed. The 'frontend' is WhatsApp itself: messages arrive via the WhatsApp Business / Cloud API as webhooks. An AI/agent layer (LLM-driven, multilingual, voice-capable) parses intent, runs KYC/onboarding, and quotes the transfer. Once confirmed, three back-end legs fire: (1) FUND — collect USD from the sender via Stripe (Payments + Connect for multi-party flows); (2) SETTLE — convert to USDC and move value cross-border via Bridge/Circle liquidity; (3) PAYOUT — call a last-mile partner (dLocal, formerly Bitso) to off-ramp USDC into local currency and disburse to the recipient's bank/cash point. State is tracked per transfer and pushed back to the user as WhatsApp messages. The hard parts are compliance orchestration (a multi-party MTL setup) and the conversational UX — not the rail itself.",
      integration:
        "To build something like this you compose three vendor APIs behind a chat agent: WhatsApp Cloud API (receive/send messages via webhooks), a payments API for funding (Stripe), and a stablecoin-payout API for settlement + last-mile (Bridge for USD↔USDC; dLocal/Bitso for local payout). The AI layer sits in the middle as an orchestrator: it maps free-form messages to a structured transfer object, then drives a state machine across the funding → settlement → payout legs, idempotently, with KYC gating before the first send.",
      apiSurface: [
        { name: "WhatsApp Cloud API — webhook", desc: "[verify] Inbound message events (text / voice / interactive replies) POSTed to your server; verify Meta's signature, then route to the agent." },
        { name: "WhatsApp Cloud API — /messages", desc: "[verify] Send replies, quotes, and confirmations back to the user (text + interactive buttons / templates)." },
        { name: "LLM / agent layer", desc: "[verify] Parse intent + entities (amount, recipient, payout method), handle Spanish/slang/voice; emit a structured transfer request." },
        { name: "Stripe Payments + Connect", desc: "[verify] Collect USD from the sender's card/bank; Connect orchestrates the multi-party money movement." },
        { name: "Bridge / Circle — USD↔USDC", desc: "[verify] Convert the funded USD to USDC and move value cross-border on stablecoin rails." },
        { name: "dLocal / Bitso — payout", desc: "[verify] Off-ramp USDC to local currency and disburse to the recipient's bank account or cash-pickup point." },
      ],
      snippet: {
        lang: "ts",
        caption:
          "Illustrative: a WhatsApp webhook → AI intent parse → kick off a USDC-funded transfer (vendor calls stubbed; not Félix's real code).",
        code: `// POST /webhooks/whatsapp — Meta delivers inbound messages here
export async function POST(req: Request) {
  const body = await req.json();
  const msg = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!msg) return new Response('ok'); // status/read receipts, etc.

  const from = msg.from;                 // sender's WhatsApp number
  const text = msg.text?.body ?? (await transcribe(msg.audio)); // voice notes too

  // 1) AI layer turns free-form chat into a structured transfer
  const intent = await agent.parse({ from, text });
  if (intent.type !== 'SEND_MONEY') return reply(from, intent.reply);

  // gate the first send on KYC
  if (!(await kyc.isVerified(from))) return reply(from, await kyc.startFlow(from));

  // 2) FUND: pull USD from the sender (Stripe)
  const charge = await stripe.charge({ user: from, amount: intent.usd });

  // 3) SETTLE: USD -> USDC, move cross-border (Bridge/Circle)
  const transfer = await bridge.send({
    sourceCharge: charge.id,
    asset: 'USDC',
    amount: intent.usd,
    destination: intent.corridor,        // e.g. 'MX', 'GT', 'HN'
  });

  // 4) PAYOUT: USDC -> local currency, last-mile (dLocal/Bitso)
  const payout = await dlocal.payout({
    transferId: transfer.id,
    beneficiary: intent.recipient,       // bank account / cash pickup
    country: intent.corridor,
  });

  // 5) confirm back in the same WhatsApp thread
  return reply(from, \`Sent! \${intent.recipient.name} gets it in ~2 min. Ref \${payout.id}\`);
}`,
      },
      buildNotes: [
        "Treat the payout webhook/state — not the chat — as the source of truth; the transfer is a state machine (FUNDED → SETTLING → PAID / FAILED) and every leg must be idempotent so a retried WhatsApp message doesn't double-send.",
        "KYC/AML must gate the first transfer, and the multi-party money-transmitter setup is the real moat-and-cost center — far more than the chatbot.",
        "WhatsApp Cloud API has template/24-hour-session messaging rules and per-message pricing; design conversational flows around them.",
        "[verify] Félix exposes no public API or SDK — this surface is the composed building-block stack (WhatsApp + Stripe + Bridge/Circle + dLocal/Bitso), not a Félix product.",
      ],
    },
    deepDive: [
      {
        heading: "WhatsApp distribution & conversational UX",
        body:
          "Félix's core insight is distribution, not crypto: its users already live in WhatsApp, so there's no app to download, account to create, or website to visit. The interface is a conversation with an AI assistant.",
        bullets: [
          "Built on the WhatsApp Business / Cloud API — messages in and out are webhooks + send calls.",
          "Conversational AI handles Spanish, regional slang, and voice notes — not a rigid form, which matters for a first-time-digital demographic.",
          "Zero-install, zero-website funnel removes the biggest drop-off in remittance onboarding.",
          "Single point of distribution risk: the business depends on Meta's API access, policy, and pricing.",
        ],
      },
      {
        heading: "Stablecoin settlement + last-mile payout",
        body:
          "Under the chat, Félix runs the classic 'stablecoin sandwich': USD → USDC → local currency. The sender funds in USD (Stripe), Félix settles the cross-border leg in USDC via Bridge/Circle, and a local partner pays out — making the rail invisible.",
        bullets: [
          "Funding: US card/bank via Stripe Payments + Connect (~90% card auth per Stripe).",
          "Settlement: USDC over stablecoin rails (Bridge — a Stripe company — and Circle) replaces correspondent banking/SWIFT.",
          "Last-mile: dLocal (current) and earlier Bitso/Stellar off-ramp USDC and disburse local currency, typically <2 min, ~99% success.",
          "Net result: minutes-not-days delivery at lower cost than the 6–13% legacy remittance fees Félix set out to undercut.",
        ],
      },
      {
        heading: "Compliance & remittance licensing",
        body:
          "Money transmission is the hard, regulated core. Moving consumer dollars across borders requires licensing/sponsorship in each jurisdiction, KYC/AML on senders, and cross-border reporting — orchestrated across multiple parties.",
        bullets: [
          "KYC/AML gates the first transfer; sanctions screening on each send.",
          "A 'complex multi-party setup' is used to satisfy money-transmitter rules (per Stripe) — the real cost/moat center.",
          "Payout partners (e.g. dLocal) operate under local regulation per market and handle in-country compliance + reporting.",
          "Corridor expansion (Colombia, Ecuador, Peru, Nicaragua) each adds a new regulatory surface.",
        ],
      },
      {
        heading: "Risk & competitive position",
        bullets: [
          "Platform risk: total dependence on WhatsApp/Meta for distribution and UX.",
          "Concentration: leans on dLocal for last-mile and USDC/Bridge for the rail.",
          "Fraud/chargebacks on card-funded inbound legs; FX volatility in LatAm corridors.",
          "Crowded corridor (Remitly, Wise, MoneyGram + crypto-native rivals) — moat is distribution + the engaged WhatsApp user base, into which Félix plans to cross-sell savings and credit.",
        ],
      },
    ],
  },
];
