/**
 * Base Path utility for GitHub Pages static site hosting.
 *
 * In production GitHub Pages (https://umarfarid97.github.io/weddingcard),
 * the base path is "/weddingcard".
 * If a custom domain is configured, set NEXT_PUBLIC_BASE_PATH="" to remove the prefix.
 * In development, basePath is "" for http://localhost:3000.
 */
export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.NODE_ENV === "production"
    ? "/weddingcard"
    : "";

/**
 * Prepends the basePath to absolute asset paths (/images/..., /audio/...).
 */
export function getAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
