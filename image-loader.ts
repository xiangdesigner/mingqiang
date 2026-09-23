/**
 * Custom next/image loader for the static export.
 *
 * With `output: "export"` there is no image-optimization server, so this
 * cannot resize or transcode — it only needs to return the right URL.
 * `images.unoptimized: true` alone does NOT prefix the emitted <img src>
 * with `basePath` (only `_next/*` asset URLs and metadata get that
 * automatically), so on a GitHub Pages project page every local image
 * 404s: the browser requests `/images/...` at the domain root instead of
 * `/<repo>/images/...`. Reading the same PAGES_BASE_PATH env var used in
 * next.config.ts fixes that.
 */
export default function basePathLoader({ src }: { src: string; width: number; quality?: number }) {
  const basePath = process.env.PAGES_BASE_PATH || "";
  return `${basePath}${src}`;
}
