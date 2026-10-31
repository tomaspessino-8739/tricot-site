export const indexablePaths = new Set([]);

const gatedNoFollowPaths = new Set([
  "/agentes-ia-empresas/",
  "/en/ai-agents-for-business/"
]);

function pathFromCanonical(canonical) {
  return new URL(canonical).pathname;
}

export function isIndexable(canonical) {
  return indexablePaths.has(pathFromCanonical(canonical));
}

export function robotsDirective(canonical) {
  const path = pathFromCanonical(canonical);
  if (indexablePaths.has(path)) return "index, follow";
  if (gatedNoFollowPaths.has(path)) return "noindex, nofollow";
  return "noindex, follow";
}

export function renderRobots() {
  return `# Public crawling is allowed so page-level indexing directives can be read.
# Search, user-initiated retrieval and approved AI crawlers inherit this policy.
User-agent: *
Allow: /

Sitemap: https://untricot.com/sitemap.xml
`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderSitemap(records) {
  const eligible = records.filter((record) => isIndexable(record.canonical));
  const eligibleUrls = new Set(eligible.map((record) => record.canonical));

  for (const record of eligible) {
    if (!eligibleUrls.has(record.hreflangEs) || !eligibleUrls.has(record.hreflangEn)) {
      throw new Error(`Indexable hreflang pair is incomplete for ${record.canonical}`);
    }
  }

  const urls = eligible.map((record) => `  <url>
    <loc>${escapeXml(record.canonical)}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${escapeXml(record.hreflangEs)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(record.hreflangEn)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(record.hreflangEs)}" />
  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}${urls ? "\n" : "  <!-- No URL is authorised for indexing in the current release state. -->\n"}</urlset>
`;
}
