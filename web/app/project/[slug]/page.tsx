import Link from "next/link";
import { notFound } from "next/navigation";
import DocShell from "@/components/DocShell";
import { PROJECTS, getProject, getLayer } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) return { title: "Company — Rails" };
  return { title: `${p.name} — Rails`, description: p.tagline };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();

  return (
    <DocShell>
      <main className="doc">
        <Link href="/dashboard#companies" className="back">
          ← Overview
        </Link>

        <header className="doc__header">
          <div className="doc__badges">
            {p.layers.map((l) => {
              const layer = getLayer(l);
              return (
                <Link key={l} href={`/layer/${l}`} className="doc__badge">
                  {l} · {layer?.title}
                </Link>
              );
            })}
            {p.status === "to-research" && <span className="doc__badge doc__badge--todo">to verify</span>}
          </div>
          <h1 className="doc__title">{p.name}</h1>
          <p className="doc__tagline">{p.tagline}</p>
        </header>

        <div className="doc__grid">
          <div className="doc__main">
            <section className="doc__section">
              <h2>What it is</h2>
              <p>{p.whatItIs}</p>
            </section>

            <section className="doc__section">
              <h2>How it works</h2>
              <ol className="doc__steps">
                {p.howItWorks.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </section>

            <section className="doc__section">
              <h2>Differentiators</h2>
              <ul className="doc__bullets">
                {p.differentiators.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </section>

            <section className="doc__section doc__callout">
              <h2>Business model</h2>
              <p>{p.businessModel}</p>
            </section>

            <div className="doc__split">
              <section className="doc__section">
                <h2>Depends on</h2>
                <ul className="doc__bullets doc__bullets--neutral">
                  {p.dependsOn.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </section>
              <section className="doc__section">
                <h2>Risks</h2>
                <ul className="doc__bullets doc__bullets--risk">
                  {p.risks.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </section>
            </div>

            {p.builder && (
              <div className="builder">
                <div className="builder__head">
                  <span className="builder__tag">Builder&apos;s track</span>
                  <h2 className="builder__title">How it&apos;s built</h2>
                </div>

                <section className="doc__section">
                  <h2>Architecture</h2>
                  <p>{p.builder.architecture}</p>
                </section>

                <section className="doc__section">
                  <h2>Integration shape</h2>
                  <p>{p.builder.integration}</p>
                </section>

                <section className="doc__section">
                  <h2>API surface</h2>
                  <dl className="api">
                    {p.builder.apiSurface.map((e) => (
                      <div key={e.name} className="api__row">
                        <dt>
                          <code>{e.name}</code>
                        </dt>
                        <dd>{e.desc}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                {p.builder.snippet && (
                  <section className="doc__section">
                    <h2>Minimal integration</h2>
                    <p className="code-caption">{p.builder.snippet.caption}</p>
                    <pre className="code">
                      <code>{p.builder.snippet.code}</code>
                    </pre>
                  </section>
                )}

                {p.builder.buildNotes && p.builder.buildNotes.length > 0 && (
                  <section className="doc__section">
                    <h2>Build notes</h2>
                    <ul className="doc__bullets">
                      {p.builder.buildNotes.map((n, i) => (
                        <li key={i}>{n}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}
          </div>

          <aside className="doc__aside">
            <div className="facts">
              <h3>Key facts</h3>
              <dl className="facts__dl">
                {p.keyFacts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="facts">
              <h3>Links</h3>
              <ul className="facts__links">
                {p.links.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noreferrer">
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <footer className="footer">
          <p>Rails · a living map of the money-movement stack.</p>
        </footer>
      </main>
    </DocShell>
  );
}
