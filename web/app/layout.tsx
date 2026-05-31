import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rails — the money-movement stack",
  description:
    "Rails is a curated map of the companies building the new money-movement stack: stablecoin payment APIs, on/off-ramps, cross-border settlement, synthetic dollars, and neo-banks.",
};

// Set theme before paint to avoid a flash of the wrong theme.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('hub-theme');
    var theme = stored || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
