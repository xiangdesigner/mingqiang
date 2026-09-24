import type { Service } from "@/content/services";

/** Navy monochrome glyphs matching the mockup's service icons. */
export function ServiceIcon({ name, size = 52 }: { name: Service["icon"]; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 48 48", "aria-hidden": true as const, fill: "none" };
  const c = "var(--icon, #1d3a5c)";
  switch (name) {
    case "building":
      return (
        <svg {...common}>
          <path d="M10 44V14l10-5v35H10z" fill={c} />
          <path d="M22 44V6l16 5v33H22z" fill={c} />
          <path d="M2 44h44" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
          <g fill="#fff">
            <rect x="13" y="17" width="3" height="4" />
            <rect x="13" y="24" width="3" height="4" />
            <rect x="13" y="31" width="3" height="4" />
            <rect x="26" y="13" width="3" height="4" />
            <rect x="32" y="15" width="3" height="4" />
            <rect x="26" y="21" width="3" height="4" />
            <rect x="32" y="23" width="3" height="4" />
            <rect x="26" y="29" width="3" height="4" />
            <rect x="32" y="31" width="3" height="4" />
            <rect x="28" y="37" width="5" height="7" />
          </g>
        </svg>
      );
    case "house":
      return (
        <svg {...common}>
          <path d="M24 6 4 22h6v20h28V22h6L24 6z" fill={c} />
          <path d="M20 42V30h8v12" fill="#fff" />
          <rect x="30" y="8" width="5" height="9" fill={c} />
          <circle cx="16" cy="28" r="2.2" fill="#fff" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path d="M12 4h17l9 9v31H12V4z" fill={c} />
          <path d="M29 4v9h9" fill="#fff" fillOpacity="0.35" />
          <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
            <path d="M18 20h13M18 26h13M18 32h13M18 38h8" />
          </g>
        </svg>
      );
    case "calculator":
      return (
        <svg {...common}>
          <rect x="10" y="4" width="28" height="40" rx="3" fill={c} />
          <rect x="15" y="9" width="18" height="8" rx="1" fill="#fff" />
          <g fill="#fff">
            <rect x="15" y="21" width="5" height="5" rx="1" />
            <rect x="21.5" y="21" width="5" height="5" rx="1" />
            <rect x="28" y="21" width="5" height="5" rx="1" />
            <rect x="15" y="28" width="5" height="5" rx="1" />
            <rect x="21.5" y="28" width="5" height="5" rx="1" />
            <rect x="28" y="28" width="5" height="12" rx="1" />
            <rect x="15" y="35" width="11.5" height="5" rx="1" />
          </g>
        </svg>
      );
    case "certificate":
      return (
        <svg {...common}>
          <path d="M11 4h26v40H11z" fill={c} />
          <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
            <path d="M17 16h14M17 22h14M17 28h9" />
          </g>
          <circle cx="30" cy="35" r="4.5" fill="#fff" />
          <path d="M28 39l-1.5 6 3.5-2 3.5 2-1.5-6" fill="#fff" />
          <path d="M20 4l2 3 2-3" stroke="#fff" strokeWidth="1.5" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          {/* sleeves */}
          <path d="M2 16h9v14H2z" fill={c} />
          <path d="M37 16h9v14h-9z" fill={c} />
          {/* left hand reaching right */}
          <path d="M11 17h8l7 6-3 3-4-3-3 3 3 3-3 3-3-3-2 2V17z" fill={c} />
          {/* right hand reaching left, fingers over */}
          <path d="M37 17h-8l-6 5 3 3 3-2 6 6 3-3-2-2 1-1V17z" fill={c} />
          {/* clasp highlights */}
          <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
            <path d="M20 26l3 3M23 23l3 3M26 29l3 3" />
          </g>
        </svg>
      );
  }
}
