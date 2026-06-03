import type { Project } from "./types";

export const L5_PROJECTS: Project[] = [
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
    product:
      "LatAm digital bank with in-app crypto trading (Nubank Cripto) and 4%-yield USDC rewards on top of core banking + Pix.",
    customer: "131M+ consumers (Brazil, Mexico, Colombia)",
    moat:
      "Distribution at sovereign scale (131M+ users) + bank licenses; routes Paxos crypto rails and USDC yield to a profitable retail base ($2.9B FY25 net income).",
    region: "Brazil / Mexico / Colombia",
    status: "researched",
    tagline: "LatAm's banking giant, putting a yield-bearing dollar in 131M pockets.",
    whatItIs:
      "Nubank (NYSE: NU; parent Nu Holdings) is one of the world's largest digital banks, with 131M+ customers across Brazil, Mexico, and Colombia. Its crypto/stablecoin lens is Nubank Cripto — in-app buy/sell of crypto powered by Paxos — and, most importantly, a USDC rewards product paying a fixed 4% per year on USDC balances. With ~90% of Brazilian crypto activity already in stablecoins, Nubank is effectively distributing a yield-bearing digital dollar to a mass-retail base that few crypto-natives can reach, while diversifying revenue beyond interchange, credit, and FX.",
    howItWorks: [
      "Core digital bank: NuConta accounts, the purple Mastercard, credit cards, lending, and instant Pix payments for 131M+ users.",
      "Nubank Cripto: customers buy, hold, and sell crypto (BTC, ETH, USDC, SOL, and more) inside the main app — custody and brokerage are handled by Paxos, so Nubank never builds the trading/custody stack itself.",
      "USDC rewards: opt-in 'I Want to Participate' on a USDC balance ≥10 USDC earns a fixed 4%/yr, credited automatically every day with immediate liquidity — the standout stablecoin product, expanded to all Nubank Cripto users in Brazil in Jan 2025.",
      "Roadmap: piloting stablecoin-funded credit-card payments in Brazil (announced at Stellar's Meridian 2025 by vice-chairman Roberto Campos Neto), tying blockchain dollars to everyday spend.",
    ],
    differentiators: [
      "Distribution at a scale crypto-natives can't touch — 131M+ users, ~30% of Nubank Cripto holders already hold USDC, and >50% of new Cripto users pick USDC as their first asset.",
      "A real yield product (fixed 4% on USDC) wrapped in a trusted, regulated bank app — not a speculative trade.",
      "Profitable at scale: $2.9B FY25 net income, $16.3B revenue (+45% YoY), ~33% ROE — funds the crypto bets from earnings, not venture cash.",
      "Composes Paxos rails rather than building custody/brokerage, keeping crypto a feature of the bank, not a separate venture.",
    ],
    businessModel:
      "Interchange, net interest income (credit cards + lending), and FX, plus a spread on Nubank Cripto trading (low, transparent fees via Paxos) and the margin between the USDC reserve/yield it earns and the 4% it pays customers. Crypto is a retention + ARPAC driver more than a standalone profit center today.",
    dependsOn: [
      "Paxos (crypto custody + brokerage rails behind Nubank Cripto)",
      "Circle / USDC (the stablecoin and its reserve yield)",
      "Banking + payment licenses (Brazil, Mexico, Colombia)",
      "Local instant-payment rails (Pix in Brazil, SPEI in Mexico)",
      "Mastercard (card issuing + spend)",
    ],
    risks: [
      "LatAm macro + FX volatility, and rate cuts that compress the reserve yield funding the 4% USDC rewards.",
      "Stablecoin/crypto regulatory and tax uncertainty in Brazil (and across markets) — the credit-card stablecoin pilot faces classification, peg, and consumer-protection roadblocks.",
      "Closed-loop pivot risk: Nubank's own token (Nucoin) was discontinued as a tradable crypto asset in 2024 — a reminder that consumer-token bets can be unwound.",
      "Counterparty/concentration risk on Paxos and Circle for the entire crypto stack.",
    ],
    keyFacts: [
      { label: "Founded", value: "2013 (São Paulo) — David Vélez, Cristina Junqueira, Edward Wible" },
      { label: "Listed", value: "NYSE: NU (Nu Holdings); BDR ROXO34 (B3). IPO Dec 2021" },
      { label: "Customers", value: "131M+ (Dec 2025) across Brazil, Mexico, Colombia" },
      { label: "FY2025 revenue", value: "$16.3B (+45% YoY)" },
      { label: "FY2025 net income", value: "$2.9B (vs $2.0B FY24); Q4'25 $895M, ~33% ROE" },
      { label: "USDC rewards", value: "Fixed 4%/yr, min 10 USDC, credited daily (all Brazil Cripto users since Jan 2025)" },
      { label: "USDC adoption", value: "USDC held by customers grew ~10× in 2024; ~30% of Cripto users hold it" },
      { label: "Crypto partner", value: "Paxos (custody + brokerage) for Nubank Cripto since 2022" },
    ],
    links: [
      { label: "Site", url: "https://nubank.com.br/" },
      { label: "Investor relations", url: "https://international.nubank.com.br/investors/" },
      { label: "USDC rewards for all customers", url: "https://international.nubank.com.br/consumers/nubank-expands-usdc-rewards-program-to-all-customers/" },
      { label: "Paxos × Nubank crypto launch", url: "https://www.paxos.com/newsroom/nubank-enters-crypto-trading-with-simple-and-safe-in-app-experience-that-will-democratize-access" },
      { label: "FY2025 results", url: "https://international.nubank.com.br/company/nu-holdings-ltd-reports-fourth-quarter-and-full-year-2025-financial-results/" },
      { label: "Pix, Open Finance & tokenization", url: "https://international.nubank.com.br/company/david-velez-and-roberto-campos-neto-discuss-the-next-frontier-of-global-financial-services-pix-open-finance-and-tokenization/" },
    ],
    products: [
      {
        name: "USDC Rewards",
        tagline: "A yield-bearing digital dollar for the mass market.",
        whatItIs:
          "An opt-in feature inside Nubank Cripto that pays a fixed 4% per year on USDC balances, credited automatically every day with immediate liquidity. Rolled out to a pilot group through 2024 (at variable rates) and expanded to all Nubank Cripto users in Brazil in January 2025. This is Nubank's flagship stablecoin product — a simple savings-like dollar return wrapped in the bank app.",
        mechanics: [
          "Activate via 'I Want to Participate' in the in-app crypto wallet; deactivate/reactivate anytime.",
          "Minimum balance of 10 USDC to earn; rewards accrue and credit daily.",
          "Fixed 4%/yr rate (replacing the earlier variable-rate pilot).",
          "USDC is redeemable 1:1 for US dollars and backed by the issuer's reserves; Nubank earns the spread between reserve yield and the 4% paid out.",
        ],
        stats: [
          { label: "Rate", value: "Fixed 4% per year" },
          { label: "Minimum", value: "10 USDC; credited daily" },
          { label: "Availability", value: "All Brazil Cripto users since Jan 2025" },
          { label: "Adoption", value: "USDC holdings ~10× in 2024; ~30% of Cripto users hold USDC" },
        ],
      },
      {
        name: "Nubank Cripto",
        tagline: "In-app crypto trading, powered by Paxos.",
        whatItIs:
          "An exclusive in-app experience (live since 2022) where customers buy, hold, and sell crypto directly inside the main Nubank app. Paxos provides custody and brokerage, so Nubank ships a regulated trading product without building exchange/custody infrastructure. Launched with BTC and ETH; the asset list has since broadened (incl. USDC, SOL, and others).",
        mechanics: [
          "Trades execute through Paxos as custodian/broker — no separate exchange app or external wallet needed.",
          "Started with trades from BRL 1.00 (~US$0.20); low, transparent commission (initially ~0.12–0.18% of trade value, no spread/markup).",
          "Sits inside the same app as accounts, cards, and Pix — crypto as a banking feature, not a silo.",
          "Feeds the USDC rewards funnel: >50% of new Cripto users choose USDC as their first asset.",
        ],
        stats: [
          { label: "Partner", value: "Paxos (custody + brokerage)" },
          { label: "Live since", value: "2022 (Brazil)" },
          { label: "Min trade", value: "From BRL 1.00 (~$0.20)" },
        ],
      },
      {
        name: "Core banking + Pix",
        tagline: "The 131M-user account the crypto rides on.",
        whatItIs:
          "Nubank's foundation: the NuConta account, purple Mastercard, credit cards, lending, and instant payments via Pix (Brazil) and equivalents like SPEI (Mexico). This base is the distribution engine and the moat — every crypto/stablecoin feature is bolted onto an already-loved, profitable consumer app.",
        mechanics: [
          "Free/low-cost accounts + cards drive interchange and net interest income.",
          "Pix instant payments make Nubank a daily-use app, deepening engagement and ARPAC.",
          "Multi-market: interoperates with each country's rails (Pix/BR, SPEI/MX).",
          "Stablecoin roadmap: piloting stablecoin-funded credit-card payments in Brazil (Meridian 2025).",
        ],
        stats: [
          { label: "Customers", value: "131M+ (Dec 2025)" },
          { label: "ARPAC", value: "~$15/active customer (Q4'25)" },
          { label: "Markets", value: "Brazil, Mexico, Colombia" },
        ],
      },
      {
        name: "Nucoin",
        tagline: "From tradable token to closed-loop loyalty points.",
        whatItIs:
          "Nubank's loyalty token, launched March 2023 on Polygon to reward everyday banking activity. As a tradable crypto asset it was discontinued in 2024: trading was suspended and holders were offered conversion to Bitcoin or USDC. It now survives only as a closed-loop rewards mechanism redeemable for benefits inside the Nubank ecosystem (shopping discounts, brand experiences) — not withdrawable on-chain.",
        mechanics: [
          "Originally minted on Polygon; 100B unit supply, ~80% earmarked for customers.",
          "Earned through card spend, investing, and account usage.",
          "Tradable functionality discontinued in 2024 — converted to BTC/USDC for opted-in holders.",
          "Now functions purely as in-app loyalty points; cannot be moved to external wallets.",
        ],
        stats: [
          { label: "Launched", value: "Mar 2023 (Polygon)" },
          { label: "Status", value: "Trading discontinued 2024; now closed-loop loyalty" },
          { label: "Supply", value: "100B units (~80% to customers)" },
        ],
      },
    ],
    deepDive: [
      {
        heading: "The stablecoin product & Paxos rails",
        body:
          "Nubank's crypto stack is deliberately composed, not built. Paxos provides custody and brokerage for Nubank Cripto, and USDC (Circle) is the dollar primitive. The strategic product is the 4% USDC rewards feature — a savings-like dollar return that meets a very real LatAm demand for dollar exposure without a US bank account.",
        bullets: [
          "Custody + brokerage outsourced to Paxos since 2022 — Nubank owns the customer and UX, not the exchange/custody risk.",
          "USDC rewards: fixed 4%/yr on ≥10 USDC, daily credit, instant liquidity, opt-in/out anytime.",
          "Economics: Nubank captures the spread between USDC reserve yield and the 4% paid to users; rate-cut exposure on that spread.",
          "Demand signal: ~30% of Cripto users hold USDC, >50% of new Cripto users pick USDC first, USDC balances grew ~10× in 2024.",
        ],
      },
      {
        heading: "Distribution & scale moat",
        body:
          "Nubank's edge over crypto-natives is sovereign-scale distribution funded by real profit. With 131M+ customers and $2.9B FY25 net income, it can put a yield-bearing dollar in front of more people than any crypto wallet — and it does so from inside an app users already trust for daily banking.",
        bullets: [
          "131M+ customers across Brazil, Mexico, Colombia; +17M added in FY25.",
          "FY25: $16.3B revenue (+45% YoY), $2.9B net income, ~33% ROE, ARPAC ~$15.",
          "Crypto/stablecoin features increase engagement and ARPAC rather than standing alone as a P&L line.",
          "Trust + regulated status convert mass-retail skeptics into stablecoin holders.",
        ],
      },
      {
        heading: "Pix, Brazil rails & Open Finance",
        body:
          "Nubank sits on top of Pix, Brazil's instant-payment system, which made the app a daily-use utility. Leadership (incl. vice-chairman and former central-bank governor Roberto Campos Neto) frames the next frontier as Pix + Open Finance + tokenization — and is piloting stablecoin-funded credit-card payments to fuse blockchain dollars with everyday spend.",
        bullets: [
          "Pix (BR) and SPEI (MX) integration make Nubank a daily transactional hub, not just a card.",
          "Roberto Campos Neto (ex-Banco Central do Brasil governor) is vice-chairman — deep policy + payments credibility.",
          "Stablecoin credit-card pilot announced at Stellar's Meridian 2025; aims to settle/spend with dollar-pegged stablecoins.",
          "Open Finance + tokenization positioned as the path to embed stablecoin rails into mainstream payments.",
        ],
      },
      {
        heading: "Risk posture",
        bullets: [
          "Macro/FX: LatAm currency and rate volatility; falling rates compress the reserve yield behind 4% USDC rewards.",
          "Regulatory: stablecoin classification, taxation, peg and consumer-protection questions gate the credit-card pilot.",
          "Counterparty: the whole crypto stack leans on Paxos (custody/brokerage) and Circle (USDC).",
          "Execution: the Nucoin wind-down (tradable token → closed-loop points, 2024) shows consumer-token bets can be reversed.",
        ],
      },
    ],
  },
  {
    slug: "ur-global",
    name: "UR Global",
    url: "https://www.ur.app/",
    layers: ["L5"],
    product:
      "On-chain neo-bank: Swiss IBAN + multi-currency fiat/crypto account, native Ethena USDe yield, and (soon) Mastercard spend — plus a banking-as-an-API offering.",
    customer: "Consumers in 45+ countries + wallets/fintechs (B2B API)",
    moat:
      "FINMA fintech license (via SR Saphirstein AG) + native USDe yield (~5% APY) with fee-free USDe⇄fiat off-ramp. Same team that built Fiat24.",
    region: "Switzerland-licensed; live in 45+ countries",
    status: "researched",
    tagline: "A Swiss-licensed, on-chain neo-bank built around USDe.",
    whatItIs:
      "UR (ur.app) is an on-chain neo-bank operated by Zurich-based SR Saphirstein AG — the same FINMA-licensed entity behind Fiat24 — that puts fiat and crypto in one self-custody account. It launched its consumer app in October 2025 across 45+ countries with Ethena's USDe integrated from day one: users hold USDe alongside seven fiat currencies, convert fee-free, earn up to ~5% APY (paid weekly, no staking or lock-up), and will soon spend via a Mastercard debit card. UR also exposes the same stack as a banking-as-an-API product ('the account layer for the open economy') — Swiss IBAN, 7 currencies, SEPA/SWIFT, card issuing, and compliance — for wallets and fintechs to embed.",
    howItWorks: [
      "Two-click onboarding creates a self-custody wallet (keys secured via Turnkey + biometric auth) tied to a Swiss IBAN; KYC unlocks yield and higher limits.",
      "The unified account holds fiat (USD, EUR, SGD, HKD, JPY, CHF, RMB) and crypto, including USDe, with on/off-ramp conversions on-chain.",
      "USDe deposited (or swapped from USDC) on the Mantle Network earns up to ~5% APY, distributed weekly — UR passes through Ethena's yield rather than running its own.",
      "Off-ramping USDe back to fiat is fee-free; balances are recorded on Mantle for on-chain transparency.",
      "Mastercard debit card (Apple/Google/Samsung Pay, Alipay, WeChat Pay) to spend USDe directly is rolling out post-launch [verify live date].",
      "The same rails are offered B2B as one API (IBAN + multi-currency + card + compliance) for partners to embed banking.",
    ],
    differentiators: [
      "Built by a FINMA-licensed Swiss entity (SR Saphirstein AG / ex-Fiat24), not an unregulated app — a Swiss banking-act Art. 1b fintech license sits under it.",
      "Native USDe yield (~5% APY) baked into a consumer account with no staking step and fee-free off-ramp — the yield 'just appears' weekly.",
      "Self-custody by default (Turnkey-secured keys) rather than the custodial model of most fiat neo-banks.",
      "Dual model: a consumer neo-bank AND a banking-as-an-API product on the same stack.",
    ],
    businessModel:
      "Card interchange + FX/conversion spread + tiered 'Pro' subscriptions (fee exemptions, higher limits); a share of Ethena's USDe yield is passed to users. B2B API likely adds platform/issuing fees. [verify exact take-rate]",
    dependsOn: [
      "Ethena (USDe) — the yield engine and dollar asset",
      "Mantle Network — where USDe is held and yield accrues",
      "Turnkey — wallet key infrastructure / self-custody",
      "Mastercard — card spend rail",
      "FINMA license held by SR Saphirstein AG",
    ],
    risks: [
      "Inherits USDe's funding-rate risk: negative perp funding can erode the ~5% yield, and USDe is a synthetic dollar, not a fiat-redeemable stablecoin.",
      "Very early — consumer app launched Oct 2025; user numbers and traction are unproven. [verify scale]",
      "Concentration on a single yield asset (USDe) and a single chain (Mantle).",
      "Mastercard spend was still 'coming soon' at launch — card execution risk. [verify live]",
      "FINMA fintech license caps public deposits (CHF 100M) and is narrower than a full banking license — limits scale until upgraded.",
    ],
    keyFacts: [
      { label: "Operator", value: "SR Saphirstein AG — Zurich (CHE-256.014.995); UR is its trademark" },
      { label: "Founders / team", value: "Haoning Zhang (CEO, ex-ETH/Avaloq/UBS/Coutts), Yang Lan, Nico Buechel — the Fiat24 team" },
      { label: "Licensing", value: "FINMA fintech license, Swiss Banking Act Art. 1b (CHF 100M deposit cap)" },
      { label: "Backers", value: "China Merchants Bank Int'l, Fenbushi Capital (earlier rounds, as Fiat24) [verify current cap table]" },
      { label: "Launched", value: "Consumer app Oct 7, 2025 — iOS, Android, web; 45+ countries" },
      { label: "Yield asset", value: "Ethena USDe — up to ~5% APY, paid weekly, no lock-up" },
      { label: "Currencies", value: "USD, EUR, SGD, HKD, JPY, CHF, RMB + USDe" },
      { label: "Stack", value: "Self-custody via Turnkey; USDe + on-chain ledger on Mantle Network" },
      { label: "Spend", value: "Mastercard debit (rolling out post-launch) [verify live]" },
    ],
    links: [
      { label: "Site (consumer)", url: "https://www.ur.app/" },
      { label: "Web app", url: "https://get.ur.app/" },
      { label: "Docs", url: "https://docs.ur.app/" },
      { label: "Blog", url: "https://ur.app/blog" },
      { label: "Ethena partnership (crypto.news)", url: "https://crypto.news/ethenas-usde-stablecoin-integrated-into-urs-multi-currency-neobank-at-launch/" },
      { label: "Ethena Labs announcement (X)", url: "https://x.com/ethena_labs/status/1975482653882327104" },
    ],
    products: [
      {
        name: "USDe Earn",
        tagline: "Native synthetic-dollar yield — the 'savings account'.",
        whatItIs:
          "Hold USDe in the UR account and earn up to ~5% APY with no staking step or lock-up. UR passes through the yield Ethena generates from its delta-neutral basis trade; rewards are credited weekly once the user is KYC'd and holding USDe on Mantle. Off-ramping USDe to fiat is fee-free.",
        mechanics: [
          "Deposit USDe — or swap USDC → USDe inside the app — to start earning; balance sits on the Mantle Network.",
          "Yield accrues passively (no separate stake/lock action) and is paid out weekly.",
          "Yield source is Ethena's USDe (staking rewards + perp funding), so the rate floats with funding markets — not a fixed deposit rate.",
          "Fee-free conversion back to fiat at off-ramp.",
        ],
        stats: [
          { label: "APY", value: "Up to ~5% (floats with USDe funding)" },
          { label: "Payout", value: "Weekly, no lock-up" },
          { label: "Chain", value: "Mantle Network" },
        ],
      },
      {
        name: "Multi-currency account",
        tagline: "Swiss IBAN holding fiat + crypto in one place.",
        whatItIs:
          "A self-custody account anchored to a Swiss IBAN that holds seven fiat currencies plus crypto (incl. USDe), with SEPA/SWIFT transfers and instant on/off-ramp conversions. Keys are secured via Turnkey with biometric auth, so users keep custody while getting bank-rail reach.",
        mechanics: [
          "Two-click account creation; Swiss IBAN issued under SR Saphirstein AG's FINMA license.",
          "Hold/convert USD, EUR, SGD, HKD, JPY, CHF, RMB and crypto in one balance.",
          "Send/receive via SEPA and SWIFT; peer-to-peer transfers at bank-rate efficiency.",
          "Self-custody (Turnkey-secured keys); on-chain activity recorded on Mantle.",
        ],
        stats: [
          { label: "Fiat currencies", value: "7 (USD/EUR/SGD/HKD/JPY/CHF/RMB)" },
          { label: "Rails", value: "Swiss IBAN, SEPA, SWIFT" },
          { label: "Custody", value: "Self-custody (Turnkey)" },
        ],
      },
      {
        name: "Mastercard spend",
        tagline: "Spend USDe and fiat directly — the 'spending account'.",
        whatItIs:
          "A Mastercard debit card that lets users spend USDe (and fiat) at merchants, with wallet support for Apple Pay, Google Pay, Samsung Pay, Alipay, and WeChat Pay. Announced at launch as rolling out in the weeks after — spend execution is the newest, least-proven leg. [verify live status]",
        mechanics: [
          "Card draws from the unified UR balance, converting USDe/crypto to fiat at the point of sale.",
          "Mobile-wallet support: Apple/Google/Samsung Pay + Alipay + WeChat Pay.",
          "Pairs with fee-free off-ramp so spending doesn't incur conversion fees. [verify card fee schedule]",
        ],
        stats: [
          { label: "Network", value: "Mastercard (debit)" },
          { label: "Wallets", value: "Apple/Google/Samsung Pay, Alipay, WeChat Pay" },
          { label: "Status", value: "Rolling out post-launch [verify]" },
        ],
      },
    ],
    deepDive: [
      {
        heading: "How USDe yield flows to users",
        body:
          "UR does not manufacture yield — it embeds Ethena's. The neo-bank holds users' USDe on the Mantle Network and passes through the return Ethena earns from its delta-neutral basis trade (staked-ETH rewards + perpetual-futures funding). The consumer experience is deliberately flat: no staking screen, no lock-up, just a balance that grows, with rewards credited weekly after KYC.",
        bullets: [
          "User deposits USDe (or swaps USDC → USDe) → balance held on Mantle.",
          "Ethena's hedge generates yield off-chain/on-chain; UR distributes a pass-through share weekly.",
          "APY is therefore variable (~5% headline) and tracks USDe funding, not a fixed Swiss deposit rate.",
          "Fee-free USDe⇄fiat off-ramp is the key UX hook — yield-bearing dollars that spend like cash.",
        ],
      },
      {
        heading: "Account architecture (self-custody + Swiss IBAN)",
        body:
          "UR threads a regulated fiat wrapper around a self-custody crypto core. Wallet keys are provisioned and secured through Turnkey with biometric auth, so users retain custody; on top sits a Swiss IBAN issued under SR Saphirstein AG's FINMA fintech license, giving SEPA/SWIFT reach and seven fiat currencies. On-chain state lives on Mantle for transparency, while the same rails are also packaged as a banking-as-an-API product for partners.",
        bullets: [
          "Self-custody keys via Turnkey (not a custodial omnibus model).",
          "Swiss IBAN + 7 fiat currencies under FINMA fintech license (Art. 1b, CHF 100M deposit cap).",
          "Ledger/transactions on Mantle Network for auditability.",
          "Dual surface: consumer app (ur.app) and embeddable banking API ('account layer for the open economy').",
        ],
      },
      {
        heading: "Card & spend leg",
        body:
          "The spending layer is a Mastercard debit card that converts USDe/crypto to fiat at the point of sale, fronted by broad mobile-wallet support (Apple/Google/Samsung Pay, Alipay, WeChat Pay) aimed at both Western and Asian users — fitting the team's China-bridge heritage. At the October 2025 launch this was 'coming weeks,' so it is the least battle-tested part of the stack.",
        bullets: [
          "Spend from a yield-bearing USDe balance without manually off-ramping first.",
          "Asia + West wallet coverage (Alipay/WeChat Pay alongside Apple/Google Pay).",
          "Issuance presumably via UR's own card-issuing rail (also offered B2B). [verify issuer/BIN sponsor]",
        ],
      },
      {
        heading: "Risk: inherited USDe + early-stage execution",
        bullets: [
          "Funding-rate risk: USDe yield comes from perp funding; sustained negative funding can shrink or invert the ~5% APY.",
          "Synthetic-dollar risk: USDe is crypto-collateralized and delta-neutral, not fiat-redeemable — a different risk profile than a Swiss bank deposit.",
          "Single-asset / single-chain concentration: yield depends on USDe on Mantle specifically.",
          "Early traction: consumer app is new (Oct 2025); user/volume numbers unproven [verify].",
          "Regulatory ceiling: the FINMA fintech license caps deposits at CHF 100M and is narrower than a full banking license.",
        ],
      },
    ],
  },
];
