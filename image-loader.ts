/**
 * Custom next/image loader for the static export.
 *
 * With `output: "export"` there is no image-optimization server, so this
 * cannot resize or transcode — it only needs to return the right URL.
 * `images.unoptimized: true` alone does NOT prefix the emitted <img src>
 * with `basePath`, so on a GitHub Pages project page every local image
 * would 404 (`/images/...` at the domain root instead of `/<repo>/images/...`).
 *
 * The prefix must be a NEXT_PUBLIC_ variable: this loader also runs in the
 * browser (priority-image preloads and every image rendered after a
 * client-side navigation), and only NEXT_PUBLIC_* values are inlined into
 * client bundles. A build-time-only variable would be empty there and
 * silently produce unprefixed URLs.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function basePathLoader({ src }: { src: string; width: number; quality?: number }) {
  if (!basePath || /^(https?:)?\/\//.test(src) || src.startsWith(basePath + "/")) return src;
  return `${basePath}${src}`;
}
