import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { contact, entityGraph, legacyRoutes, origin, pages } from "../src/site-data.mjs";
import { renderRobots, renderSitemap, robotsDirective } from "../src/indexing-policy.mjs";
import { renderNotFound } from "../src/not-found.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const layout = await readFile(resolve(root, "src/layout.html"), "utf8");
const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function render(template, values) {
  const result = template.replace(/{{([A-Z0-9_]+)}}/g, (_, key) => {
    if (!(key in values)) throw new Error("Missing template value: " + key);
    return values[key];
  });
  if (/{{[A-Z0-9_]+}}/.test(result)) throw new Error("Unresolved template value");
  return result;
}

for (const page of Object.values(pages)) {
  const contactAddress = contact.email
    ? '<span class="contact-email">' + escape(contact.email) + '</span>'
    : "";
  const contactAction = contact.active && contact.email
    ? '<div class="contact-action"><a class="contact-email" href="mailto:' + escape(contact.email) + '">' + escape(contact.email) + '</a></div>'
    : '<div class="contact-action"><span class="contact-label">' + page.contactLabel + '</span>' + contactAddress + '<small>' + page.contactHint + '</small></div>';
  const body = render(await readFile(resolve(root, "src/home." + page.lang + ".html"), "utf8"), { CONTACT_ACTION: contactAction });
  const html = render(layout, {
    LANG: page.lang, ROBOTS: robotsDirective(page.canonical), DESCRIPTION: escape(page.description),
    TITLE: escape(page.title), CANONICAL: page.canonical, OG_LOCALE: page.ogLocale,
    JSON_LD: JSON.stringify(entityGraph(page)).replaceAll("</script", "<\\/script"),
    SKIP_LINK: page.skipLink, BRAND_LABEL: page.brandLabel, HOME_URL: page.homeUrl,
    MENU_LABEL: page.menuLabel, NAV_LABEL: page.navLabel, NAV_SERVICES: page.navServices, NAV_CASES: page.navCases,
    NAV_FOUNDER: page.navFounder, FOUNDER_URL: page.founderUrl,
    NAV_APPLICATIONS: page.navApplications, NAV_IMPLEMENTATION: page.navImplementation, NAV_CONTACT: page.navContact,
    SERVICES_URL: page.servicesUrl, CASES_URL: page.casesUrl, APPLICATIONS_URL: page.applicationsUrl, IMPLEMENTATION_URL: page.implementationUrl,
    LANGUAGE_URL: page.languageUrl, OTHER_LANG: page.otherLang, OTHER_LANG_UPPER: page.otherLang.toUpperCase(),
    LANGUAGE_LABEL: page.languageLabel, BODY: body, FOOTER_DESCRIPTOR: page.footerDescriptor, BACK_TO_TOP: page.backToTop
  });
  await mkdir(dirname(resolve(root, page.output)), { recursive: true });
  await writeFile(resolve(root, page.output), html);
  console.log("generated " + page.output);
}

// Keep incoming links working while withdrawing obsolete commercial content.
// GitHub Pages has no custom 301 rules: these are static canonical redirects
// with meta refresh, JS query preservation and a readable no-JS fallback link.
for (const [route, target] of legacyRoutes) {
  const en = route.startsWith("en/");
  const canonical = origin + target.split("#")[0];
  const redirectTitle = en ? "Continue to TRICOT" : "Continuar a TRICOT";
  const redirect = '<!doctype html>\n<html lang="' + (en ? "en" : "es") + '"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="robots" content="noindex, follow" /><title>' + redirectTitle + '</title><link rel="canonical" href="' + canonical + '" /><meta http-equiv="refresh" content="0;url=' + target + '" /><link rel="stylesheet" href="/styles.css" /></head><body><main class="not-found-main"><h1>' + redirectTitle + '</h1><p><a href="' + target + '">' + (en ? "See the applications for holiday rental businesses." : "Ver las aplicaciones para empresas de alquiler turístico.") + '</a></p></main><script>const destination = new URL(' + JSON.stringify(target) + ', location.origin); destination.search = location.search; location.replace(destination.href);</script></body></html>\n';
  const output = resolve(root, route, "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, redirect);
}
await writeFile(resolve(root, "robots.txt"), renderRobots());
await writeFile(resolve(root, "sitemap.xml"), renderSitemap(Object.values(pages).map((page) => ({
  canonical: page.canonical, hreflangEs: origin + "/", hreflangEn: origin + "/en/"
}))));
await writeFile(resolve(root, "404.html"), renderNotFound());
console.log("generated 18 legacy redirects, robots.txt, sitemap.xml and 404.html");
