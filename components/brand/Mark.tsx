/**
 * Vector interpretation of the 茗強 mark: a faceted hexagon in the logo's
 * blue family around a white core carrying the MC monogram.
 * Colors are sampled from the supplied raster logo.
 */
export function Mark({ size = 36, title = "茗強" }: { size?: number; title?: string }) {
  // Pointy-top hexagon, radius 50, centre (50,50)
  const R = 50;
  const r = 31;
  const c = 50;
  const pt = (rad: number, i: number) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [c + rad * Math.cos(a), c + rad * Math.sin(a)] as const;
  };
  const outer = Array.from({ length: 6 }, (_, i) => pt(R, i));
  const inner = Array.from({ length: 6 }, (_, i) => pt(r, i));
  const tones = ["#4081bd", "#122853", "#326fa6", "#78b6da", "#285e87", "#51a1cb", "#2a435f", "#3b7db6", "#122853", "#4081bd", "#285e87", "#78b6da"];
  const facets: string[] = [];
  for (let i = 0; i < 6; i++) {
    const o1 = outer[i];
    const o2 = outer[(i + 1) % 6];
    const i1 = inner[i];
    const i2 = inner[(i + 1) % 6];
    facets.push(`M${o1[0]},${o1[1]} L${o2[0]},${o2[1]} L${i1[0]},${i1[1]} Z`);
    facets.push(`M${o2[0]},${o2[1]} L${i2[0]},${i2[1]} L${i1[0]},${i1[1]} Z`);
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={title}>
      {facets.map((d, i) => (
        <path key={i} d={d} fill={tones[i % tones.length]} />
      ))}
      <path d={`M${inner.map((p) => p.join(",")).join(" L")} Z`} fill="#fdfdfd" />
      {/* MC monogram: M as three bars with a chevron, C as an open bracket */}
      <g fill="#122853">
        <rect x="35" y="40" width="4.5" height="20" />
        <rect x="42" y="40" width="4.5" height="20" />
        <rect x="49" y="40" width="4.5" height="20" />
        <path d="M35 40 L46.5 49 L46.5 44 L35 35 Z" opacity="0.92" />
        <path d="M56 40 h9 v4.5 h-4.5 v11 h4.5 V60 h-9 Z" />
      </g>
    </svg>
  );
}
