export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14" stroke="var(--color-border)" strokeWidth="2" />
      <path
        d="M16 2a14 14 0 0 1 14 14"
        stroke="var(--color-gap)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2 16a14 14 0 0 0 12.2 13.9"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10.5 16.5l3.5 3.5 7-7"
        stroke="var(--color-accent)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <LogoMark size={size} />
      <span className="font-display text-lg text-ink tracking-tight">Resume Tailor</span>
    </div>
  );
}
