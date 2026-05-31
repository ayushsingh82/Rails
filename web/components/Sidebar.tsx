"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LAYERS, projectsByLayer, getProject } from "@/lib/projects";

export default function Sidebar() {
  const path = usePathname();

  let activeLayer: string | null = null;
  let activeSlug: string | null = null;

  if (path.startsWith("/layer/")) {
    activeLayer = path.split("/")[2];
  } else if (path.startsWith("/project/")) {
    activeSlug = path.split("/")[2];
    activeLayer = getProject(activeSlug)?.layers[0] ?? null;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <Link
          href="/dashboard"
          className={`sidebar__overview ${path === "/dashboard" ? "is-active" : ""}`}
        >
          ◧ Overview
        </Link>

        <p className="sidebar__label">The Stack</p>
        <nav className="sidebar__nav">
          {LAYERS.map((l) => {
            const active = l.id === activeLayer;
            return (
              <div key={l.id} className="sidebar__group">
                <Link
                  href={`/layer/${l.id}`}
                  className={`sidebar__item ${active && !activeSlug ? "is-active" : ""} ${active ? "is-open" : ""}`}
                >
                  <span className="sidebar__code">{l.id}</span>
                  <span className="sidebar__name">{l.title}</span>
                </Link>
                {active && (
                  <div className="sidebar__sub">
                    {projectsByLayer(l.id).map((p) => (
                      <Link
                        key={p.slug}
                        href={`/project/${p.slug}`}
                        className={`sidebar__subitem ${p.slug === activeSlug ? "is-active" : ""}`}
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <p className="sidebar__foot">Rails · the money-movement stack</p>
      </div>
    </aside>
  );
}
