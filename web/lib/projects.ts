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
    product: "API to accept / store / convert / pay out stablecoins; issue your own stablecoin.",
    customer: "Developers & platforms",
    moat:
      "Acquired by Stripe ($1.1B, 2025). Own-stablecoin issuance with T-bill yield share + Stripe distribution.",
    region: "Global",
    status: "researched",
    tagline: "Stripe for stablecoins.",
    whatItIs:
      "Bridge is a stablecoin orchestration API. With a few lines of code a developer can accept, store, convert, and pay out stablecoins, or even issue their own — Bridge handles the wallets, chains, banking partners, and compliance underneath. Stripe acquired it in 2025 for $1.1B, its largest deal ever.",
    howItWorks: [
      "Orchestration: move/store/accept stablecoins via API while Bridge abstracts chains + compliance.",
      "Issuance: spin up your own stablecoin; Bridge invests the reserves in US Treasuries and shares the yield with you.",
      "Money transfer: send funds globally and offer USD/EUR accounts to consumers and businesses.",
      "Now distributed through Stripe's payments stack to its global merchant base.",
    ],
    differentiators: [
      "Owned by Stripe — instant distribution and trust most rivals can't match.",
      "Issuance + T-bill yield share is a revenue line, not just plumbing.",
      "Abstracts regulatory + technical complexity behind a clean developer API.",
    ],
    businessModel: "Fees on volume + a share of reserve (T-bill) yield on issued stablecoins.",
    dependsOn: ["Banking partners", "Circle/Tether liquidity", "Stripe", "Underlying chains"],
    risks: [
      "Regulatory exposure as a (now) bank-adjacent stablecoin issuer.",
      "Concentration: deeply tied to Stripe's strategy post-acquisition.",
    ],
    keyFacts: [
      { label: "Founded", value: "2022 (San Francisco)" },
      { label: "Founders", value: "Zach Abrams, Sean Yu (ex-Coinbase / Square Cash App)" },
      { label: "Funding", value: "~$58M (Haun, Sequoia, Ribbit, Index)" },
      { label: "Owned by", value: "Stripe — $1.1B acquisition, closed early 2025" },
      { label: "Notable users", value: "SpaceX/Starlink (Argentina repatriation), consumers in Nigeria" },
    ],
    links: [
      { label: "Site", url: "https://www.bridge.xyz/" },
      { label: "API docs", url: "https://apidocs.bridge.xyz/" },
      { label: "Stripe acquisition", url: "https://stripe.com/newsroom/news/stripe-completes-bridge-acquisition" },
    ],
  },
  {
    slug: "bvnk",
    name: "BVNK",
    url: "https://bvnk.com/",
    layers: ["L2", "L3"],
    product: "Enterprise stablecoin payments, virtual accounts, embedded processing.",
    customer: "Enterprises, fintechs, marketplaces",
    moat:
      "Enterprise SLAs (99.9% uptime), ~$30B annualized volume, Visa partnership, full US + EU coverage.",
    region: "EU + US",
    status: "researched",
    tagline: "Enterprise-grade stablecoin payment infrastructure.",
    whatItIs:
      "BVNK is a stablecoin payments platform aimed at enterprises and fintechs. It offers virtual accounts, embedded payment processing, and payouts with traditional payment-processor reliability — the pick when SLAs and per-merchant configuration matter more than raw chain coverage.",
    howItWorks: [
      "Merchants get virtual accounts and an API to accept + settle in stablecoins or fiat.",
      "Configurable per-merchant rules; posts 99.9% uptime as an enterprise SLA.",
      "Settles across stablecoin networks and bank rails, with payouts in local currency.",
      "Visa partnership extends stablecoin settlement into card flows.",
    ],
    differentiators: [
      "Enterprise SLAs + virtual accounts vs. developer-only APIs.",
      "Scale: ~$30B annualized volume across ~2.8M transactions.",
      "Broad licensing — full US state-wide coverage + EU authorization.",
    ],
    businessModel: "Processing fees on payment volume + FX spread on conversion.",
    dependsOn: ["Banking partners", "Card networks (Visa)", "Stablecoin issuers"],
    risks: [
      "Enterprise sales cycles are long; growth tied to large-customer wins.",
      "Competes directly with Bridge/Stripe's distribution muscle.",
    ],
    keyFacts: [
      { label: "Founded", value: "2021 (London)" },
      { label: "Funding", value: "$50M Series B (Haun Ventures; Coinbase Ventures, Tiger Global)" },
      { label: "Valuation", value: "~$750M (Dec 2024)" },
      { label: "Volume", value: "~$30B annualized (2.3× YoY), ~2.8M tx" },
      { label: "Partners", value: "Visa" },
    ],
    links: [
      { label: "Site", url: "https://bvnk.com/" },
      { label: "Payments", url: "https://bvnk.com/payments" },
    ],
  },
  {
    slug: "sphere",
    name: "Sphere",
    url: "https://spherepay.co/",
    layers: ["L2", "L3"],
    product: "Cross-border payments API (“stablecoin sandwich”), white-label SDKs, SphereNet ledger.",
    customer: "B2B import/export, fintech treasury",
    moat: "Solana-based permissioned ledger; settles <30 min across 160+ markets. LatAm push.",
    region: "LatAm-heavy",
    status: "to-research",
    tagline: "An operating system for cross-border money movement.",
    whatItIs:
      "Sphere (Sphere Labs / SpherePay) is a B2B cross-border payments API. It moves dollars across borders using the 'stablecoin sandwich' — convert local currency to a stablecoin, then to the destination currency — settling in under 30 minutes across 160+ markets. It's also building SphereNet, a Solana-based permissioned settlement ledger.",
    howItWorks: [
      "Stablecoin sandwich: local currency → USD stablecoin → destination currency.",
      "Wired to bank rails (ACH, Wire, SEPA, PIX) and chains (Solana, ETH, Base, Polygon, Tron…).",
      "White-label embeds + SDKs let fintechs offer on/off-ramp + transfer flows.",
      "SphereNet: a permissioned Solana environment with built-in compliance for regulated transfers.",
    ],
    differentiators: [
      "Settles in <30 min across 160+ markets.",
      "Solana-based permissioned ledger (SphereNet) as a compliance-first rail.",
      "Deep LatAm focus — local hiring, sales, and compliance investment.",
    ],
    businessModel: "FX spread + fees on transfer volume; infrastructure fees for embeds.",
    dependsOn: ["Bank rails (ACH/Wire/SEPA/PIX)", "Solana + other chains", "Stablecoin liquidity (USDC/USDT/EURC)"],
    risks: [
      "Emerging-market FX + liquidity volatility.",
      "Crowded LatAm corridor; distribution is the real battleground.",
    ],
    keyFacts: [
      { label: "Founders", value: "Arnold Lee (Sphere Labs)" },
      { label: "HQ / founding", value: "[verify — distinct from a closed 2017 'SpherePay' record]" },
      { label: "Funding", value: "[verify]" },
      { label: "Coverage", value: "160+ markets; settle <30 min" },
      { label: "Currencies", value: "USD, EUR, BRL, USDC, USDT, EURC" },
    ],
    links: [
      { label: "Site", url: "https://spherepay.co/" },
      { label: "Sphere Labs", url: "https://spherelabs.co/" },
      { label: "Docs", url: "https://docs.spherepay.co/introduction" },
    ],
  },
  {
    slug: "rain",
    name: "Rain",
    url: "https://www.rain.xyz/",
    layers: ["L2", "L5"],
    product: "Stablecoin-backed card issuing — Visa cards that spend directly from on-chain balances.",
    customer: "Crypto platforms, wallets, neo-banks",
    moat: "Issuer-processor settling natively in USDC (Visa member). [verify scope/regions]",
    region: "Global",
    status: "to-research",
    tagline: "Card issuing that settles in stablecoins.",
    whatItIs:
      "Rain is a card-issuing platform that lets companies ship Visa cards which spend directly from on-chain stablecoin balances. It acts as the issuer-processor so wallets and neo-banks can offer a card without building card infrastructure themselves.",
    howItWorks: [
      "A partner integrates Rain's API to issue branded Visa cards to its users.",
      "When a user spends, the balance is drawn from their on-chain stablecoin (e.g. USDC).",
      "Rain handles authorization, settlement, and the fiat ↔ stablecoin conversion at the network.",
    ],
    differentiators: [
      "Native USDC settlement rather than pre-funded fiat float.",
      "Visa membership lets partners skip a separate BIN sponsor.",
      "Card issuing as a primitive for the whole on-chain neo-bank wave.",
    ],
    businessModel: "Interchange share + issuing/processing fees per card + per transaction.",
    dependsOn: ["Visa", "Stablecoin issuers", "Banking/BIN sponsorship"],
    risks: ["Interchange + regulatory regime varies sharply by region.", "[verify product scope and live geographies]"],
    keyFacts: [
      { label: "Layer", value: "Card issuing (L2/L5)" },
      { label: "Network", value: "Visa" },
      { label: "Settles in", value: "USDC (on-chain)" },
      { label: "Status", value: "🟡 to verify — scope, regions, customers" },
    ],
    links: [{ label: "Site", url: "https://www.rain.xyz/" }],
  },
  {
    slug: "mural-pay",
    name: "Mural Pay",
    url: "https://www.muralpay.com/",
    layers: ["L3", "L2"],
    product: "Global stablecoin accounts + payments API; bulk payouts (100+ in one tx).",
    customer: "Businesses, marketplaces (LatAm-heavy)",
    moat: "Stablecoin ⇄ 40+ local currencies with built-in KYB/KYC; one-API global accounts.",
    region: "LatAm + global",
    status: "to-research",
    tagline: "Global accounts and real-time payments in one API.",
    whatItIs:
      "Mural Pay is a business-first global payments platform that converts stablecoins into 40+ local currencies, with built-in compliance. It's built for cross-border B2B payouts — including bulk runs of 100+ contractor/vendor payments in a single transaction.",
    howItWorks: [
      "Businesses open global stablecoin accounts via one API.",
      "Fund in stablecoins, pay out in 40+ local currencies with real-time tracking.",
      "Bulk payouts: 100+ recipients in a single transaction.",
      "KYB/KYC and compliance handled in-platform.",
    ],
    differentiators: [
      "Bulk contractor/vendor payouts at scale.",
      "40+ currency last-mile coverage with compliance built in.",
      "Especially strong for LatAm-based businesses.",
    ],
    businessModel: "FX spread + per-payout fees.",
    dependsOn: ["Local banking partners", "Stablecoin liquidity (USDC)"],
    risks: ["Emerging-market liquidity + FX.", "[verify funding, founding, traction]"],
    keyFacts: [
      { label: "Currencies", value: "40+ local payout currencies" },
      { label: "Bulk", value: "100+ payouts per transaction" },
      { label: "Region", value: "LatAm-heavy, expanding global" },
      { label: "Status", value: "🟡 to verify" },
    ],
    links: [
      { label: "Site", url: "https://www.muralpay.com/" },
      { label: "Stablecoin API", url: "https://www.muralpay.com/stablecoin-api" },
    ],
  },
  {
    slug: "conduit",
    name: "Conduit",
    url: "https://conduitpay.com/",
    layers: ["L3"],
    product: "Stablecoin-based cross-border B2B payments.",
    customer: "Businesses in emerging markets",
    moat: "Emerging-market corridors (LatAm / Africa).",
    region: "Emerging markets",
    status: "to-research",
    tagline: "Cross-border B2B payments on stablecoin rails.",
    whatItIs:
      "Conduit uses stablecoins to power cross-border B2B payments, focused on emerging-market corridors (LatAm, Africa) where traditional banking rails are slow and costly.",
    howItWorks: [
      "Businesses send cross-border payments funded by stablecoins.",
      "Conduit handles conversion and local-currency settlement in the destination market.",
    ],
    differentiators: [
      "Emerging-market corridor focus.",
      "Faster, cheaper settlement than correspondent banking.",
    ],
    businessModel: "FX spread + transfer fees.",
    dependsOn: ["Local banking partners", "Stablecoin liquidity"],
    risks: ["Regulatory + liquidity risk in frontier corridors.", "[verify volumes, corridors, licensing]"],
    keyFacts: [
      { label: "Region", value: "Emerging markets (LatAm / Africa)" },
      { label: "Layer", value: "Cross-border settlement (L3)" },
      { label: "Status", value: "🟡 to verify" },
    ],
    links: [{ label: "Site", url: "https://conduitpay.com/" }],
  },
  {
    slug: "felix-pago",
    name: "Felix Pago",
    url: "https://www.getfelix.com/",
    layers: ["L3", "L5"],
    product: "Stablecoin-funded remittances sent over WhatsApp.",
    customer: "Consumers (US → LatAm remittances)",
    moat: "Distribution via WhatsApp + USDC rails (dLocal partner); delivery in minutes, ~99% success.",
    region: "US → Mexico / Guatemala / Honduras",
    status: "to-research",
    tagline: "Remittances over WhatsApp, settled in stablecoins.",
    whatItIs:
      "Felix Pago lets people send remittances from the US to Latin America through a WhatsApp chat. Stablecoins (USDC) settle the transfer behind the scenes, partnered with dLocal for local-currency payout — arriving in minutes instead of next-day.",
    howItWorks: [
      "Sender initiates a transfer in a WhatsApp conversation (no separate app).",
      "USDC settles the value cross-border.",
      "dLocal pays out in local currency, direct-to-bank, typically under two minutes.",
    ],
    differentiators: [
      "Distribution via WhatsApp — meets users where they already are.",
      "Minutes-not-days delivery with ~99% success.",
      "Stablecoin rail invisible to the end user.",
    ],
    businessModel: "Remittance fee + FX spread.",
    dependsOn: ["WhatsApp", "USDC", "dLocal (last-mile payout)"],
    risks: ["Platform dependence on WhatsApp.", "Remittance regulation across corridors."],
    keyFacts: [
      { label: "Corridors", value: "US → Mexico, Guatemala, Honduras" },
      { label: "Rail", value: "USDC + dLocal payout" },
      { label: "Speed", value: "Minutes, ~99% success" },
      { label: "Status", value: "🟡 to verify (founding, funding)" },
    ],
    links: [{ label: "Site", url: "https://www.getfelix.com/" }],
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
    status: "to-research",
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
      { label: "Status", value: "🟡 to verify" },
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
    status: "to-research",
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
      { label: "Status", value: "🟡 to verify" },
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
      { label: "Cash launched", value: "Apr 2025 — >$10M/day volume by Jun 2025" },
      { label: "Token", value: "ETHFI" },
    ],
    links: [{ label: "Site", url: "https://ether.fi/" }],
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
    status: "to-research",
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
    status: "to-research",
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
      { label: "Status", value: "🟡 to verify" },
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
