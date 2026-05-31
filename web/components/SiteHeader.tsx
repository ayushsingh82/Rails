import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/#stack", label: "The Stack", code: "01" },
  { href: "/#companies", label: "Companies", code: "02" },
];

export default function SiteHeader() {
  return (
    <div className="site-header-wrap">
      <header className="site-header">
        <span className="corner corner--tl" aria-hidden />
        <span className="corner corner--tr" aria-hidden />
        <span className="corner corner--bl" aria-hidden />
        <span className="corner corner--br" aria-hidden />

        <Link href="/" className="brand" aria-label="Rails — home">
          <Logo size={30} />
          <span className="brand__text">
            <span className="brand__eyebrow">The money-movement stack</span>
            <span className="brand__name">Rails</span>
          </span>
        </Link>

        <nav className="nav">
          {navItems.map((it) => (
            <Link key={it.href} href={it.href} className="nav__item">
              <span className="nav__code">{it.code}</span>
              {it.label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </header>
    </div>
  );
}
