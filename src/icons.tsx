type IconProps = {
  size?: number;
  className?: string;
};

export function ScytheDivider({ className }: IconProps) {
  return (
    <div className={className} aria-hidden="true">
      ⚰ ☠ ⚰
    </div>
  );
}

export function SkullIcon({ size = 40, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 2.4 1.1 4 2.2 5.1.5.5.8 1.1.8 1.9v1a1 1 0 0 0 1 1h.5v1.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V18h1.5v1.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V18h.5a1 1 0 0 0 1-1v-1c0-.8.3-1.4.8-1.9C17.9 13 19 11.4 19 9a7 7 0 0 0-7-7Z" />
      <circle cx="9" cy="10" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1.3" fill="currentColor" stroke="none" />
      <path d="M11 12h2l-.6 1.6h-.8L11 12Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TombstoneIcon({ size = 40, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 21V11a7 7 0 0 1 14 0v10" />
      <path d="M3 21h18" />
      <path d="M10 9v4M8 11h4" />
    </svg>
  );
}

export function OrbIcon({ size = 40, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="10" r="7" />
      <path d="M6 20c0-1.2 2.7-2 6-2s6 .8 6 2" />
      <path d="M9 8c.5-1 1.6-1.6 3-1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ReaperSilhouette({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 200 340"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="reaper-cloak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241a30" />
          <stop offset="100%" stopColor="#0a0710" />
        </linearGradient>
        <radialGradient id="reaper-eye-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="1" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* scythe */}
      <g className="reaper-scythe" stroke="#1a1420" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M158 40 L120 260" />
        <path d="M158 40 C 120 8, 60 14, 44 56" strokeWidth="7" />
      </g>

      {/* cloak */}
      <path
        d="M100 30
           C 70 30, 60 60, 58 90
           C 40 130, 20 220, 14 300
           C 45 285, 55 300, 75 292
           C 88 300, 96 288, 100 296
           C 104 288, 112 300, 125 292
           C 145 300, 155 285, 186 300
           C 180 220, 160 130, 142 90
           C 140 60, 130 30, 100 30 Z"
        fill="url(#reaper-cloak)"
      />

      {/* hood shadow / face void */}
      <ellipse cx="100" cy="78" rx="26" ry="30" fill="#050308" />

      {/* eyes */}
      <g className="reaper-eyes">
        <circle cx="90" cy="76" r="9" fill="url(#reaper-eye-glow)" />
        <circle cx="110" cy="76" r="9" fill="url(#reaper-eye-glow)" />
        <circle cx="90" cy="76" r="2.2" fill="#e9d8ff" />
        <circle cx="110" cy="76" r="2.2" fill="#e9d8ff" />
      </g>
    </svg>
  );
}
