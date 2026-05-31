export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="logo">
      <rect width="32" height="32" rx="7" fill="var(--accent)" />
      <rect x="9" y="6" width="3.4" height="20" rx="1.7" fill="var(--paper)" />
      <rect x="19.6" y="6" width="3.4" height="20" rx="1.7" fill="var(--paper)" />
      <rect x="7" y="11" width="18" height="2.5" rx="1.25" fill="var(--paper)" opacity="0.82" />
      <rect x="7" y="18.5" width="18" height="2.5" rx="1.25" fill="var(--paper)" opacity="0.82" />
    </svg>
  );
}
