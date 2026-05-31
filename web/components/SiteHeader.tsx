import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <div className="site-header-wrap">
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Rails — home">
          <span className="brand__name">Rails</span>
        </Link>

        <div className="header__actions">
          <Link href="/dashboard" className="header__cta">
            Dashboard →
          </Link>
          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}
