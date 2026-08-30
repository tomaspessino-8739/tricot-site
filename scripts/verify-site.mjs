import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { servicePages } from "../src/service-pages.mjs";

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

async function verifyPage(relativePath, contract) {
  const source = await readFile(resolve(root, relativePath), "utf8");
  expect(source, new RegExp(`<html lang="${contract.lang}">`), `${relativePath}: lang`);
  expect(source, /<meta name="robots" content="noindex, nofollow" \/>/, `${relativePath}: noindex gate`);
  expect(source, new RegExp(`<link rel="canonical" href="${escapeRegex(contract.canonical)}" \\/>`), `${relativePath}: canonical`);
  expect(source, new RegExp(`hreflang="es" href="${escapeRegex(contract.hreflangEs)}"`), `${relativePath}: hreflang es`);
  expect(source, new RegExp(`hreflang="en" href="${escapeRegex(contract.hreflangEn)}"`), `${relativePath}: hreflang en`);
  expect(source, new RegExp(`hreflang="x-default" href="${escapeRegex(contract.hreflangEs)}"`), `${relativePath}: hreflang x-default`);
  expect(source, /<script type="application\/ld\+json">/, `${relativePath}: JSON-LD`);
  expect(source, new RegExp(`<h1 id="hero-title">${escapeRegex(escapeHtml(contract.h1))}</h1>`), `${relativePath}: approved H1`);
  expect(source, /property="og:title"/, `${relativePath}: Open Graph`);
  expect(source, /class="language-link"/, `${relativePath}: language switch`);
  expect(source, /aria-labelledby="contact-title"/, `${relativePath}: readiness section`);
  const h1Count = (source.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) failures.push(`${relativePath}: expected one H1, found ${h1Count}`);
  const jsonLdMatch = source.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (jsonLdMatch) {
    try {
      const graph = JSON.parse(jsonLdMatch[1]);
      const types = graph["@graph"]?.map((node) => node["@type"]) || [];
      for (const requiredType of ["WebSite", "Organization", "WebPage", ...(contract.requiredTypes || [])]) {
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
  canonical: "https://tricotconsulting.com/",
  hreflangEs: "https://tricotconsulting.com/",
  hreflangEn: "https://tricotconsulting.com/en/",
  h1: "Tu negocio funciona. La mala noticia es que alguien tiene que estar pendiente de todo."
});

await verifyPage("en/index.html", {
  lang: "en",
  canonical: "https://tricotconsulting.com/en/",
  hreflangEs: "https://tricotconsulting.com/",
  hreflangEn: "https://tricotconsulting.com/en/",
  h1: "Your business works. The bad news is that someone has to keep track of everything."
});

for (const page of servicePages) {
  const spanishUrl = page.lang === "es" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`;
  const englishUrl = page.lang === "en" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`;
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

for (const file of ["styles.css", "app.js", "assets/brand/favicon.svg", "assets/brand/tricot-wordmark.png", "assets/images/tricot-hero-property.jpg"]) {
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

const generated = [
  { output: "index.html", route: "/" },
  { output: "en/index.html", route: "/en/" },
  ...servicePages.map((page) => ({ output: page.output, route: new URL(page.canonical).pathname }))
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

for (const page of generated.filter(({ route }) => !route.includes("agentes-ia-empresas") && !route.includes("ai-agents-for-business"))) {
  const source = await readFile(resolve(root, page.output), "utf8");
  if (/href="\/(?:en\/)?(?:agentes-ia-empresas|ai-agents-for-business)\//.test(source)) {
    failures.push(`${page.output}: links to evidence-gated agent route`);
  }
}

if (failures.length) {
  process.stderr.write(`Verification failed:\n- ${failures.join("\n- ")}\n`);
  process.exit(1);
}

process.stdout.write(`Static SEO/GEO verification passed for ${generated.length} generated pages.\n`);
