import type { Project } from "./types";

export const L1_PROJECTS: Project[] = [
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
];
