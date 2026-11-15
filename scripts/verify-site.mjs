import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { contact, legacyRoutes, origin, pages } from "../src/site-data.mjs";
import { indexablePaths, renderRobots, robotsDirective } from "../src/indexing-policy.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFile(resolve(root, path), "utf8");
const htmlByPath = new Map();
const titles = new Set();
for (const page of Object.values(pages)) {
  const html = await read(page.output);
  htmlByPath.set(new URL(page.canonical).pathname, html);
  const prefix = page.output + ": ";
  assert(html.includes('<html lang="' + page.lang + '">'), prefix + "language");
  assert(html.includes('<link rel="canonical" href="' + page.canonical + '"'), prefix + "canonical");
  assert(html.includes('<meta name="robots" content="' + robotsDirective(page.canonical) + '"'), prefix + "indexing policy");
  for (const lang of Object.values(pages)) {
    assert(html.includes('hreflang="' + lang.lang + '" href="' + lang.canonical + '"'), prefix + "language alternative");
  }
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert(title && !titles.has(title), prefix + "unique title");
  titles.add(title);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, prefix + "one H1");
  assert.equal((html.match(/<article class="application"/g) || []).length, 3, prefix + "three applications");
  const chapters = [...html.matchAll(/<section class="[^"]*letter-chapter"[^>]*aria-labelledby="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(chapters, ["hero-title", "story-title", "connection-title", "founder-title", "services-title", "implementation-title", "contact-title"], prefix + "sales-letter chapter order");
  const expectedOffer = page.lang === "es" ? "Consultora PropTech para gestoras de alquiler vacacional" : "PropTech consultancy for holiday rental operators";
  assert(html.includes('<p class="kicker">' + expectedOffer + '</p>'), prefix + "approved positioning in the hero");
  assert.equal(title, "TRICOT — " + expectedOffer, prefix + "positioning in metadata");
  const services = html.match(/<ul class="letter-list">([\s\S]*?)<\/ul>/)?.[1] ?? "";
  const serviceHeadings = [...services.matchAll(/<h3>([^<]+)<\/h3>/g)].map(match => match[1]);
  assert.deepEqual(serviceHeadings, page.lang === "es"
    ? ["Software a medida", "Automatizaciones", "Agente de WhatsApp", "Gestión operativa delegada"]
    : ["Tailored software", "Workflow automation", "WhatsApp agent", "Managed back-office operations"], prefix + "four services");
  const chapter = (name) => html.match(new RegExp('<section[^>]*aria-labelledby="' + name + '"[^>]*>([\\s\\S]*?)<\\/section>'))?.[1] ?? "";
  assert(!chapter("story-title").includes('href="https://news.airbnb.com/instant-book-updates"'), prefix + "Airbnb story has no legacy source link");
  const example = chapter("connection-title");
  assert(/<video\b[^>]*\bcontrols\b/.test(example), prefix + "partner portal video with playback controls");
  assert(/<\/video>\s*<p>[^<]*\bPMS\b[^<]*WhatsApp[^<]*<\/p>\s*<video\b[^>]*\bcontrols\b[^>]*controlslist="nodownload"[^>]*>\s*<source src="\/assets\/videos\/tricot-cash-flow-whatsapp\.mp4"/.test(example), prefix + "Cash Flow video follows the handoff from the partner portal");
  assert(html.includes('rel="icon" href="/assets/brand/favicon-t.svg"'), prefix + "TRICOT T favicon retained");
  assert(html.includes('href="' + page.casesUrl + '"'), prefix + "case navigation");
  const founderSection = chapter("founder-title");
  assert(/<p>[^<]*Thomas Andrew P\. /.test(founderSection), prefix + "approved founder name in the introduction");
  assert(founderSection.includes(page.lang === "es" ? "<strong>más de 100 operaciones inmobiliarias</strong>" : "<strong>more than 100 property transactions</strong>"), prefix + "transactions, not implementations");
  assert(!/<img\b|linkedin\.com/i.test(founderSection), prefix + "no founder photo or LinkedIn");
  const implementation = chapter("implementation-title");
  const implementationTitle = page.lang === "es" ? "Delega tareas, no el control." : "Delegate tasks, not control.";
  const dashboardAccess = page.lang === "es"
    ? "En ambas modalidades <strong>siempre tienes acceso a tu panel de control</strong>"
    : "Either way, <strong>you always have access to your dashboard</strong>";
  assert(implementation.includes('<h2 id="implementation-title">' + implementationTitle + '</h2>'), prefix + "approved implementation headline");
  assert(implementation.includes(dashboardAccess), prefix + "dashboard access in both operating modes");
  const faqId = page.lang === "es" ? "preguntas" : "questions";
  const faq = implementation.split('id="' + faqId + '">')[1]?.split("</div>")[0] ?? "";
  assert.equal((faq.match(/<summary>/g) || []).length, 10, prefix + "frequently asked questions");
  assert(chapter("contact-title").includes('class="letter-postscript"'), prefix + "closing postscript");
  const cases = [...chapter("services-title").matchAll(/<article class="case-study"[^>]*>([\s\S]*?)<\/article>/g)].map(match => match[1]);
  assert.deepEqual(cases.map(fragment => fragment.match(/<h4[^>]*aria-label="([^"]+)"/)?.[1] ?? fragment.match(/<h4[^>]*>([^<]+)<\/h4>/)?.[1]), [
    "Infinity 8 Real Estate", "EB Capital Consulting", "Lone Wolf LLC", "Aguamadera Ibiza", "OPAL Investments"
  ], prefix + "five approved cases");
  const reportedProfit = page.lang === "es"
    ? "<dt>Beneficio</dt><dd><strong>+50&nbsp;%</strong></dd>"
    : "<dt>Profit</dt><dd><strong>+50%</strong></dd>";
  assert(cases[0].includes(reportedProfit), prefix + "Infinity 8 reports profit");
  assert(cases[3].includes("channel manager") && cases[3].includes(page.lang === "es" ? "Asesoramos al hotel" : "We advised the hotel"), prefix + "hotel advisory scope");
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, prefix + "unique IDs");
  for (const match of html.matchAll(/(?:href="#|aria-labelledby="|aria-controls=")([^"]+)"/g)) {
    for (const id of match[1].split(" ")) assert(ids.includes(id), prefix + "target " + id);
  }
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  assert.equal(images.length, 9, prefix + "two brand logos, three editorial photos and four case logos");
  assert.equal(images.filter((image) => image.includes('src="/assets/brand/tricot-wordmark-600.webp"') && image.includes('alt="TRICOT"')).length, 2, prefix + "original logo in header and footer");
  const mainHtml = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
  const photos = [...mainHtml.matchAll(/<figure class="letter-photo">\s*<img src="([^"]+)"/g)].map(match => match[1]);
  assert.equal(photos.length, 3, prefix + "three editorial photos");
  assert.equal(new Set(photos).size, photos.length, prefix + "distinct editorial photos");
  assert.equal((mainHtml.match(/<video\b/g) || []).length, 2, prefix + "two embedded videos");
  assert(!/<picture\b|<svg\b/.test(mainHtml), prefix + "no other content media");
  assert(!/og:image|twitter:image/.test(html), prefix + "no inherited social image");
  assert(!/{{[A-Z_]+}}/.test(html), prefix + "rendered template");
  const contactForm = chapter("contact-title").match(/<form\b[^>]*>[\s\S]*?<\/form>/)?.[0] ?? "";
  assert.equal((html.match(/<form\b/g) || []).length, 1, prefix + "one contact form");
  assert.equal((contactForm.match(/<input\b/g) || []).length, 1, prefix + "contact asks only for email");
  assert(/name="email" type="email"[^>]*\brequired\b/.test(contactForm), prefix + "email validation");
  if (!contact.endpoint) assert(/<button\b[^>]*\bdisabled\b/.test(contactForm), prefix + "submission waits for endpoint");
  assert(!/Forward Deployed|Palantir|idempotencia|fallback|roadmap|gate crítico|\bleads\b/.test(html), prefix + "plain language");
  assert.equal((mainHtml.match(/\bPMS\b/g) || []).length, 1, prefix + "PMS appears only between the demo videos");
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert(graph["@graph"].some((item) => item["@type"] === "Organization"), prefix + "organization schema");
  assert(graph["@graph"].some((item) => item.url === page.canonical && item["@type"] === "WebPage"), prefix + "page schema");
  for (const match of html.matchAll(/(?:src|href|poster)="(\/[^"#?]+)(?:#[^"]*)?"/g)) {
    const target = match[1];
    if (target.endsWith("/")) assert(Object.values(pages).some((record) => new URL(record.canonical).pathname === target), prefix + "active internal route " + target);
    else await access(resolve(root, target.slice(1)));
  }
  const words = (content) => content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  const faqAnswers = [...faq.matchAll(/<p>([\s\S]*?)<\/p>/g)];
  const expandedFaqWords = faqAnswers.reduce((total, answer) => total + words(answer[1]), 0);
  const expandedCaseWords = cases.slice(1).reduce((total, fragment) => total + words(fragment), 0);
  assert(words(mainHtml) - expandedFaqWords - expandedCaseWords < 1200, prefix + "the sales letter stays concise with details collapsed");
  console.log(page.output + ": content, metadata, links and media verified (" + words(mainHtml) + " words)");
}
for (const [route, target] of legacyRoutes) {
  const html = await read(route + "/index.html");
  const [path, hash] = target.split("#");
  const destination = htmlByPath.get(path);
  assert(destination, route + ": redirect destination");
  if (hash) assert(destination.includes('id="' + hash + '"'), route + ": redirect anchor");
  assert(html.includes('http-equiv="refresh" content="0;url=' + target + '"'), route + ": static redirect");
  assert(html.includes('href="' + target + '"'), route + ": fallback link");
  assert(html.includes('href="' + origin + path + '"'), route + ": target canonical");
  assert(html.includes("destination.search = location.search"), route + ": preserve query");
  assert(!/Palantir|Forward Deployed|<img\b/.test(html), route + ": obsolete content removed");
}
assert.equal(await read("robots.txt"), renderRobots(), "crawler policy unchanged");
const sitemap = await read("sitemap.xml");
for (const url of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  assert(indexablePaths.has(new URL(url[1]).pathname), "only authorised sitemap URLs");
}
assert.equal(indexablePaths.size, 0, "indexing remains subject to a separate decision");
const notFound = await read("404.html");
assert(notFound.includes('href="/en/"') && notFound.includes('href="/"'), "404 recovery");
assert(notFound.includes('src="/assets/brand/tricot-wordmark-600.webp"'), "404 uses the original logo");
assert(!/<form\b/.test(notFound), "404 has no collection");
const app = await read("app.js");
assert(!/localStorage|formEndpoint/.test(app), "no prototype capture");
const styles = await read("styles.css");
assert(!/url\([^)]*\.(?:png|jpe?g|webp)/i.test(styles), "no CSS images");
assert(styles.includes("prefers-reduced-motion"), "reduced motion");
console.log("Verified 2 active pages and 18 legacy redirects. Indexing remains disabled.");
