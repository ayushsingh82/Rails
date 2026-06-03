import type { Project } from "./types";

export const L2_PROJECTS: Project[] = [
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
];
