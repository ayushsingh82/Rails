import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { LAYERS, PROJECTS, BACKLOG } from "@/lib/projects";

function domain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function Home() {
  const researched = PROJECTS.filter((p) => p.status === "researched").length;

  return (
    <>
      <SiteHeader />

      {/* ---------------------------- HERO ---------------------------- */}
      <section className="hero">
        <div className="hero__inner">
          <span className="hero__eyebrow">A field guide to the new money stack</span>
          <h1 className="hero__title">
            The companies rebuilding
            <br />
            how money moves.
          </h1>
          <p className="hero__lede">
            Stablecoins are quietly re-plumbing payments — ramps, payment APIs, cross-border
            rails, synthetic dollars, and the neo-banks on top. <strong>Rails</strong> maps who
            does what, grouped by the layer they actually own, because most of them are
            complements, not competitors.
          </p>
          <div className="hero__cta">
            <Link href="#stack" className="btn btn--primary">
              Explore the stack →
            </Link>
            <Link href="#companies" className="btn btn--ghost">
              {PROJECTS.length} companies
            </Link>
          </div>
          <div className="hero__stats">
            <div>
              <strong>{LAYERS.length}</strong>
              <span>layers of the stack</span>
            </div>
            <div>
              <strong>{PROJECTS.length}</strong>
              <span>companies mapped</span>
            </div>
            <div>
              <strong>{researched}</strong>
              <span>deeply researched</span>
            </div>
          </div>
        </div>
      </section>

      <main className="page">
        {/* ------------------------ WHAT THIS IS ------------------------ */}
        <section className="intro">
          <span className="section-kicker">What we&apos;re building</span>
          <h2 className="section-title">One map for a fragmenting space.</h2>
          <p className="intro__body">
            The stablecoin-rails world is consolidating fast — Stripe bought Bridge for $1.1B,
            Visa partnered with BVNK, and DeFi protocols like Ethena and Ether.fi are turning
            into banks. But the companies blur together. Rails fixes that: every project is
            placed in one of five layers, with a deep-dive page explaining how it works, how it
            makes money, and what it depends on. It&apos;s a research base — and the seed for
            whatever we build next.
          </p>
        </section>

        {/* -------------------------- THE STACK ------------------------- */}
        <section id="stack" className="stack-section">
          <span className="section-kicker">The map</span>
          <h2 className="section-title">Five layers, edge to edge.</h2>
          <p className="section-sub">
            Follow the money: a bank account → onto a chain → across borders → into yield → out
            to spend. Click a layer to go deep.
          </p>
          <div className="stack">
            {LAYERS.map((layer) => (
              <Link key={layer.id} href={`/layer/${layer.id}`} className="stack__row">
                <span className="stack__id">{layer.id}</span>
                <span className="stack__title">{layer.title}</span>
                <span className="stack__blurb">{layer.blurb}</span>
                <span className="stack__arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* -------------------------- COMPANIES ------------------------- */}
        <section id="companies" className="companies-section">
          <span className="section-kicker">The directory</span>
          <h2 className="section-title">Every company, by layer.</h2>

          {LAYERS.map((layer) => {
            const items = PROJECTS.filter((p) => p.layers.includes(layer.id));
            return (
              <div key={layer.id} className="layer-group">
                <div className="layer-group__head">
                  <Link href={`/layer/${layer.id}`} className="layer-group__label">
                    <span className="layer-group__id">{layer.id}</span>
                    {layer.title}
                  </Link>
                  <span className="layer-group__count">{items.length}</span>
                </div>
                <div className="cards">
                  {items.map((p) => (
                    <Link key={p.slug + layer.id} href={`/project/${p.slug}`} className="card">
                      <div className="card__top">
                        <h3 className="card__name">{p.name}</h3>
                        <div className="card__tags">
                          {p.layers.map((l) => (
                            <span key={l} className="tag">
                              {l}
                            </span>
                          ))}
                          {p.status === "to-research" && (
                            <span className="tag tag--todo">verify</span>
                          )}
                        </div>
                      </div>
                      <p className="card__tagline">{p.tagline}</p>
                      <p className="card__product">{p.product}</p>
                      <span className="card__link">
                        {domain(p.url)} <span aria-hidden>↗</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* --------------------------- BACKLOG -------------------------- */}
        <section className="backlog">
          <h2 className="backlog__title">On the radar</h2>
          <p className="backlog__note">
            Names worth adding next. Promote one into the map once it&apos;s researched.
          </p>
          <div className="backlog__grid">
            {Object.entries(BACKLOG).map(([group, names]) => (
              <div key={group} className="backlog__group">
                <h3>{group}</h3>
                <ul>
                  {names.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <p>Rails · a living map of the money-movement stack.</p>
        </footer>
      </main>
    </>
  );
}
