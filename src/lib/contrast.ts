/** WCAG 2.x relative luminance and contrast ratio for #RRGGBB colours. */
function channel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}
export function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}
export function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

/** Parse `--name: #RRGGBB;` declarations from the light :root block and the dark media block. */
export function parseTokens(css: string): { light: Record<string, string>; dark: Record<string, string> } {
  const grab = (block: string) =>
    Object.fromEntries([...block.matchAll(/--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{6});/g)].map((m) => [m[1], m[2].toUpperCase()]));
  const darkStart = css.indexOf('prefers-color-scheme: dark');
  return { light: grab(css.slice(0, darkStart)), dark: grab(css.slice(darkStart)) };
}
