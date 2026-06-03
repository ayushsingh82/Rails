import type { Project } from "./types";

export const L4_PROJECTS: Project[] = [
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
];
