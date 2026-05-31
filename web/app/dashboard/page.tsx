import Link from "next/link";
import DocShell from "@/components/DocShell";
import { LAYERS, PROJECTS, BACKLOG } from "@/lib/projects";

export const metadata = { title: "Dashboard — Rails" };

function domain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function Dashboard() {
  const researched = PROJECTS.filter((p) => p.status === "researched").length;

  return (
    <DocShell>
      <main className="dash">
        <header className="dash__head">
          <span className="section-kicker">Overview</span>
          <h1 className="dash__title">The money-movement stack</h1>
          <p className="dash__sub">
            Five layers, edge to edge — follow the money from a bank account onto a chain,
            across borders, into yield, and out to spend. Use the sidebar to jump between
            layers and companies.
          </p>
          <div className="dash__stats">
            <div>
              <strong>{LAYERS.length}</strong>
              <span>layers</span>
            </div>
            <div>
              <strong>{PROJECTS.length}</strong>
              <span>companies</span>
            </div>
            <div>
              <strong>{researched}</strong>
              <span>deeply researched</span>
            </div>
          </div>
        </header>

        {/* stack diagram */}
        <section className="stack-section" id="stack">
          <h2 className="section-title">The five layers</h2>
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

        {/* companies grouped */}
        <section className="companies-section" id="companies">
          <h2 className="section-title">Every company, by layer</h2>
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
                          {p.status === "to-research" && <span className="tag tag--todo">verify</span>}
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

        {/* backlog */}
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
    </DocShell>
  );
}
