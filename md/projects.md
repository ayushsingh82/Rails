# Projects Directory

Live list of companies in the stablecoin / neo-bank / money-movement space.
Each entry uses the 4-field schema from `plan.md` §4. Layers (L1–L5) defined in `plan.md` §2.

> The links the user shared are **starting examples, not the full set** — the space is
> large. New names get added to §3 backlog first, then promoted up once researched.

---

## 1. Researched (core set)

### Bridge — bridge.xyz
- **Layer:** L2 (orchestration + issuance)
- **Product:** API to accept / store / convert / pay out stablecoins; issue your own stablecoin
- **Customer:** Developers & platforms
- **Moat:** Acquired by Stripe ($1.1B, closed early 2025); own-stablecoin issuance + T-bill yield share; Stripe distribution
- **Depends on:** Banking partners, Circle/Tether, Stripe
- **Notable:** Starlink uses it to repatriate funds from Argentina; founded 2022 by ex-Square/Coinbase
- 🔗 https://www.bridge.xyz/

### BVNK — bvnk.com
- **Layer:** L2 / L3
- **Product:** Enterprise stablecoin payments, virtual accounts, embedded processing
- **Customer:** Enterprises, fintechs, marketplaces
- **Moat:** Enterprise SLAs (99.9% uptime), $30B annualized volume (2.8M tx), Visa partnership, full US state + EU coverage
- **Depends on:** Banking partners, card networks (Visa)
- 🔗 https://bvnk.com/

### Sphere (SpherePay) — spherepay.co
- **Layer:** L2 / L3
- **Product:** Cross-border payments API ("stablecoin sandwich"), white-label embeds/SDKs, SphereNet ledger
- **Customer:** B2B import/export, fintech treasury
- **Moat:** Solana-based permissioned ledger (SphereNet); settle <30 min in 160+ markets; LatAm push
- **Depends on:** Bank rails (ACH/Wire/SEPA/PIX) + chains (Solana, ETH, Base, Polygon, Tron…)
- 🔗 https://spherepay.co/ · https://spherelabs.co/

### Conduit — conduitpay.com
- **Layer:** L3 (cross-border B2B settlement)
- **Product:** Stablecoin-based cross-border B2B payments
- **Customer:** Businesses in emerging markets
- **Moat:** Emerging-market corridors (LatAm / Africa)
- **Depends on:** Local banking partners, stablecoin liquidity
- **TODO:** verify volumes, corridors, licensing
- 🔗 https://conduitpay.com/

### Ramp Network — rampnetwork.com
- **Layer:** L1 (on/off-ramp)
- **Product:** Embeddable fiat ⇄ crypto widget + iOS/Android apps
- **Customer:** Wallets, exchanges, dApps
- **Moat:** Best-in-class checkout UX; MiCA/CASP (Ireland) + multiple US MTLs
- **Depends on:** Card networks, banking partners
- 🔗 https://rampnetwork.com/

### Ethena — ethena.fi (token: ENA)
- **Layer:** L4 (synthetic dollar / yield)
- **Product:** USDe (delta-neutral synthetic dollar) + sUSDe (yield)
- **Customer:** Protocols, neo-banks (e.g. UR Global), on-chain users
- **Moat:** Crypto-backed (not fiat reserves) via short-perp hedge; ~5% APY; $14B+ TVL (3rd largest stablecoin)
- **Depends on:** Perp/futures markets (funding rate), staked ETH, exchanges
- 🔗 https://docs.ethena.fi/

### Ether.fi — ether.fi
- **Layer:** L5 (DeFi neo-bank)
- **Product:** Stake (savings) + Liquid (invest) + Cash (crypto credit card, launched Apr 2025)
- **Customer:** Crypto-native consumers
- **Moat:** Spend against staked ETH without selling; restaking origin → full neo-bank
- **Depends on:** Ethereum staking/restaking (EigenLayer), card issuer
- 🔗 https://ether.fi/

---

### MoonPay — moonpay.com · L1
Consumer-recognized embeddable on/off-ramp (widget/SDK/API). 180+ countries, local payment methods. ~1% bank / ~4.5% card. 🔗 https://www.moonpay.com/

### Transak — transak.com · L1
White-label embedded ramp; widget + address-based "Stream" offramp. Widest local rails (UPI/PIX/SEPA), 160+ countries, 75+ chains, 450+ integrations. 🔗 https://transak.com/

### Coinbase Onramp — coinbase.com · L1
On/off-ramp API+SDK; **zero-fee USDC**. Backed by public Coinbase + Base. 🔗 https://www.coinbase.com/developer-platform/products/onramp

### Mural Pay — muralpay.com · L3/L2
Global stablecoin accounts + payments API, bulk payouts (100+/tx), 40+ local currencies, KYB/KYC built in. LatAm-heavy. 🔗 https://www.muralpay.com/

### Ondo Finance — ondo.finance · L4
USDY: tokenized note backed by short-term US Treasuries; rUSDY rebasing variant. RWA-first, multi-chain. 🔗 https://ondo.finance/usdy

### Mountain Protocol — mountainprotocol.com · L4
USDM: regulated (Bermuda), T-bill-backed, daily-rebasing yield stablecoin; plain ERC-20. 🔗 https://mountainprotocol.com/

### Sky (ex-MakerDAO) — sky.money · L4
USDS + sUSDS savings (Sky Savings Rate). Largest decentralized stablecoin lineage (DAI). 🔗 https://sky.money/

### Revolut — revolut.com · L5
68M+ users, MiCA license (Cyprus). Fee-free stablecoin↔USD; $10.5B+ stablecoin sent (+156% YoY). 🔗 https://www.revolut.com/

### Nubank — nubank.com.br · L5
120M+ LatAm consumers; adding stablecoin yield on top of core banking. 🔗 https://nubank.com.br/

### UR Global — ur.app · L5
Multi-currency neo-bank, unified crypto+fiat, Mastercard spend. Native Ethena USDe (~5% APY), 45+ countries. 🔗 https://www.ur.app/

---

## 2. To research / verify

### Rain — rain.xyz
- **Layer:** L2 / L5 (card issuing on stablecoins)
- **Product:** Stablecoin-backed card issuance — lets companies issue Visa cards that
  spend directly from on-chain stablecoin balances (issuer-processor for crypto)
- **Customer:** Crypto platforms, wallets, neo-banks wanting to ship a card
- **Moat (to verify):** Visa Principal Member; card-issuing infra natively settling in USDC
- **Depends on:** Visa, stablecoin issuers
- **TODO:** confirm product scope, regions, who uses them
- 🔗 https://www.rain.xyz/ *(verify exact URL)*

---

## 3. Backlog — names to add & research

> Drop new names here as one-liners; promote to §1/§2 once researched.

**Stablecoin infra / orchestration (L2):**
- Circle (USDC issuer + Circle Mint / programmable wallets / CCTP)
- Tether (USDT issuer)
- Stripe (parent of Bridge; stablecoin financial accounts)
- Brale, Iron, Paxos (issuance / infra)

**On/off-ramps & aggregators (L1):**
- Onramper (aggregator), Stripe Onramp, Paybis

**Cross-border / payouts (L3):**
- Felix Pago (added above), dLocal, Alfred, RedotPay

**Synthetic dollars / yield (L4):**
- Hashnote (USYC), BlackRock (BUIDL), Usual (USD0)

**Card issuing / spending (L2/L5):**
- Immersve, Baanx, Reap

**Neo-banks (L5):**
- Chime, Monzo, N26, Cash App, Coinbase

**Synthetic dollars / yield (L4):**
- Ethena (above), Mountain (USDM), Ondo (USDY), Sky/Maker (USDS)

**Neo-banks (L5) — fiat-native & crypto-native:**
- Revolut, Nubank, Chime, Monzo, N26 (fiat-native)
- Ether.fi (above), UR Global, Coinbase, Cash App (crypto-touching)

**Platform / network layer (above everything):**
- Visa, Mastercard, Circle, Stripe — the rails the rails ride on

---

## 4. All links (quick copy list)

```
https://www.bridge.xyz/
https://bvnk.com/
https://spherepay.co/
https://conduitpay.com/
https://rampnetwork.com/
https://docs.ethena.fi/
https://ether.fi/
https://www.rain.xyz/
```
