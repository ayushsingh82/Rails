import type { Layer } from "./types";

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
