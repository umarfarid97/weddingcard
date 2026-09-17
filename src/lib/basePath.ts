/**
 * Base Path utility for custom domain / GitHub Pages static site hosting.
 *
 * For custom domain (https://umarriedtodina.abrdns.com), the base path is "".
 * If deployed to a subpath like /weddingcard, NEXT_PUBLIC_BASE_PATH can be passed.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
