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

export const LAYERS: Layer[] = [
  {
    id: "L1",
    title: "On / Off-ramps",
    blurb: "Fiat ⇄ crypto at the edge — card or bank into stablecoins.",
    what:
      "Ramps are the doors between the traditional banking system and the blockchain. An on-ramp turns a card payment or bank transfer into crypto/stablecoins; an off-ramp does the reverse. They handle KYC, payment acceptance, fraud, and the actual fiat settlement so the apps embedding them don't have to.",
    whereItSits:
      "The very edge of the flow — where a real person's money first becomes on-chain value, and where it leaves again.",
    competeOn:
      "Fees, conversion/approval rates, breadth of local payment methods (UPI, PIX, SEPA, ACH), country + chain coverage, and checkout UX.",
    tellApart:
      "Consumer-brand ramps (MoonPay) optimize for a recognizable purchase flow; developer-first ramps (Transak, Coinbase Onramp) optimize for white-label embedding and the widest local rails; aggregators route across several ramps for the best quote.",
    buildYourOwn: [
      "Payment acceptance: card acquiring (Visa/Mastercard) + local methods (ACH, SEPA, UPI, PIX) with strong fraud/3DS — this is the hardest, most regulated piece.",
      "Compliance: KYC/AML vendor, sanctions screening, and money-transmitter / VASP licensing per market (MTLs in the US, MiCA/CASP in the EU).",
      "Liquidity: market-maker or exchange relationships to source crypto at a quotable price, plus FX for local currencies.",
      "Settlement: custody/treasury to hold inventory + on-chain payout to the user's wallet (and the reverse for off-ramp).",
      "Frontend: an embeddable widget (iframe) + SDKs, a quote engine, and webhooks so partners can track order status.",
      "The moat is licenses + approval rates + local payment coverage — not the widget. Most builders instead embed an existing ramp (Ramp/MoonPay/Transak/Coinbase) rather than build this stack.",
    ],
  },
  {
    id: "L2",
    title: "Payment orchestration & APIs",
    blurb: "Accept, store, convert, pay out stablecoins via API. “Stripe for stablecoins.”",
    what:
      "The orchestration layer gives a business one API to accept, hold, convert, and pay out stablecoins — abstracting away wallets, chains, compliance, and banking partners. Some also let you issue your own stablecoin or issue cards.",
    whereItSits:
      "The middle of the stack — between the ramps at the edge and the end-user products on top. The 'plumbing' most fintechs build on.",
    competeOn:
      "Breadth of the API (accept/store/convert/payout/issue), licenses held, banking + chain coverage, reliability/SLAs, and pricing on volume.",
    tellApart:
      "Bridge optimizes for developer simplicity + issuance (and Stripe distribution); BVNK for enterprise SLAs and virtual accounts; Rain for card issuing specifically.",
  },
  {
    id: "L3",
    title: "Cross-border settlement",
    blurb: "Move value B2B across borders and settle in minutes.",
    what:
      "Cross-border players use stablecoins as the settlement rail to move money between countries far faster and cheaper than SWIFT. The classic pattern is the 'stablecoin sandwich': local currency → USD stablecoin → destination currency.",
    whereItSits:
      "Across borders — connecting a payer in one country to a payee in another, often in emerging-market corridors where banking rails are slow or expensive.",
    competeOn:
      "Corridors covered, settlement speed, FX spread, local payout reach (last-mile), licensing, and compliance.",
    tellApart:
      "Sphere/BVNK serve businesses with broad corridors; Conduit and Felix focus on specific emerging-market lanes; the moat is increasingly distribution + last-mile payout, not the rail itself.",
  },
  {
    id: "L4",
    title: "Synthetic dollars & yield",
    blurb: "Issue a yield-bearing dollar asset that others plug in.",
    what:
      "This layer manufactures the dollar itself — a tokenized, often yield-bearing dollar that other products (neo-banks, wallets) plug in. Yield comes from T-bills, lending, or derivatives basis trades.",
    whereItSits:
      "Underneath the consumer layer — the 'ingredient' a neo-bank embeds to offer savings, and the unit of account moving across the other layers.",
    competeOn:
      "Source + sustainability of yield, collateral quality, regulatory standing, redemption guarantees, and how composable the token is.",
    tellApart:
      "T-bill-backed dollars (Ondo, Mountain) earn the risk-free rate minus a fee; Ethena's USDe earns a derivatives funding rate (higher, but a different risk); Sky's USDS is the decentralized, DeFi-native lineage of DAI.",
  },
  {
    id: "L5",
    title: "Neo-banks",
    blurb: "Account + card + savings for end users — fiat-native or DeFi-native.",
    what:
      "The consumer face of the stack: an app with an account, a card, and savings. Fiat-native neo-banks (Revolut, Nubank) are adding stablecoin rails; DeFi-native ones (Ether.fi) start on-chain and add a card.",
    whereItSits:
      "The top of the stack — where end users actually hold, spend, and earn, sitting on top of everything below.",
    competeOn:
      "Distribution/users, licenses, yield offered, card + spend UX, and which lower-layer rails they plug in.",
    tellApart:
      "Fiat-native banks bring scale and licenses and bolt on stablecoins; DeFi-native banks bring native yield and self-custody and bolt on a card. The endgame for both is the same super-app.",
  },
];

export const PROJECTS: Project[] = [
  // ----------------------------- L2 -----------------------------
  {
    slug: "bridge",
    name: "Bridge",
    url: "https://www.bridge.xyz/",
    layers: ["L2"],
    product:
      "API to move / store / accept / pay out stablecoins, issue your own stablecoin (Open Issuance / USDB), and provision Visa cards.",
    customer: "Developers, fintechs & platforms",
    moat:
      "Owned by Stripe ($1.1B acquisition). Issuance + T-bill yield share, USDB, Visa card rails, and an OCC-chartered trust bank in flight.",
    region: "Global (100+ countries)",
    status: "researched",
    tagline: "Stripe for stablecoins.",
    whatItIs:
      "Bridge is a stablecoin orchestration API. With a few lines of code a developer can move, store, accept, and pay out stablecoins across crypto and fiat rails, custody funds in wallets, issue their own stablecoin, or provision Visa cards — Bridge abstracts the chains, banking partners, and compliance underneath. Stripe acquired it in February 2025 for ~$1.1B, its largest deal ever, and now uses Bridge to power Stripe's own stablecoin Financial Accounts.",
    howItWorks: [
      "Orchestration / Transfers: a single REST API moves stablecoins between crypto and fiat rails (ACH, SEPA, wire) while Bridge abstracts chains, KYC, and banking partners.",
      "Virtual + liquidation addresses: customers get bank-account or on-chain deposit details that auto-convert and route incoming funds to a destination (e.g. fiat in → USDC out, or crypto in → fiat payout).",
      "Issuance: spin up a custom stablecoin via Open Issuance, or use Bridge's own USDB; reserves sit in cash + short-duration money-market funds and short-term Treasuries (BlackRock, Fidelity, Superstate), and the majority of the reserve yield is shared back as a developer fee.",
      "Cards: provision Visa cards that draw down a stablecoin balance and settle to merchants in local fiat at 150M+ Visa locations.",
      "Distribution: surfaced through Stripe's stack — Stripe's Financial Accounts hold USDC and Bridge's USDB across 100+ countries.",
    ],
    differentiators: [
      "Owned by Stripe — instant distribution to Stripe's merchant base and trust most rivals can't match.",
      "Issuance + reserve-yield share (USDB / Open Issuance) turns the stablecoin itself into a revenue line, not just plumbing.",
      "End-to-end surface: transfers, virtual/liquidation addresses, wallets, issuance, and Visa card provisioning behind one API.",
      "Regulatory ambition: pursuing an OCC national trust bank charter to issue stablecoins and custody reserves under direct federal oversight.",
    ],
    businessModel:
      "Fees on transfer/conversion volume + developer fees on transfers, plus a share of reserve (T-bill / money-market) yield on issued stablecoins (USDB and Open Issuance tokens); card interchange on the Visa product.",
    dependsOn: [
      "Stripe (parent + distribution)",
      "Banking partners (e.g. Lead Bank)",
      "Reserve managers / custodians (BlackRock, Fidelity, Superstate)",
      "Visa (card issuing)",
      "Stablecoin liquidity (Circle USDC / Tether USDT)",
      "Underlying chains (Ethereum, Solana, Base, Polygon, Tron, etc.) [verify exact chain list]",
    ],
    risks: [
      "Regulatory exposure as a bank-adjacent stablecoin issuer (GENIUS Act regime; OCC charter still only conditionally approved).",
      "Reserve-yield revenue is rate-sensitive — Fed rate cuts compress the T-bill yield that funds developer rewards.",
      "Concentration: deeply tied to Stripe's strategy and roadmap post-acquisition.",
      "Competes with Circle, BVNK, and Stripe-adjacent rails even while inside Stripe.",
    ],
    keyFacts: [
      { label: "Founded", value: "2022 (San Antonio / SF) — Zach Abrams, Sean Yu (ex-Coinbase / Square Cash App)" },
      { label: "Pre-acquisition funding", value: "~$58M (Haun Ventures, Sequoia, Ribbit, Index)" },
      { label: "Owned by", value: "Stripe — ~$1.1B acquisition, closed Feb 4, 2025 (Stripe's largest)" },
      { label: "USDB", value: "1:1-backed infra stablecoin; reserves at BlackRock; majority of reserve yield shared with developers" },
      { label: "Open Issuance", value: "Launched Sept 2025 — any business mints a custom stablecoin; reserves via BlackRock, Fidelity, Superstate" },
      { label: "Stripe Financial Accounts", value: "Holds USDC + USDB across 100+ countries (launched May 20, 2025)" },
      { label: "Visa cards", value: "Stablecoin-linked Visa cards launched LatAm (Apr 2025); expanding to 100+ countries by end of 2026" },
      { label: "OCC charter", value: "Conditional approval for a national trust bank (Feb 2026) [verify final approval]" },
      { label: "Notable users", value: "SpaceX/Starlink (Argentina FX repatriation), consumers in emerging markets" },
    ],
    links: [
      { label: "Site", url: "https://www.bridge.xyz/" },
      { label: "API docs", url: "https://apidocs.bridge.xyz/" },
      { label: "Issuance product", url: "https://www.bridge.xyz/product/issuance" },
      { label: "USDB", url: "https://www.bridge.xyz/news/usdb" },
      { label: "Open Issuance announcement", url: "https://www.bridge.xyz/blog/introducing-open-issuance" },
      { label: "Stripe acquisition", url: "https://stripe.com/newsroom/news/stripe-completes-bridge-acquisition" },
      { label: "Visa card partnership", url: "https://stripe.com/newsroom/news/bridge-partners-with-visa" },
      { label: "Stripe stablecoin Financial Accounts", url: "https://docs.stripe.com/crypto/stablecoin-financial-accounts" },
      { label: "OCC conditional approval", url: "https://www.bridge.xyz/blog/bridge-receives-occ-conditional-approval-to-organize-a-federally-chartered-national-trust-bank" },
    ],
    builder: {
      architecture:
        "Bridge sits between the chains and the banking system as a single orchestration API. The core objects are Customers (which carry KYC state), Transfers (a source → destination money movement), and the deposit primitives that make money move automatically: Virtual Accounts (fiat bank details that convert incoming fiat to stablecoin) and Liquidation Addresses (on-chain addresses that auto-convert and route incoming crypto to a fiat or crypto destination). External Accounts hold a customer's payout bank details; Bridge Wallets custody balances; Developer Fees let the integrator skim a fee on each transfer; and Cards provision Visa cards that draw down a stablecoin balance. State changes are delivered via Webhooks. All calls authenticate with a server-side Api-Key header and use an Idempotency-Key to make POSTs safe to retry.",
      integration:
        "Server-to-server REST. Onboard a Customer and clear KYC (hosted KYC Links or direct submission), attach an External Account for fiat payout, then either create one-off Transfers or stand up a Virtual Account / Liquidation Address so funds convert and route automatically. Configure Developer Fees once to monetize volume, and subscribe a Webhook endpoint to track Customer/KYC, transfer, and card events. Cursor-based pagination on all list endpoints.",
      apiSurface: [
        { name: "POST /customers + POST /kyc-links", desc: "Create a customer and generate a hosted KYC link; KYC/AML and sanctions screening clear before money can move." },
        { name: "POST /transfers", desc: "Move money source → destination across crypto + fiat rails (e.g. fiat in → USDC out); specify amount, currency, and on/off-ramp details." },
        { name: "POST /virtual-accounts", desc: "Issue per-customer fiat bank details (ACH/SEPA/wire); incoming fiat auto-converts to a stablecoin and lands at the destination." },
        { name: "POST /liquidation-addresses", desc: "Create an on-chain address that auto-converts incoming crypto and routes it to a fiat external account or another address." },
        { name: "POST /external-accounts", desc: "Register a customer's destination bank account for fiat payouts; reusable across transfers." },
        { name: "PUT /developers/fees", desc: "Configure the developer fee taken on transfers; paired with POST /developers/fee-external-account for payout." },
        { name: "POST /card-accounts + POST /webhooks", desc: "Provision a Visa card that spends from a stablecoin balance; subscribe webhooks for transfer, KYC, and card events." },
      ],
      snippet: {
        lang: "ts",
        caption: "Create a liquidation address that auto-converts incoming USDC to USD and pays out to a bank account.",
        code: `const BRIDGE_API = 'https://api.bridge.xyz/v0';

async function createLiquidationAddress(customerId: string, externalAccountId: string) {
  const res = await fetch(\`\${BRIDGE_API}/customers/\${customerId}/liquidation_addresses\`, {
    method: 'POST',
    headers: {
      'Api-Key': process.env.BRIDGE_API_KEY!,        // server-side only
      'Idempotency-Key': crypto.randomUUID(),         // safe to retry
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chain: 'ethereum',
      currency: 'usdc',
      // incoming USDC is converted and paid out as USD via ACH
      destination_payment_rail: 'ach',
      destination_currency: 'usd',
      external_account_id: externalAccountId,
    }),
  });

  if (!res.ok) throw new Error(\`Bridge error \${res.status}: \${await res.text()}\`);
  return res.json(); // -> { id, address, chain, currency, ... }
}`,
      },
      buildNotes: [
        "Treat webhooks (not the API response) as the source of truth for transfer + KYC state; verify the signature and make handlers idempotent.",
        "A Customer must reach an approved KYC state before transfers settle — gate money movement on the KYC webhook.",
        "Liquidation addresses and virtual accounts are the 'set-and-forget' primitives: stand one up per customer and money routes automatically without per-payment API calls.",
        "[verify exact base URL/version, path casing (snake_case vs hyphen), and supported chains/rails against the live apidocs.bridge.xyz — these evolve].",
      ],
    },
    products: [
      {
        name: "Orchestration / Transfers",
        tagline: "Move, store, and accept stablecoins via one API.",
        whatItIs:
          "The core money-movement layer. Developers create Transfers and stand up Virtual Accounts and Liquidation Addresses so funds convert and route automatically across crypto and fiat rails — Bridge abstracts the chains, KYC, and banking partners. This is the rail that powers payouts, on/off-ramps, and treasury flows.",
        mechanics: [
          "Customers clear KYC, then transfers move money source → destination (fiat ⇄ stablecoin ⇄ fiat).",
          "Virtual Accounts: per-customer fiat bank details that auto-convert incoming fiat to a stablecoin.",
          "Liquidation Addresses: on-chain addresses that auto-convert incoming crypto and pay out to fiat or another address.",
          "Developer Fees let the integrator monetize a slice of each transfer.",
        ],
        stats: [
          { label: "Rails", value: "ACH, SEPA, wire + on-chain (multi-chain)" },
          { label: "Auth", value: "Api-Key (server-side) + Idempotency-Key" },
        ],
      },
      {
        name: "Issuance (USDB / Open Issuance)",
        tagline: "Launch your own stablecoin — and earn the reserve yield.",
        whatItIs:
          "Bridge lets any business mint a custom, fully-reserved stablecoin in a few lines of code (Open Issuance, Sept 2025), or use Bridge's own USDB. Reserves sit 1:1 in cash, short-duration money-market funds, and short-term Treasuries; unlike legacy issuers that keep the float, Bridge shares the majority of reserve yield back with developers and end users.",
        mechanics: [
          "USDB: 1:1-backed infra stablecoin, reserves at BlackRock; free conversion to/from USDC; on/off-chain validations, whitelisting, freeze/burn controls.",
          "Open Issuance: custom-branded stablecoin with reserves managed by BlackRock, Fidelity, and Superstate.",
          "Reserves invested in US Treasuries / money-market funds earning ~3–4%; majority paid out as a developer fee.",
          "Earn rewards simply by switching from other stablecoins into USDB via Bridge APIs.",
        ],
        stats: [
          { label: "USDB backing", value: "1:1 cash + short-duration MMFs (BlackRock)" },
          { label: "Reserve yield", value: "~3–4%, majority shared with developers" },
          { label: "Open Issuance", value: "Launched Sept 2025; custodians BlackRock / Fidelity / Superstate" },
        ],
      },
      {
        name: "Stablecoin Financial Accounts & Cards",
        tagline: "Hold stablecoins in Stripe; spend them on Visa.",
        whatItIs:
          "Bridge powers Stripe's stablecoin Financial Accounts — businesses hold USDC or USDB balances inside Stripe, fund them over crypto and fiat rails, and send stablecoins worldwide. The Visa card product lets partners provision cards that draw down a stablecoin balance and settle to merchants in local fiat.",
        mechanics: [
          "Financial Accounts hold USDC + USDB, receive via ACH/SEPA + crypto, and send stablecoins globally.",
          "On a card swipe, Bridge deducts the stablecoin balance and converts to fiat so the merchant is paid locally.",
          "Usable at 150M+ Visa-accepting merchant locations.",
          "Card provisioning via the /card-accounts API (freeze/unfreeze, transactions, authorizations).",
        ],
        stats: [
          { label: "Financial Accounts", value: "100+ countries (launched May 20, 2025)" },
          { label: "Card launch", value: "LatAm Apr 2025; 100+ countries targeted by end-2026" },
          { label: "Supported coins", value: "USDC + USDB (more planned)" },
        ],
      },
    ],
    deepDive: [
      {
        heading: "API architecture: customers, transfers, and auto-routing primitives",
        body:
          "Bridge's API reduces stablecoin movement to a small set of composable objects so a fintech never touches chains or wallets directly.",
        bullets: [
          "Customer carries KYC/AML state; nothing settles until the customer is approved.",
          "Transfer is a one-off source → destination movement across crypto + fiat rails.",
          "Virtual Account = fiat bank details that auto-convert incoming fiat to stablecoin; Liquidation Address = on-chain address that auto-converts incoming crypto to a fiat/crypto destination.",
          "External Account holds payout bank details; Bridge Wallets custody balances; Developer Fees monetize volume.",
          "Webhooks deliver state changes — the integrator treats them, not the HTTP response, as the source of truth.",
        ],
      },
      {
        heading: "Issuance economics: reserves, T-bill yield, and the developer share",
        body:
          "The strategic shift is who keeps the float. Legacy issuers (Circle, Tether) pocket the yield on reserves; Bridge inverts this to win developers.",
        bullets: [
          "USDB / Open Issuance tokens are 1:1-backed by cash, money-market funds, and short-term US Treasuries.",
          "Reserves earn the short-term rate (~3–4%); Bridge shares the MAJORITY of that yield back as a developer fee.",
          "This makes the stablecoin a revenue line for the integrator — a structural lever Circle/Tether don't offer at the API layer.",
          "Rate risk: the model's economics compress directly with Fed rate cuts.",
          "Reserve managers/custodians: BlackRock (USDB), plus Fidelity and Superstate for Open Issuance.",
        ],
      },
      {
        heading: "Stripe distribution: from API to default rail",
        body:
          "The ~$1.1B acquisition (closed Feb 4, 2025, Stripe's largest) is fundamentally a distribution play — Bridge gets Stripe's merchant base; Stripe gets a stablecoin backbone.",
        bullets: [
          "Stripe's stablecoin Financial Accounts (launched May 20, 2025, 100+ countries) hold USDC and Bridge's USDB.",
          "Bridge + Visa stablecoin-linked cards launched in LatAm (Apr 2025) and target 100+ countries by end of 2026.",
          "Stablecoins moved ~$15.6T in 2024 (on par with Visa); B2B stablecoin payments hit ~$226B in 2025 — the TAM behind the bet.",
          "Concentration risk cuts both ways: Bridge's roadmap is now Stripe's roadmap.",
        ],
      },
      {
        heading: "Compliance & regulatory posture",
        body:
          "As a bank-adjacent issuer, Bridge's moat increasingly is its regulatory standing under the new US stablecoin regime.",
        bullets: [
          "Banking partner Lead Bank backs the card / fiat rails; KYC/AML and sanctions screening are built into the Customer object.",
          "Received OCC conditional approval to organize a federally-chartered national trust bank (Feb 2026) — would let it issue stablecoins and custody reserves under direct OCC oversight. [verify final approval]",
          "USDB ships with on-chain + off-chain validations, whitelisting, and freeze/burn controls for sanctions compliance.",
          "Operates under the emerging GENIUS Act framework for US payment stablecoins. [verify current status]",
        ],
      },
    ],
  },
  {
    slug: "bvnk",
    name: "BVNK",
    url: "https://bvnk.com/",
    layers: ["L2", "L3"],
    product:
      "Enterprise stablecoin payments: payins/payouts, virtual accounts, embedded wallets, and Layer1 self-custody settlement infrastructure.",
    customer: "Enterprises, fintechs, marketplaces, PSPs",
    moat:
      "Mastercard-acquired (~$1.8B, Mar 2026). ~$30B annualized volume, Visa Direct partnership, 25+ licenses (US MTLs, EU/UK EMI, MiCA CASP).",
    region: "EU + UK + US (130+ countries payout)",
    status: "researched",
    tagline: "Enterprise-grade stablecoin payment infrastructure — now Mastercard's on-chain rail.",
    whatItIs:
      "BVNK is a stablecoin payments platform for enterprises, fintechs, and marketplaces. It gives a business one API to accept (payin), hold, convert, and pay out (payout) money across fiat and stablecoins, plus virtual accounts in GBP/EUR and embedded wallets. Its Layer1 product lets large enterprises run a self-custody stablecoin stack in-house. BVNK is the pick when SLAs, named virtual accounts, and broad licensing matter more than raw chain coverage — and in March 2026 Mastercard agreed to acquire it for up to $1.8B, the largest stablecoin deal to date.",
    howItWorks: [
      "Payments API: create a payin or payout (type IN/OUT) via the merchant API; BVNK quotes FX, settles across stablecoin networks and bank rails, and pays out in local currency.",
      "Channels: a reusable crypto address/route an end user can repeatedly pay into, with per-customer compliance metadata attached.",
      "Virtual accounts: named GBP/EUR IBAN-style accounts connected to major payment schemes for fiat payin/payout.",
      "Embedded wallets: white-label, per-end-user wallets that move between USD/EUR/GBP and stablecoins inside the partner's product (BVNK custodies).",
      "Layer1: self-custody infrastructure so an enterprise runs its own wallets, keys, reconciliation, and routing — BVNK is not in the flow of funds.",
      "Webhooks push status changes (payment, channel, crypto, customer, ledger) signed with HMAC-SHA256 so the partner treats them as source of truth.",
      "Visa Direct partnership lets enterprises pre-fund in stablecoins and send payouts to recipient wallets across Visa's network.",
    ],
    differentiators: [
      "Enterprise SLAs + named virtual accounts + embedded wallets vs. developer-only APIs.",
      "Layer1 self-custody: enterprises keep their own keys and data — a different posture from custodial rivals (Bridge, Zero Hash).",
      "Deep licensing: 25+ authorizations incl. US MSB + state MTLs, UK & Malta EMI, VASP, and a Malta MiCA CASP licence (Feb 2026) it passports across the EU.",
      "Distribution: Visa Direct partnership and Visa Ventures + Citi Ventures backing, then a Mastercard acquisition for up to $1.8B.",
    ],
    businessModel:
      "Processing fees on payment volume + FX spread on conversion; SaaS/platform fees for Layer1 self-custody infrastructure and embedded wallets.",
    dependsOn: [
      "Banking partners (fiat payin/payout, virtual accounts)",
      "Card networks (Visa Direct; now Mastercard parent)",
      "Stablecoin issuers (USDC/USDT/EURC) + underlying chains",
      "Compliance vendors (e.g. Elliptic risk intelligence on Layer1)",
    ],
    risks: [
      "Enterprise sales cycles are long; growth tied to large-customer wins.",
      "Integration + strategic risk from the pending Mastercard acquisition (up to $1.8B, ~$300M contingent, expected to close 2026).",
      "Competes directly with Bridge/Stripe and Zero Hash on distribution.",
      "Regulatory exposure as a multi-jurisdiction money transmitter / EMI / CASP.",
    ],
    keyFacts: [
      { label: "Founded", value: "2021 (London) — Jesse Hemson-Struthers (CEO), Chris Harmse, Donald Jackson (ex-Coindirect)" },
      { label: "Acquisition", value: "Mastercard, up to $1.8B (~$300M contingent), announced Mar 2026 — largest stablecoin deal to date" },
      { label: "Prior valuation", value: "~$750M (pre-Oct 2025); raised above that after Citi Ventures stake" },
      { label: "Funding", value: "$50M Series B (Haun Ventures; Tiger Global, Coinbase Ventures) + Visa Ventures (May 2025) + Citi Ventures (Oct 2025)" },
      { label: "Volume", value: "~$30B annualized at acquisition (from ~$10B Dec 2024 → ~$20B Oct 2025)" },
      { label: "Licenses", value: "25+ authorizations: US MSB + state MTLs (NMLS 2531294), UK & Malta EMI, VASP, Malta MiCA CASP (Feb 2026)" },
      { label: "Reach", value: "130+ countries for send/receive across major chains" },
      { label: "Partners", value: "Visa (Visa Direct stablecoin payouts); now Mastercard (parent)" },
    ],
    links: [
      { label: "Site", url: "https://bvnk.com/" },
      { label: "Payments", url: "https://bvnk.com/payments" },
      { label: "Embedded Wallets", url: "https://bvnk.com/embedded-wallets" },
      { label: "Layer1", url: "https://bvnk.com/blog/layer-1" },
      { label: "API docs", url: "https://docs.bvnk.com/" },
      { label: "API reference", url: "https://docs.bvnk.com/reference/overview" },
      { label: "Webhooks", url: "https://docs.bvnk.com/docs/listening-for-payment-webhooks" },
      { label: "Mastercard acquisition", url: "https://www.mastercard.com/us/en/news-and-trends/press/2026/march/Mastercard-to-acquire-BVNK-to-connect-on-chain-payments-and-fiat-rails.html" },
      { label: "Visa Direct partnership", url: "https://bvnk.com/blog/bvnk-powers-stablecoin-payments-for-visa-direct" },
    ],
    builder: {
      architecture:
        "BVNK sits between bank rails (for fiat payin/payout and virtual accounts) and stablecoin chains, exposing one RESTful merchant API over HTTPS with JSON. Core primitives are the Payment (an IN or OUT object with a quoted FX rate and an expiry), the Channel (a reusable address/route an end user can pay into repeatedly), and the Wallet (fiat + stablecoin balances). For custodial products BVNK holds keys and is in the flow of funds; for Layer1, the enterprise self-custodies and BVNK only provides orchestration. State changes are delivered via signed webhooks, which are the source of truth — the client/redirect is not.",
      integration:
        "Authenticate with Hawk auth (an API key ID + secret you generate in the Merchant Portal) over a sandbox (api.sandbox.bvnk.com) then production base URL. Two main collection patterns: hosted — create a payment and redirect the customer to BVNK's returned redirectUrl to finish; or merchant-hosted — quote currencies/protocols yourself and supply payout details so funds route with no redirect. Reusable inbound flows use Channels. Verify every webhook's x-signature (HMAC-SHA256 over the raw JSON body) before acting.",
      apiSurface: [
        { name: "POST /api/v1/pay/summary", desc: "Create a payment summary — an incoming (IN) or outgoing (OUT) crypto payment with a quoted rate; returns a redirectUrl unless payout details are supplied inline." },
        { name: "PUT /api/v1/pay/{uuid}/update/summary", desc: "Select the pay currency/protocol on an existing payment summary to lock the quote. [verify exact path]" },
        { name: "GET /api/v1/pay/{uuid}", desc: "Read a payment's current status and details (poll fallback to webhooks)." },
        { name: "POST /api/v2/channel", desc: "Create a Channel — a reusable address/route end users pay into, with payCurrency, displayCurrency, reference, customerId, and compliance/originator details." },
        { name: "GET /api/v2/channel/{id}", desc: "Read a channel and its associated payments (channelPaymentRead)." },
        { name: "POST payout (fiat/crypto)", desc: "Create a payout to a bank account (EUR/GBP) or wallet/address; settles from your merchant balance or wallet." },
        { name: "Webhooks (x-signature, HMAC-SHA256)", desc: "Subscribe to payment, channel, crypto, customer, and ledger status events; verify signature over the raw payload." },
      ],
      snippet: {
        lang: "ts",
        caption: "Create a crypto payin via the merchant API, then verify the status webhook (Hawk auth + HMAC-SHA256).",
        code: `import crypto from 'node:crypto';

// 1) Create an incoming payment (hosted flow returns a redirectUrl).
const res = await fetch('https://api.sandbox.bvnk.com/api/v1/pay/summary', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Hawk auth header derived from your API key id + secret:
    Authorization: hawkHeader(BVNK_KEY_ID, BVNK_SECRET, 'POST', '/api/v1/pay/summary'),
  },
  body: JSON.stringify({
    merchantId: BVNK_MERCHANT_ID,
    type: 'IN',
    displayCurrency: { currency: 'EUR' },
    walletCurrency: 'USDC',
    reference: 'order-123',
  }),
});
const payment = await res.json();
// Redirect the customer to payment.redirectUrl to complete the pay-in.

// 2) Webhook handler — treat the webhook, NOT the redirect, as source of truth.
function handleWebhook(rawBody: string, headers: Record<string, string>) {
  const expected = crypto
    .createHmac('sha256', BVNK_WEBHOOK_SECRET)
    .update(rawBody) // raw JSON, unparsed
    .digest('hex');
  if (headers['x-signature'] !== expected) throw new Error('bad signature');
  const event = JSON.parse(rawBody); // { status: 'COMPLETE' | 'EXPIRED' | ... }
  // reconcile order-123 against event.status
}`,
      },
      buildNotes: [
        "Hawk auth signs each request with your key id + secret; quotes on a payment expire, so lock the pay currency/protocol promptly and handle EXPIRED.",
        "Always build against the sandbox base URL first; switch host + keys for production.",
        "Webhook signature is HMAC-SHA256 over the raw, unparsed body — verify before JSON.parse, and idempotently reconcile by your own reference.",
        "[verify exact endpoint paths, versions (v1 pay vs v2 channel), and field names against the live docs.bvnk.com reference.]",
      ],
    },
    products: [
      {
        name: "Payments (Payins & Payouts)",
        tagline: "One API to accept, convert, and pay out across fiat and stablecoins.",
        whatItIs:
          "The core merchant product: accept incoming payments (fiat payin to a virtual account, or crypto via a payment/channel), convert with a quoted FX rate, and pay out to a bank account (EUR/GBP) or a wallet/address. Reusable Channels handle repeat inbound flows; hosted and merchant-hosted integration patterns are both supported.",
        mechanics: [
          "Payin: fiat to named GBP/EUR virtual accounts, or crypto via a payment summary / channel.",
          "Convert: BVNK quotes an FX rate (with expiry) between fiat and stablecoins.",
          "Payout: to bank accounts (EUR/GBP) or to wallets/addresses across major chains, in 130+ countries.",
          "Status delivered by signed webhooks; hosted flow returns a redirectUrl, merchant-hosted routes inline.",
        ],
        stats: [
          { label: "Volume", value: "~$30B annualized (at acquisition)" },
          { label: "Reach", value: "130+ countries; major chains" },
        ],
      },
      {
        name: "Embedded Wallets",
        tagline: "White-label, per-user wallets unifying fiat and stablecoins.",
        whatItIs:
          "Full-stack embedded wallets (launched as part of Layer1, Mar 2025) that let a platform's end users hold and move between USD/EUR/GBP and stablecoins inside the partner's own product. Programmable, white-labelable, and mapped per end-user, with custody, payment, liquidity, and compliance handled by BVNK.",
        mechanics: [
          "Per-end-user wallets mapped inside the partner platform.",
          "Move between USD/EUR/GBP and stablecoins; programmable + white-label.",
          "BVNK provides custody, liquidity, and compliance underneath.",
          "BVNK claims the first embedded wallet 'unifying fiat and stablecoins'.",
        ],
        stats: [{ label: "Launched", value: "Mar 2025" }],
      },
      {
        name: "Layer1 (Self-Custody Settlement Infrastructure)",
        tagline: "Run your own stablecoin payments network in-house.",
        whatItIs:
          "A self-hosted, self-custody infrastructure product so an enterprise runs its own stablecoin stack — wallets, keys, integrations, and reconciliation — under direct control. BVNK is not in the flow of funds; it provides a modular, payments-first orchestration engine (omnibus wallets, automated consolidation, multi-venue trading, treasury) plus Smart Treasury for AI-driven, real-time liquidity management.",
        mechanics: [
          "Enterprise self-custodies keys and owns its data; BVNK only orchestrates.",
          "Automates wallet creation, reconciliation, asset management, and third-party integrations.",
          "Smart Treasury: AI-powered, 24/7 liquidity routing across chains, wallets, and venues.",
          "Risk intelligence powered by Elliptic for compliant settlement at scale.",
        ],
        stats: [{ label: "Launched", value: "Layer1, 2025" }],
      },
    ],
    deepDive: [
      {
        heading: "Architecture: payments, channels & virtual accounts",
        body:
          "BVNK bridges bank rails and stablecoin chains behind one RESTful merchant API (JSON over HTTPS, Hawk auth). The primitives compose into payin/payout flows.",
        bullets: [
          "Payment: an IN or OUT object carrying a quoted FX rate and an expiry; hosted flow returns a redirectUrl, merchant-hosted routes inline with payout details.",
          "Channel: a reusable address/route an end user pays into repeatedly, tagged with per-customer compliance/originator metadata (api/v2/channel).",
          "Virtual accounts: named GBP/EUR accounts wired to major payment schemes for fiat payin/payout.",
          "Webhooks (x-signature, HMAC-SHA256) are the source of truth for status — payment, channel, crypto, customer, ledger events.",
        ],
      },
      {
        heading: "Layer1 & the self-custody settlement model",
        body:
          "Layer1 inverts the usual custodial model: instead of BVNK holding funds, the enterprise runs its own stablecoin network and BVNK provides orchestration only — so BVNK is explicitly not in the flow of funds.",
        bullets: [
          "Enterprise controls wallets, keys, integrations, reconciliation, and data.",
          "Modular, payments-first orchestration: omnibus wallets, automated consolidation, multi-venue trading, Digital Asset Engine.",
          "Smart Treasury adds predictive, AI-powered, 24/7 liquidity management across chains/wallets/venues.",
          "Elliptic supplies risk intelligence to keep self-managed settlement compliant.",
        ],
      },
      {
        heading: "Visa Direct partnership & the Mastercard acquisition",
        body:
          "BVNK moved from card-network partner to card-network asset within roughly a year — a signal of how strategic stablecoin rails became to the networks.",
        bullets: [
          "Visa Ventures invested in BVNK (May 2025); BVNK then powers stablecoin payouts for Visa Direct pilots (enterprises pre-fund in stablecoins, recipients get wallet payouts).",
          "Citi Ventures took a stake (Oct 2025), pushing valuation above the prior ~$750M.",
          "Coinbase reportedly neared a ~$2B acquisition before talks ended around Nov 2025.",
          "Mastercard agreed to acquire BVNK for up to $1.8B (~$300M contingent), announced Mar 2026 — the largest stablecoin deal to date, eclipsing Stripe/Bridge ($1.1B).",
        ],
      },
      {
        heading: "Compliance & licensing footprint",
        body:
          "BVNK's moat is heavily regulatory: a broad, multi-jurisdiction license stack underpins enterprise trust and the network partnerships.",
        bullets: [
          "US: registered MSB with FinCEN + state money transmitter (or equivalent) licenses (NMLS ID 2531294).",
          "UK/EU: two EMI licenses — UK FCA (via the 2022 SPS acquisition) and Malta — plus a VASP registration.",
          "Malta MiCA CASP licence secured Feb 2026, passported across the EU.",
          "25+ authorizations in total; compliance/KYC/sanctions screening embedded in payin/channel flows.",
        ],
      },
    ],
  },
  {
    slug: "sphere",
    name: "Sphere",
    url: "https://spherepay.co/",
    layers: ["L2", "L3"],
    product: "Cross-border payments API (“stablecoin sandwich”), white-label SDKs, SphereNet ledger.",
    customer: "B2B import/export, fintechs, institutional treasury",
    moat: "Solana-VM permissioned ledger (SphereNet, built with Anza); compliance-first rail. Deep emerging-market (LatAm) corridor + last-mile push.",
    region: "Emerging markets (LatAm-heavy)",
    status: "researched",
    tagline: "An operating system for cross-border money movement.",
    whatItIs:
      "Sphere (Sphere Laboratories, Inc.) is a B2B cross-border payments API that moves dollars between countries using stablecoins as the settlement rail. Its core SpherePay product runs the 'stablecoin sandwich' — convert local currency into a USD stablecoin, move it on-chain, then pay out in the destination currency — wrapping KYC/KYB, fiat rails, and multi-chain settlement behind one API. It is also building SphereNet, a permissioned Solana-VM ledger (developed with Anza) that bakes compliance and privacy into the settlement layer itself. This is Arnold Lee's Sphere Labs (founded 2023), not an unrelated older consumer 'SpherePay'.",
    howItWorks: [
      "Stablecoin sandwich: local currency → USD stablecoin (USDC/USDT) → destination currency, settling on-chain in the middle.",
      "Onramper accounts: virtual bank accounts that auto-convert fiat deposits (ACH, Wire, SEPA, PIX) into stablecoins.",
      "Offloader wallets: blockchain wallets that auto-convert incoming stablecoins into fiat payouts to a linked bank account.",
      "Customers (individuals or businesses) clear KYC/KYB once, then register bank accounts + crypto wallets as reusable instruments; transfers quote a rate-locked price and return deposit instructions.",
      "Multi-chain coverage (Solana, Ethereum, Base, Polygon, Tron, Arbitrum, Avalanche, Aptos) lets Sphere route the on-chain leg on the cheapest/fastest network.",
      "SphereNet: a permissioned, closed-loop modified Solana VM with enshrined compliance (ZK identity proofs, MPC, sanctions screening) for regulated transfers between institutions.",
    ],
    differentiators: [
      "SphereNet — a compliance-first permissioned Solana-VM ledger (built with Anza) with KYC/AML, sanctions screening, and privacy (ZK/MPC) enshrined at the protocol level, rather than bolted on.",
      "Full lifecycle API: customers + KYB/UBO, instruments, quotes, transfers, and automated Onramper/Offloader accounts in one v2 REST surface.",
      "Deep emerging-market focus — local hiring, sales, and compliance investment in LatAm (Brazil/BRL, Mexico) where B2B stablecoin corridors are growing fastest.",
      "Strong Solana-ecosystem backing (Jump Crypto, Solana Ventures, Anza, Pyth, Anatoly Yakovenko, Raj Gokal) gives it privileged access to the rail it builds on.",
    ],
    businessModel: "FX spread on the stablecoin sandwich + fees on transfer volume; infrastructure/platform fees for white-label embeds. SphereNet positioned as settlement infrastructure for regulated institutions.",
    dependsOn: [
      "Bank rails + local payout partners (ACH, Wire, SEPA, PIX) for last-mile in each corridor",
      "Solana + other chains (Ethereum, Base, Polygon, Tron, Aptos) for the on-chain leg",
      "Stablecoin liquidity (USDC, USDT, EURC) and market makers",
      "Anza / Solana core engineering for SphereNet",
      "KYC/KYB + sanctions-screening vendors",
    ],
    risks: [
      "Emerging-market FX + stablecoin liquidity volatility in thin corridors.",
      "Crowded LatAm cross-border lane (BVNK, Mural, Conduit, Bridge) — distribution + last-mile reach is the real battleground, not the rail.",
      "SphereNet is early/ambitious — a bespoke permissioned chain must win institutional and validator buy-in to matter.",
      "Money-transmitter / VASP licensing burden scales with every new corridor and currency.",
    ],
    keyFacts: [
      { label: "Founded", value: "2023 — Arnold Lee (CEO) & Luigi Charles" },
      { label: "HQ", value: "Sphere Laboratories, Inc. (Delaware-incorporated, Dover, DE; SF-based team)" },
      { label: "Seed", value: "$2.8M (Feb 2024) — TCG Crypto, Jump Crypto; Solana Ventures, Hudson River Trading, Republic Capital, Anatoly Yakovenko, Raj Gokal" },
      { label: "Strategic", value: "$5M (Dec 2024) — Coinbase Ventures, Kraken Ventures, Anza, Pyth Network, Anagram, Temporal" },
      { label: "Products", value: "SpherePay (payments API), SphereNet (permissioned Solana-VM ledger)" },
      { label: "Currencies", value: "USD, EUR, BRL; USDC, USDT, EURC" },
      { label: "Rails / chains", value: "ACH, Wire, SEPA, PIX; Solana, Ethereum, Base, Polygon, Tron, Arbitrum, Avalanche, Aptos" },
    ],
    links: [
      { label: "Site", url: "https://spherepay.co/" },
      { label: "About", url: "https://spherepay.co/about" },
      { label: "Sphere Labs", url: "https://spherelabs.co/" },
      { label: "SphereNet", url: "https://sphere.net/" },
      { label: "Docs", url: "https://docs.spherepay.co/introduction" },
      { label: "API reference", url: "https://docs.spherepay.co/api-reference" },
      { label: "SphereNet architecture (Anza)", url: "https://www.anza.xyz/blog/an-architectural-overview-of-spherenet" },
    ],
    builder: {
      architecture:
        "Sphere sits between bank rails and chains as an orchestration layer. The unit of work is a Transfer that runs the stablecoin sandwich; around it sit reusable entities — a Customer (individual or business) that has cleared KYC/KYB, plus registered Bank Accounts (fiat instruments) and Wallets (crypto instruments). Two automated primitives wrap the flow: Onramper Accounts are virtual bank accounts that auto-convert any fiat deposit into stablecoins sent to a destination wallet; Offloader Wallets are blockchain wallets that auto-convert incoming stablecoins into fiat payouts. Quotes rate-lock FX before a transfer is funded. SphereNet is the longer-term settlement substrate — a permissioned Solana VM where compliance is enshrined in the protocol.",
      integration:
        "Server-side REST API at the /v2 namespace with Bearer-token (API key) auth; ~100 RPS read/write limits and an OpenAPI 3.0 spec for codegen. Customers can be onboarded via API or hosted KYC/KYB link flows (including face-liveness EDD). White-label SDKs/embeds let fintechs surface on/off-ramp + transfer flows under their own brand. Webhook events drive async transfer state.",
      apiSurface: [
        { name: "POST /v2/customer", desc: "Create an individual or business customer; submit for KYC/KYB via /v2/customer/{id}/kyc. UBOs go through /v2/business-representative." },
        { name: "POST /v2/bank-account", desc: "Register a fiat instrument with its payment rail (ACH, Wire, SEPA, PIX) for a customer." },
        { name: "POST /v2/wallet", desc: "Register a customer's blockchain wallet (Solana, EVM, Tron, Aptos…) as a payout/receive instrument." },
        { name: "POST /v2/quote", desc: "Create a rate-locked FX quote; mark used/expired via PUT /v2/quote/{id}." },
        { name: "POST /v2/transfer", desc: "Create an on-ramp or off-ramp transfer; GET /v2/transfer/{id} returns deposit instructions + status." },
        { name: "POST /v2/virtual-account", desc: "Onramper account — a virtual bank account that auto-converts fiat deposits to stablecoins to a destination wallet." },
        { name: "POST /v2/offloader-wallet", desc: "Offloader wallet — a wallet that auto-converts incoming stablecoins to fiat payouts to a linked bank account." },
      ],
      snippet: {
        lang: "ts",
        caption: "Off-ramp: clear a customer, register instruments, then quote + create a USDC→BRL transfer.",
        code: `const sphere = (path: string, body: unknown) =>
  fetch(\`https://api.spherepay.co/v2/\${path}\`, {
    method: 'POST',
    headers: {
      Authorization: \`Bearer \${process.env.SPHERE_API_KEY}\`, // server-side only
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((r) => r.json());

// 1. Customer (already KYB-approved) registers a Brazilian payout bank account.
const bank = await sphere('bank-account', {
  customer: customerId,
  paymentRail: 'pix',
  currency: 'brl',
  accountDetails: { pixKey: 'merchant@example.com.br' },
});

// 2. Rate-lock the USDC -> BRL leg of the sandwich.
const quote = await sphere('quote', {
  src: { currency: 'usdc', network: 'solana' },
  dst: { currency: 'brl' },
  amount: '1000',
});

// 3. Create the off-ramp transfer; the response carries the on-chain
//    deposit address to fund, then Sphere pays out via PIX.
const transfer = await sphere('transfer', {
  customer: customerId,
  quote: quote.data.id,
  destination: { bankAccount: bank.data.id },
});
console.log(transfer.data.status, transfer.data.depositInstructions);`,
      },
      buildNotes: [
        "Treat the webhook/event stream as the source of truth for transfer state; the create call only returns deposit instructions, not final settlement.",
        "Customer + KYB and instrument registration are one-time setup; reuse customer/bank-account/wallet IDs across transfers to avoid re-onboarding.",
        "Quotes are rate-locked and expire — create the quote, then the transfer that references it, promptly.",
        "[verify exact request/response field names and the production base host against the current docs.spherepay.co OpenAPI spec — field shapes evolve.]",
      ],
    },
    deepDive: [
      {
        heading: "The stablecoin sandwich",
        body:
          "Sphere's core flow replaces correspondent-bank hops with an on-chain middle leg. Local currency is converted into a USD stablecoin, moved across a blockchain, and converted into the destination currency at the far end — collapsing days and multiple FX spreads into one quote.",
        bullets: [
          "Top slice: pay-in via a local fiat rail (ACH/Wire in the US, SEPA in the EU, PIX in Brazil) into an Onramper account.",
          "Filling: value moves as USDC/USDT on the cheapest viable chain (Solana, Base, Tron, Polygon, Aptos…).",
          "Bottom slice: an Offloader wallet converts the stablecoin and pays out local currency (e.g. BRL) to the recipient's bank.",
          "Revenue = FX spread on the two conversions + a transfer fee; the single rate-locked quote replaces stacked correspondent-bank spreads.",
        ],
      },
      {
        heading: "SphereNet — compliance-first Solana-VM ledger",
        body:
          "Built with Anza, SphereNet is a permissioned, closed-loop modified Solana Virtual Machine aimed at regulated institutions. Rather than screening transactions after the fact on a public chain, it enshrines compliance and privacy at the protocol level.",
        bullets: [
          "Permissioned validator set with a constrained quorum (initially Sphere Foundation-managed) and a programmatic registry of approved nodes + market makers.",
          "Compliance by default: zero-knowledge proofs of identity, MPC over compliance commitments, native KYC/AML + sanctions screening, jurisdiction metadata per account.",
          "Enshrined gasless relayers so institutions can transact without holding a volatile gas token.",
          "Consensus-level changes (e.g. modified VoteProgram requiring a validator supermajority) and dynamic, auditable network economics.",
        ],
      },
      {
        heading: "Corridors & last-mile",
        body:
          "Sphere targets under-addressed emerging-market corridors where legacy rails are slow and expensive, with the heaviest investment in LatAm — local hiring, sales, and compliance — and Brazil/PIX as an anchor.",
        bullets: [
          "Currencies: USD, EUR, BRL on the fiat side; USDC, USDT, EURC on-chain.",
          "Last-mile payout via local rails (PIX in Brazil) and bank instruments registered per customer.",
          "Operates in a fast-growing lane — B2B stablecoin volume in LatAm corridors has grown multiples year-over-year — but competes with BVNK, Mural, Conduit, and Bridge on reach and distribution.",
        ],
      },
      {
        heading: "Compliance & risk model",
        bullets: [
          "Customers clear KYC (individuals) or KYB with UBO/business-representative collection before transacting; enhanced due diligence adds face-liveness and OTP verification.",
          "Sanctions screening and AML are handled in-platform; SphereNet pushes these checks down into the ledger itself.",
          "Key risks: emerging-market FX/liquidity volatility, money-transmitter/VASP licensing burden per corridor, and execution risk on the ambitious bespoke SphereNet chain.",
        ],
      },
    ],
  },
  {
    slug: "rain",
    name: "Rain",
    url: "https://www.rain.xyz/",
    layers: ["L2", "L5"],
    product:
      "Stablecoin-backed Visa card issuing — full-stack API for partners to ship cards that spend directly from on-chain stablecoin collateral.",
    customer: "Crypto platforms, wallets, neo-banks, enterprises, remittance players",
    moat:
      "Visa Principal Member with all authorization + settlement on-chain; settles to Visa natively in USDC 365 days/year. Tokenized receivables + omni-chain stack.",
    region: "Global (100+ countries)",
    status: "researched",
    tagline: "On-chain card issuing that settles to Visa in stablecoins.",
    whatItIs:
      "Rain is a vertically integrated card-issuing platform and payment processor that lets companies ship Visa cards which spend directly from on-chain stablecoin collateral. As a Visa Principal Member, Rain issues, authorizes, and settles cards itself — partners (wallets, neo-banks, enterprises, remittance firms) embed Rain's API instead of building card infrastructure or sourcing a separate BIN sponsor. Its defining feature: Rain brings authorization logic and settlement on-chain and settles its obligations to Visa natively in USDC, 7 days a week, 365 days a year — including weekends and holidays when traditional bank-wire settlement is closed.",
    howItWorks: [
      "A partner integrates Rain's full-stack issuing API to spin up a branded Visa card program (custodial or non-custodial wallets).",
      "The end user deposits stablecoins into a smart contract they own and control; that collateral backs a credit line, so the user spends without selling.",
      "At point of sale, Rain authorizes the transaction in real time against the on-chain collateral and fronts the fiat to the merchant over the Visa network (175M+ merchant locations).",
      "Rain then settles its obligation to Visa in USDC on-chain, and programmatically draws down / repays against the user's stablecoin collateral.",
      "Because receivables are tokenized, Rain borrows stablecoins from capital partners to fund the float and repays them programmatically via smart contracts — closed-loop, on-chain credit-card receivable financing.",
    ],
    differentiators: [
      "Visa Principal Member — issues, authorizes, and settles directly, so partners skip a separate bank/BIN sponsor.",
      "Native USDC settlement to Visa 365 days/year, vs. pre-funded fiat float that idles on weekends.",
      "Authorization and settlement logic run on-chain against user-owned smart-contract collateral (self-custody preserved).",
      "Omni-chain: native settlement across ~10 networks and multiple stablecoins (USDC, USDT, DAI, PYUSD).",
      "Tokenized receivables unlock programmatic, smart-contract-powered capital financing — lower cost of capital for credit programs.",
    ],
    businessModel:
      "Interchange share on card spend + issuing/processing fees per card and per transaction + subscription fees for expense/program-management software (Brex/Ramp-style). Also captures spread on the tokenized-receivable financing it intermediates.",
    dependsOn: [
      "Visa (network + principal membership)",
      "Third National (issuing bank per Visa license)",
      "Stablecoin issuers (Circle/Tether/etc.)",
      "Supported chains (Ethereum, Base, Solana, Stellar, Tron, …)",
      "Card processor (Paymentology) and capital/lending partners",
    ],
    risks: [
      "Interchange and card/credit regulation vary sharply by region, capping where programs can launch.",
      "Collateral volatility + on-chain liquidation risk if a non-USD-pegged asset is used as backing.",
      "Reliance on Visa membership and the sponsoring bank — a status change would be existential.",
      "Capital-markets dependency: the receivable-financing model needs lenders willing to fund float at attractive rates.",
    ],
    keyFacts: [
      { label: "Founded", value: "2021 (New York) — Farooq Malik (CEO), Charles Naut" },
      { label: "Network", value: "Visa Principal Member (cards issued by Third National per Visa license)" },
      { label: "Settles in", value: "USDC on-chain to Visa, 365 days/year" },
      { label: "Chains", value: "Ethereum, Base, Polygon, Optimism, Avalanche, Arbitrum, ZKsync, Solana, Stellar, Tron" },
      { label: "Stablecoins", value: "USDC, USDT, DAI, PYUSD" },
      { label: "Funding", value: "~$338M+ total: $24.5M Series A (Mar 2025, Norwest), $58M Series B, $250M Series C" },
      { label: "Valuation", value: "$1.95B (Series C, led by Iconiq, Jan 2026)" },
      { label: "Traction", value: "~$3B annualized volume, 200+ companies, 100+ countries; card base ~30× YoY" },
      { label: "Notable partners", value: "Western Union (remittances), Rizon; processor Paymentology" },
    ],
    links: [
      { label: "Site", url: "https://www.rain.xyz/" },
      { label: "Cards (issuing)", url: "https://www.rain.xyz/cards" },
      { label: "Technology", url: "https://www.rain.xyz/technology" },
      { label: "Docs (access-gated)", url: "https://docs.rain.xyz/" },
      { label: "Rain × Visa partnership", url: "https://www.rain.xyz/resources/rain-and-visa-partner-to-accelerate-onchain-credit-cards" },
      { label: "Series A announcement", url: "https://www.rain.xyz/resources/rain-announces-24-5-million-in-funding-led-by-norwest-to-expand-stablecoin-powered-card-issuing-globally" },
    ],
    builder: {
      architecture:
        "Rain is the issuer-processor AND a Visa Principal Member, so it owns the full path: card issuance, real-time authorization, and settlement — no external BIN sponsor in the loop (cards are issued by partner bank Third National under Rain's Visa license). The novel piece is that authorization logic and settlement run on-chain. Each end user gets a smart contract they own and control, holding stablecoin collateral. When a swipe hits the Visa network, Rain authorizes against that collateral in real time and fronts fiat to the merchant; it then settles its net obligation to Visa in USDC on-chain, daily/365. Receivables are tokenized, so Rain borrows stablecoins from capital partners to fund the float and repays programmatically via smart contracts. The stack is omni-chain (native settlement on ~10 networks) and asset-agnostic across major stablecoins.",
      integration:
        "Partners integrate a developer-first, full-stack issuing API that supports both custodial and non-custodial wallets and operates natively across multiple chains. A program covers KYC/KYB + compliance, card creation (virtual/physical), collateral/credit-line setup tied to the user's smart contract, real-time authorization controls, and webhooks for transaction/settlement events. Public API reference is access-gated (docs.rain.xyz requires an access code), so exact endpoint names below are conceptual and marked [verify].",
      apiSurface: [
        { name: "POST /cardholders (KYC/KYB)", desc: "Onboard an end user or business, run identity/compliance, create the cardholder record. [verify exact path]" },
        { name: "POST /collateral-accounts", desc: "Provision the user-owned smart-contract account and register the stablecoin collateral / credit line backing it. [verify]" },
        { name: "POST /cards", desc: "Issue a virtual or physical Visa card bound to a cardholder + collateral account; set spend controls/limits. [verify]" },
        { name: "Authorization webhook / decisioning", desc: "Real-time auth events Rain evaluates against on-chain collateral; partner may apply program-level approve/decline rules. [verify]" },
        { name: "GET /transactions", desc: "Retrieve authorizations, captures, and on-chain USDC settlement records for reconciliation. [verify]" },
        { name: "Webhooks (events)", desc: "Subscribe to card lifecycle, authorization, settlement, and collateral/repayment events — treat these as source of truth. [verify]" },
        { name: "Settlement / repayment ledger", desc: "Programmatic draw-down + repayment against collateral and capital-partner stablecoin float, recorded on-chain. [verify]" },
      ],
      snippet: {
        lang: "ts",
        caption: "Conceptual flow: onboard a cardholder, register on-chain collateral, issue a Visa card, then react to an authorization webhook. Endpoint shapes are illustrative — confirm against Rain's gated docs.",
        code: `import { Rain } from '@rain/sdk'; // conceptual — confirm package name

const rain = new Rain({ apiKey: process.env.RAIN_API_KEY });

// 1. Onboard the cardholder (KYC/KYB handled by Rain)
const holder = await rain.cardholders.create({
  type: 'individual',
  email: 'user@rails.app',
});

// 2. Register the user-owned smart-contract collateral account.
//    The user deposits USDC into a contract THEY control; it backs the credit line.
const collateral = await rain.collateralAccounts.create({
  cardholderId: holder.id,
  chain: 'base',            // ethereum | base | polygon | solana | stellar | tron ...
  asset: 'USDC',            // also USDT | DAI | PYUSD
  contractAddress: '0xUserOwnedSmartContract...',
});

// 3. Issue the Visa card bound to that collateral.
const card = await rain.cards.create({
  cardholderId: holder.id,
  collateralAccountId: collateral.id,
  type: 'virtual',          // or 'physical'
  spendLimit: { amount: 5000_00, interval: 'monthly' },
});

// 4. Real-time authorization webhook: Rain authorizes against on-chain
//    collateral, fronts fiat to the merchant, then settles to Visa in USDC.
export async function onWebhook(event: RainEvent) {
  switch (event.type) {
    case 'authorization.created':
      // optional program-level approve/decline on top of Rain's collateral check
      break;
    case 'settlement.completed':
      // USDC settled on-chain to Visa; reconcile + repay capital float
      break;
  }
}`,
      },
      buildNotes: [
        "Self-custody is the design center: collateral lives in a smart contract the END USER owns — Rain authorizes against it but does not custody it.",
        "Settlement is the headline: Rain pays Visa in USDC on-chain daily/365, so float isn't stranded over weekends/holidays the way fiat-wire settlement is.",
        "Treat webhooks (authorization + settlement events) as the source of truth for reconciliation; the on-chain settlement record is the ledger of record.",
        "Region availability is gated by card/credit + interchange regulation — confirm supported geographies per program with Rain.",
        "[verify exact endpoint names, SDK package, and auth scheme — Rain's API reference at docs.rain.xyz is access-code gated and not public.]",
      ],
    },
    deepDive: [
      {
        heading: "Real-time authorization & on-chain USDC settlement",
        body:
          "Rain's edge is collapsing the card-money and on-chain-money flows into one loop. Authorization and settlement logic run on-chain against user-owned smart-contract collateral, and Rain settles its net obligation to Visa in USDC.",
        bullets: [
          "Collateral: each end user deposits stablecoins into a smart contract they own and control; it backs a credit line rather than pre-funding a fiat float account.",
          "Authorization: at the swipe, Rain decisions in real time against that on-chain collateral and fronts fiat to the merchant over Visa.",
          "Settlement: Rain pays Visa natively in USDC on-chain, 7 days/week, 365 days/year — including weekends/holidays when fiat-wire settlement windows are closed.",
          "Float financing: receivables are tokenized, so Rain borrows stablecoins from capital partners and repays programmatically via smart contracts — 'closed-loop' on-chain receivable financing.",
          "Omni-chain + asset-agnostic: native settlement across ~10 chains (ETH, Base, Polygon, Optimism, Avalanche, Arbitrum, ZKsync, Solana, Stellar, Tron) and multiple stablecoins (USDC, USDT, DAI, PYUSD).",
        ],
      },
      {
        heading: "The Visa Principal Member advantage",
        body:
          "Most card programs rent access through a BIN sponsor; Rain is itself a Visa Principal Member, which compresses the stack and the economics.",
        bullets: [
          "Direct issuance: Rain issues, authorizes, and settles itself (cards issued by partner bank Third National under Rain's Visa license) — partners don't source a separate sponsor.",
          "Acceptance: cards work at 150M+ (Rain cites up to 175M+) Visa merchant locations worldwide on day one.",
          "Pilot status: Rain participates in Visa's stablecoin-settlement program, settling card obligations in USDC rather than only fiat.",
          "Speed-to-market: a partner ships a compliant card program via API instead of spending 12–18 months assembling sponsor bank + processor + network access.",
        ],
      },
      {
        heading: "Interchange & capital economics",
        body:
          "Rain monetizes like a vertically integrated issuer-processor, with an extra on-chain financing layer that most card platforms don't have.",
        bullets: [
          "Interchange: a share of the merchant interchange on every transaction is the core revenue line.",
          "Platform fees: per-card / per-transaction issuing + processing fees, plus subscription fees for expense/program management (Brex/Ramp analog).",
          "Capital efficiency: USDC settlement frees working capital that fiat T+1/T+2 cycles tie up; tokenized receivables let Rain borrow + repay float programmatically, lowering cost of capital for credit programs.",
          "Lender side: capital partners get 'superior collateral' (on-chain, programmatically repaid) — turning the float into a financing product, not just a cost.",
        ],
      },
      {
        heading: "Regulatory & regional risk",
        bullets: [
          "Card-issuing, credit, and interchange rules differ sharply by jurisdiction, gating which geographies a program can serve (Rain reports activity across 100+ countries, but per-program coverage varies).",
          "Dependence on Visa membership + the sponsoring bank (Third National): a change in either is existential to the model.",
          "Collateral/credit risk: volatility or de-peg of backing assets and on-chain liquidation mechanics must hold up under stress.",
          "Capital-markets dependency: the receivable-financing engine needs ongoing lender appetite to fund float at attractive rates.",
        ],
      },
    ],
  },
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

  // ----------------------------- L1 -----------------------------
  {
    slug: "ramp-network",
    name: "Ramp Network",
    url: "https://rampnetwork.com/",
    layers: ["L1"],
    product: "Embeddable fiat ⇄ crypto widget + iOS/Android apps.",
    customer: "Wallets, exchanges, dApps",
    moat: "Best-in-class checkout UX; MiCA/CASP (Ireland) + multiple US money-transmitter licenses.",
    region: "EU + US",
    status: "researched",
    tagline: "A clean, trusted on/off-ramp you can embed.",
    whatItIs:
      "Ramp Network powers on- and off-ramps for wallets, exchanges, and dApps. Users buy or sell crypto/stablecoins with a card or bank transfer through an embeddable widget; Ramp handles KYC, payments, and fiat settlement.",
    howItWorks: [
      "A partner embeds Ramp's widget/SDK into its app.",
      "Users buy crypto with card/bank, or sell crypto back to fiat (off-ramp).",
      "Ramp rewrote checkout for speed + trust; native iOS/Android apps added.",
    ],
    differentiators: [
      "Best-in-class checkout UX — fewer 'is this working?' drop-offs.",
      "Strong regulatory footing: MiCA/CASP (Ireland) + several US MTLs.",
      "Direct fiat settlement without third-party intermediaries in licensed states.",
    ],
    businessModel: "Spread/fee on each on- and off-ramp transaction.",
    dependsOn: ["Card networks", "Banking partners", "Supported chains"],
    risks: ["Card fraud + chargebacks.", "Fee compression as ramps commoditize."],
    keyFacts: [
      { label: "Founded", value: "2017 (London)" },
      { label: "Funding", value: "~$135M" },
      { label: "Licenses", value: "MiCA/CASP (Ireland) + multiple US MTLs" },
      { label: "Products", value: "Widget, SDK, iOS + Android apps" },
    ],
    links: [
      { label: "Site", url: "https://rampnetwork.com/" },
      { label: "Docs", url: "https://docs.rampnetwork.com/" },
      { label: "JS SDK reference", url: "https://docs.rampnetwork.com/sdk-reference" },
      { label: "REST API v3", url: "https://docs.rampnetwork.com/rest-api-v3-reference" },
      { label: "Webhooks", url: "https://docs.rampnetwork.com/webhooks" },
    ],
    builder: {
      architecture:
        "Ramp sits between card acquirers/banks and the chains. The partner renders a hosted/embedded widget (an iframe); Ramp runs KYC, payment acceptance, fraud, liquidity sourcing, and the on-chain payout to the user's wallet (and the reverse for off-ramp). Order state is pushed back to the partner via webhooks. Because there's no secret to guard on the client, the publishable host API key lives safely on the frontend.",
      integration:
        "Primarily a hosted/embedded widget via the @ramp-network/ramp-instant-sdk — one SDK instance = one widget. Also iOS and Android SDKs, plus a REST API v3 for quotes/assets and headless flows. Display variants: auto, hosted, embedded-desktop/mobile, webview, etc.",
      apiSurface: [
        { name: "RampInstantSDK(config)", desc: "Construct + .show() the widget. Required: hostApiKey, hostAppName, hostLogoUrl." },
        { name: "defaultFlow", desc: "'ONRAMP' | 'OFFRAMP' | 'SWAP' — which flow opens first." },
        { name: "enabledCryptoAssets", desc: "Comma-list like BASE_USDC,ETH_ETH; first entry is the default/pre-selected asset." },
        { name: "userAddress / swapAsset / fiatValue", desc: "Pre-fill the destination wallet, asset, and amount." },
        { name: "webhookStatusUrl / offrampWebhookV3Url", desc: "Subscribe to purchase/sale events; append your own query params to correlate the order." },
        { name: "finalUrl", desc: "Redirect target after a successful transaction ('Back to partner')." },
        { name: "REST API v3", desc: "Server-side assets, quotes, and on/off-ramp sale objects for headless integrations." },
      ],
      snippet: {
        lang: "ts",
        caption: "Minimal on-ramp: open the widget pre-filled to send USDC on Base to a wallet.",
        code: `import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

new RampInstantSDK({
  hostApiKey: RAMP_HOST_API_KEY,        // publishable — safe on the client
  hostAppName: 'Rails',
  hostLogoUrl: 'https://rails.app/logo.png',
  defaultFlow: 'ONRAMP',                 // or 'OFFRAMP'
  enabledCryptoAssets: ['BASE_USDC', 'ETH_ETH'],
  userAddress: '0xabc...def',            // pre-fill the destination wallet
  fiatValue: '50',
  fiatCurrency: 'EUR',
  webhookStatusUrl: 'https://rails.app/api/ramp/webhook?orderId=123',
  finalUrl: 'https://rails.app/done',
}).show();`,
      },
      buildNotes: [
        "Webhook events walk the order through states (e.g. CREATED → RELEASING → RELEASED, or EXPIRED/CANCELLED) — treat the webhook, not the client, as the source of truth.",
        "Use a test/staging host API key first; the same SDK config switches to production by swapping the key.",
        "[verify against the latest docs the user provides — asset symbol format and v3 off-ramp params evolve]",
      ],
    },
  },
  {
    slug: "moonpay",
    name: "MoonPay",
    url: "https://www.moonpay.com/",
    layers: ["L1"],
    product: "Embeddable fiat ⇄ crypto on/off-ramp via widget, SDK, or API.",
    customer: "Wallets, apps, consumers",
    moat: "Consumer-recognized brand + reach: 180+ countries, local payment methods.",
    region: "Global (180+ countries)",
    status: "researched",
    tagline: "The consumer-recognized way to buy crypto.",
    whatItIs:
      "MoonPay is a fiat-to-crypto on/off-ramp that teams embed into their products. It operates in 180+ countries with local payment methods and integrates via widget, SDK, or API, built around a polished, brand-recognized purchase experience.",
    howItWorks: [
      "Partners embed MoonPay via widget, SDK, or API.",
      "Users buy crypto with card, bank transfer, or mobile payments.",
      "Widget-based off-ramp converts crypto back to fiat.",
    ],
    differentiators: [
      "Consumer brand recognition + a polished purchase flow.",
      "180+ country reach with local payment methods.",
      "Large balance sheet/valuation funds aggressive expansion.",
    ],
    businessModel: "Fees ~1% (bank) to ~4.5% (card) + network fees.",
    dependsOn: ["Card networks", "Banking partners"],
    risks: ["High card fees vs. cheaper rails.", "Fee competition (e.g. Coinbase zero-fee USDC)."],
    keyFacts: [
      { label: "Founded", value: "2018 (Dover, DE)" },
      { label: "Funding", value: "~$650M+" },
      { label: "Valuation", value: "~$3.4B (2021 round)" },
      { label: "Coverage", value: "180+ countries" },
    ],
    links: [{ label: "Site", url: "https://www.moonpay.com/" }],
  },
  {
    slug: "transak",
    name: "Transak",
    url: "https://transak.com/",
    layers: ["L1"],
    product: "White-label embedded on/off-ramp; widget, SDK, and address-based 'Stream' offramp.",
    customer: "Apps & developers",
    moat: "Widest local rails (UPI, PIX, SEPA Instant, ACH); 160+ countries, 75+ chains, 450+ integrations.",
    region: "Global (160+ countries)",
    status: "researched",
    tagline: "Developer-first ramp with the widest local rails.",
    whatItIs:
      "Transak is a fiat-to-crypto on/off-ramp built around a white-label, embedded developer experience. It integrates with 450+ apps, handles compliance in 160+ countries, and supports onboarding across 75+ blockchains — with the broadest set of local payment rails.",
    howItWorks: [
      "Developers embed Transak's white-label widget/SDK with partner-side controls.",
      "Users pay via local rails: UPI (India), PIX (Brazil), SEPA Instant (EU), ACH + card (US).",
      "Off-ramp via widget or 'Stream' — send crypto to an address, get fiat automatically.",
    ],
    differentiators: [
      "Widest local payment-method coverage of any ramp.",
      "White-label + partner controls vs. consumer-brand flow.",
      "75+ chains and 450+ integrations.",
    ],
    businessModel: "Card fees ~3.5–5.5% by region; spread on transactions.",
    dependsOn: ["Local payment rails", "Banking partners", "Chains"],
    risks: ["Compliance overhead across 160+ countries.", "Fee pressure from zero-fee rivals."],
    keyFacts: [
      { label: "Founded", value: "2019 (Miami, FL)" },
      { label: "Funding", value: "~$36M" },
      { label: "Coverage", value: "160+ countries, 49 US states, 75+ chains" },
      { label: "Integrations", value: "450+ apps" },
    ],
    links: [{ label: "Site", url: "https://transak.com/" }],
  },
  {
    slug: "coinbase-onramp",
    name: "Coinbase Onramp",
    url: "https://www.coinbase.com/developer-platform/products/onramp",
    layers: ["L1"],
    product: "On/off-ramp API + SDK to add buy/sell directly inside apps.",
    customer: "Developers building on USDC",
    moat: "Zero-fee USDC on/off-ramp; backed by public, regulated Coinbase + Base chain.",
    region: "Global",
    status: "researched",
    tagline: "Zero-fee USDC ramp from a public, regulated exchange.",
    whatItIs:
      "Coinbase Onramp lets developers add buy/sell directly inside their apps via API and SDK. Its headline feature is a zero-fee on/off-ramp for USDC, leaning on Coinbase's regulated status and the Base chain.",
    howItWorks: [
      "Developers integrate the Onramp API/SDK.",
      "Users buy/sell crypto; USDC on/off-ramp is fee-free.",
      "Settlement leverages Coinbase's exchange + Base L2.",
    ],
    differentiators: [
      "Zero fees on USDC on/off-ramp.",
      "Backed by a public, NASDAQ-listed, regulated exchange.",
      "Tight integration with USDC + Base.",
    ],
    businessModel: "Free for USDC; ~0–2.5% on other methods; ecosystem pull to Coinbase/Base.",
    dependsOn: ["Coinbase exchange", "USDC (Circle)", "Base"],
    risks: ["Strategically steers volume toward Coinbase's own ecosystem."],
    keyFacts: [
      { label: "Parent", value: "Coinbase (NASDAQ: COIN), founded 2012" },
      { label: "Headline", value: "Zero-fee USDC on/off-ramp" },
      { label: "Stack", value: "API + SDK; USDC + Base" },
    ],
    links: [
      { label: "Onramp", url: "https://www.coinbase.com/developer-platform/products/onramp" },
    ],
  },

  // ----------------------------- L4 -----------------------------
  {
    slug: "ethena",
    name: "Ethena",
    url: "https://docs.ethena.fi/",
    layers: ["L4"],
    product: "USDe — a delta-neutral synthetic dollar — plus sUSDe for yield.",
    customer: "Protocols, neo-banks, on-chain users",
    moat: "Crypto-backed (not fiat reserves) via short-perp hedge. ~5% APY, $14B+ TVL — 3rd largest stablecoin.",
    region: "Global / on-chain",
    status: "researched",
    tagline: "A synthetic dollar backed by crypto, not banks.",
    whatItIs:
      "Ethena issues USDe, a synthetic dollar backed entirely by digital assets rather than fiat reserves. Staking it into sUSDe earns yield from the hedge. With $14B+ TVL it's among the largest dollar assets in crypto — and a popular yield 'ingredient' for neo-banks.",
    howItWorks: [
      "User deposits ETH / staked ETH to mint USDe.",
      "Ethena simultaneously opens a short ETH perpetual-futures position.",
      "The short hedges spot price risk, keeping USDe ≈ $1 (delta-neutral).",
      "Yield = staking rewards + perp funding/basis spread → paid to sUSDe holders (~5% APY).",
    ],
    differentiators: [
      "No fiat reserves or bank dependency — fully crypto-collateralized.",
      "Yield from the derivatives funding rate, often above the T-bill rate.",
      "Composable across DeFi and embedded by neo-banks (e.g. UR Global).",
    ],
    businessModel: "Protocol keeps a portion of the hedge yield; ENA governance token.",
    dependsOn: ["Perp/futures markets + funding rate", "Staked ETH", "Centralized exchanges (for hedges)"],
    risks: [
      "Negative funding rates can erode or invert yield.",
      "Exchange/custody counterparty risk on the short positions.",
      "Not a fiat-redeemable stablecoin — a different risk profile entirely.",
    ],
    keyFacts: [
      { label: "Founded", value: "2023 — Guy Young (Ethena Labs)" },
      { label: "Funding", value: "~$156M (Dragonfly, Brevan Howard, Franklin Templeton, Galaxy, Arthur Hayes)" },
      { label: "TVL", value: "$14B+ (3rd-largest USD stablecoin, Oct 2025)" },
      { label: "Token", value: "ENA (governance)" },
    ],
    links: [
      { label: "Docs", url: "https://docs.ethena.fi/" },
      { label: "USDe overview", url: "https://docs.ethena.fi/solution-overview/usde-overview" },
    ],
  },
  {
    slug: "ondo-finance",
    name: "Ondo Finance",
    url: "https://ondo.finance/usdy",
    layers: ["L4"],
    product: "USDY — a tokenized note backed by short-term US Treasuries; rUSDY rebasing version.",
    customer: "Non-US investors, protocols",
    moat: "T-bill yield in a transferable token; multi-chain (incl. Stellar). RWA-first brand.",
    region: "Global (ex-US)",
    status: "researched",
    tagline: "T-bill yield, tokenized.",
    whatItIs:
      "Ondo's USDY is a tokenized note secured by short-term US Treasuries and bank deposits — a stablecoin-like instrument that also pays the T-bill yield. It comes in an accruing form (price drifts above $1) and a rebasing form, rUSDY, that holds $1 and pays yield as extra tokens.",
    howItWorks: [
      "Deposits buy short-term US Treasuries + bank demand deposits as collateral.",
      "Yield accrues daily; USDY's price drifts above $1 as interest compounds.",
      "rUSDY: rebasing variant stays at $1, paying yield via extra tokens.",
      "Issued multi-chain (e.g. Ethereum, Stellar).",
    ],
    differentiators: [
      "Real-world-asset (RWA) brand leader; institutional framing.",
      "Choice of accruing (USDY) vs. rebasing (rUSDY).",
      "Yield from the risk-free rate, not derivatives.",
    ],
    businessModel: "Management fee on assets (yield ceiling = fed funds − fee).",
    dependsOn: ["US Treasury market", "Regulated custodians/brokers", "Chains"],
    risks: ["Restricted from US persons.", "Rate-cut risk compresses yield.", "RWA/custody + legal structure risk."],
    keyFacts: [
      { label: "Founded", value: "2021 (New York) — Nathan Allman, Pinku Surana" },
      { label: "Funding", value: "$20M Series A (Founders Fund, Pantera) + $250M (Pantera, 2025)" },
      { label: "Collateral", value: "Short-term US Treasuries + bank deposits" },
      { label: "Variants", value: "USDY (accruing), rUSDY (rebasing)" },
    ],
    links: [
      { label: "USDY", url: "https://ondo.finance/usdy" },
      { label: "Site", url: "https://ondo.finance/" },
    ],
  },
  {
    slug: "mountain-protocol",
    name: "Mountain Protocol",
    url: "https://mountainprotocol.com/",
    layers: ["L4"],
    product: "USDM — a permissionless, yield-bearing stablecoin that rebases daily.",
    customer: "Protocols, treasuries, non-US holders",
    moat: "Regulated (Bermuda) T-bill-backed rebasing token; composable as plain ERC-20.",
    region: "Global (ex-US)",
    status: "researched",
    tagline: "A regulated, yield-bearing dollar that rebases daily.",
    whatItIs:
      "Mountain Protocol issues USDM, a permissionless yield-bearing stablecoin backed by short-term US Treasuries. Interest is paid as a daily rebase to the same token balance, and USDM stays a plain ERC-20 so it composes across DeFi.",
    howItWorks: [
      "Deposits back USDM with short-term US Treasuries (regulated, Bermuda).",
      "Yield distributed daily via rebase — your balance grows, price stays ~$1.",
      "Plain ERC-20 → usable across DeFi without wrappers.",
    ],
    differentiators: [
      "Daily rebase keeps a clean $1 unit while paying yield.",
      "Regulated issuer (Bermuda Monetary Authority).",
      "Composable as a vanilla ERC-20.",
    ],
    businessModel: "Management fee on reserves.",
    dependsOn: ["US Treasury market", "Custodians", "Ethereum/L2s"],
    risks: ["Restricted from US persons.", "Rate-cut risk.", "[verify funding + traction]"],
    keyFacts: [
      { label: "Token", value: "USDM (rebasing)" },
      { label: "Regulator", value: "Bermuda Monetary Authority" },
      { label: "Collateral", value: "Short-term US Treasuries" },
      { label: "Status", value: "Live" },
    ],
    links: [{ label: "Site", url: "https://mountainprotocol.com/" }],
  },
  {
    slug: "sky",
    name: "Sky (ex-MakerDAO)",
    url: "https://sky.money/",
    layers: ["L4"],
    product: "USDS stablecoin + sUSDS savings (Sky Savings Rate).",
    customer: "DeFi users, protocols",
    moat: "Largest decentralized stablecoin lineage (DAI); on-chain savings rate, deep DeFi integration.",
    region: "Global / on-chain",
    status: "researched",
    tagline: "The decentralized dollar, rebranded from Maker/DAI.",
    whatItIs:
      "Sky is the rebrand of MakerDAO. It issues USDS (the successor to DAI) and offers sUSDS, which pays the Sky Savings Rate. It's the largest decentralized-stablecoin lineage and is deeply integrated across DeFi.",
    howItWorks: [
      "USDS is minted against collateral via the Sky protocol (DAI lineage).",
      "Holders can deposit into sUSDS to earn the Sky Savings Rate.",
      "Governed on-chain; revenue from collateral + RWA allocations funds the rate.",
    ],
    differentiators: [
      "Most established decentralized stablecoin (DAI heritage).",
      "Native on-chain savings rate (sUSDS).",
      "Deep, battle-tested DeFi integration.",
    ],
    businessModel: "Spread between collateral yield and the savings rate; governance token.",
    dependsOn: ["Collateral assets (incl. RWAs)", "Ethereum", "Governance"],
    risks: ["Collateral + governance risk.", "Regulatory pressure on decentralized issuers.", "[verify current metrics]"],
    keyFacts: [
      { label: "Lineage", value: "MakerDAO → Sky (rebrand 2024)" },
      { label: "Tokens", value: "USDS, sUSDS (savings)" },
      { label: "Type", value: "Decentralized / on-chain" },
      { label: "Status", value: "Live" },
    ],
    links: [{ label: "Site", url: "https://sky.money/" }],
  },

  // ----------------------------- L5 -----------------------------
  {
    slug: "ether-fi",
    name: "Ether.fi",
    url: "https://ether.fi/",
    layers: ["L5"],
    product: "Stake (savings) + Liquid (invest) + Cash (crypto credit card, launched Apr 2025).",
    customer: "Crypto-native consumers",
    moat: "Spend against staked ETH without selling. Restaking protocol → full DeFi neo-bank.",
    region: "Global / US card",
    status: "researched",
    tagline: "The DeFi neo-bank built on restaking.",
    whatItIs:
      "Ether.fi began as a liquid-restaking protocol and is becoming a full DeFi neo-bank. Its three products map to a bank: Stake = savings, Liquid = investing, Cash = a crypto credit card that lets you spend against staked assets without selling them.",
    howItWorks: [
      "Stake: deposit ETH for liquid (re)staking yield — the 'savings account'.",
      "Liquid: curated yield strategies — the 'investment account'.",
      "Cash: a card/smart wallet that borrows against staked assets to spend.",
    ],
    differentiators: [
      "Spend against staked ETH without unwinding the position.",
      "Three stacked products create stickiness + multiple revenue lines.",
      "Native, self-custodial DeFi origin vs. fiat-bank bolt-on.",
    ],
    businessModel: "Staking fees + card interchange + borrowing spread.",
    dependsOn: ["Ethereum staking/restaking (EigenLayer)", "Card issuer", "Stablecoin liquidity"],
    risks: ["Smart-contract + restaking risk.", "Crypto-collateral volatility against card spend."],
    keyFacts: [
      { label: "Founded", value: "2022 (Cayman) — Mike Silagadze, Rok Kopp" },
      { label: "Funding", value: "~$32M (CoinFund, Node Capital, others)" },
      { label: "TVL", value: "~$3.55B (weETH) + $103.9M eBTC + $212.5K eUSD" },
      { label: "Cash launched", value: "Apr 2025 — >$10M/day volume by Jun 2025" },
      { label: "Token", value: "ETHFI (governance)" },
      { label: "Integrations", value: "400+ DeFi protocols + CEX/OTC" },
    ],
    links: [
      { label: "Site", url: "https://ether.fi/" },
      { label: "Stake", url: "https://ether.fi/stake" },
      { label: "Liquid", url: "https://ether.fi/liquid" },
      { label: "Cash", url: "https://ether.fi/cash" },
      { label: "Docs", url: "https://docs.ether.fi/" },
      { label: "Whitepaper", url: "https://docs.ether.fi/ether.fi-whitepaper/" },
    ],
    products: [
      {
        name: "Stake",
        tagline: "Liquid restaking — the 'savings account'.",
        whatItIs:
          "Deposit ETH, BTC, or stablecoins and receive a value-accruing liquid restaking token (weETH, eBTC, eUSD). The underlying is restaked to help secure Ethereum infrastructure (via EigenLayer / Symbiotic), so you keep exposure to the asset while earning staking + restaking rewards — and the receipt token stays liquid and composable across 400+ DeFi protocols.",
        mechanics: [
          "Deposit ETH → mint weETH (value-accruing; rewards compound into the token's redemption value, not a rebasing balance).",
          "Deposit BTC → eBTC; deposit stablecoins → eUSD. All are redeemable for the underlying staked asset.",
          "Underlying is restaked on EigenLayer / Symbiotic to secure networks and capture restaking yield + points.",
          "Tokens plug into DeFi: trade (Bitget), collateral (Aave), fixed yield (Pendle), leverage (Gearbox).",
        ],
        stats: [
          { label: "weETH", value: "~2.36% APY · ~$3.6B TVL" },
          { label: "eBTC", value: "~0.4% APY · ~$103.9M TVL" },
          { label: "eUSD", value: "~0.6% APY · ~$212.5K TVL" },
        ],
      },
      {
        name: "Liquid",
        tagline: "Automated strategy vaults — the 'investment account'.",
        whatItIs:
          "Deposit into a strategy vault and it auto-deploys across the best DeFi protocols, auto-balances, and auto-compounds. A 'set-and-forget' yield layer built on Veda's BoringVault architecture, with optional Nexus Mutual coverage.",
        mechanics: [
          "Pick a vault by asset/goal (Liquid ETH Yield, Liquid USD, Liquid BTC Yield, Liquid Reserve).",
          "Strategists rebalance across protocols but can ONLY move assets among positions pre-encoded in the vault smart contract — they cannot withdraw.",
          "Only the user can deposit or withdraw; earnings auto-compound inside the vault.",
          "Withdrawals queue (72h on most vaults; 7 days on weETHs Super Symbiotic) as a safety mechanism.",
        ],
        stats: [
          { label: "Liquid ETH Yield", value: "~3.22% APY · 216M TVL" },
          { label: "Liquid USD", value: "~4.99% APY · 91.9M TVL" },
          { label: "Liquid BTC Yield", value: "~2.04% APY · 15.5M TVL" },
        ],
      },
      {
        name: "Cash",
        tagline: "DeFi-native, non-custodial credit card — the 'spending account'.",
        whatItIs:
          "A non-custodial cashback card (launched Apr 2025) that lets you spend against your ether.fi portfolio without selling. Borrow against staked/value-accruing collateral, repay anytime with no monthly minimum. Up to 3% cashback, 0% FX on EUR/USD, Apple/Google Pay, 100M+ locations. Issued by a third-party Issuer — not affiliated with the ether.fi protocol.",
        mechanics: [
          "Fund from fiat (bank transfer / personal IBAN) or any non-custodial wallet; spend value-accruing stables.",
          "Borrow-to-spend against collateral instead of selling assets; cashback credits instantly to the account.",
          "Tiered membership ('The Club': Core → Luxe → Pinnacle → VIP) unlocked by Membership Points — higher tiers raise the cashback cap and add lounge/concierge/insurance perks.",
          "Corporate cards: issue to a team with treasury assets as collateral.",
        ],
        stats: [
          { label: "Cashback", value: "Up to 3% (cap scales by Club tier)" },
          { label: "FX fee", value: "0% on EUR/USD, 1% elsewhere" },
          { label: "Volume", value: ">$10M/day by Jun 2025" },
        ],
      },
    ],
    deepDive: [
      {
        heading: "Vault architecture (Veda BoringVault)",
        body:
          "Liquid and the Super Symbiotic LRT run on Veda's BoringVault pattern. The vault token itself is the share; a set of role-separated contracts surrounds it so no single actor can rug depositors.",
        bullets: [
          "BoringVault — holds assets and is the share token users receive.",
          "Teller — the only entry/exit point; mints on deposit, burns on withdraw.",
          "Accountant — prices the share (exchange rate), driving value-accrual.",
          "Lens — read-only helper for quoting balances/rates.",
          "Strategists are constrained to a whitelist of positions encoded in the contract; only users move funds in/out.",
        ],
      },
      {
        heading: "Restaking & points stack",
        body:
          "Deposits are restaked on EigenLayer / Symbiotic to secure networks. Symbiotic only accepts deposits up to a per-asset cap, and only capped deposits earn points until caps are raised — so routing through ether.fi's vault batches deposits and stacks multiple point programs at once.",
        bullets: [
          "Direct Symbiotic deposit → Symbiotic points only.",
          "Via Super Symbiotic (weETHs) → Symbiotic points + ether.fi points + Veda points.",
          "Holder earns the composite staking rate of all yield-bearing assets in the vault (~ the eETH ~3% base, blended).",
        ],
      },
      {
        heading: "Delegation chain & added risk (weETHs example)",
        body:
          "A portion of weETHs collateral is delegated beyond pure restaking to chase extra yield, which layers in counterparty risk. The Cap Protocol allocation routes funds through a real-world credit chain:",
        bullets: [
          "Flow: Symbiotic → Cap Protocol → M11 Credit (borrower) → Pareto Vault → FalconX prime brokerage.",
          "Slashing risk: excessive loan LTV can partially/fully slash delegated funds (loss of principal).",
          "Counterparty risk: FalconX (end borrower) or M11 Credit failing to return capital.",
          "Protocol risk: bugs/exploits in Cap Protocol or the Pareto vault.",
          "Liquidity risk: redemption depends on underlying loan terms; weETHs has a 7-day withdrawal window.",
        ],
      },
      {
        heading: "Security posture",
        bullets: [
          "Audited by Macro and Spearbit (boring-vault audit repo); active bug bounty.",
          "Chaos Labs risk monitoring; open-source on GitHub; decentralized operator set.",
          "Non-custodial throughout — users retain control of deposits and card collateral.",
        ],
      },
    ],
    contracts: [
      { label: "weETHs BoringVault / Token", value: "0x917ceE801a67f933F2e6b33fC0cD1ED2d5909D88" },
      { label: "weETHs Accountant", value: "0xbe16605B22a7faCEf247363312121670DFe5afBE" },
      { label: "weETHs Lens", value: "0x5232bc0F5999f8dA604c42E1748A13a170F94A1B" },
      { label: "weETHs Teller", value: "0x99dE9e5a3eC2750a6983C8732E6e795A35e7B861" },
    ],
  },
  {
    slug: "revolut",
    name: "Revolut",
    url: "https://www.revolut.com/",
    layers: ["L5"],
    product: "Consumer super-app: accounts, cards, FX, crypto, and stablecoin conversion.",
    customer: "68M+ retail consumers",
    moat: "Scale + licenses (MiCA via Cyprus). Fee-free stablecoin↔USD; $10.5B+ stablecoin sent (+156% YoY).",
    region: "40 markets (EU-led)",
    status: "researched",
    tagline: "The fiat-native super-app moving into stablecoins.",
    whatItIs:
      "Revolut is a consumer financial super-app — accounts, cards, FX, investing, and crypto — now adding stablecoin rails at scale. It serves 68M+ retail customers across 40 markets and has cumulatively sent $10.5B+ in stablecoin payments.",
    howItWorks: [
      "Users hold fiat, crypto, and 280+ tokens in one app.",
      "Fee-free 1:1 stablecoin ↔ USD conversion.",
      "Stablecoin settlement across Ethereum, Tron, Solana, Arbitrum.",
    ],
    differentiators: [
      "Massive distribution (68M+ users) + profitability ($2.3B pre-tax, 2025).",
      "Licenses: MiCA via Cyprus → passportable across 30 EEA markets.",
      "Bolting stablecoins onto an already-loved consumer app.",
    ],
    businessModel: "Interchange, subscriptions, FX, and trading spreads.",
    dependsOn: ["Banking + card licenses", "Stablecoin issuers", "Chains"],
    risks: ["Heavy regulatory scrutiny across many jurisdictions.", "Crypto revenue can be cyclical."],
    keyFacts: [
      { label: "Founded", value: "2015 (London)" },
      { label: "Users", value: "68.3M retail, 40 markets" },
      { label: "2025 results", value: "$6B revenue, $2.3B pre-tax profit" },
      { label: "Stablecoin sent", value: "$10.5B+ cumulative (+156% YoY)" },
    ],
    links: [{ label: "Site", url: "https://www.revolut.com/" }],
  },
  {
    slug: "nubank",
    name: "Nubank",
    url: "https://nubank.com.br/",
    layers: ["L5"],
    product: "LatAm digital bank adding stablecoin yield + spend on top of core banking.",
    customer: "120M+ consumers (Brazil/LatAm)",
    moat: "Massive distribution; diversifying from interchange/FX into stablecoin yield products.",
    region: "Brazil / LatAm",
    status: "researched",
    tagline: "LatAm's banking giant, adding stablecoin rails.",
    whatItIs:
      "Nubank is one of the world's largest digital banks, with 120M+ customers across Brazil and Latin America. It's layering stablecoin features — yield and spend — onto an enormous existing user base, diversifying beyond interchange and FX.",
    howItWorks: [
      "Core digital bank: accounts, cards, credit for 120M+ users.",
      "Adding USDC/USDT support with in-app conversion + spend.",
      "Positioned to route stablecoin yield to a massive retail base.",
    ],
    differentiators: [
      "Distribution at a scale few crypto-natives can reach.",
      "Profitable (~$2B net income, 2024).",
      "Trusted consumer brand across LatAm.",
    ],
    businessModel: "Interchange, credit, FX — adding stablecoin yield spread.",
    dependsOn: ["Banking licenses", "Stablecoin issuers"],
    risks: ["LatAm macro + FX volatility.", "[verify exact stablecoin product scope]"],
    keyFacts: [
      { label: "Founded", value: "2013 (São Paulo)" },
      { label: "Users", value: "120M+ (Brazil, Mexico, Colombia)" },
      { label: "Listed", value: "NYSE: NU" },
      { label: "Status", value: "🟡 verify stablecoin scope" },
    ],
    links: [{ label: "Site", url: "https://nubank.com.br/" }],
  },
  {
    slug: "ur-global",
    name: "UR Global",
    url: "https://www.ur.app/",
    layers: ["L5"],
    product: "Multi-currency neo-bank with unified crypto + fiat accounts and Mastercard spend.",
    customer: "Consumers in 45+ countries",
    moat: "Native Ethena USDe integration (up to ~5% APY); fee-free fiat ⇄ USDe conversion.",
    region: "45+ countries",
    status: "researched",
    tagline: "A crypto-native neo-bank built around USDe.",
    whatItIs:
      "UR Global is a multi-currency neo-bank offering unified crypto and fiat accounts. It integrated Ethena's USDe at launch, so users can hold USDe alongside fiat, convert fee-free, earn up to ~5% APY, and spend via Mastercard across 45+ countries.",
    howItWorks: [
      "Unified account holds fiat + crypto, including USDe.",
      "Fee-free conversion between fiat and USDe.",
      "USDe balances earn up to ~5% APY; spend via Mastercard.",
    ],
    differentiators: [
      "USDe yield baked into the consumer experience.",
      "Multi-currency from day one across 45+ countries.",
      "Card spend directly from yield-bearing balances.",
    ],
    businessModel: "Interchange + spread; shares Ethena yield with users.",
    dependsOn: ["Ethena (USDe)", "Mastercard", "Banking partners"],
    risks: ["Inherits USDe's funding-rate risk.", "[verify scale, licensing, launch markets]"],
    keyFacts: [
      { label: "Yield asset", value: "Ethena USDe (~5% APY)" },
      { label: "Spend", value: "Mastercard" },
      { label: "Reach", value: "45+ countries" },
      { label: "Status", value: "Live" },
    ],
    links: [{ label: "Site", url: "https://www.ur.app/" }],
  },
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
