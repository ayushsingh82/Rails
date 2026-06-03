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
    product: "Embeddable fiat ⇄ crypto on/off-ramp (buy, sell, swaps) via widget, SDK, or API; NFT checkout + merchant/commerce stack.",
    customer: "Wallets, apps, exchanges, NFT platforms, consumers",
    moat:
      "Consumer-recognized brand + reach: ~160–180 countries, broad local payment methods (cards, PayPal, Venmo, Apple/Google Pay), 250+ partner integrations, full licensing + fraud stack.",
    region: "Global (160+ countries)",
    status: "researched",
    tagline: "The consumer-recognized way to buy, sell, and swap crypto.",
    whatItIs:
      "MoonPay is a fiat-to-crypto on/off-ramp that teams embed into their products. Users buy, sell, and swap crypto with cards, bank transfers, PayPal, Venmo, Revolut, and Apple/Google Pay across ~160+ countries. Partners integrate via a hosted widget, web/React/mobile SDKs, or REST API, and MoonPay handles KYC, payment acceptance, fraud, liquidity, and settlement. It has expanded beyond ramps into NFT checkout, a commerce/payments stack (via the 2025 Helio acquisition), and stablecoin infrastructure (via the 2025 Iron acquisition).",
    howItWorks: [
      "Partners embed MoonPay via a hosted widget (buy.moonpay.com / sell.moonpay.com), web/React/mobile SDKs, or the REST API.",
      "Users buy crypto with card, bank transfer, PayPal, Venmo, Revolut, or Apple/Google Pay; KYC + fraud run inside MoonPay.",
      "MoonPay sources liquidity and pays out the crypto on-chain to the user's wallet (and the reverse for the off-ramp/sell flow).",
      "Swaps let users trade one crypto for another in-widget; NFT checkout lets buyers pay fiat for an NFT.",
      "Order state is pushed to the partner via signed webhooks (Buy: created/updated/failed; Sell: updates + requote events).",
    ],
    differentiators: [
      "Consumer brand recognition + a polished, high-converting purchase flow.",
      "~160+ country reach with an unusually broad set of payment methods (PayPal, Venmo, Revolut, Apple/Google Pay, cards, bank transfer).",
      "More than a ramp: swaps, NFT checkout, and a commerce/stablecoin stack via the Helio + Iron acquisitions.",
      "Large balance sheet (~$645M raised + a $200M Galaxy credit line) funds liquidity for volume spikes and aggressive expansion.",
    ],
    businessModel:
      "Fees + spread on each on/off-ramp transaction — roughly ~1% on bank transfer to ~4.5% on card (min ~$3.99), plus a quoted-rate spread (~1–3%) and network fees; commerce/checkout fees on the Helio side.",
    dependsOn: [
      "Card networks (Visa/Mastercard)",
      "Banking partners + acquirers",
      "Alt payment rails (PayPal, Venmo, Revolut, Apple/Google Pay)",
      "Supported chains",
      "Stablecoin / market-maker liquidity",
    ],
    risks: [
      "High card fees + embedded spread vs. cheaper rails (e.g. Coinbase zero-fee USDC).",
      "Fee compression as ramps commoditize.",
      "Card fraud + chargebacks at scale.",
      "Regulatory exposure as a money transmitter / VASP across many jurisdictions (MTLs, MiCA/CASP). [verify exact current license list]",
    ],
    keyFacts: [
      { label: "Founded", value: "2019 — Ivan Soto-Wright & Victor Faramond" },
      { label: "Funding", value: "~$645M raised; latest ~$200M (Mar 2025) + $200M Galaxy credit line" },
      { label: "Valuation", value: "~$3.4B (2021 round); reportedly raising at ~$5B w/ ICE in talks (late 2025) [verify if closed]" },
      { label: "Coverage", value: "~160+ countries (often cited up to 180); 250+ partner integrations" },
      { label: "Scale", value: "30M+ users; $8B+ in crypto transacted [verify current]" },
      { label: "2025 M&A", value: "Acquired Helio (commerce, ~$175M) and Iron (stablecoin infra)" },
      { label: "Payment methods", value: "Card, bank transfer (USD/EUR/GBP), PayPal, Venmo, Revolut, Apple/Google Pay" },
    ],
    links: [
      { label: "Site", url: "https://www.moonpay.com/" },
      { label: "Developer docs", url: "https://dev.moonpay.com/" },
      { label: "Quickstart", url: "https://dev.moonpay.com/docs/quickstart" },
      { label: "Widget API reference", url: "https://dev.moonpay.com/api-reference/widget" },
      { label: "URL signing", url: "https://dev.moonpay.com/docs/off-ramp-enhance-security-using-signed-urls" },
      { label: "Webhooks overview", url: "https://dev.moonpay.com/reference/reference-webhooks-overview" },
      { label: "Pricing disclosure", url: "https://www.moonpay.com/legal/pricing_disclosure" },
    ],
    builder: {
      architecture:
        "MoonPay sits between card acquirers / banks / alt-payment rails and the chains. The partner renders a hosted widget (buy.moonpay.com / sell.moonpay.com) — embedded as an iframe, overlay, or new tab — and MoonPay runs KYC, payment acceptance, fraud, liquidity sourcing, and the on-chain payout (reverse for sell). Unlike a publishable-key-only ramp, MoonPay requires the widget URL to be SIGNED: whenever sensitive params (email, walletAddress) are passed, the partner's backend signs the URL's query string with HMAC-SHA256 using the SECRET key, so the secret never touches the client. Order state is delivered to the partner via signed webhooks (Moonpay-Signature-V2 header).",
      integration:
        "Two layers: (1) a publishable apiKey (pk_) used on the client to identify the integration, and (2) a secret key (sk_) used server-side only to sign URLs and verify webhooks. Integrate via the hosted widget URL, the Web SDK (script attaches window.MoonPayWebSdk, or as a package), the React SDK (components expose an onUrlSignatureRequested async prop), or React Native / iOS / Android SDKs. For SDKs return just the signature via updateSignature; for raw URLs return the whole signed URL. Sandbox hosts (buy-sandbox.moonpay.com) mirror production by swapping keys.",
      apiSurface: [
        { name: "buy.moonpay.com (widget URL)", desc: "On-ramp widget. Core params: apiKey, currencyCode, baseCurrencyCode, baseCurrencyAmount, walletAddress, paymentMethod, redirectURL, externalCustomerId, signature." },
        { name: "sell.moonpay.com (widget URL)", desc: "Off-ramp widget. Params: apiKey, baseCurrencyCode (crypto being sold), quoteCurrencyCode (fiat), refundWalletAddress, externalCustomerId, signature." },
        { name: "signature (query param)", desc: "HMAC-SHA256 of the URL query string (incl. leading '?'), keyed by the secret API key, base64-then-URL-encoded. Required when passing email/walletAddress or the widget won't load." },
        { name: "Web SDK (window.MoonPayWebSdk)", desc: "moonPay({ flow:'buy'|'sell', environment, variant, params }); .show()/.close(); supports updateSignature() callback for backend-signed URLs." },
        { name: "React SDK <MoonPayBuyWidget />", desc: "Component with visible, variant, baseCurrencyCode, walletAddress + onUrlSignatureRequested async prop that returns the backend-generated signature." },
        { name: "Webhooks (Buy / Sell)", desc: "POST events: transaction created / updated / failed (buy); sell updates + sell_transaction_requote_required. Verify Moonpay-Signature-V2; respond 200 within 10s; de-dupe (events may repeat / arrive out of order)." },
        { name: "REST API + Virtual Accounts API", desc: "Server-side currencies, quotes, transactions, and customer data; Virtual Accounts API requests signed with RSA-SHA256 digital signatures." },
      ],
      snippet: {
        lang: "ts",
        caption: "Minimal on-ramp: build a buy-widget URL on the server and HMAC-sign it before handing it to the client.",
        code: `import crypto from 'crypto';

// SECRET key stays on the server — never ship it to the client.
const SECRET = process.env.MOONPAY_SECRET_KEY!;   // sk_live_...
const PK = process.env.MOONPAY_PUBLISHABLE_KEY!;  // pk_live_...

export function buildSignedBuyUrl() {
  const base = 'https://buy.moonpay.com';
  const qs = new URLSearchParams({
    apiKey: PK,
    currencyCode: 'usdc',          // crypto to receive
    baseCurrencyCode: 'usd',       // fiat to pay with
    baseCurrencyAmount: '50',
    walletAddress: '0xabc...def',  // sensitive -> signature now required
    redirectURL: 'https://rails.app/done',
  });

  const search = \`?\${qs.toString()}\`;
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(search)                // sign the query string incl. '?'
    .digest('base64');

  return \`\${base}\${search}&signature=\${encodeURIComponent(signature)}\`;
}`,
      },
      buildNotes: [
        "Two keys: publishable (pk_) on the client, secret (sk_) server-side only for URL signing + webhook verification. The widget refuses to load if a URL carrying email/walletAddress isn't signed.",
        "Treat the SIGNED WEBHOOK as the source of truth for order status — not the client redirect. Verify the Moonpay-Signature-V2 header, respond 200 within ~10s, and de-dupe (events may repeat or arrive out of order).",
        "Start on the sandbox hosts (buy-sandbox.moonpay.com) with test keys; flip to production by swapping keys + host.",
        "[verify against current docs — exact param names (e.g. quoteCurrencyCode vs currencyCode on sell) and the full webhook event list evolve]",
      ],
    },
    deepDive: [
      {
        heading: "On/off-ramp flow & architecture",
        body:
          "MoonPay is the regulated, fraud-bearing layer between traditional payment rails and the chains. The partner only renders a widget; MoonPay does the heavy, regulated work.",
        bullets: [
          "On-ramp: user pays fiat (card / bank / PayPal / Venmo / Apple-Google Pay) → MoonPay runs KYC + fraud → sources crypto → pays out on-chain to the wallet.",
          "Off-ramp (sell): user sends crypto to a MoonPay-controlled address → MoonPay pays out fiat to card/bank.",
          "Swaps: in-widget crypto-to-crypto exchange; NFT checkout: fiat payment for an NFT.",
          "Async status flows back via signed webhooks; the client redirect is only a UX hint, not settlement truth.",
        ],
      },
      {
        heading: "Security model: signed URLs + signed webhooks",
        body:
          "MoonPay's distinguishing developer detail is mandatory cryptographic signing in both directions, which keeps the secret key off the client while still allowing rich pre-filled widgets.",
        bullets: [
          "Outbound: widget URLs are signed HMAC-SHA256(querystring, secretKey) → base64 → URL-encode; required whenever email/walletAddress are passed.",
          "SDKs accept just the signature (updateSignature / onUrlSignatureRequested); raw integrations append &signature= to the URL.",
          "Inbound: webhooks carry a Moonpay-Signature-V2 header partners must verify; idempotency + de-dupe required.",
          "Virtual Accounts API uses RSA-SHA256 request signing for a higher-assurance server-to-server channel.",
        ],
      },
      {
        heading: "Fees & economics",
        body:
          "Revenue is a blend of an explicit platform fee and an embedded spread, which makes the headline rate understate true cost.",
        bullets: [
          "Card: up to ~4.5% (min ~$3.99); bank transfer: ~1% (min ~$3.99).",
          "Plus a ~1–3% spread baked into the quoted rate (not a separate line item) + on-chain network fees.",
          "All-in effective cost can reach ~7–8% on small card buys — the core vulnerability vs. zero-fee USDC rails.",
          "Fees vary by order type, volume, fiat, asset, location, and payment method. [verify current numbers against pricing disclosure]",
        ],
      },
      {
        heading: "Strategy, M&A & risk",
        bullets: [
          "2025 M&A: acquired Helio (~$175M, crypto commerce/checkout) and Iron (stablecoin infrastructure) — pushing beyond ramps toward a payments/stablecoin platform.",
          "Liquidity: $200M revolving credit line from Galaxy (Mar 2025) to absorb transaction spikes.",
          "Funding/valuation: ~$645M raised; ~$3.4B (2021); reportedly raising near ~$5B with ICE (NYSE parent) in talks late 2025 [verify if closed].",
          "Forward bet: adapting the platform for AI-agent-initiated transactions (2026).",
          "Risks: fee compression, card fraud/chargebacks, and multi-jurisdiction regulatory exposure as a money transmitter / VASP.",
        ],
      },
    ],
  },
  {
    slug: "transak",
    name: "Transak",
    url: "https://transak.com/",
    layers: ["L1"],
    product:
      "White-label embedded on/off-ramp; widget + SDK, Transak One (fiat→smart-contract in one tx), and address-based 'Stream' off-ramp.",
    customer: "Apps, wallets & developers",
    moat:
      "Widest local rails (UPI, PIX, SEPA Instant, ACH, PayID, Faster Payments); broad licensing (FinCEN, FCA, EU VASP, FINTRAC, AUSTRAC, FIU-IND) across 100+ markets and 75+ chains.",
    region: "Global (115+ countries)",
    status: "researched",
    tagline: "Developer-first ramp with the widest local rails.",
    whatItIs:
      "Transak is a fiat-to-crypto on/off-ramp built around a white-label, embedded developer experience. Apps drop in a widget or SDK and Transak handles KYC, payment acceptance, fraud, fiat settlement, and the on-chain payout. Beyond plain buy/sell it offers Transak One (fund a smart-contract interaction with fiat in a single transaction) and Stream (send crypto to a personal deposit address and get auto fiat payout). It covers 100+ countries, 70+ fiat currencies, 130+ cryptocurrencies, and 75+ blockchains.",
    howItWorks: [
      "A developer registers for an API key, then calls the Create Widget URL API server-side with widget params to mint a short-lived, single-use widgetUrl (sessionId).",
      "The @transak/ui-js-sdk renders that widgetUrl as a hosted/embedded iframe; the user completes KYC once and pays via a local rail.",
      "Pay-in rails: UPI (India), PIX (Brazil), SEPA Instant (EU), ACH + card (US), Faster Payments (UK), PayID (AU) — Transak sources crypto liquidity and pays out to the user's wallet.",
      "Off-ramp: the reverse via the widget, or via Stream — a one-time setup provisions a per-asset/per-network deposit address; any crypto sent there auto-pays fiat to the registered bank/card.",
      "Transak One: the partner passes a smart-contract address + calldata; Transak converts fiat to the source token and executes the contract call (mint, deposit, swap, stake) in one transaction, delivering receipt tokens to the user.",
      "Order state flows back to the partner via the SDK events, the Get Order(s) REST API, webhooks (JWT-encrypted), and WebSockets.",
    ],
    differentiators: [
      "Widest local payment-method coverage of any ramp — deep emerging-market rails (UPI, PIX) plus EU/US/UK/AU instant rails.",
      "White-label + server-side widget-URL model keeps the API key off the client and lets partners pre-configure the entire flow.",
      "Transak One turns a ramp into a payments primitive: fiat straight into an arbitrary smart-contract call, not just a wallet balance.",
      "Broad multi-jurisdiction licensing (US FinCEN MSB, UK FCA, EU VASP, Canada, Australia, India) underpins 100+ markets and 75+ chains across 450+ integrations.",
    ],
    businessModel:
      "Spread + fee on each on/off-ramp transaction (card typically ~3.5–5.5%, lower for bank/local rails by region) [verify exact tiers]; revenue share with partners on volume.",
    dependsOn: [
      "Local payment rails (UPI, PIX, SEPA, ACH, Faster Payments, PayID)",
      "Card networks & banking partners",
      "Liquidity / market makers for crypto pricing + FX",
      "Supported chains and stablecoin issuers (USDC, USDT, EURC, USDG)",
    ],
    risks: [
      "Compliance overhead across 100+ countries with divergent VASP/MSB regimes (MiCA in the EU, MTLs in the US).",
      "Card fraud + chargebacks on the on-ramp; FX/liquidity volatility in emerging-market corridors.",
      "Fee pressure as ramps commoditize (e.g. Coinbase zero-fee USDC).",
      "Reliance on a single-use, 5-minute widget URL adds a server round-trip that partners must wire up correctly.",
    ],
    keyFacts: [
      { label: "Founded", value: "2019 — Sami Start, Yeshu Agarwal" },
      { label: "Funding", value: "~$37M total; Series B $16M (Aug 2025, Tether + IDG Capital); Series A $20.4M (2023)" },
      { label: "Licenses", value: "FinCEN (US MSB), FCA (UK), EU VASP, FINTRAC (CA), AUSTRAC (AU), FIU-IND (India)" },
      { label: "Coverage", value: "115+ countries, 70+ fiat, 130+ crypto, 75+ chains; off-ramp in 40+ countries" },
      { label: "Integrations", value: "450+ apps/wallets" },
      { label: "Products", value: "On-Ramp, Off-Ramp, Transak One, Stream, NFT Checkout, OTC" },
    ],
    links: [
      { label: "Site", url: "https://transak.com/" },
      { label: "Docs", url: "https://docs.transak.com/" },
      { label: "SDK (ui-js-sdk)", url: "https://docs.transak.com/docs/transak-sdk" },
      { label: "Query parameters", url: "https://docs.transak.com/docs/query-parameters" },
      { label: "Transak One", url: "https://docs.transak.com/docs/sdk-transak-one" },
      { label: "Off-Ramp / Stream", url: "https://docs.transak.com/docs/transak-off-ramp" },
      { label: "Webhooks", url: "https://docs.transak.com/features/webhooks" },
      { label: "Global coverage", url: "https://transak.com/global-coverage" },
      { label: "npm @transak/ui-js-sdk", url: "https://www.npmjs.com/package/@transak/ui-js-sdk" },
    ],
    builder: {
      architecture:
        "Transak sits between local payment rails / card acquirers / banks and the chains. Unlike a pure publishable-key model, the current flow is server-assisted: the partner backend calls the Create Widget URL API (authenticated with the API key) to encapsulate all widget params into a single-use, 5-minute widgetUrl carrying a sessionId. The frontend SDK only ever sees that opaque URL, so the API key never touches the client. Transak runs KYC, payment acceptance, fraud, liquidity sourcing, and the on-chain payout (and the reverse for off-ramp). For Transak One, Transak additionally executes a partner-supplied smart-contract call after converting fiat to the source token. Order state is pushed back via SDK events, webhooks (JWT-encrypted with the partner's access token), WebSockets, and the Get Order(s) REST API.",
      integration:
        "Primary path: the @transak/ui-js-sdk (successor to the legacy @transak/transak-sdk) renders the widgetUrl as a hosted or embedded iframe; one Transak instance = one widget mounted to a containerId. Native iOS, Android, React Native, and Flutter SDKs exist, plus a REST/Whitelabel API for headless flows. apiKey and referrerDomain are mandatory; productsAvailed selects BUY/SELL; the rest of the flow (asset, network, fiat, amount, wallet, payment method, partnerOrderId, redirectURL, theme) is configured via widget params.",
      apiSurface: [
        { name: "POST Create Widget URL", desc: "Server-side: pass widgetParams (apiKey, referrerDomain, productsAvailed, cryptoCurrencyCode, network, walletAddress, fiatCurrency, fiatAmount…) → returns a single-use widgetUrl + sessionId, valid 5 minutes." },
        { name: "POST refresh-access-token", desc: "Exchange the API key + secret for an access token used to sign widget URLs and decrypt webhook payloads; issuing a new token invalidates the prior one." },
        { name: "GET Get Orders / Get Order By ID", desc: "Poll order objects and current status (e.g. AWAITING_PAYMENT_FROM_USER → PROCESSING → COMPLETED / FAILED / EXPIRED)." },
        { name: "Webhooks", desc: "Real-time order lifecycle callbacks to the partner backend; the data field is a JWT you decrypt with your access token — treat as source of truth." },
        { name: "WebSockets", desc: "Live order-status stream as an alternative to polling for in-session UI updates." },
        { name: "new Transak(config) + transak.init()", desc: "Client SDK: mount the widget from a widgetUrl into a containerId; configure widgetHeight/widgetWidth." },
        { name: "transak.on(Transak.EVENTS.*)", desc: "Subscribe to TRANSAK_ORDER_CREATED, TRANSAK_ORDER_SUCCESSFUL, and TRANSAK_WIDGET_CLOSE to advance your own UI." },
      ],
      snippet: {
        lang: "ts",
        caption: "Two-step flow: mint a widgetUrl server-side, then render + listen for the order client-side.",
        code: `// 1) SERVER: mint a single-use widgetUrl (keeps the API key off the client)
const res = await fetch('https://api.transak.com/api/v2/widget-url', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    apiKey: TRANSAK_API_KEY,            // secret — server-side only
    referrerDomain: 'rails.app',
    widgetParams: {
      productsAvailed: 'BUY',           // or 'SELL' for off-ramp
      cryptoCurrencyCode: 'USDC',
      network: 'base',
      fiatCurrency: 'EUR',
      fiatAmount: 50,
      walletAddress: '0xabc...def',
      partnerOrderId: 'order_123',
    },
  }),
});
const { widgetUrl } = await res.json(); // valid ~5 min, single use

// 2) CLIENT: render the widget and react to order events
import { Transak } from '@transak/ui-js-sdk';

const transak = new Transak({ widgetUrl, containerId: 'transak-mount' });
transak.init();

transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (order) => {
  console.log('paid', order);          // confirm via webhook server-side too
  transak.close();
});
transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => transak.cleanup());`,
      },
      buildNotes: [
        "The legacy @transak/transak-sdk (apiKey + environment passed on the client) is deprecated — new integrations use @transak/ui-js-sdk with the server-minted widgetUrl. [verify the exact widget-url endpoint path/version against current docs]",
        "widgetUrl/sessionId is single-use and expires in ~5 minutes; mint a fresh one per user flow rather than caching it.",
        "Treat webhooks (JWT-decrypted with your access token) or Get Order By ID as the source of truth for settlement — the client TRANSAK_ORDER_SUCCESSFUL event only means payment was initiated.",
        "Use the STAGING environment + staging API key first; switch to PRODUCTION by swapping credentials.",
        "Transak One uses extra widget params (smartContractAddress, sourceTokenData, calldata, estimatedGasLimit, cryptoCurrencyData) to fund and execute a contract call in one transaction. [verify exact param names against docs]",
      ],
    },
    products: [
      {
        name: "On-Ramp",
        tagline: "Buy crypto with local fiat rails.",
        whatItIs:
          "An embeddable widget/SDK that lets a partner's users buy 130+ cryptocurrencies across 75+ chains with cards or local bank rails, after a one-time KYC. The differentiator is breadth of local pay-in methods.",
        mechanics: [
          "User picks asset + amount; pays via UPI, PIX, SEPA Instant, ACH, Faster Payments, PayID, or card.",
          "Transak sources crypto liquidity, charges a fee/spread, and pays out on-chain to the user's wallet.",
          "Partner pre-configures asset/network/amount/wallet via widget params; KYC is reused across sessions.",
        ],
        stats: [
          { label: "Pay-in rails", value: "Card + UPI / PIX / SEPA Instant / ACH / Faster Payments / PayID" },
          { label: "Assets", value: "130+ crypto, 75+ chains" },
          { label: "Markets", value: "64+ on-ramp countries [verify], 70+ fiat" },
        ],
      },
      {
        name: "Off-Ramp",
        tagline: "Sell crypto to fiat via the widget.",
        whatItIs:
          "The reverse flow — users sell crypto and receive fiat to a bank account or card, handled in the same embedded widget with KYC and payout compliance built in.",
        mechanics: [
          "User sends crypto to Transak; fiat is paid out to a registered bank/card.",
          "SEPA Instant and fast-funds-eligible cards settle quickly; standard rails take longer.",
          "Live in 40+ countries with 20+ networks supported. [verify]",
        ],
        stats: [
          { label: "Coverage", value: "40+ countries" },
          { label: "Networks", value: "20+" },
        ],
      },
      {
        name: "Transak One",
        tagline: "Fiat straight into a smart-contract call, in one transaction.",
        whatItIs:
          "A single-transaction product where fiat is converted to a source token and used to execute an arbitrary smart-contract interaction — mint an NFT, deposit to Aave, stake, swap, borrow/lend — with receipt tokens delivered to the user's wallet. Removes the 'buy crypto, then do the thing' two-step.",
        mechanics: [
          "Partner passes the target smartContractAddress + calldata for the contract function.",
          "Transak converts fiat to the required source token, executes the call, and delivers any receipt tokens (e.g. LSTs) back to the user.",
          "Gas + source token amounts are estimated via params like estimatedGasLimit and sourceTokenData. [verify param names]",
        ],
        stats: [
          { label: "Use cases", value: "NFT mint, deposit/stake/swap, lending" },
          { label: "Pattern", value: "Fiat → token → contract call in one tx" },
        ],
      },
      {
        name: "Stream",
        tagline: "Address-based automatic off-ramp.",
        whatItIs:
          "A 'one-click crypto-to-fiat' off-ramp: after a one-time KYC + payout-details setup, the user gets a unique deposit address per crypto/network. Any crypto sent to that address triggers an automatic fiat payout — no widget needed per transaction.",
        mechanics: [
          "One-time setup: KYC + register payout bank/card.",
          "User is provisioned a persistent per-asset/per-network deposit address.",
          "Crypto sent to the address auto-converts and pays out fiat (SEPA Instant / fast-funds cards near-instant).",
        ],
        stats: [
          { label: "Model", value: "Per-asset deposit address → auto fiat payout" },
          { label: "Setup", value: "One-time KYC + payout details" },
        ],
      },
    ],
    deepDive: [
      {
        heading: "Integration flow (server-minted widget URL)",
        body:
          "Transak's current model splits work between backend and frontend so the API key never reaches the browser. The result is a slightly heavier integration than a pure publishable-key widget, but a more secure one.",
        bullets: [
          "Backend exchanges API key (+ secret) for an access token via refresh-access-token.",
          "Backend calls Create Widget URL with widgetParams → receives a single-use widgetUrl (sessionId), valid ~5 minutes.",
          "Frontend mounts the widgetUrl with @transak/ui-js-sdk into a containerId via new Transak(config).init().",
          "Order tracking layered: client events (TRANSAK_ORDER_CREATED/SUCCESSFUL) for UX, plus webhooks / WebSockets / Get Order By ID for truth.",
        ],
      },
      {
        heading: "Local rails & coverage",
        body:
          "Transak's edge is the breadth of local pay-in/pay-out methods — particularly in emerging markets where card rails are weak — layered on top of standard card and instant-bank rails in developed markets.",
        bullets: [
          "India: UPI; Brazil: PIX; EU: SEPA Instant; US: ACH + card; UK: Faster Payments; Australia: PayID.",
          "On-ramp across 64+ countries / 115+ overall, 70+ fiat currencies, 130+ crypto, 75+ chains. [verify exact counts]",
          "Off-ramp narrower: 40+ countries, 20+ networks, expanding.",
          "Stablecoin breadth includes USDC, USDT, EURC (Circle) and USDG (Paxos) for MiCA-aligned EU flows.",
        ],
      },
      {
        heading: "Compliance & licensing",
        body:
          "A multi-jurisdiction license stack is the real moat — it's what lets partners switch on a market by changing a config rather than acquiring their own licenses.",
        bullets: [
          "US: FinCEN-registered MSB; UK: FCA-registered; EU: VASP registration (migrating toward MiCA/CASP). [verify MiCA CASP status]",
          "Canada: FINTRAC; Australia: AUSTRAC; India: FIU-IND.",
          "KYC is collected once per user and reused across partner sessions; sanctions screening + fraud handled in-platform.",
          "Webhook payloads are JWT-encrypted with the partner's access token so order data isn't exposed in transit.",
        ],
      },
      {
        heading: "Fees & risk",
        bullets: [
          "Card on-ramp fees typically ~3.5–5.5% by region; bank/local rails cheaper. [verify current tiers]",
          "Revenue = fee + spread on each transaction, with partner revenue-share on volume.",
          "Chargeback/fraud risk on card on-ramps; FX + liquidity risk in emerging-market corridors.",
          "Fee-compression pressure from zero-fee USDC rivals (Coinbase Onramp) and aggregators routing for best quote.",
        ],
      },
    ],
  },
  {
    slug: "coinbase-onramp",
    name: "Coinbase Onramp",
    url: "https://www.coinbase.com/developer-platform/products/onramp",
    layers: ["L1"],
    product: "On/off-ramp delivered as a hosted buy/sell URL, drop-in React components, or a headless REST API.",
    customer: "Developers, wallets, and dApps building on USDC + Base",
    moat:
      "Zero-fee USDC on/off-ramp + guest checkout (no Coinbase account), backed by the public, regulated Coinbase exchange and distributed through OnchainKit / Base.",
    region: "Global (US + 100+ countries)",
    status: "researched",
    tagline: "Zero-fee USDC ramp from a public, regulated exchange — embeddable as a URL, a component, or an API.",
    whatItIs:
      "Coinbase Onramp (and its sibling Offramp) is the fiat ⇄ crypto product of the Coinbase Developer Platform (CDP). It lets any app convert a card, bank transfer, Apple/Google Pay, or an existing Coinbase balance into on-chain crypto — and back out again. Its headline is a zero-fee on/off-ramp for USDC, and a 'guest checkout' flow that lets a user buy without a Coinbase account. It ships in three depths: a hosted one-click-buy URL, drop-in React components (OnchainKit's FundButton / FundCard), and a headless REST API for fully custom flows.",
    howItWorks: [
      "Pick an integration depth: hosted Onramp URL (Coinbase renders the full buy/sell UI), OnchainKit Fund components (FundButton / FundCard embedded in your React app), or the headless REST API (you build the entire UI and call quote/order endpoints).",
      "Your backend mints a short-lived, single-use session token from the CDP Session Token API using your CDP API key — since July 31, 2025 every Onramp/Offramp URL must be securely initialized with this token rather than raw wallet addresses.",
      "The user authenticates / pays via debit card, ACH/bank, Apple Pay, Google Pay, an existing Coinbase balance, or guest checkout (no account); Coinbase runs KYC, fraud, and payment acceptance.",
      "Coinbase sources liquidity from its exchange, settles the crypto on-chain to the user's wallet (USDC on Base is the zero-fee path), and exposes order state via a transaction-status endpoint.",
    ],
    differentiators: [
      "Zero fees on USDC on/off-ramp (subject to approval) — undercuts the ~1–4.5% card fees of MoonPay/Transak.",
      "Guest checkout: buy up to a weekly cap with a debit card or Apple Pay without ever creating a Coinbase account.",
      "Three integration tiers from one product — hosted URL, React components, or headless API — so it scales from a one-line button to a fully white-label flow.",
      "Backed by a public, NASDAQ-listed, regulated exchange (COIN) and pulled into the Base/OnchainKit developer funnel.",
    ],
    businessModel:
      "Spread + fees on non-USDC and card/Apple Pay purchases (typically ~0–2.5% depending on method/region); USDC ramp is fee-free as a loss-leader. The strategic return is ecosystem pull — funneling fiat into USDC, Coinbase custody, and the Base L2.",
    dependsOn: [
      "Coinbase exchange (liquidity + custody)",
      "USDC / Circle",
      "Base (and other supported L2s/chains)",
      "Card networks + banking partners (ACH, Apple Pay, Google Pay)",
      "CDP API keys + Session Token service",
    ],
    risks: [
      "Strategically steers volume toward Coinbase's own ecosystem (USDC, custody, Base) rather than being chain-neutral.",
      "Mandatory session-token init (since Jul 31 2025) means every integration needs a backend — no purely client-side embed.",
      "Guest-checkout and per-region caps/limits constrain large purchases; coverage varies by country.",
      "Fee-compression strategy depends on Coinbase continuing to subsidize the zero-fee USDC path.",
    ],
    keyFacts: [
      { label: "Parent", value: "Coinbase (NASDAQ: COIN), founded 2012" },
      { label: "Part of", value: "Coinbase Developer Platform (CDP)" },
      { label: "Headline", value: "Zero-fee USDC on/off-ramp (approval-gated)" },
      { label: "Integration tiers", value: "Hosted URL · OnchainKit Fund components · headless REST API" },
      { label: "Auth", value: "Single-use session token (mandatory since Jul 31, 2025); 5-min expiry [verify]" },
      { label: "Payments", value: "Debit card, ACH/bank, Apple Pay, Google Pay, Coinbase balance, guest checkout" },
      { label: "Guest limit (US)", value: "Up to ~$500/week, $5 min [verify]" },
      { label: "Networks", value: "Base + other supported chains; USDC is the zero-fee asset" },
    ],
    links: [
      { label: "Onramp product", url: "https://www.coinbase.com/developer-platform/products/onramp" },
      { label: "Onramp overview (docs)", url: "https://docs.cdp.coinbase.com/onramp-&-offramp/onramp-apis/onramp-overview" },
      { label: "Generating an Onramp URL", url: "https://docs.cdp.coinbase.com/onramp-&-offramp/onramp-apis/generating-onramp-url" },
      { label: "Session token auth", url: "https://docs.cdp.coinbase.com/onramp-&-offramp/session-token-authentication" },
      { label: "Create buy quote (REST)", url: "https://docs.cdp.coinbase.com/api-reference/rest-api/onramp-offramp/create-buy-quote" },
      { label: "Get buy options (REST)", url: "https://docs.cdp.coinbase.com/api-reference/rest-api/onramp-offramp/get-buy-options" },
      { label: "OnchainKit Fund (Base docs)", url: "https://docs.base.org/onchainkit/fund/fund-button" },
      { label: "FundCard launch", url: "https://www.coinbase.com/developer-platform/discover/launches/fundcard" },
      { label: "Onramp demo app (GitHub)", url: "https://github.com/coinbase/onramp-demo-application" },
    ],
    builder: {
      architecture:
        "Coinbase Onramp sits between Coinbase's regulated exchange/custody and the destination chain. Unlike a publishable-key widget, it requires a server: your backend signs a JWT with your CDP API key, calls the Session Token API to mint a single-use token, then hands that token to the client. The client either redirects to a hosted Coinbase buy/sell URL, renders an OnchainKit Fund component, or — in the headless model — your own UI calls the REST quote/order endpoints. Coinbase owns KYC, payment acceptance, fraud, liquidity, and the on-chain payout; you own the wallet address and order correlation. USDC settled on Base is the zero-fee path.",
      integration:
        "Three tiers: (1) Hosted — generateOnrampURL / getOnrampBuyUrl builds a Coinbase-hosted URL initialized with the session token. (2) Components — @coinbase/onchainkit/fund exports <FundButton /> (opens the right flow for EOA vs Coinbase Smart Wallet) and <FundCard /> (an embedded fiat→crypto card). (3) Headless — the Onramp REST API (buy options, buy quote, order/session, transaction status) for a fully custom UI. All three require the server-minted session token.",
      apiSurface: [
        { name: "POST /onramp/v1/token", desc: "Session Token API — mint a single-use token (server-side, JWT-authed with your CDP key). Required to init every Onramp/Offramp URL since Jul 31, 2025; token expires ~5 min. [verify expiry]" },
        { name: "getOnrampBuyUrl(...) / generateOnrampURL(...)", desc: "Build the hosted one-click-buy URL. Key params: sessionToken, defaultNetwork, defaultAsset, presetFiatAmount, fiatCurrency, redirectUrl, partnerUserRef." },
        { name: "GET /onramp/v1/buy/options", desc: "Discover supported fiat currencies, payment methods, and crypto assets/networks available to a given country before quoting." },
        { name: "POST /onramp/v1/buy/quote", desc: "Get a binding buy quote (amount in, fees, amount out) for a fiat→crypto purchase; feeds the headless flow." },
        { name: "POST /platform/v2/onramp/orders", desc: "Create an onramp order/session; supports payment methods incl. GUEST_CHECKOUT_APPLE_PAY (renders the Apple Pay button on an allow-listed domain). [verify path]" },
        { name: "<FundButton /> · @coinbase/onchainkit/fund", desc: "Drop-in React button; auto-detects EOA vs Coinbase Smart Wallet and routes to Onramp or the Smart Wallet fund flow (Magic Spend). Accepts a custom Onramp URL." },
        { name: "<FundCard /> · @coinbase/onchainkit/fund", desc: "Embedded fiat→crypto card for self-custody apps — amount input, payment-method select, and quotes inline, in a few lines." },
        { name: "Transaction Status API", desc: "Poll real-time + historical order status (treat this, not the client, as source of truth)." },
      ],
      snippet: {
        lang: "ts",
        caption: "Mint a session token on the server, then render an OnchainKit FundButton on the client.",
        code: `// --- server: mint a single-use session token (required since Jul 31, 2025) ---
// JWT is signed with your CDP API key (see @coinbase/cdp-sdk / generateJwt).
const res = await fetch('https://api.developer.coinbase.com/onramp/v1/token', {
  method: 'POST',
  headers: {
    Authorization: \`Bearer \${cdpJwt}\`,            // JWT from your CDP API key
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    addresses: [{ address: userWallet, blockchains: ['base'] }],
    assets: ['USDC'],                                // USDC on Base = zero-fee path
  }),
});
const { token: sessionToken } = await res.json();    // single-use, ~5-min TTL

// --- client (React): build the URL + drop in the component ---
import { FundButton, getOnrampBuyUrl } from '@coinbase/onchainkit/fund';

const onrampUrl = getOnrampBuyUrl({
  sessionToken,                  // no raw addresses/appId needed once token is set
  presetFiatAmount: 50,
  fiatCurrency: 'USD',
  redirectUrl: 'https://rails.app/done',
});

export function BuyUsdc() {
  return <FundButton fundingUrl={onrampUrl} />;
}`,
      },
      buildNotes: [
        "Session token is server-only: signing the JWT needs your CDP API secret, so a backend route is mandatory — there is no pure client-side embed.",
        "When a session token is supplied you no longer pass appId, addresses, or assets in the URL — they're bound into the token.",
        "For Apple Pay guest checkout (GUEST_CHECKOUT_APPLE_PAY) the Apple Pay button must render on a domain you've allow-listed with Coinbase.",
        "Zero-fee USDC is approval-gated — apply for access; default/non-USDC methods still carry a spread/fee.",
        "[verify against current docs — endpoint paths (v1 vs platform/v2), token TTL, and guest-checkout caps evolve]",
      ],
    },
    deepDive: [
      {
        heading: "Three integration depths (URL vs components vs API)",
        body:
          "Coinbase Onramp is the same product exposed at three levels of control, all sharing the session-token init. You trade UI control for integration effort.",
        bullets: [
          "Hosted Onramp URL — generateOnrampURL / getOnrampBuyUrl returns a Coinbase-hosted buy/sell page; least code, least UI control. Good for a 'Buy crypto' button.",
          "OnchainKit Fund components — <FundButton /> and <FundCard /> from @coinbase/onchainkit/fund embed the flow inside a React app; FundButton auto-routes EOA → Onramp vs Coinbase Smart Wallet → fund flow (Magic Spend).",
          "Headless REST API — buy/options → buy/quote → orders → transaction-status lets you build a fully custom UI (e.g. native mobile) while Coinbase still owns KYC, payments, and settlement.",
        ],
      },
      {
        heading: "Session-token auth (mandatory since Jul 31, 2025)",
        body:
          "Coinbase moved from passing wallet addresses/appId as raw query params to a secure-init model. Every Onramp/Offramp URL must now be initialized with a single-use session token minted server-side.",
        bullets: [
          "Your backend signs a JWT with the CDP API key and POSTs to the Session Token API (api.developer.coinbase.com/onramp/v1/token).",
          "The returned token is single-use and short-lived (~5 min [verify]); call it once per new user session.",
          "With a token set, you omit appId/addresses/assets from the URL — they're bound into the token, reducing tampering and leaking of wallet data.",
          "Consequence: no purely client-side integration is possible; a server route is part of the minimum architecture.",
        ],
      },
      {
        heading: "USDC / Base economics & the zero-fee play",
        body:
          "The strategic hook is a zero-fee on/off-ramp for USDC (especially on Base). Coinbase subsidizes the conversion to grow USDC float, custody, and Base activity.",
        bullets: [
          "USDC ramp can be fee-free (approval-gated) vs. ~1–4.5% card fees at consumer ramps — a direct shot at MoonPay/Transak pricing.",
          "Base (Coinbase's own L2) is the cheapest settlement target, so the zero-fee path doubles as Base distribution.",
          "Guest checkout (debit card / Apple Pay, no Coinbase account) lowers the funnel further, within per-region weekly caps (~$500/wk, $5 min in the US [verify]).",
          "Revenue is the spread/fee on non-USDC and card-funded purchases; USDC is the loss-leader.",
        ],
      },
      {
        heading: "Risk & strategic steering",
        bullets: [
          "Ecosystem lock-in: the cheapest, smoothest path funnels users into USDC + Coinbase custody + Base rather than arbitrary chains/assets.",
          "Subsidy dependence: the headline zero-fee economics rely on Coinbase continuing to absorb the cost.",
          "Regulatory upside/constraint: a public, US-regulated issuer brings trust but also region-by-region limits and KYC gating that pure-crypto rivals can sidestep.",
          "Operational: treat the Transaction Status API (not the client redirect) as the source of truth for order completion.",
        ],
      },
    ],
  },

  // ----------------------------- L4 -----------------------------
  {
    slug: "ethena",
    name: "Ethena",
    url: "https://ethena.fi/",
    layers: ["L4"],
    product: "USDe (delta-neutral synthetic dollar) + sUSDe (yield) + USDtb (T-bill stable) + iUSDe (institutional).",
    customer: "Protocols, neo-banks, institutions, on-chain users",
    moat:
      "Crypto-collateralized via a basis trade (not bank reserves); higher-than-T-bill yield, $500M+ reserve fund, and the 3rd-largest dollar asset in crypto.",
    region: "Global / on-chain",
    status: "researched",
    tagline: "A synthetic dollar backed by crypto and a basis trade, not banks.",
    whatItIs:
      "Ethena issues USDe, a synthetic dollar backed by crypto collateral that is delta-hedged with short perpetual futures rather than held in fiat bank reserves. Staking USDe into sUSDe (an ERC-4626 vault) captures the protocol's yield — funding-rate income plus staking rewards. It has grown into a multi-token family: USDe (the dollar), sUSDe (the 'Internet Bond' yield token), USDtb (a T-bill/BUIDL-backed stablecoin), and iUSDe (a transfer-restricted institutional wrapper). USDe is among the largest dollar assets in crypto and a popular yield 'ingredient' for neo-banks like UR Global.",
    howItWorks: [
      "A whitelisted market maker deposits crypto collateral (stETH, BTC, USDtb/stables) and mints USDe 1:1 via the permissioned mint/redeem contract.",
      "Ethena simultaneously opens an equivalent short perpetual-futures position on that collateral, so the portfolio is delta-neutral (~$1 of long spot offset by ~$1 of short perp).",
      "Collateral is held by off-exchange settlement (OES) custodians (Copper, Ceffu, Fireblocks) and only delegated to exchanges as margin — never moved into exchange custody.",
      "Yield = perp funding/basis spread + LST staking rewards + a T-bill/stables allocation; it is streamed to the sUSDe vault, so USDe itself stays a non-yield $1 unit and sUSDe accrues value.",
    ],
    differentiators: [
      "No fiat bank reserves — backed by crypto collateral plus an offsetting short-perp hedge (a tokenized basis trade).",
      "Yield from the derivatives funding rate, historically above the T-bill rate (funding has averaged ~11% APY across the cycle, though it swings negative in bear markets).",
      "OES custody model keeps collateral off exchanges, reducing (not eliminating) exchange-failure risk.",
      "Multi-token stack lets it serve DeFi (sUSDe), compliance-sensitive holders (USDtb), and TradFi institutions (iUSDe) from one engine.",
    ],
    businessModel:
      "Protocol retains a share of generated yield (the spread between total hedge/staking income and what is passed to sUSDe) plus reserve-fund accrual; governed by the ENA token, with fee-switch potential to ENA stakers.",
    dependsOn: [
      "Perp/futures markets + the funding rate (the core yield source)",
      "Liquid staking tokens (mostly Lido stETH) and spot BTC as collateral",
      "Centralized exchanges (for the short hedges)",
      "OES custodians (Copper, Ceffu, Fireblocks)",
      "BlackRock BUIDL / tokenized T-bills (for USDtb reserves)",
    ],
    risks: [
      "Negative funding rates can erode or invert yield; the reserve fund ($500M+) is the buffer against sustained negative funding.",
      "Exchange counterparty/settlement risk on the short legs, plus custodian (OES) risk.",
      "Not a fiat-redeemable stablecoin — a distinct, more reflexive risk profile than USDC/USDT.",
      "Scaling is bounded by open-interest and liquidity in perp markets; mint/redeem is permissioned to whitelisted market makers.",
      "Smart-contract and de-peg/liquidity risk, as seen in the broad market stress of Oct 2025.",
    ],
    keyFacts: [
      { label: "Founded", value: "2023 — Guy Young (Ethena Labs); thesis inspired by Arthur Hayes' 'Dust on Crust'" },
      { label: "Funding", value: "~$120M+ (Dragonfly, Brevan Howard Digital, Franklin Templeton, Fidelity, Galaxy, Arthur Hayes/Maelstrom; plus ENA raises)" },
      { label: "USDe supply / TVL", value: "~$4–6B range (3rd-largest USD stablecoin; peaked ~$14B in 2025) [verify current]" },
      { label: "sUSDe APY", value: "Variable — ~4–15% in 2025; ~9–12% trailing avg early 2026, compressing to ~4% in low-funding periods [verify current]" },
      { label: "Reserve fund", value: "$500M+ buffer against negative funding" },
      { label: "Tokens", value: "USDe, sUSDe, USDtb, iUSDe; ENA (governance) + sENA (staked)" },
    ],
    links: [
      { label: "Site", url: "https://ethena.fi/" },
      { label: "Docs", url: "https://docs.ethena.fi/" },
      { label: "USDtb", url: "https://usdtb.money/" },
      { label: "USDtb docs", url: "https://docs.ethena.fi/usdtb" },
      { label: "Key addresses", url: "https://docs.ethena.fi/solution-design/key-addresses" },
      { label: "Minting API docs", url: "https://public.api.ethena.fi/docs/" },
      { label: "Minting client (GitHub)", url: "https://github.com/ethena-labs/ethena-minting-client" },
    ],
    products: [
      {
        name: "USDe",
        tagline: "The delta-neutral synthetic dollar.",
        whatItIs:
          "A crypto-backed dollar token that targets $1 by pairing long spot collateral (stETH, BTC, stables) with an equal short perpetual-futures position. USDe itself is not yield-bearing — it is the transactional/composable $1 unit; yield lives in sUSDe. Minting/redeeming 1:1 is permissioned to whitelisted market makers via an RFQ flow, while secondary trading is open to anyone.",
        mechanics: [
          "Backed ~1:1 by long crypto offset by short perps → portfolio delta ≈ 0, so price tracks $1.",
          "Collateral sits with OES custodians; exchanges only see it as posted margin.",
          "Distributed multi-chain via LayerZero OFT (Ethereum, BNB Chain, Arbitrum, Solana, others).",
          "Holding raw USDe forgoes yield; users stake into sUSDe to earn.",
        ],
        stats: [
          { label: "Peg target", value: "$1.00 (delta-neutral, not fiat-redeemable)" },
          { label: "Rank", value: "3rd-largest USD stablecoin (2025)" },
          { label: "Mint/redeem", value: "Permissioned — whitelisted MMs via RFQ" },
        ],
      },
      {
        name: "sUSDe",
        tagline: "The 'Internet Bond' — staked USDe that earns the protocol yield.",
        whatItIs:
          "An ERC-4626 vault token: deposit USDe, receive sUSDe whose redemption value grows as the protocol streams in funding income + staking rewards. It is the yield-bearing leg of the system and the asset most DeFi protocols integrate as collateral.",
        mechanics: [
          "ERC-4626 value-accruing vault — sUSDe:USDe exchange rate rises with yield (not a rebasing balance).",
          "Yield = perp funding/basis + LST staking + T-bill/stables allocation, net of protocol share.",
          "Unstaking has a ~7-day cooldown before USDe can be withdrawn.",
          "Widely integrated as collateral / fixed-yield base (Aave, Pendle, Morpho, etc.).",
        ],
        stats: [
          { label: "APY", value: "Variable — ~4–15% (2025); ~9–12% trailing early 2026 [verify]" },
          { label: "Standard", value: "ERC-4626 vault" },
          { label: "Cooldown", value: "~7 days to unstake" },
        ],
      },
      {
        name: "USDtb",
        tagline: "A T-bill / BUIDL-backed stablecoin — the 'risk-off' sibling.",
        whatItIs:
          "A fiat-style stablecoin backed primarily (>90%) by BlackRock's tokenized T-bill fund (BUIDL), launched Dec 2024. It serves as a low-volatility reserve asset that Ethena can rotate USDe collateral into when funding turns negative, and as a GENIUS-Act-oriented product for institutions. Issued on US soil via Anchorage Digital Bank from Oct 2025.",
        mechanics: [
          ">90% of reserves in BlackRock BUIDL (tokenized short-term US Treasuries / repo / cash).",
          "Acts as an 'insurance' collateral leg: USDe backing can shift into USDtb in bear/negative-funding regimes.",
          "US issuance through Anchorage Digital Bank (federally chartered crypto bank).",
          "Targets compliance-sensitive and institutional holders.",
        ],
        stats: [
          { label: "Backing", value: ">90% BlackRock BUIDL (tokenized T-bills)" },
          { label: "Launched", value: "Dec 16, 2024" },
          { label: "US issuer", value: "Anchorage Digital Bank (from Oct 15, 2025)" },
        ],
      },
      {
        name: "iUSDe",
        tagline: "Institutional, transfer-restricted wrapper of sUSDe.",
        whatItIs:
          "A 'TradFi-wrapped sUSDe' that adds programmable transfer restrictions so regulated entities can hold the same delta-neutral yield without touching open crypto rails — often accessed via special-purpose vehicles (SPVs). Functionally identical economics to sUSDe, with compliance guardrails layered on. [verify live status]",
        mechanics: [
          "Wrapper around sUSDe with programmable transfer/whitelist restrictions.",
          "Institutions gain exposure via SPV shares, avoiding direct crypto custody.",
          "Same underlying yield engine as sUSDe (funding + staking).",
        ],
        stats: [
          { label: "Type", value: "Compliance-wrapped sUSDe (institutional)" },
          { label: "Access", value: "Via SPVs / restricted transfer" },
          { label: "Status", value: "Announced; rollout ongoing [verify]" },
        ],
      },
    ],
    deepDive: [
      {
        heading: "Delta-neutral mechanics (the basis trade)",
        body:
          "USDe is a tokenized cash-and-carry basis trade. For each USDe, Ethena holds ~$1 of long spot collateral and an offsetting short perpetual-futures position, so the net price exposure (delta) is ~zero and the token holds its $1 value through volatility.",
        bullets: [
          "Long leg: LSTs (mostly Lido stETH) and spot BTC, plus stables/USDtb.",
          "Short leg: perpetual futures on ETH/BTC sized to offset the spot delta.",
          "If spot falls, the short gains and offsets the spot loss (and vice versa) → peg stability.",
          "The trade is what hedge funds/market-makers have run for years; Ethena's innovation is packaging it into a transferable token.",
        ],
      },
      {
        heading: "Yield sources & sustainability",
        body:
          "sUSDe yield is the sum of three streams, net of the protocol's cut. The headline driver is perp funding, which is positive most of the time in bull/neutral markets but turns negative in bear markets — the central risk to the yield (and the reason for the reserve fund).",
        bullets: [
          "Perpetual funding / basis spread on the short legs (the main, most volatile component).",
          "Staking rewards from LST collateral (e.g. stETH base ~3%).",
          "Allocation to T-bills / USDtb / stables for a baseline return.",
          "Funding has averaged ~11% APY across the cycle but ranged from roughly -6% (2022 bear) to +75% (early-2024 bull).",
          "Only sUSDe earns; raw USDe holders effectively subsidize stakers, boosting the staked yield.",
        ],
      },
      {
        heading: "Custody & exchange counterparty model (OES)",
        body:
          "Ethena does not deposit collateral directly onto exchanges. It uses Off-Exchange Settlement (OES) providers — institutional custodians that hold assets on-chain while letting the protocol delegate them to exchanges as margin without transferring custody. This caps, but does not remove, exchange-failure loss.",
        bullets: [
          "OES providers: Copper (ClearLoop), Ceffu (MirrorX), and Fireblocks.",
          "Collateral is mirrored to exchanges as margin; an exchange insolvency does not directly seize the underlying.",
          "Residual exposure: unsettled PnL/funding owed by an exchange between settlement cycles, plus custodian risk itself.",
          "Settlement happens on a frequent cadence to minimize the amount 'at risk' on any venue at a time.",
        ],
      },
      {
        heading: "Reserve fund & risk management",
        bullets: [
          "Reserve fund $500M+ acts as the backstop for sustained negative funding and to absorb tail losses.",
          "Collateral can rotate toward USDtb / T-bills when funding is negative, trading yield for stability.",
          "Reserve-fund RWA allocations were voted on by ENA governance — BlackRock's BUIDL received the largest allocation.",
          "Key residual risks: prolonged negative funding draining the reserve, exchange/custody failure, LST de-peg, and smart-contract bugs.",
        ],
      },
      {
        heading: "Converge chain & ENA ecosystem",
        body:
          "Ethena is expanding from an issuer into an ecosystem. ENA is the governance token; sENA (staked ENA) secures forthcoming infrastructure. Converge is a planned EVM/WASM L1 aimed at bridging TradFi and DeFi, secured by a validator network using sENA.",
        bullets: [
          "ENA — governance over collateral assets, risk parameters, and reserve allocations; sENA is its staked form.",
          "Converge — high-performance EVM chain for institutional + retail access to tokenized assets, secured via sENA (Converge Validator Network).",
          "Ethereal — an Ethena-aligned DEX in the ecosystem voted on by ENA governance.",
          "Roadmap themes: institutional iUSDe, payments/neo-bank ambitions, and deeper TradFi distribution.",
        ],
      },
    ],
    contracts: [
      { label: "USDe (token)", value: "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3" },
      { label: "sUSDe (ERC-4626 vault)", value: "0x9D39A5DE30e57443BfF2A8307A4256c8797A3497" },
      { label: "USDtb (token)", value: "0xC139190F447e929f090Edeb554D95AbB8b18aC1C" },
      { label: "ENA (governance token)", value: "0x57e114B691Db790C35207b2e685D4A43181e6061" },
      { label: "sENA (staked ENA)", value: "0x8bE3460A480c80728a8C4D7a5D5303c85ba7B3b9" },
      { label: "Mint & Redeem V2", value: "0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3" },
    ],
    builder: {
      architecture:
        "Two integration surfaces. (1) For consumers/protocols, sUSDe is a standard ERC-4626 vault: deposit USDe, receive value-accruing shares, and read the live exchange rate via convertToAssets — this is how Aave/Pendle/Morpho list it as collateral. (2) For market makers, USDe minting/redemption is a permissioned RFQ flow against the Mint & Redeem V2 contract: stream indicative quotes, request a formal quote, then submit an EIP-712-signed order; Ethena uses a last-look architecture with tight quote-validity windows, and only whitelisted benefactor addresses can execute.",
      integration:
        "Most builders integrate sUSDe (the ERC-4626 token) rather than the mint flow. Holding/earning is permissionless; minting USDe 1:1 is not. The public minting API (public.api.ethena.fi) plus Python/TypeScript SDKs are gated to whitelisted MMs.",
      apiSurface: [
        { name: "ERC4626.deposit / mint", desc: "Stake USDe into the sUSDe vault to receive value-accruing shares." },
        { name: "ERC4626.convertToAssets(shares)", desc: "Read the USDe value of sUSDe — the basis for collateral pricing in DeFi." },
        { name: "cooldownShares / cooldownAssets", desc: "Begin the ~7-day unstake cooldown before withdrawing USDe." },
        { name: "POST /rfq (minting API)", desc: "Whitelisted MMs request a firm mint/redeem quote (pair, side MINT|REDEEM, size, benefactor)." },
        { name: "POST /order (minting API)", desc: "Submit an EIP-712-signed mint/redeem order referencing the RFQ id (last-look)." },
      ],
      snippet: {
        lang: "ts",
        caption: "Read the live sUSDe→USDe rate to price it as collateral (permissionless, ERC-4626).",
        code: `import { createPublicClient, http, parseAbi, parseUnits } from 'viem';
import { mainnet } from 'viem/chains';

const sUSDe = '0x9D39A5DE30e57443BfF2A8307A4256c8797A3497';
const client = createPublicClient({ chain: mainnet, transport: http() });

// 1 sUSDe share -> how many USDe? (rate > 1 and rising as yield accrues)
const usdePerShare = await client.readContract({
  address: sUSDe,
  abi: parseAbi(['function convertToAssets(uint256) view returns (uint256)']),
  functionName: 'convertToAssets',
  args: [parseUnits('1', 18)],
});
// Use this rate to mark sUSDe collateral; staking/unstaking USDe is via deposit() + cooldownShares().`,
      },
      buildNotes: [
        "sUSDe is value-accruing (ERC-4626), not rebasing — track the exchange rate, never a fixed 1:1 to USDe.",
        "Unstaking is not instant: a ~7-day cooldown gates USDe withdrawal; model this in any leverage/liquidation logic.",
        "Minting USDe is permissioned (whitelisted market makers, RFQ + last-look); typical integrators source USDe/sUSDe on the secondary market instead.",
        "[verify exact API field names and cooldown duration against the latest docs — these evolve]",
      ],
    },
  },
  {
    slug: "ondo-finance",
    name: "Ondo Finance",
    url: "https://ondo.finance/",
    layers: ["L4"],
    product:
      "Tokenized US Treasuries — USDY (yield-bearing note) & OUSG (BlackRock-backed fund) — plus Ondo Chain, an L1 for RWAs.",
    customer: "Non-US investors, institutions, protocols",
    moat:
      "RWA category leader: $2.75B+ TVL across USDY + OUSG, instant USDC mint/redeem, multi-chain, and Ondo Chain — a permissioned-validator L1 with TradFi design advisors (Franklin Templeton, WisdomTree).",
    region: "Global (ex-US)",
    status: "researched",
    tagline: "Tokenized US Treasuries, and the rails to trade them.",
    whatItIs:
      "Ondo Finance is the leading real-world-asset (RWA) protocol, tokenizing US Treasuries and short-term cash. USDY is a yield-bearing token backed by short-term Treasuries and bank deposits for non-US retail/institutions; OUSG is an institutional fund holding tokenized Treasuries (incl. BlackRock's BUIDL) with instant USDC mint/redeem. Ondo is extending from products into infrastructure with Ondo Global Markets (tokenized US stocks/ETFs) and Ondo Chain, a purpose-built L1 for tokenized finance.",
    howItWorks: [
      "USDY: deposit USDC (or wire $100K+); reserves buy short-term US Treasuries + bank demand deposits. Yield accrues daily — USDY's price drifts above $1 as interest compounds.",
      "rUSDY: a rebasing wrapper that holds a $1.00 price and pays yield as additional tokens each business day, so it composes like a normal stablecoin.",
      "OUSG: a tokenized fund (largely BlackRock BUIDL + short-term Treasury ETFs) for qualified investors, with instant subscribe/redeem against USDC (PYUSD planned) via on-chain InstantManager contracts.",
      "Ondo Nexus: routes instant liquidity/redemption across third-party tokenized Treasuries (BlackRock, Franklin Templeton, Wellington, WisdomTree) using OUSG's mint/redeem engine.",
      "Ondo Chain: an L1 with permissioned validators, RWA-backed staking, enshrined oracles, and native omnichain bridging to host institutional RWA markets.",
    ],
    differentiators: [
      "RWA brand + scale leader: $2.75B+ TVL; USDY live across Ethereum, Solana, Sui, Aptos, Mantle, Stellar, XRP, Noble and more.",
      "Instant, programmatic mint/redeem against USDC via on-chain InstantManager contracts — not just wire-based subscription.",
      "Vertical integration: products (USDY/OUSG) + liquidity (Nexus) + securities (Global Markets) + its own L1 (Ondo Chain).",
      "Institutional credibility: BlackRock BUIDL backing for OUSG; TradFi design advisors (Franklin Templeton, Wellington, WisdomTree, Google Cloud).",
    ],
    businessModel:
      "Management fee on assets (yield ceiling ≈ risk-free rate − fee); spread/fees on Global Markets securities; future Ondo Chain transaction + infrastructure economics.",
    dependsOn: [
      "US Treasury market + interest rates",
      "BlackRock (BUIDL) and regulated custodians/brokers",
      "USDC liquidity (Circle) for instant mint/redeem",
      "Underlying chains (Ethereum, Solana, etc.) until Ondo Chain matures",
    ],
    risks: [
      "USDY/OUSG restricted from US persons; KYC/registry-gated (OndoIDRegistry) access.",
      "Rate-cut risk compresses the underlying T-bill yield.",
      "RWA/custody + legal-structure risk; reliance on off-chain Treasury custodians and BlackRock's fund.",
      "Execution risk on the move from products into an L1 + a tokenized-securities exchange against TradFi and crypto incumbents.",
    ],
    keyFacts: [
      { label: "Founded", value: "2021 (New York) — Nathan Allman (ex-Goldman), Pinku Surana" },
      { label: "Funding", value: "~$46M (Founders Fund, Pantera, Coinbase Ventures) + Ondo Catalyst — $250M RWA fund with Pantera (Jul 2025)" },
      { label: "TVL / AUM", value: "$2.75B+ total (early 2026); OUSG ~$1.1B+, USDY ~$740M supply" },
      { label: "USDY yield", value: "~4.65% APY (Apr 2026); OUSG ~3.75% (late 2025)" },
      { label: "Variants", value: "USDY (accruing), rUSDY (rebasing), OUSG (institutional fund)" },
      { label: "Chains", value: "Ethereum, Solana, Sui, Aptos, Mantle, Arbitrum, Stellar, XRP, Noble, Polygon (OUSG)" },
      { label: "Token", value: "ONDO (governance / ecosystem)" },
      { label: "Ondo Chain", value: "RWA L1 announced Feb 2025 (Ondo Summit)" },
      { label: "Global Markets", value: "Tokenized US stocks/ETFs; launched Sep 2025 — $6.8B+ cumulative volume, $460M+ TVL" },
    ],
    links: [
      { label: "Site", url: "https://ondo.finance/" },
      { label: "USDY", url: "https://ondo.finance/usdy" },
      { label: "OUSG", url: "https://ondo.finance/ousg" },
      { label: "Ondo Chain", url: "https://ondo.finance/ondo-chain" },
      { label: "Docs", url: "https://docs.ondo.finance/" },
      { label: "Smart contract addresses", url: "https://docs.ondo.finance/addresses" },
      { label: "USDY InstantManager guide", url: "https://docs.ondo.finance/developer-guides/usdy-instant-manager-integration" },
      { label: "Ondo Nexus", url: "https://blog.ondo.finance/introducing-ondo-nexus/" },
      { label: "Pantera $250M (Catalyst)", url: "https://www.coindesk.com/business/2025/07/03/ondo-pantera-capital-to-invest-250m-in-real-world-asset-projects" },
    ],
    products: [
      {
        name: "USDY / rUSDY",
        tagline: "A yield-bearing tokenized dollar for non-US holders.",
        whatItIs:
          "USDY is a tokenized note backed by short-term US Treasuries and bank demand deposits, available to qualifying non-US individuals and institutions. It comes in two forms: USDY (accruing — the price drifts above $1 as yield compounds) and rUSDY (rebasing — holds a $1.00 price and pays yield as extra tokens), so integrators can pick whichever unit suits their app.",
        mechanics: [
          "Mint with USDC (instant, via InstantManager) or wire $100K+; a 40–50 day initial holding/settlement applies before first transfer on some paths. [verify exact lockup]",
          "USDY price updates each business day off the reference yield; rUSDY rebases the same balance to keep ~$1.00.",
          "Redeem to USDC (via Ondo Global Markets BVI) or to a non-US bank account via wire; $5K minimum on most chains.",
          "Issued natively across Ethereum, Solana, Sui, Aptos, Mantle, Stellar, XRP, Noble and more.",
        ],
        stats: [
          { label: "Supply", value: "~$740M (Apr 2026)" },
          { label: "Yield", value: "~4.65% APY" },
          { label: "Forms", value: "USDY (accruing) · rUSDY (rebasing)" },
        ],
      },
      {
        name: "OUSG",
        tagline: "Institutional tokenized Treasuries with instant USDC settlement.",
        whatItIs:
          "OUSG is a tokenized, yield-bearing Treasuries fund for qualified/accredited investors, backed largely by BlackRock's BUIDL fund plus short-term Treasury ETFs. Its headline feature is instant, 24/7 mint and redeem against USDC through on-chain InstantManager contracts — turning a T-bill fund into a programmable, liquid token.",
        mechanics: [
          "Subscribe/redeem instantly against USDC (PYUSD planned); minimum $5K instant redemption, $50K non-instant.",
          "Instant minting limits: $50M global / $25M per investor within 24 hours.",
          "Callers must be registered in the OndoIDRegistry (KYC-gated, non-US qualified investors).",
          "Backing held in BlackRock BUIDL + short-term Treasury ETFs via regulated custody.",
        ],
        stats: [
          { label: "TVL", value: "~$1.1B+ (late 2025)" },
          { label: "Yield", value: "~3.75%" },
          { label: "Settlement", value: "Instant mint/redeem in USDC" },
        ],
      },
      {
        name: "Ondo Chain & Global Markets",
        tagline: "An L1 for RWAs plus a tokenized-securities platform.",
        whatItIs:
          "Ondo's infrastructure bet. Ondo Chain (announced Feb 2025) is a Layer 1 purpose-built for tokenized finance, combining permissioned institutional validators with open developer access. Ondo Global Markets brings traditional public securities (US stocks/ETFs) on-chain via APIs, so apps can offer tokenized equities the way they offer tokenized Treasuries today.",
        mechanics: [
          "Ondo Chain four-pillar design: permissioned validators, RWA-backed staking, enshrined oracles, native omnichain bridging.",
          "Global Markets: APIs to mint/trade tokenized US stocks and ETFs with on-chain settlement.",
          "Design advisors include Franklin Templeton, Wellington Management, WisdomTree, Google Cloud, ABN Amro.",
          "Nexus provides cross-issuer instant liquidity for third-party tokenized Treasuries.",
        ],
        stats: [
          { label: "GM volume", value: "$6.8B+ cumulative (since Sep 2025)" },
          { label: "GM TVL", value: "$460M+" },
          { label: "Chain status", value: "Announced Feb 2025; rolling out" },
        ],
      },
    ],
    deepDive: [
      {
        heading: "USDY vs rUSDY: accrual mechanics",
        body:
          "USDY ships in two interchangeable forms so integrators choose the right unit of account. The economics are identical — both earn the yield on short-term Treasuries and bank deposits — but the balance/price behavior differs.",
        bullets: [
          "USDY (accruing): fixed balance, rising price. The token's reference price updates each business day and drifts above $1.00 as interest compounds — like a money-market NAV.",
          "rUSDY (rebasing): fixed ~$1.00 price, growing balance. Yield arrives as additional rUSDY tokens, so it behaves like a normal stablecoin in UIs and DeFi accounting.",
          "Convertible 1:1 in value between the two via the rUSDY wrapper.",
          "rUSDY is the friendlier primitive for payments/DeFi where a clean $1 unit matters; USDY suits treasuries that want a single non-rebasing holding.",
        ],
      },
      {
        heading: "OUSG instant mint/redeem & BlackRock backing",
        body:
          "OUSG is the institutional product and the liquidity engine behind Ondo Nexus. Unlike wire-based fund subscriptions, OUSG can be minted and redeemed on-chain in USDC around the clock through InstantManager contracts.",
        bullets: [
          "Backing is dominated by BlackRock's BUIDL tokenized money-market fund plus short-term Treasury ETFs.",
          "Instant subscribe converts USDC → OUSG; instant redeem converts OUSG → USDC, both gated to OndoIDRegistry-registered qualified investors.",
          "Guardrails: $50M global / $25M per-investor instant-mint caps per 24h; $5K instant / $50K non-instant redemption minimums.",
          "Nexus reuses this engine to offer instant redemption across third-party tokenized Treasuries (Franklin Templeton, Wellington, WisdomTree).",
        ],
      },
      {
        heading: "Ondo Chain & Global Markets strategy",
        body:
          "Ondo is moving up the stack from issuing RWA tokens to owning the rails. The thesis: institutions won't run core markets on fully permissionless chains, but want public-chain composability — so Ondo is building an L1 that bridges both, plus a securities platform to bring stocks on-chain.",
        bullets: [
          "Ondo Chain: permissioned validators (regulated institutions) for trust + open access for developers; RWA-backed staking and enshrined oracles reduce reliance on third-party price feeds.",
          "Global Markets: tokenized US equities/ETFs via API, extending Ondo's Treasury playbook to the broader securities market ($6.8B+ volume since Sep 2025).",
          "Ondo Catalyst: a $250M fund with Pantera (Jul 2025) seeding RWA protocols/infrastructure — building an ecosystem around Ondo's rails.",
          "Vertical stack — products + Nexus liquidity + Global Markets + L1 — is the real moat vs. single-product T-bill issuers like Mountain.",
        ],
      },
      {
        heading: "Regulatory & risk posture",
        bullets: [
          "USDY and OUSG are explicitly restricted from US persons and gated by KYC/registry (OndoIDRegistry) — a compliance-first, non-US framing.",
          "Yield is the risk-free rate minus fee, so Fed rate cuts directly compress returns.",
          "Off-chain dependencies: Treasury custodians, BlackRock's BUIDL fund, and USDC liquidity for instant redemption.",
          "Issuance via offshore entities (e.g. Ondo Global Markets BVI / Ondo USDY LLC) carries legal-structure and bankruptcy-remoteness considerations. [verify entity details]",
        ],
      },
    ],
    builder: {
      architecture:
        "Ondo exposes its products as standard tokens (USDY/rUSDY 18-decimal ERC-20s; OUSG) plus on-chain 'InstantManager' contracts that handle subscribe (USDC → RWA) and redeem (RWA → USDC). Access is permissioned: a caller must be registered in the OndoIDRegistry (KYC for non-US qualified investors) and must approve the manager contract to spend its tokens before any mint/redeem. There is no separate REST API for mint/redeem — integration is direct smart-contract calls; ONDO governance and reference-price updates happen on-chain.",
      integration:
        "To embed USDY/OUSG: (1) get the integrating wallet KYC'd into the OndoIDRegistry, (2) approve the USDY_InstantManager / OUSG_InstantManager for USDC and the RWA token, (3) call subscribe()/redeem() with slippage bounds. USDC is 6 decimals; USDY/OUSG are 18 decimals, so amounts must be scaled accordingly (e.g. 100e6 USDC, 100e18 USDY).",
      apiSurface: [
        { name: "subscribe(depositToken, depositAmount, minimumRwaReceived)", desc: "InstantManager: convert USDC → USDY/OUSG. minimumRwaReceived is slippage protection in the RWA's 18 decimals (0 is safe for direct minting)." },
        { name: "redeem(rwaAmount, receivingToken, minimumTokenReceived)", desc: "InstantManager: convert USDY/OUSG → USDC. minimumTokenReceived is in the receiving token's decimals." },
        { name: "OndoIDRegistry (KYC gate)", desc: "Caller address must be registered/whitelisted before subscribe/redeem succeed." },
        { name: "ERC-20 approve()", desc: "Approve the InstantManager to spend USDC (mint) or the RWA token (redeem) first." },
        { name: "rUSDY wrap/unwrap", desc: "Wrap accruing USDY into rebasing rUSDY (or back) for a clean $1.00 unit in DeFi. [verify exact wrapper method names]" },
      ],
      snippet: {
        lang: "ts",
        caption: "Instant-mint USDY with 100 USDC via the USDY_InstantManager (ethers v6).",
        code: `import { Contract, parseUnits } from 'ethers';

const USDC  = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // 6 decimals
const USDY_INSTANT_MANAGER = '0xa42613C243b67BF6194Ac327795b926B4b491f15';

// caller wallet must already be registered in the OndoIDRegistry (KYC)
const usdc = new Contract(USDC, ['function approve(address,uint256) returns (bool)'], signer);
await usdc.approve(USDY_INSTANT_MANAGER, parseUnits('100', 6));

const manager = new Contract(
  USDY_INSTANT_MANAGER,
  ['function subscribe(address depositToken, uint256 depositAmount, uint256 minimumRwaReceived)'],
  signer,
);
// 100 USDC -> USDY; 0 minOut is safe for direct minting (no AMM)
await manager.subscribe(USDC, parseUnits('100', 6), 0n);`,
      },
      buildNotes: [
        "Decimals mismatch is the classic bug: USDC is 6 decimals, USDY/OUSG are 18 — scale amounts per token, not a shared constant.",
        "Mint/redeem are gated: an un-registered address will revert. Onboard the wallet to the OndoIDRegistry first (non-US qualified investors only).",
        "OUSG instant flows have caps ($50M global / $25M per investor per 24h) and minimums ($5K instant / $50K non-instant redeem) — handle revert/queue cases.",
        "[verify current addresses against docs.ondo.finance/addresses before mainnet use — proxies and per-chain addresses change]",
      ],
    },
    contracts: [
      { label: "USDY (Ethereum)", value: "0x96F6eF951840721AdBF46Ac996b59E0235CB985C" },
      { label: "rUSDY (Ethereum)", value: "0xaf37c1167910ebC994e266949387d2c7C326b879" },
      { label: "USDY_InstantManager (Ethereum)", value: "0xa42613C243b67BF6194Ac327795b926B4b491f15" },
      { label: "OUSG (Ethereum)", value: "0x1B19C19393e2d034D8Ff31ff34c81252FcBbee92" },
      { label: "OUSG_InstantManager (Ethereum)", value: "0x93358db73B6cd4b98D89c8F5f230E81a95c2643a" },
      { label: "USDY (Solana)", value: "A1KLoBrKBde8Ty9qtNQUtq3C2ortoC3u7twggz7sEto6" },
      { label: "OUSG (Solana)", value: "i7u4r16TcsJTgq1kAG8opmVZyVnAKBwLKu6ZPMwzxNc" },
    ],
  },
  {
    slug: "mountain-protocol",
    name: "Mountain Protocol",
    url: "https://mountainprotocol.com/",
    layers: ["L4"],
    product:
      "USDM — a regulated, T-bill-backed yield-bearing stablecoin that rebases daily; wUSDM — its non-rebasing ERC-4626 wrapper.",
    customer: "Protocols, institutional treasuries, non-US holders",
    moat:
      "Bermuda-regulated (BMA/DABA) T-bill-backed rebasing dollar, composable as plain ERC-20 + 4626 wrapper. Acquired by Anchorage Digital (May 2025); USDM now in orderly wind-down.",
    region: "Global (ex-US)",
    status: "researched",
    tagline: "A regulated, yield-bearing dollar that rebases daily — now wound down post-Anchorage.",
    whatItIs:
      "Mountain Protocol issued USDM, a permissionless yield-bearing stablecoin fully backed by short-term US Treasuries and held in a bankruptcy-remote Bermuda SPV. Interest was paid as a daily rebase to the same ERC-20 balance, with a non-rebasing wrapper, wUSDM (ERC-4626), for cleaner DeFi composability. Anchorage Digital acquired Mountain in May 2025 and absorbed its team and BMA license; USDM has since entered an orderly wind-down, with redemption migrating to a Uniswap v4 wUSDM:USDC pool.",
    howItWorks: [
      "Primary (KYC-approved institutional) users minted/redeemed USDM 1:1 with USDC or fiat wires via web portal or API; secondary users acquired it on DEXs and could not mint/redeem directly.",
      "Reserves — short-duration US T-bills (~60-day avg maturity), money-market funds, Treasury ETFs and repos — held by USDM Reserves Ltd, a Bermuda bankruptcy-remote SPV managed by EQ Capital, segregated from operating accounts.",
      "Yield distributed daily via rebase: balanceOf = shares × rewardMultiplier, with the multiplier accruing ~12:00 UTC (a share-based model akin to Lido's stETH) so balances grow while price stays ~$1.",
      "wUSDM wraps USDM into a non-rebasing ERC-4626 vault share whose exchange rate appreciates instead of the balance — easier for DeFi protocols that assume static balances.",
      "Deployed identically across Ethereum, Base, Polygon, Arbitrum and Optimism (same addresses) for multi-chain composability.",
    ],
    differentiators: [
      "Daily rebase keeps a clean $1 unit of account while paying the T-bill yield directly to holders.",
      "Regulated issuer under the Bermuda Monetary Authority (DABA + Single-Currency Pegged Stablecoin guidance), with monthly third-party reserve attestations.",
      "Composable two ways: vanilla rebasing ERC-20 (USDM) and non-rebasing ERC-4626 (wUSDM) — same address across five chains.",
      "Credibility from a regulated acquirer: Anchorage Digital (the only US federally chartered crypto bank) absorbed the team and license.",
    ],
    businessModel:
      "Management fee on reserves — the spread between the T-bill yield earned and the (capped) rebase rate paid to holders.",
    dependsOn: [
      "US Treasury market + interest-rate environment",
      "Reserve manager (EQ Capital) + bankruptcy-remote SPV custody",
      "Ethereum / L2s (Base, Polygon, Arbitrum, Optimism)",
      "Bermuda Monetary Authority licensing",
      "Post-wind-down: Uniswap v4 liquidity (wUSDM:USDC) for redemption",
    ],
    risks: [
      "USDM is in orderly wind-down post-acquisition — minting disabled (May 2025), rewards cut to 0% (June 2025), and from Aug 22 2025 redemption is only via a Uniswap v4 wUSDM:USDC pool, not the platform.",
      "Restricted from US persons.",
      "Rate-cut risk compresses (compressed) the yield available to holders.",
      "Reserve/custody + legal-structure risk on the Bermuda SPV; secondary-market peg risk now that primary redemption is gone.",
    ],
    keyFacts: [
      { label: "Founded", value: "2022 — Martin Carrica (CEO) & Matias Caricato" },
      { label: "Funding", value: "~$12M total: $4M seed (2023, Castle Island/Nic Carter) + $8M Series A (Jun 2024)" },
      { label: "Investors", value: "Multicoin Capital (led A), Castle Island, Coinbase Ventures, New Form, Bankless Ventures" },
      { label: "Acquired by", value: "Anchorage Digital — announced May 12, 2025; team + BMA license absorbed" },
      { label: "Regulator", value: "Bermuda Monetary Authority (DABA license #202302512)" },
      { label: "Collateral", value: "Short-term US T-bills (~60-day avg), MMFs, Treasury ETFs, repos — SPV via EQ Capital" },
      { label: "Peak supply", value: "~$150M+ USDM circulating at 2024 peak [verify]" },
      { label: "Status", value: "Wound down — redemption via Uniswap v4 wUSDM:USDC (from Aug 22, 2025)" },
    ],
    links: [
      { label: "Site", url: "https://mountainprotocol.com/" },
      { label: "Docs", url: "https://docs.mountainprotocol.com/" },
      { label: "USDM token docs", url: "https://docs.mountainprotocol.com/reference/usdm-token" },
      { label: "GitHub (tokens)", url: "https://github.com/mountainprotocol/tokens" },
      { label: "Anchorage acquisition", url: "https://www.anchorage.com/insights/anchorage-digital-acquire-mountain-protocol-to-accelerate-institutional-adoption-of-stablecoins" },
      { label: "Series A coverage", url: "https://www.theblock.co/post/298910/yield-bearing-stablecoin-mountain-protocol-funding" },
      { label: "USDM on Etherscan", url: "https://etherscan.io/token/0x59D9356E565Ab3A36dD77763Fc0d87fEaf85508C" },
    ],
    products: [
      {
        name: "USDM",
        tagline: "Permissionless rebasing yield-bearing dollar.",
        whatItIs:
          "A T-bill-backed stablecoin that pays yield as a daily rebase: your token balance grows while the price stays ~$1. Implemented as a share-based ERC-20 (balanceOf = shares × rewardMultiplier, à la stETH), so it composes wherever a plain ERC-20 is accepted — across Ethereum, Base, Polygon, Arbitrum and Optimism.",
        mechanics: [
          "rewardMultiplier accrues ~12:00 UTC each day via addRewardMultiplier; share count is fixed, balance rises.",
          "Primary mint/redeem 1:1 with USDC or fiat wire for KYC-approved institutional accounts only.",
          "Blocklist + pause controls for regulatory compliance (OFAC/sanctions screening).",
          "Same contract address on all five supported chains.",
        ],
        stats: [
          { label: "Yield (pre-windown)", value: "~T-bill rate (e.g. ~3.8% APY example), capped vs reserves" },
          { label: "Type", value: "Rebasing ERC-20" },
          { label: "Status", value: "Rewards cut to 0% (Jun 2025); minting disabled" },
        ],
      },
      {
        name: "wUSDM",
        tagline: "Non-rebasing ERC-4626 wrapper for DeFi.",
        whatItIs:
          "Wrapped USDM: an OpenZeppelin ERC-4626 vault share. Deposit USDM, receive a fixed wUSDM balance whose exchange rate appreciates as yield accrues — so protocols that assume static balances (AMMs, lending markets) can integrate yield without handling rebases.",
        mechanics: [
          "ERC-4626 deposit/withdraw between USDM (asset) and wUSDM (share).",
          "Balance stays constant; value accrues via the rising share-to-USDM exchange rate.",
          "Preferred form for LPs, Aave-style collateral, and Pendle-style yield markets.",
          "Now the redemption vehicle: USDM holders exit via a Uniswap v4 wUSDM:USDC pool.",
        ],
        stats: [
          { label: "Standard", value: "ERC-4626 (OpenZeppelin)" },
          { label: "Behavior", value: "Non-rebasing, value-accruing share" },
          { label: "Chains", value: "Ethereum, Base, Polygon, Arbitrum, Optimism" },
        ],
      },
      {
        name: "Institutional mint/redeem",
        tagline: "KYC primary-market access via portal or API.",
        whatItIs:
          "Approved institutions opened accounts to mint and redeem USDM 1:1 against USDC or fiat wires through a web portal or API, with weekly transaction limits (raisable on application). Reserves sat in a Bermuda bankruptcy-remote SPV (USDM Reserves Ltd) managed by EQ Capital, with monthly third-party attestations.",
        mechanics: [
          "KYB/KYC onboarding to become a Primary User.",
          "Mint with USDC or wire; redeem 1:1; secondary users cannot mint/redeem directly.",
          "Reserves segregated, T-bill-heavy, over-collateralized buffer vs rate moves.",
          "Monthly attestations + BMA reporting (now in wind-down).",
        ],
        stats: [
          { label: "Redemption", value: "1:1 (primary, pre-windown)" },
          { label: "Reserve manager", value: "EQ Capital / USDM Reserves Ltd (SPV)" },
          { label: "Attestations", value: "Monthly, third-party" },
        ],
      },
    ],
    deepDive: [
      {
        heading: "Rebase mechanics & the wUSDM wrapper",
        body:
          "USDM distributes yield by adjusting a global reward multiplier rather than minting per-holder, using a share-based accounting model similar to Lido's stETH.",
        bullets: [
          "balanceOf(account) = shares[account] × rewardMultiplier; shares are fixed at deposit.",
          "rewardMultiplier increases daily (~12:00 UTC) via addRewardMultiplier — e.g. 1.000 → 1.038 after a year at 3.8% APY, turning 100 USDM into 103.8 USDM.",
          "Rebasing breaks naive DeFi integrations that cache balances, so wUSDM wraps USDM in an ERC-4626 vault.",
          "wUSDM keeps a static balance while the share-to-asset exchange rate climbs — the standard non-rebasing pattern protocols expect.",
        ],
      },
      {
        heading: "Reserves & Bermuda regulation",
        body:
          "USDM was a regulated, fully-reserved instrument rather than a DeFi-native synthetic — its credibility rested on the SPV structure and BMA oversight.",
        bullets: [
          "Issued under Bermuda's Digital Asset Business Act (DABA) + Single-Currency Pegged Stablecoin (SCPS) guidance; BMA license #202302512.",
          "Reserves in USDM Reserves Ltd, a bankruptcy-remote SPV, segregated from operating funds and managed by EQ Capital.",
          "Composition: short-duration US T-bills (~60-day avg maturity), money-market funds, Treasury ETFs, repos, plus an over-collateralization buffer.",
          "AML/CFT monitoring, OFAC/sanctions screening, and monthly third-party reserve attestations.",
        ],
      },
      {
        heading: "Composability & multi-chain footprint",
        body:
          "Mountain optimized for being an 'ingredient' dollar that other protocols and neo-banks embed.",
        bullets: [
          "Deployed on Ethereum, Base, Polygon, Arbitrum and Optimism — same USDM and wUSDM addresses across chains.",
          "USDM usable as a plain rebasing ERC-20; wUSDM as a non-rebasing ERC-4626 share for AMMs, lending and yield markets.",
          "Open-source token contracts on GitHub (mountainprotocol/tokens).",
          "Series A thesis (Multicoin, 2024) was to extend USDM to Solana and real-world businesses — superseded by the Anchorage acquisition.",
        ],
      },
      {
        heading: "Acquisition & wind-down risk",
        body:
          "Anchorage Digital announced the acquisition on May 12, 2025, absorbing Mountain's team, technology and BMA license to bolster institutional stablecoin offerings — and Mountain simultaneously began an orderly wind-down of USDM.",
        bullets: [
          "Phase 1 (May 12 – Jun 11, 2025): minting disabled, rewards still active.",
          "Phase 2 (Jun 12 – Jul 11, 2025): reward rate reduced to 0%.",
          "Phase 3 (from Aug 22, 2025): reserves migrated to a Uniswap v4 concentrated-liquidity wUSDM:USDC pool on Ethereum; holders redeem exclusively via Uniswap — no platform custody.",
          "Residual risk: secondary-market peg now depends on Uniswap liquidity rather than 1:1 primary redemption; BMA coordination continues through the transition.",
        ],
      },
    ],
    contracts: [
      { label: "USDM (all chains: ETH/Base/Polygon/Arbitrum/OP)", value: "0x59D9356E565Ab3A36dD77763Fc0d87fEaf85508C" },
      { label: "wUSDM (all chains: ETH/Base/Polygon/Arbitrum/OP)", value: "0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812" },
    ],
    builder: {
      architecture:
        "USDM is a share-based rebasing ERC-20: the contract stores per-account shares and a global rewardMultiplier, deriving balanceOf as shares × rewardMultiplier. wUSDM is an OpenZeppelin ERC-4626 vault wrapping USDM into a non-rebasing, value-accruing share. Both are deployed at identical addresses on Ethereum, Base, Polygon, Arbitrum and Optimism. Mint/redeem against fiat/USDC was gated behind a KYC'd primary-market account (web portal or API); on-chain, USDM and wUSDM behave like ordinary tokens, so most integrators just consumed them as ERC-20 / ERC-4626.",
      integration:
        "Three integration shapes: (1) hold/transfer USDM as a rebasing ERC-20 and let balances grow; (2) wrap to wUSDM via the ERC-4626 deposit/withdraw interface to get a static, composable balance for AMMs and lending; (3) for primary mint/redeem, onboard as a KYC'd institution and call the mint/redeem platform API. [verify current API surface — the platform is in wind-down and redemption has moved to a Uniswap v4 wUSDM:USDC pool].",
      apiSurface: [
        { name: "balanceOf / sharesOf", desc: "USDM balance = shares × rewardMultiplier; sharesOf returns the fixed underlying share count." },
        { name: "rewardMultiplier()", desc: "Global accrual factor, bumped daily (~12:00 UTC) via addRewardMultiplier (privileged)." },
        { name: "deposit / mint (ERC-4626)", desc: "wUSDM: deposit USDM → receive non-rebasing wUSDM shares." },
        { name: "redeem / withdraw (ERC-4626)", desc: "wUSDM: burn shares → receive USDM (convertToAssets for quoting)." },
        { name: "Primary mint/redeem API", desc: "KYC-gated: buy USDM with USDC/fiat wire and redeem 1:1, with weekly limits. [verify — wind-down]" },
      ],
      snippet: {
        lang: "ts",
        caption: "Wrap rebasing USDM into non-rebasing wUSDM (ERC-4626) for DeFi composability.",
        code: `import { createWalletClient, http, parseUnits, getContract } from 'viem';
import { mainnet } from 'viem/chains';

const USDM  = '0x59D9356E565Ab3A36dD77763Fc0d87fEaf85508C';
const WUSDM = '0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812';

const client = createWalletClient({ chain: mainnet, transport: http() });

// 1) approve wUSDM to pull USDM
await client.writeContract({
  address: USDM, abi: erc20Abi, functionName: 'approve',
  args: [WUSDM, parseUnits('1000', 18)],
});

// 2) deposit USDM -> receive value-accruing wUSDM shares (ERC-4626)
await client.writeContract({
  address: WUSDM, abi: erc4626Abi, functionName: 'deposit',
  args: [parseUnits('1000', 18), myAddress],
});
// wUSDM balance stays flat; convertToAssets(shares) rises as yield accrues.`,
      },
      buildNotes: [
        "Never cache USDM balances — they rebase daily; read balanceOf fresh, or hold wUSDM and use convertToAssets for valuation.",
        "USDM/wUSDM share the same address on all five chains, simplifying multi-chain integrations.",
        "USDM is restricted from US persons and primary mint/redeem requires KYC; secondary holders are DEX-only.",
        "[verify] Project is in wind-down — redemption now flows through a Uniswap v4 wUSDM:USDC pool rather than the issuer; treat the platform API as deprecated.",
      ],
    },
  },
  {
    slug: "sky",
    name: "Sky (ex-MakerDAO)",
    url: "https://sky.money/",
    layers: ["L4"],
    product: "USDS stablecoin + sUSDS savings (Sky Savings Rate) + SKY governance; Spark as the first Star.",
    customer: "DeFi users, protocols, on-chain treasuries",
    moat:
      "The DAI lineage — the largest, longest-running decentralized stablecoin. On-chain savings rate + SKY rewards, RWA-backed revenue, and a SubDAO ('Star') ecosystem (Spark) routing $7B+ of reserves across DeFi.",
    region: "Global / on-chain",
    status: "researched",
    tagline: "The decentralized dollar, rebranded from Maker/DAI.",
    whatItIs:
      "Sky is the 2024 rebrand and 'Endgame' upgrade of MakerDAO — the oldest and largest decentralized-stablecoin issuer in DeFi. It issues USDS, the 1:1 successor to DAI (both still circulate), and sUSDS, an ERC-4626 savings token that accrues the Sky Savings Rate. SKY is the sole governance token (upgraded from MKR at 24,000:1). Revenue from collateral stability fees, USDC-backed T-bill reserves, and tokenized-RWA strategies funds the savings rate and SKY Token Rewards. The protocol is being broken into semi-autonomous SubDAOs called 'Stars', the first and largest being Spark.",
    howItWorks: [
      "USDS is minted against crypto collateral (ETH, wstETH, etc.) via stability-fee vaults, against USDC 1:1 through the Peg Stability Module (PSM), or by upgrading DAI 1:1 through the SkyMoneyConverter (zero fee, zero slippage).",
      "Holders deposit USDS into sUSDS (ERC-4626 vault) to earn the Sky Savings Rate; the sUSDS↔USDS exchange rate drifts upward continuously (no rebasing).",
      "Separately, depositing USDS can earn Sky Token Rewards (STR) — ~600M SKY/yr distributed to USDS suppliers — paid in SKY or partner tokens.",
      "Yield is funded by three revenue streams: vault stability fees, T-bill yield on PSM/USDC reserves via the Sky Allocator system, and curated tokenized-RWA strategies (Monetalis, BlockTower, etc.).",
      "SKY governs all parameters (savings rate, collateral, allocations) on-chain; SKY can be staked in the Staking Engine to borrow USDS, delegate votes, and earn rewards.",
      "Spark (the first Star) borrows from Sky's reserves via the Spark Liquidity Layer to deploy USDS/sUSDS across DeFi, RWAs, and multiple chains.",
    ],
    differentiators: [
      "Most established decentralized stablecoin — direct DAI heritage, 2017-onward track record, ~$11.7B USDS supply.",
      "Native, governance-set on-chain savings rate (sUSDS) plus a second SKY-denominated reward stream (STR) on top.",
      "RWA + USDC T-bill reserves are now the largest revenue source — a hybrid of DeFi collateral and real-world yield.",
      "Modular 'Star'/SubDAO architecture (Spark) lets specialized teams scale lending and multichain distribution without bloating the core.",
      "Deeply composable: USDS is a plain ERC-20 and sUSDS an ERC-4626 vault, integrated across Aave, Pendle, Spark, and L2s.",
    ],
    businessModel:
      "Spread between revenue (collateral stability fees + USDC/RWA T-bill yield) and what it pays out via the Sky Savings Rate and SKY Token Rewards; protocol surplus accrues to the Sky treasury and backs SKY. Reported ~$123.8M gross revenue and ~$46M protocol surplus in Q1 2026.",
    dependsOn: [
      "Collateral assets (ETH/wstETH and other crypto)",
      "USDC + the PSM (large reserve component)",
      "Tokenized RWAs / US Treasury market + asset managers (Monetalis, BlockTower)",
      "Ethereum (and Spark-bridged L2s/Solana)",
      "SKY governance",
    ],
    risks: [
      "Collateral + RWA concentration risk: a large share of reserves sits in USDC and off-chain tokenized Treasuries, reintroducing centralized/counterparty exposure to a 'decentralized' dollar.",
      "Governance risk: parameter and allocation decisions concentrated in SKY voting; SubDAO/Star structure adds complexity.",
      "Rate-cut risk: the savings rate tracks Fed-funds-driven yield (cut from 6.5% to 4.5% in March, ~4.75% in 2026), so payouts compress as rates fall.",
      "Regulatory pressure on decentralized issuers and on RWA/USDC reserves.",
      "Migration friction: DAI, USDS, MKR, and SKY coexisting creates integration and liquidity-fragmentation complexity.",
    ],
    keyFacts: [
      { label: "Lineage", value: "MakerDAO → Sky (rebrand Aug 2024); MKR → SKY at 24,000:1" },
      { label: "Tokens", value: "USDS + sUSDS (savings) · SKY (governance) · DAI/MKR legacy" },
      { label: "USDS supply", value: "~$11.7B (Q1 2026, +67.9% YoY); DAI+USDS ~$13B" },
      { label: "Sky Savings Rate", value: "~4.75% (2026); cut 6.5%→4.5% Mar 2026" },
      { label: "Protocol TVL", value: "~$7.5B (Mar 2026) — ~4th-largest DeFi protocol" },
      { label: "Revenue (Q1 2026)", value: "~$123.8M gross · ~$46M surplus" },
      { label: "SKY token", value: "~23.3B circulating · ~$1.55B mkt cap [verify]" },
      { label: "Sky Token Rewards", value: "~600M SKY/yr to USDS suppliers" },
      { label: "First Star", value: "Spark — TVL ~$4.8–5B (2026)" },
    ],
    links: [
      { label: "Site", url: "https://sky.money/" },
      { label: "sUSDS savings", url: "https://sky.money/susds" },
      { label: "App", url: "https://app.sky.money/" },
      { label: "Developer docs", url: "https://developers.sky.money/" },
      { label: "MKR→SKY upgrade", url: "https://upgrademkrtosky.skyeco.com/" },
      { label: "Spark (first Star)", url: "https://spark.fi/" },
      { label: "Spark docs", url: "https://docs.spark.fi/" },
      { label: "Messari profile", url: "https://messari.io/project/sky-protocol" },
    ],
    products: [
      {
        name: "USDS",
        tagline: "The decentralized dollar — DAI's 1:1 successor.",
        whatItIs:
          "USDS is Sky's flagship overcollateralized stablecoin, the upgrade path from DAI at a fixed 1:1 rate with no fee. It's minted against crypto collateral via stability-fee vaults, against USDC 1:1 through the Peg Stability Module, or by converting DAI through the SkyMoneyConverter. It's a plain ERC-20 designed for institutional integration (with optional KYC-friendly features) and composes across DeFi.",
        mechanics: [
          "Mint by upgrading DAI 1:1 (SkyMoneyConverter — lock/mint, burn/release, zero slippage).",
          "Mint against USDC 1:1 via the PSM (small governance fee window) — the dominant reserve source.",
          "Mint against crypto collateral (ETH, wstETH, etc.) in stability-fee vaults.",
          "Reserves earn T-bill yield (USDC via Sky Allocator) + curated tokenized-RWA strategies; surplus backs the peg and the treasury.",
        ],
        stats: [
          { label: "Supply", value: "~$11.7B (Q1 2026)" },
          { label: "Backing", value: "Crypto collateral + USDC + tokenized RWAs" },
          { label: "DAI parity", value: "1:1, no-fee converter" },
        ],
      },
      {
        name: "sUSDS (Sky Savings Rate)",
        tagline: "The on-chain savings account for USDS.",
        whatItIs:
          "sUSDS is an ERC-4626 vault token: deposit USDS and receive sUSDS whose exchange rate against USDS rises continuously at the Sky Savings Rate. No rebasing, no lockup, no minimum, no fee — yield accrues into the redemption value and the token stays liquid and composable (Aave, Pendle, Spark, L2s).",
        mechanics: [
          "Deposit USDS → mint sUSDS at the current exchange rate (value-accruing, not rebasing).",
          "SSR set by SKY governance, broadly tracking Fed-funds-driven reserve yield (~4.75% in 2026; was 6.5%→4.5% in March).",
          "Redeem sUSDS for USDS at any time at the accrued rate (e.g. ~1.094 USDS/sUSDS, Apr 2026).",
          "Distinct from Sky Token Rewards — sUSDS pays USDS yield; STR pays SKY/partner tokens separately.",
        ],
        stats: [
          { label: "Rate", value: "~4.75% SSR (2026)" },
          { label: "Standard", value: "ERC-4626 vault" },
          { label: "Savings TVL", value: "~$6.5B in sUSDS (2026)" },
        ],
      },
      {
        name: "Spark (first Star) + SKY governance",
        tagline: "The SubDAO that scales lending + the token that governs it.",
        whatItIs:
          "Spark is the first and largest 'Star' (SubDAO) of Sky — an open-source liquidity and lending platform with three modules: SparkLend (an Aave-V3-fork money market), Savings (spUSDS/sUSDS), and the Spark Liquidity Layer (SLL) that borrows from Sky's $7B+ reserves to mint, bridge, and deploy USDS/sUSDS across chains. SKY is the sole governance token of the core protocol (upgraded from MKR at 24,000:1); SPK is Spark's own token.",
        mechanics: [
          "SLL routes Sky reserve liquidity to DeFi + RWA venues across Ethereum, Base, Arbitrum, OP Mainnet, and Unichain.",
          "SparkLend: deposit USDS → receive spUSDS receipt token; yield distributed as additional spUSDS.",
          "SKY: governs collateral, rates, and allocations; stake in the Staking Engine to borrow USDS, delegate votes, and earn rewards.",
          "SPK: Spark's token (10B max supply; 65% farming rewards over 10y, 23% ecosystem/airdrops, 12% team).",
        ],
        stats: [
          { label: "Spark TVL", value: "~$4.8–5B (2026)" },
          { label: "MKR→SKY", value: "24,000 SKY per MKR" },
          { label: "SLL chains", value: "Ethereum, Base, Arbitrum, OP, Unichain" },
        ],
      },
    ],
    deepDive: [
      {
        heading: "USDS / DAI lineage & the 1:1 upgrade",
        body:
          "Sky is MakerDAO's 'Endgame' rebrand (August 2024). Rather than retire DAI, Sky launched USDS as a parallel, upgradeable dollar — both circulate side by side in 2026, with combined supply ~$13B (USDS ~$11.7B). The bridge between them is a smart-contract escrow, not a market.",
        bullets: [
          "SkyMoneyConverter: lock DAI → mint USDS (and burn USDS → release DAI) at a fixed 1:1 rate, zero fee, zero slippage, effectively infinite liquidity.",
          "PSM still accepts USDC 1:1 (small governance fee window) to mint USDS — a major reserve component.",
          "Why upgrade: USDS unlocks both sUSDS (SSR) and Sky Token Rewards (STR), which DAI's legacy DSR does not.",
          "USDS adds optional institution-friendly features (e.g. freeze functionality) that DAI lacks — a deliberate trade-off vs. DAI's purer neutrality.",
        ],
      },
      {
        heading: "Sky Savings Rate — mechanics & funding",
        body:
          "The SSR is an on-chain interest rate paid to sUSDS holders, set by SKY governance. sUSDS is ERC-4626: yield compounds into the share/USDS exchange rate (value-accruing), so balances don't rebase. It is funded from protocol revenue, not new issuance.",
        bullets: [
          "Three revenue streams fund it: (1) stability fees on collateralized USDS vaults; (2) T-bill yield on USDC/PSM reserves via the Sky Allocator; (3) curated tokenized-RWA strategies.",
          "Rate tracks Fed-funds-driven reserve yield plus a thin protocol margin — cut from 6.5% to 4.5% in March 2026, ~4.75% through 2026.",
          "sUSDS accrued ~1.094 USDS each by April 2026; redeemable anytime, no minimum, no fee.",
          "Sky Token Rewards (STR) is a separate, stackable stream: ~600M SKY/yr to USDS suppliers, paid in SKY or partner tokens.",
        ],
      },
      {
        heading: "Stars / SubDAOs & the Spark architecture",
        body:
          "The Endgame plan decomposes the monolith into semi-autonomous 'Stars' (SubDAOs), each with its own token, product focus, and treasury, tethered to core Sky via shared reserves, USDS integration, and rewards. Spark is the first and dominant Star.",
        bullets: [
          "Spark modules: SparkLend (Aave-V3 fork money market), Savings (spUSDS / sUSDS), and the Spark Liquidity Layer (SLL).",
          "SLL mints/bridges/deploys USDS + sUSDS from Sky's $7B+ reserves across Ethereum, Base, Arbitrum One, OP Mainnet, and Unichain — the multichain distribution engine for USDS.",
          "SparkLend issues spUSDS (~$405M USDS deposited [verify]); yield paid as additional spUSDS.",
          "SPK token (10B max): 65% farming (10y), 23% ecosystem/airdrops, 12% team; 2026 roadmap targets a 'Spark Federation' veSPK governance model.",
        ],
      },
      {
        heading: "Governance, RWA collateral & risk",
        body:
          "SKY is the sole governance token (MKR upgraded at 24,000:1; MKR↔SKY conversion subject to a Delayed Upgrade Penalty escalating 1%/quarter from Sept 2025). Governance controls collateral types, the savings rate, and reserve allocations — including the RWA and USDC exposure that now dominates revenue.",
        bullets: [
          "RWA holdings crossed ~$1.5B in early 2026 (tokenized US Treasuries via Monetalis, BlockTower, etc.) — the single largest revenue source.",
          "Centralization tension: a 'decentralized' dollar increasingly backed by USDC + off-chain Treasuries reintroduces custodial/counterparty and regulatory risk.",
          "SKY Staking Engine: stake SKY to borrow USDS, delegate voting power, and earn rewards.",
          "Surplus: ~$123.8M gross revenue / ~$46M protocol surplus in Q1 2026 accrues to the treasury and backstops the system.",
        ],
      },
    ],
    contracts: [
      { label: "USDS (ERC-20)", value: "0xdC035D45d973E3EC169d2276DDab16f1e407384F" },
      { label: "sUSDS (ERC-4626 vault)", value: "0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD" },
      { label: "SKY (governance)", value: "0x56072C95FAA701256059aa122697B133aDEd9279" },
      { label: "SkyMoneyConverter (DAI↔USDS)", value: "[verify]" },
    ],
    builder: {
      architecture:
        "Sky exposes two clean primitives. USDS is a standard ERC-20 dollar; sUSDS is an ERC-4626 savings vault where the share→asset exchange rate rises at the Sky Savings Rate. Integrating savings is just an ERC-4626 deposit/redeem against the sUSDS contract — no custom rebasing logic, no claim step (yield is in the exchange rate). To source USDS, integrators either upgrade DAI 1:1 via the SkyMoneyConverter, mint from USDC 1:1 via the PSM, or buy on-market. Spark's Liquidity Layer extends USDS/sUSDS to Base, Arbitrum, OP, and Unichain for multichain integrations.",
      integration:
        "Treat sUSDS like any ERC-4626 vault: read previewDeposit/previewRedeem and convertToAssets to quote yield, call deposit/mint to enter and redeem/withdraw to exit. Use the USDS ERC-20 for balances/transfers/approvals. For DAI-based apps, route through the converter to standardize on USDS. Verify all addresses against developers.sky.money before mainnet use.",
      apiSurface: [
        { name: "USDS.transfer / approve / balanceOf", desc: "Standard ERC-20 dollar operations." },
        { name: "sUSDS.deposit(assets, receiver)", desc: "Deposit USDS, mint sUSDS shares (ERC-4626)." },
        { name: "sUSDS.redeem(shares, receiver, owner)", desc: "Burn sUSDS, withdraw accrued USDS." },
        { name: "sUSDS.convertToAssets(shares)", desc: "Read current USDS value of sUSDS — exposes the accrued SSR." },
        { name: "SkyMoneyConverter.daiToUsds / usdsToDai", desc: "Upgrade/downgrade DAI↔USDS 1:1, no fee. [verify method names]" },
        { name: "PSM (USDC↔USDS)", desc: "Mint/redeem USDS against USDC 1:1 within a governance fee window. [verify]" },
      ],
      snippet: {
        lang: "ts",
        caption: "Deposit USDS into the sUSDS savings vault (ERC-4626) and read accrued value.",
        code: `import { ethers } from 'ethers';

const USDS  = '0xdC035D45d973E3EC169d2276DDab16f1e407384F';
const SUSDS = '0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD'; // ERC-4626

const erc20 = new ethers.Contract(USDS, [
  'function approve(address,uint256) returns (bool)',
], signer);

const vault = new ethers.Contract(SUSDS, [
  'function deposit(uint256 assets,address receiver) returns (uint256)',
  'function convertToAssets(uint256 shares) view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
], signer);

const amount = ethers.parseUnits('1000', 18);   // 1,000 USDS
await (await erc20.approve(SUSDS, amount)).wait();
await (await vault.deposit(amount, await signer.getAddress())).wait();

// Yield accrues in the exchange rate — no claim needed:
const shares = await vault.balanceOf(await signer.getAddress());
const usdsValue = await vault.convertToAssets(shares); // > deposited over time`,
      },
      buildNotes: [
        "sUSDS is value-accruing, not rebasing — never assume balanceOf grows; quote yield via convertToAssets/previewRedeem.",
        "The Sky Savings Rate is set by SKY governance and changes (6.5%→4.5% in March 2026) — don't hardcode an APY.",
        "Sky Token Rewards (STR) are a separate USDS-deposit program from sUSDS; integrate them independently if needed.",
        "[verify all addresses, the SkyMoneyConverter/PSM method signatures, and current sUSDS deployment scope against developers.sky.money — sUSDS was Ethereum-only as of April 2026, with Spark SLL handling L2 distribution]",
      ],
    },
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
    product:
      "Consumer super-app: accounts, cards, FX, investing, crypto (Revolut X), staking, stablecoin conversion — plus Revolut Business with a real public API.",
    customer: "65M+ retail consumers + business accounts",
    moat:
      "Scale + a deep license stack (MiCA/CASP via Cyprus, Lithuanian EMI, UK bank). Fee-free 1:1 stablecoin↔USD; ~$10.5B stablecoin sent in 2025 (+156% YoY); reported own-stablecoin plan.",
    region: "40+ markets (EU-led; UK; expanding US)",
    status: "researched",
    tagline: "The fiat-native super-app bolting on stablecoin rails.",
    whatItIs:
      "Revolut is a consumer financial super-app — multi-currency accounts, cards, FX, investing, and crypto — now adding stablecoin rails at scale. It serves 65M+ retail customers across 40+ markets, runs a dedicated crypto exchange (Revolut X), and in 2025 layered on a MiCA-licensed 'Crypto 2.0' offering: 280+ tokens, zero-fee staking, and commission-free 1:1 USD↔USDC/USDT conversion. It is reportedly developing its own USD/EUR stablecoin, which would turn the super-app from a stablecoin distributor into an issuer.",
    howItWorks: [
      "Users hold fiat, crypto, and 280+ tokens in one app; the same balance sheet that powers cards/FX now touches stablecoins.",
      "Crypto 2.0 (live under MiCA from late-2025): commission-free 1:1 swaps between USD and USDC/USDT with no spread.",
      "Stablecoins move across 6+ chains (Ethereum, Solana, Tron, Arbitrum, and others) for deposits/withdrawals to external wallets.",
      "Revolut X (advanced order-book exchange) offers ~210 tokens with low flat fees (~0% maker / ~0.09% taker) for active traders.",
      "Zero-fee staking on ETH/SOL/ADA/DOT/POL/XTZ routes network rewards to users; Revolut keeps a margin elsewhere.",
      "Revolut Business exposes a real public Merchant API (accept online payments) and Business API (accounts/payouts) for developers.",
    ],
    differentiators: [
      "Distribution at neo-bank scale (65M+ users) attached to a profitable P&L — stablecoins ride existing rails, not a cold-start.",
      "License stack lets it issue: MiCA/CASP via Cyprus (Revolut Digital Assets Europe Ltd) passports crypto across 30 EEA states; a Lithuanian EMI provides the legal frame to issue e-money/stablecoins; full UK bank (restrictions lifted Mar 2026).",
      "Fee-free, spread-free 1:1 stablecoin↔USD conversion uses Revolut's own ledger rather than card rails — a cost edge ramps can't match.",
      "Two-sided crypto: a simple in-app experience plus Revolut X for pro traders, and Revolut Ramp/Pay distribute its rails into 21+ third-party wallets/apps (e.g. Trust Wallet, MoonPay).",
    ],
    businessModel:
      "Interchange, subscription tiers, FX spreads, wealth/trading fees, and crypto trade/exchange spreads. Stablecoins add conversion/transfer economics today; a proprietary stablecoin would add reserve (T-bill) yield on float [verify].",
    dependsOn: [
      "Banking + EMI + card licenses (UK PRA, Lithuania EMI, Cyprus CASP)",
      "Stablecoin issuers (Circle/USDC, Tether/USDT) until/unless it issues its own",
      "Underlying chains (Ethereum, Solana, Tron, Arbitrum)",
      "Card networks (Visa/Mastercard) and partner ramps (MoonPay, Onramper) for Revolut Ramp distribution",
    ],
    risks: [
      "Heavy, multi-jurisdiction regulatory scrutiny; an own-stablecoin would invite reserve/redemption and securities-law questions.",
      "Crypto revenue is cyclical — it swelled 2024 profit and can contract sharply in a downturn.",
      "Stablecoin↔USD economics are thin if offered fee-free; the payoff depends on float/issuance, which is unproven for Revolut.",
      "Competes for the same super-app endgame as Nubank, Coinbase, and DeFi-native neo-banks.",
    ],
    keyFacts: [
      { label: "Founded", value: "2015 (London) — Nik Storonsky, Vlad Yatsenko" },
      { label: "Users", value: "52.5M retail (end-2024); ~65M+ reported in 2025 across 40+ markets" },
      { label: "2024 results", value: "$4.0B revenue (+72%), $1.4B pre-tax profit (+149%), $1.0B net" },
      { label: "Valuation", value: "~$75B (2025 secondary share sales; up from $45B in 2024)" },
      { label: "Stablecoin volume", value: "~$10.5B sent in 2025 (+156% YoY, third-party estimate)" },
      { label: "Crypto licenses", value: "MiCA/CASP via Cyprus (CySEC, Oct 2025; effective 25 Nov 2025), passportable across 30 EEA states" },
      { label: "Bank license", value: "UK bank — restricted license Jul 2024, restrictions lifted / mobilisation ended 11 Mar 2026" },
      { label: "Own stablecoin", value: "Reported in development (USD/EUR), Lithuanian EMI provides the issuance frame [verify launch]" },
    ],
    links: [
      { label: "Site", url: "https://www.revolut.com/" },
      { label: "Revolut X (exchange)", url: "https://www.revolut.com/revolut-x/" },
      { label: "Revolut Ramp", url: "https://www.revolut.com/ramp/" },
      { label: "2024 Annual Report", url: "https://www.revolut.com/news/record_growth_and_diverse_product_offering_drive_revolut_to_1_4bn_profit_in_2024/" },
      { label: "MiCA license (CoinDesk)", url: "https://www.coindesk.com/policy/2025/10/23/revolut-secures-mica-license-in-cyprus-expanding-regulated-crypto-services-across-europe" },
      { label: "Developer portal", url: "https://developer.revolut.com/" },
      { label: "Merchant API docs", url: "https://developer.revolut.com/docs/merchant/merchant-api" },
      { label: "Business API docs", url: "https://developer.revolut.com/docs/business/business-api" },
    ],
    products: [
      {
        name: "Crypto 2.0 (in-app crypto + stablecoins)",
        tagline: "The consumer crypto layer — now MiCA-licensed.",
        whatItIs:
          "The mainstream in-app crypto experience inside the super-app, relaunched as 'Crypto 2.0' once the Cyprus MiCA license took effect (late 2025). It widens the token menu to 280+, makes staking free, and — most relevant to stablecoin rails — adds commission-free, spread-free 1:1 conversion between USD and USDC/USDT, with on-chain deposits/withdrawals to external wallets.",
        mechanics: [
          "1:1 USD↔USDC/USDT swaps with no commission and no spread (launched Oct 2025).",
          "Deposit/withdraw stablecoins to external wallets across 6+ chains (Ethereum, Solana, Tron, Arbitrum, others).",
          "280+ tokens; new MiCA-era fee structure from 8 Dec 2025.",
          "Existing KYC/balance is reused, so conversion stays inside Revolut's ledger rather than card rails.",
        ],
        stats: [
          { label: "Tokens", value: "280+" },
          { label: "USD↔stablecoin", value: "1:1, 0 commission / 0 spread" },
          { label: "Stablecoin sent (2025)", value: "~$10.5B (+156% YoY)" },
        ],
      },
      {
        name: "Revolut X",
        tagline: "An advanced order-book exchange for active traders.",
        whatItIs:
          "A standalone, pro-grade crypto exchange (web + app) separate from the simple in-app flow, aimed at frequent traders. It runs a real order book with low flat fees and a wider asset list, and is offered across the EEA under the MiCA license.",
        mechanics: [
          "Order-book trading across ~210 tokens.",
          "Flat fees ~0% maker / ~0.09% taker.",
          "On-chain deposits/withdrawals for 35+ tokens to/from external wallets.",
          "Distributed across the EEA under the Cyprus MiCA/CASP authorization.",
        ],
        stats: [
          { label: "Tokens", value: "~210" },
          { label: "Fees", value: "~0% maker / ~0.09% taker" },
          { label: "Coverage", value: "EEA (MiCA)" },
        ],
      },
      {
        name: "Crypto staking",
        tagline: "Zero-fee staking inside the super-app.",
        whatItIs:
          "In-app staking that passes network rewards to users with a 0% Revolut fee on the rewards, across major proof-of-stake assets. It complements the stablecoin/conversion economics by deepening crypto engagement.",
        mechanics: [
          "0% fee on staking rewards.",
          "Supported assets include ETH, SOL, ADA, DOT, POL (ex-MATIC), XTZ.",
          "Advertised rates vary by asset (e.g. ETH up to ~3.6%, SOL up to ~7.1%); headline 'up to ~22%' cited for some assets [verify].",
        ],
        stats: [
          { label: "Reward fee", value: "0%" },
          { label: "Assets", value: "ETH, SOL, ADA, DOT, POL, XTZ" },
          { label: "ETH / SOL APY", value: "up to ~3.6% / ~7.1% [verify]" },
        ],
      },
      {
        name: "Revolut Business + API",
        tagline: "The developer surface: accept payments + automate accounts.",
        whatItIs:
          "Revolut Business is the SMB/enterprise account product, and unlike most of the consumer app it ships a real public API. The Merchant API accepts online payments (orders, refunds, webhooks) and the Business API automates the business account (balances, counterparties, payouts). Business customers were ~15% of group revenue in 2024.",
        mechanics: [
          "Merchant account is a sub-account of the Business account, dedicated to e-commerce acceptance.",
          "Merchant API: create/capture/cancel/refund orders, hosted checkout, webhooks for the order lifecycle.",
          "Business API: accounts, counterparties, payments/payouts, transactions (OAuth-based for third-party apps).",
          "Crypto/stablecoin endpoints are not part of the public Merchant/Business API today [verify].",
        ],
        stats: [
          { label: "Business revenue", value: "$592M (2024), ~15% of group" },
          { label: "Surfaces", value: "Merchant API + Business API" },
          { label: "Auth", value: "Secret API key (Merchant) / OAuth (Business)" },
        ],
      },
    ],
    deepDive: [
      {
        heading: "Stablecoin strategy & the own-coin plan",
        body:
          "Revolut's near-term play is distribution: make stablecoins frictionless inside an app 65M+ people already use. The 2025 move to commission-free, spread-free 1:1 USD↔USDC/USDT — settled on Revolut's own ledger rather than card rails — is the wedge. The bigger, reported step is issuance.",
        bullets: [
          "Today: distributes third-party stablecoins (USDC, USDT) with 1:1 fee-free conversion and on-chain withdrawal across 6+ chains.",
          "Reported plan: issue its own USD and EUR stablecoins for zero-cost transfers between Revolut accounts and on-chain wallets; in talks with at least one crypto-native firm [verify].",
          "Legal frame: its Lithuanian EMI is cited as the basis for issuing e-money/stablecoins; the Cyprus entity is a CASP (service provider), not the issuer.",
          "Strategic prize: an own-stablecoin converts thin conversion economics into reserve (T-bill) yield on float, mirroring Circle/Bridge.",
        ],
      },
      {
        heading: "Licensing & regulatory footprint",
        body:
          "Revolut's real moat is a stack of licenses few crypto-natives or neo-banks hold simultaneously, letting it both bank users and offer/issue crypto under one roof.",
        bullets: [
          "MiCA/CASP via Cyprus (CySEC), granted Oct 2025, effective 25 Nov 2025 — passports regulated crypto across all 30 EEA states under one rule set.",
          "EU crypto entity: Revolut Digital Assets Europe Ltd (ex RT Digital Securities Cyprus Ltd), CySEC ref 001/22.",
          "Lithuanian EMI underpins e-money / potential stablecoin issuance.",
          "UK banking license: restricted grant Jul 2024 (£50k deposit cap during mobilisation), restrictions lifted / mobilisation ended 11 Mar 2026 — full UK bank.",
          "US: pursuing a US bank with plans for FDIC-insured and stablecoin-linked accounts [verify timing].",
        ],
      },
      {
        heading: "Scale & distribution moat",
        body:
          "Revolut adds stablecoins from a position of profitable scale, so each new rail is incremental rather than a standalone business that must find users.",
        bullets: [
          "52.5M retail customers at end-2024 (+38% YoY), ~65M+ reported through 2025, across 40+ markets.",
          "2024: $4.0B revenue (+72%), $1.4B pre-tax profit (+149%), $1.0B net — fourth straight profitable year.",
          "Crypto/wealth was a major 2024 growth driver (wealth revenue +298% to $647M).",
          "~$75B valuation in 2025 secondary sales (vs ~$45B in 2024).",
          "Revolut Ramp/Pay push its rails outward into 21+ partner apps (Trust Wallet, MoonPay), reusing existing KYC for higher conversion.",
        ],
      },
      {
        heading: "Developer surface & risk",
        bullets: [
          "Public API lives almost entirely on the Business side: Merchant API (accept payments) + Business API (account automation, OAuth).",
          "Merchant API uses header versioning (Revolut-Api-Version) and Secret API key auth; sandbox at sandbox-merchant.revolut.com.",
          "No public crypto/stablecoin API today — stablecoin features are consumer-app surfaces, not developer endpoints [verify].",
          "Risks: cyclical crypto revenue, thin fee-free conversion margins, and intense multi-jurisdiction regulation (heightened if it becomes a stablecoin issuer).",
        ],
      },
    ],
    builder: {
      architecture:
        "The public developer surface is Revolut Business, split in two. The Merchant API accepts online payments: a Merchant account (a sub-account of the Business account) holds an Order object that walks a lifecycle (created → authorised → completed, plus cancelled/failed/refunded), and webhooks push each state change to your server. The Business API automates the business account itself (balances, counterparties, payouts, transactions) and uses OAuth for third-party apps. Crypto/stablecoin conversion is a consumer-app feature, not part of this API [verify].",
      integration:
        "Generate API keys in the Revolut Business dashboard. Merchant API auth is a Secret API key (server-side) with a publishable key for the client checkout widget; the Business API uses OAuth 2.0 for apps acting on a business's behalf. All Merchant calls send a Revolut-Api-Version header (request-header versioning). Test against the sandbox base URL https://sandbox-merchant.revolut.com/ , then switch to production https://merchant.revolut.com/ by swapping keys.",
      apiSurface: [
        { name: "POST /api/orders", desc: "Create an Order — amount, currency, capture mode; returns an order id + checkout token for the payment widget." },
        { name: "GET /api/orders/{id}", desc: "Retrieve an order and its current state (created / authorised / completed / cancelled / failed)." },
        { name: "POST /api/orders/{id}/capture", desc: "Capture the funds of an authorised, uncaptured order to move it to processing." },
        { name: "POST /api/orders/{id}/cancel", desc: "Cancel an existing uncaptured order." },
        { name: "POST /api/orders/{id}/refund", desc: "Full or partial refund of a completed order, back to the original payment method." },
        { name: "POST /api/1.0/webhooks", desc: "Register a webhook URL (max 10) for events like ORDER_AUTHORISED, ORDER_COMPLETED, ORDER_CANCELLED, ORDER_FAILED." },
        { name: "Business API (OAuth)", desc: "Accounts, counterparties, payments/payouts, and transactions for automating the business account on a user's behalf." },
      ],
      snippet: {
        lang: "ts",
        caption: "Merchant API: create an order, then verify completion from the webhook (the source of truth).",
        code: `// 1) Server-side: create an order with your Secret API key.
const res = await fetch('https://merchant.revolut.com/api/orders', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${REVOLUT_SECRET_KEY}\`, // never ship to the client
    'Revolut-Api-Version': '2024-09-01',               // request-header versioning
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: 5000,          // minor units: 50.00
    currency: 'EUR',
    capture_mode: 'automatic',
  }),
});
const order = await res.json();
// Pass order.token to the RevolutCheckout widget on the client to collect payment.

// 2) Webhook handler — treat ORDER_COMPLETED, not the client, as truth.
export function handleWebhook(event: { event: string; order_id: string }) {
  if (event.event === 'ORDER_COMPLETED') {
    fulfil(event.order_id);
  }
}`,
      },
      buildNotes: [
        "Order lifecycle: created → authorised → completed (or cancelled/failed/refunded). Fulfil on the ORDER_COMPLETED webhook, never on a client redirect.",
        "Auth split: Merchant API = Secret API key (Bearer); Business API = OAuth 2.0 for third-party apps.",
        "Always send the Revolut-Api-Version header on Merchant calls; the API pins behaviour to that date.",
        "Max 10 webhook URLs per merchant — registering more returns 422 Unprocessable Content.",
        "Sandbox first (sandbox-merchant.revolut.com), then swap keys for production (merchant.revolut.com).",
        "[verify exact paths/version string against the current developer.revolut.com docs — endpoint prefixes and the version date evolve; no public crypto/stablecoin API confirmed]",
      ],
    },
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
