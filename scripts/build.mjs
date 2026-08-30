import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { entityGraph, pages } from "../src/site-data.mjs";
import { renderServicePage } from "../src/service-page.mjs";
import { servicePages } from "../src/service-pages.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const layout = await readFile(resolve(projectRoot, "src/layout.html"), "utf8");

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function render(template, replacements) {
  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }
  const unresolved = result.match(/{{[A-Z0-9_]+}}/g);
  if (unresolved) throw new Error(`Unresolved placeholders: ${[...new Set(unresolved)].join(", ")}`);
  return result.replace(/[ \t]+$/gm, "");
}

for (const [locale, page] of Object.entries(pages)) {
  const body = await readFile(resolve(projectRoot, `src/home.${locale}.html`), "utf8");
  const jsonLd = JSON.stringify(entityGraph(page)).replaceAll("</script", "<\\/script");
  const html = render(layout, {
    LANG: page.lang,
    DESCRIPTION: escapeAttribute(page.description),
    TITLE: escapeAttribute(page.title),
    CANONICAL: escapeAttribute(page.canonical),
    HREFLANG_ES: "https://tricotconsulting.com/",
    HREFLANG_EN: "https://tricotconsulting.com/en/",
    HREFLANG_X_DEFAULT: "https://tricotconsulting.com/",
    OG_LOCALE: page.ogLocale,
    OG_IMAGE_ALT: escapeAttribute(page.ogImageAlt),
    ASSET_PREFIX: page.assetPrefix,
    JSON_LD: jsonLd,
    SKIP_LINK: page.skipLink,
    BRAND_LABEL: escapeAttribute(page.brandLabel),
    HOME_URL: page.homeUrl,
    MENU_LABEL: page.menuLabel,
    NAV_LABEL: escapeAttribute(page.navLabel),
    NAV_OPERATION: page.navOperation,
    NAV_SOLUTIONS: page.navSolutions,
    NAV_METHOD: page.navMethod,
    NAV_OPERATION_URL: page.navOperationUrl,
    NAV_SOLUTIONS_URL: page.navSolutionsUrl,
    NAV_METHOD_URL: page.navMethodUrl,
    LANGUAGE_URL: page.languageUrl,
    OTHER_LANG: page.otherLang,
    LANGUAGE_LABEL: page.languageLabel,
    HEADER_CTA: page.headerCta,
    HEADER_CTA_URL: page.headerCtaUrl,
    BODY: body.replaceAll("{{ASSET_PREFIX}}", page.assetPrefix),
    FOOTER_DESCRIPTOR: page.footerDescriptor,
    BACK_TO_TOP: page.backToTop
  });

  const output = resolve(projectRoot, page.output);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html, "utf8");
  process.stdout.write(`generated ${page.output}\n`);
}

for (const page of servicePages) {
  const base = pages[page.lang];
  const graph = entityGraph(page);
  graph["@graph"].push({
    "@type": "BreadcrumbList",
    "@id": `${page.canonical}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: page.lang === "es" ? "Inicio" : "Home",
        item: base.canonical
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.breadcrumb,
        item: page.canonical
      }
    ]
  });
  if (page.schemaService) {
    graph["@graph"].push({
      "@type": "Service",
      "@id": `${page.canonical}#service`,
      name: page.serviceName,
      description: page.description,
      url: page.canonical,
      provider: { "@id": "https://tricotconsulting.com/#organization" }
    });
  }
  const jsonLd = JSON.stringify(graph).replaceAll("</script", "<\\/script");
  const html = render(layout, {
    LANG: page.lang,
    DESCRIPTION: escapeAttribute(page.description),
    TITLE: escapeAttribute(page.title),
    CANONICAL: escapeAttribute(page.canonical),
    HREFLANG_ES: page.lang === "es" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`,
    HREFLANG_EN: page.lang === "en" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`,
    HREFLANG_X_DEFAULT: page.lang === "es" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`,
    OG_LOCALE: base.ogLocale,
    OG_IMAGE_ALT: escapeAttribute(base.ogImageAlt),
    ASSET_PREFIX: page.assetPrefix,
    JSON_LD: jsonLd,
    SKIP_LINK: base.skipLink,
    BRAND_LABEL: escapeAttribute(base.brandLabel),
    HOME_URL: base.homeUrl,
    MENU_LABEL: base.menuLabel,
    NAV_LABEL: escapeAttribute(base.navLabel),
    NAV_OPERATION: base.lang === "es" ? "Property Management" : "Property Management",
    NAV_SOLUTIONS: base.lang === "es" ? "Consultoría" : "Consulting",
    NAV_METHOD: base.navMethod,
    NAV_OPERATION_URL: base.navOperationUrl,
    NAV_SOLUTIONS_URL: base.navSolutionsUrl,
    NAV_METHOD_URL: base.navMethodUrl,
    LANGUAGE_URL: page.languageUrl,
    OTHER_LANG: base.otherLang,
    LANGUAGE_LABEL: base.languageLabel,
    HEADER_CTA: base.headerCta,
    HEADER_CTA_URL: "#contacto",
    BODY: renderServicePage(page),
    FOOTER_DESCRIPTOR: base.footerDescriptor,
    BACK_TO_TOP: base.backToTop
  });

  const output = resolve(projectRoot, page.output);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html, "utf8");
  process.stdout.write(`generated ${page.output}\n`);
}
