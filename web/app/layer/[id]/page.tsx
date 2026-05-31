import Link from "next/link";
import { notFound } from "next/navigation";
import DocShell from "@/components/DocShell";
import { LAYERS, getLayer, projectsByLayer, type LayerId } from "@/lib/projects";

export function generateStaticParams() {
  return LAYERS.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const layer = getLayer(params.id);
  if (!layer) return { title: "Layer — Rails" };
  return { title: `${layer.id} · ${layer.title} — Rails` };
}

export default function LayerPage({ params }: { params: { id: string } }) {
  const layer = getLayer(params.id);
  if (!layer) notFound();

  const items = projectsByLayer(params.id as LayerId);
  const idx = LAYERS.findIndex((l) => l.id === layer.id);
  const prev = LAYERS[idx - 1];
  const next = LAYERS[idx + 1];

  return (
    <DocShell>
      <main className="doc">
        <Link href="/dashboard" className="back">
          ← Overview
        </Link>

        <header className="doc__header">
          <span className="doc__eyebrow">Layer {layer.id}</span>
          <h1 className="doc__title">{layer.title}</h1>
          <p className="doc__tagline">{layer.blurb}</p>
        </header>

        <div className="doc__grid">
          <div className="doc__main">
            <section className="doc__section">
              <h2>What this layer does</h2>
              <p>{layer.what}</p>
            </section>
            <section className="doc__section">
              <h2>Where it sits</h2>
              <p>{layer.whereItSits}</p>
            </section>
            <section className="doc__section">
              <h2>What they compete on</h2>
              <p>{layer.competeOn}</p>
            </section>
            <section className="doc__section doc__callout">
              <h2>How to tell them apart</h2>
              <p>{layer.tellApart}</p>
            </section>

            {layer.buildYourOwn && layer.buildYourOwn.length > 0 && (
              <div className="builder">
                <div className="builder__head">
                  <span className="builder__tag">Builder&apos;s track</span>
                  <h2 className="builder__title">Build your own {layer.title.toLowerCase()}</h2>
                </div>
                <ul className="doc__bullets">
                  {layer.buildYourOwn.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="doc__aside">
            <div className="facts">
              <h3>In this layer</h3>
              <ul className="facts__list">
                {items.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/project/${p.slug}`}>{p.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="companies-section">
          <h2 className="section-title">The players</h2>
          <div className="cards">
            {items.map((p) => (
              <Link key={p.slug} href={`/project/${p.slug}`} className="card">
                <div className="card__top">
                  <h3 className="card__name">{p.name}</h3>
                  <div className="card__tags">
                    {p.layers.map((l) => (
                      <span key={l} className="tag">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="card__tagline">{p.tagline}</p>
                <p className="card__product">{p.moat}</p>
                <span className="card__link">Deep dive →</span>
              </Link>
            ))}
          </div>
        </section>

        <nav className="doc__nav">
          {prev ? (
            <Link href={`/layer/${prev.id}`}>
              ← {prev.id} {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/layer/${next.id}`}>
              {next.id} {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <footer className="footer">
          <p>Rails · a living map of the money-movement stack.</p>
        </footer>
      </main>
    </DocShell>
  );
}
