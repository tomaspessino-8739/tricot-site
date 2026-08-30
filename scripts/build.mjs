import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { entityGraph, pages } from "../src/site-data.mjs";
import { renderServicePage } from "../src/service-page.mjs";
import { servicePages } from "../src/service-pages.mjs";
import { renderT3Page } from "../src/t3-page.mjs";
import { t3Pages } from "../src/t3-pages.mjs";
import { renderResourcePage } from "../src/resource-page.mjs";
import { resourcePages } from "../src/resource-pages.mjs";
import { renderRobots, renderSitemap, robotsDirective } from "../src/indexing-policy.mjs";
import { renderNotFound } from "../src/not-found.mjs";

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
    ROBOTS: robotsDirective(page.canonical),
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
    ROBOTS: robotsDirective(page.canonical),
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
    HEADER_CTA_URL: page.evidenceNotice ? "#contacto" : base.headerCtaUrl,
    BODY: renderServicePage(page),
    FOOTER_DESCRIPTOR: base.footerDescriptor,
    BACK_TO_TOP: base.backToTop
  });

  const output = resolve(projectRoot, page.output);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html, "utf8");
  process.stdout.write(`generated ${page.output}\n`);
}

for (const page of t3Pages) {
  const base = pages[page.lang];
  const graph = entityGraph(page);
  if (page.kind === "institutional") {
    graph["@graph"].find((node) => node["@type"] === "WebPage")["@type"] = "AboutPage";
  }
  graph["@graph"].push({
    "@type": "BreadcrumbList",
    "@id": `${page.canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: page.lang === "es" ? "Inicio" : "Home", item: base.canonical },
      { "@type": "ListItem", position: 2, name: page.breadcrumb, item: page.canonical }
    ]
  });
  graph["@graph"].push({
    "@type": "FAQPage",
    "@id": `${page.canonical}#faq`,
    mainEntity: page.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  });
  const jsonLd = JSON.stringify(graph).replaceAll("</script", "<\\/script");
  const spanishUrl = page.lang === "es" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`;
  const englishUrl = page.lang === "en" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`;
  const html = render(layout, {
    LANG: page.lang,
    ROBOTS: robotsDirective(page.canonical),
    DESCRIPTION: escapeAttribute(page.description),
    TITLE: escapeAttribute(page.title),
    CANONICAL: escapeAttribute(page.canonical),
    HREFLANG_ES: spanishUrl,
    HREFLANG_EN: englishUrl,
    HREFLANG_X_DEFAULT: spanishUrl,
    OG_LOCALE: base.ogLocale,
    OG_IMAGE_ALT: escapeAttribute(base.ogImageAlt),
    ASSET_PREFIX: page.assetPrefix,
    JSON_LD: jsonLd,
    SKIP_LINK: base.skipLink,
    BRAND_LABEL: escapeAttribute(base.brandLabel),
    HOME_URL: base.homeUrl,
    MENU_LABEL: base.menuLabel,
    NAV_LABEL: escapeAttribute(base.navLabel),
    NAV_OPERATION: "Property Management",
    NAV_SOLUTIONS: base.lang === "es" ? "Consultoría" : "Consulting",
    NAV_METHOD: base.navMethod,
    NAV_OPERATION_URL: base.navOperationUrl,
    NAV_SOLUTIONS_URL: base.navSolutionsUrl,
    NAV_METHOD_URL: base.navMethodUrl,
    LANGUAGE_URL: page.languageUrl,
    OTHER_LANG: base.otherLang,
    LANGUAGE_LABEL: base.languageLabel,
    HEADER_CTA: base.headerCta,
    HEADER_CTA_URL: page.kind === "consultation" ? "#contacto" : base.headerCtaUrl,
    BODY: renderT3Page(page),
    FOOTER_DESCRIPTOR: base.footerDescriptor,
    BACK_TO_TOP: base.backToTop
  });
  const output = resolve(projectRoot, page.output);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html, "utf8");
  process.stdout.write(`generated ${page.output}\n`);
}

for (const page of resourcePages) {
  const base = pages[page.lang];
  const graph = entityGraph(page);
  const webpage = graph["@graph"].find((node) => node["@type"] === "WebPage");
  if (page.kind === "hub") webpage["@type"] = "CollectionPage";
  if (page.kind === "article") {
    webpage.mainEntity = { "@id": `${page.canonical}#article` };
    graph["@graph"].push({
      "@type": "Article",
      "@id": `${page.canonical}#article`,
      url: page.canonical,
      headline: page.h1,
      description: page.description,
      inLanguage: page.lang,
      datePublished: "2026-08-30",
      dateModified: "2026-08-30",
      author: { "@id": "https://tricotconsulting.com/#organization" },
      publisher: { "@id": "https://tricotconsulting.com/#organization" },
      mainEntityOfPage: { "@id": `${page.canonical}#webpage` }
    });
  }
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: page.lang === "es" ? "Inicio" : "Home", item: base.canonical },
    ...(page.kind === "article" ? [{ "@type": "ListItem", position: 2, name: page.lang === "es" ? "Recursos" : "Resources", item: `https://tricotconsulting.com${page.hubUrl}` }] : []),
    { "@type": "ListItem", position: page.kind === "article" ? 3 : 2, name: page.breadcrumb, item: page.canonical }
  ];
  graph["@graph"].push({ "@type": "BreadcrumbList", "@id": `${page.canonical}#breadcrumb`, itemListElement: breadcrumbItems });
  if (page.kind === "article") {
    graph["@graph"].push({
      "@type": "FAQPage",
      "@id": `${page.canonical}#faq`,
      mainEntity: page.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer }
      }))
    });
  }
  const jsonLd = JSON.stringify(graph).replaceAll("</script", "<\\/script");
  const spanishUrl = page.lang === "es" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`;
  const englishUrl = page.lang === "en" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`;
  const html = render(layout, {
    LANG: page.lang,
    ROBOTS: robotsDirective(page.canonical),
    DESCRIPTION: escapeAttribute(page.description),
    TITLE: escapeAttribute(page.title),
    CANONICAL: escapeAttribute(page.canonical),
    HREFLANG_ES: spanishUrl,
    HREFLANG_EN: englishUrl,
    HREFLANG_X_DEFAULT: spanishUrl,
    OG_LOCALE: base.ogLocale,
    OG_IMAGE_ALT: escapeAttribute(base.ogImageAlt),
    ASSET_PREFIX: page.assetPrefix,
    JSON_LD: jsonLd,
    SKIP_LINK: base.skipLink,
    BRAND_LABEL: escapeAttribute(base.brandLabel),
    HOME_URL: base.homeUrl,
    MENU_LABEL: base.menuLabel,
    NAV_LABEL: escapeAttribute(base.navLabel),
    NAV_OPERATION: "Property Management",
    NAV_SOLUTIONS: base.lang === "es" ? "Consultoría" : "Consulting",
    NAV_METHOD: base.lang === "es" ? "Recursos" : "Resources",
    NAV_OPERATION_URL: base.navOperationUrl,
    NAV_SOLUTIONS_URL: base.navSolutionsUrl,
    NAV_METHOD_URL: page.lang === "es" ? "/recursos/" : "/en/resources/",
    LANGUAGE_URL: page.languageUrl,
    OTHER_LANG: base.otherLang,
    LANGUAGE_LABEL: base.languageLabel,
    HEADER_CTA: base.headerCta,
    HEADER_CTA_URL: base.headerCtaUrl,
    BODY: renderResourcePage(page),
    FOOTER_DESCRIPTOR: base.footerDescriptor,
    BACK_TO_TOP: base.backToTop
  });
  const output = resolve(projectRoot, page.output);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html, "utf8");
  process.stdout.write(`generated ${page.output}\n`);
}

const sitemapRecords = [
  {
    canonical: pages.es.canonical,
    hreflangEs: pages.es.canonical,
    hreflangEn: pages.en.canonical
  },
  {
    canonical: pages.en.canonical,
    hreflangEs: pages.es.canonical,
    hreflangEn: pages.en.canonical
  },
  ...servicePages.map((page) => ({
    canonical: page.canonical,
    hreflangEs: page.lang === "es" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`,
    hreflangEn: page.lang === "en" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`
  })),
  ...t3Pages.map((page) => ({
    canonical: page.canonical,
    hreflangEs: page.lang === "es" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`,
    hreflangEn: page.lang === "en" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`
  })),
  ...resourcePages.map((page) => ({
    canonical: page.canonical,
    hreflangEs: page.lang === "es" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`,
    hreflangEn: page.lang === "en" ? page.canonical : `https://tricotconsulting.com${page.languageUrl}`
  }))
];

await writeFile(resolve(projectRoot, "robots.txt"), renderRobots(), "utf8");
process.stdout.write("generated robots.txt\n");
await writeFile(resolve(projectRoot, "sitemap.xml"), renderSitemap(sitemapRecords), "utf8");
process.stdout.write("generated sitemap.xml\n");
await writeFile(resolve(projectRoot, "404.html"), renderNotFound(), "utf8");
process.stdout.write("generated 404.html\n");
