import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { servicePages } from "../src/service-pages.mjs";
import { t3Pages } from "../src/t3-pages.mjs";
import { resourcePages } from "../src/resource-pages.mjs";
import { indexablePaths, isIndexable, renderRobots, robotsDirective } from "../src/indexing-policy.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function expect(source, pattern, label) {
  if (!pattern.test(source)) failures.push(label);
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function headingText(source) {
  return source
    .replace(/<[^>]+>/g, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'");
}

async function verifyPage(relativePath, contract) {
  const source = await readFile(resolve(root, relativePath), "utf8");
  expect(source, new RegExp(`<html lang="${contract.lang}">`), `${relativePath}: lang`);
  expect(source, new RegExp(`<meta name="robots" content="${escapeRegex(robotsDirective(contract.canonical))}" \\/>`), `${relativePath}: robots directive`);
  expect(source, new RegExp(`<link rel="canonical" href="${escapeRegex(contract.canonical)}" \\/>`), `${relativePath}: canonical`);
  expect(source, new RegExp(`hreflang="es" href="${escapeRegex(contract.hreflangEs)}"`), `${relativePath}: hreflang es`);
  expect(source, new RegExp(`hreflang="en" href="${escapeRegex(contract.hreflangEn)}"`), `${relativePath}: hreflang en`);
  expect(source, new RegExp(`hreflang="x-default" href="${escapeRegex(contract.hreflangEs)}"`), `${relativePath}: hreflang x-default`);
  expect(source, /<script type="application\/ld\+json">/, `${relativePath}: JSON-LD`);
  const h1Match = source.match(/<h1 id="hero-title">([\s\S]*?)<\/h1>/);
  if (!h1Match || headingText(h1Match[1]) !== contract.h1) failures.push(`${relativePath}: approved H1`);
  expect(source, /property="og:title"/, `${relativePath}: Open Graph`);
  expect(source, /class="language-link"/, `${relativePath}: language switch`);
  expect(source, /rel="preload" href="[^"]*assets\/fonts\/cinzel-latin\.woff2" as="font" type="font\/woff2" crossorigin/, `${relativePath}: Cinzel preload`);
  expect(source, /rel="preload" href="[^"]*assets\/fonts\/montserrat-latin\.woff2" as="font" type="font\/woff2" crossorigin/, `${relativePath}: Montserrat preload`);
  expect(source, /aria-labelledby="contact-title"/, `${relativePath}: readiness section`);
  const h1Count = (source.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) failures.push(`${relativePath}: expected one H1, found ${h1Count}`);
  if (!/<h1 id="hero-title">[\s\S]*?<em>[\s\S]*?<\/em>[\s\S]*?<\/h1>/.test(source)) failures.push(`${relativePath}: H1 editorial accent`);
  const jsonLdMatch = source.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (jsonLdMatch) {
    try {
      const graph = JSON.parse(jsonLdMatch[1]);
      const types = graph["@graph"]?.map((node) => node["@type"]) || [];
      for (const requiredType of ["WebSite", "Organization", ...(contract.requiredTypes || ["WebPage"])]) {
        if (!types.includes(requiredType)) failures.push(`${relativePath}: missing JSON-LD ${requiredType}`);
      }
      if (contract.forbidService && types.includes("Service")) failures.push(`${relativePath}: Service schema is not allowed`);
    } catch (error) {
      failures.push(`${relativePath}: invalid JSON-LD (${error.message})`);
    }
  }
  const ids = new Set([...source.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of source.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.has(match[1])) failures.push(`${relativePath}: broken anchor #${match[1]}`);
  }
  if (/type="email"|localStorage|data-contact-form/.test(source)) {
    failures.push(`${relativePath}: prototype lead capture remains`);
  }
}

await verifyPage("index.html", {
  lang: "es",
  canonical: "https://untricot.com/",
  hreflangEs: "https://untricot.com/",
  hreflangEn: "https://untricot.com/en/",
  h1: "Haz que tu negocio crezca sin que todo tenga que pasar por ti."
});

await verifyPage("en/index.html", {
  lang: "en",
  canonical: "https://untricot.com/en/",
  hreflangEs: "https://untricot.com/",
  hreflangEn: "https://untricot.com/en/",
  h1: "Help your business grow without having everything run through you."
});

for (const page of servicePages) {
  const spanishUrl = page.lang === "es" ? page.canonical : `https://untricot.com${page.languageUrl}`;
  const englishUrl = page.lang === "en" ? page.canonical : `https://untricot.com${page.languageUrl}`;
  await verifyPage(page.output, {
    lang: page.lang,
    canonical: page.canonical,
    hreflangEs: spanishUrl,
    hreflangEn: englishUrl,
    h1: page.h1,
    requiredTypes: ["BreadcrumbList", ...(page.schemaService ? ["Service"] : [])],
    forbidService: !page.schemaService
  });
}

for (const page of t3Pages) {
  const spanishUrl = page.lang === "es" ? page.canonical : `https://untricot.com${page.languageUrl}`;
  const englishUrl = page.lang === "en" ? page.canonical : `https://untricot.com${page.languageUrl}`;
  await verifyPage(page.output, {
    lang: page.lang,
    canonical: page.canonical,
    hreflangEs: spanishUrl,
    hreflangEn: englishUrl,
    h1: page.h1,
    requiredTypes: [page.kind === "institutional" ? "AboutPage" : "WebPage", "BreadcrumbList", "FAQPage"],
    forbidService: true
  });
}

for (const page of resourcePages) {
  const spanishUrl = page.lang === "es" ? page.canonical : `https://untricot.com${page.languageUrl}`;
  const englishUrl = page.lang === "en" ? page.canonical : `https://untricot.com${page.languageUrl}`;
  await verifyPage(page.output, {
    lang: page.lang,
    canonical: page.canonical,
    hreflangEs: spanishUrl,
    hreflangEn: englishUrl,
    h1: page.h1,
    requiredTypes: [page.kind === "hub" ? "CollectionPage" : "WebPage", "BreadcrumbList", ...(page.kind === "article" ? ["Article", "FAQPage"] : [])],
    forbidService: true
  });
}

for (const file of ["styles.css", "app.js", "robots.txt", "sitemap.xml", "404.html", "assets/brand/favicon.svg", "assets/brand/tricot-wordmark.png", "assets/brand/tricot-wordmark-600.webp", "assets/brand/tricot-wordmark-900.webp", "assets/fonts/cinzel-latin.woff2", "assets/fonts/montserrat-latin.woff2", "assets/images/tricot-hero-property.jpg", "assets/images/tricot-hero-property-540.webp", "assets/images/tricot-hero-property-720.webp", "assets/images/tricot-hero-property-1080.webp"]) {
  try {
    await access(resolve(root, file));
  } catch {
    failures.push(`missing shared asset: ${file}`);
  }
}

const appSource = await readFile(resolve(root, "app.js"), "utf8");
if (/localStorage|data-contact-form|formEndpoint/.test(appSource)) {
  failures.push("app.js: prototype lead capture code remains");
}

const styleSource = await readFile(resolve(root, "styles.css"), "utf8");
expect(styleSource, /--display: "Cinzel", Georgia, serif;/, "styles.css: Cinzel display role");
expect(styleSource, /--reading: "Courier New", Courier, monospace;/, "styles.css: Courier New reading role");
expect(styleSource, /--body: "Montserrat", Arial, sans-serif;/, "styles.css: Montserrat interface role");
if (/font-family:\s*"Inter"|--body:\s*"Inter"/.test(styleSource)) failures.push("styles.css: Inter remains active");

const generated = [
  { output: "index.html", route: "/" },
  { output: "en/index.html", route: "/en/" },
  ...servicePages.map((page) => ({ output: page.output, route: new URL(page.canonical).pathname })),
  ...t3Pages.map((page) => ({ output: page.output, route: new URL(page.canonical).pathname })),
  ...resourcePages.map((page) => ({ output: page.output, route: new URL(page.canonical).pathname }))
];
const knownRoutes = new Set(generated.map((page) => page.route));
const seenCanonicals = new Set();
const seenTitles = new Set();

for (const page of generated) {
  const source = await readFile(resolve(root, page.output), "utf8");
  const canonical = source.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const title = source.match(/<title>([^<]+)<\/title>/i)?.[1];
  if (seenCanonicals.has(canonical)) failures.push(`${page.output}: duplicate canonical ${canonical}`);
  if (seenTitles.has(title)) failures.push(`${page.output}: duplicate title ${title}`);
  seenCanonicals.add(canonical);
  seenTitles.add(title);
  for (const match of source.matchAll(/href="(\/[^"]*\/)"/g)) {
    const route = match[1].split("#")[0];
    if (!knownRoutes.has(route)) failures.push(`${page.output}: link targets missing route ${route}`);
  }
}

const robotsSource = await readFile(resolve(root, "robots.txt"), "utf8");
if (robotsSource !== renderRobots()) failures.push("robots.txt: differs from central crawler policy");
expect(robotsSource, /^User-agent: \*$/m, "robots.txt: missing wildcard user-agent");
expect(robotsSource, /^Allow: \/$/m, "robots.txt: public crawl is not allowed");
expect(robotsSource, /^Sitemap: https:\/\/untricot\.com\/sitemap\.xml$/m, "robots.txt: missing absolute sitemap URL");
if (/^Disallow:/m.test(robotsSource)) failures.push("robots.txt: page-level noindex must remain crawlable");

const sitemapSource = await readFile(resolve(root, "sitemap.xml"), "utf8");
expect(sitemapSource, /^<\?xml version="1\.0" encoding="UTF-8"\?>/, "sitemap.xml: XML declaration");
expect(sitemapSource, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/, "sitemap.xml: urlset namespace");
expect(sitemapSource, /<\/urlset>\s*$/, "sitemap.xml: closing urlset");
const sitemapUrls = [...sitemapSource.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (new Set(sitemapUrls).size !== sitemapUrls.length) failures.push("sitemap.xml: duplicate URLs");
for (const url of sitemapUrls) {
  if (!generated.some((page) => `https://untricot.com${page.route}` === url)) failures.push(`sitemap.xml: unknown URL ${url}`);
  if (!isIndexable(url)) failures.push(`sitemap.xml: non-indexable URL ${url}`);
}
for (const route of indexablePaths) {
  const canonical = `https://untricot.com${route}`;
  if (!sitemapUrls.includes(canonical)) failures.push(`sitemap.xml: missing authorised URL ${canonical}`);
}

const notFoundSource = await readFile(resolve(root, "404.html"), "utf8");
expect(notFoundSource, /<meta name="robots" content="noindex, nofollow" \/>/, "404.html: noindex gate");
expect(notFoundSource, /<h1>Esta página no está\./, "404.html: useful H1");
expect(notFoundSource, /href="\/en\/"/, "404.html: English recovery link");
if (/<link rel="canonical"/.test(notFoundSource)) failures.push("404.html: canonical must not point to an error page");
if (/<form|<input|<textarea|localStorage/.test(notFoundSource)) failures.push("404.html: unexpected data capture");

for (const page of generated.filter(({ route }) => !route.includes("agentes-ia-empresas") && !route.includes("ai-agents-for-business"))) {
  const source = await readFile(resolve(root, page.output), "utf8");
  if (/href="\/(?:en\/)?(?:agentes-ia-empresas|ai-agents-for-business)\//.test(source)) {
    failures.push(`${page.output}: links to evidence-gated agent route`);
  }
}

for (const page of generated.filter(({ route }) => route.includes("agentes-ia-empresas") || route.includes("ai-agents-for-business"))) {
  const source = await readFile(resolve(root, page.output), "utf8");
  if (/href="\/(?:en\/initial-consultation|diagnostico-operativo)\//.test(source)) {
    failures.push(`${page.output}: evidence-gated route links to consultation funnel`);
  }
}

if (failures.length) {
  process.stderr.write(`Verification failed:\n- ${failures.join("\n- ")}\n`);
  process.exit(1);
}

process.stdout.write(`Static SEO/GEO verification passed for ${generated.length} generated pages.\n`);
