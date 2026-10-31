import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { contact, legacyRoutes, origin, pages } from "../src/site-data.mjs";
import { indexablePaths, renderRobots, robotsDirective } from "../src/indexing-policy.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFile(resolve(root, path), "utf8");
const htmlByPath = new Map();
const titles = new Set();
const appIcons = [
  ["colaboradores", "ff191a66e8be3950a6dd1f77a8eff7c52b6de8180b3b7b3e52921d53158c320b"],
  ["reservas", "48a9937199b1305e5394ce915a1c6e7c7a5241df27d8da14ed9533fb1345fada"],
  ["propietarios", "53370029c4be287c8136eda0acb9643701cc19601ba806fc1dfc0149a3d1499f"]
];
for (const [name, hash] of appIcons) {
  const bytes = await readFile(resolve(root, "assets/brand/apps/" + name + ".png"));
  assert.equal(createHash("sha256").update(bytes).digest("hex"), hash, name + ": original approved bird icon");
}
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
  assert.equal((html.match(/<section\b/g) || []).length, 5, prefix + "concise structure");
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, prefix + "unique IDs");
  for (const match of html.matchAll(/(?:href="#|aria-labelledby="|aria-controls=")([^"]+)"/g)) {
    for (const id of match[1].split(" ")) assert(ids.includes(id), prefix + "target " + id);
  }
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  assert.equal(images.length, 5, prefix + "two brand logos and three app icons");
  assert.equal(images.filter((image) => image.includes('src="/assets/brand/tricot-wordmark-600.webp"') && image.includes('alt="TRICOT"')).length, 2, prefix + "original logo in header and footer");
  const mainHtml = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
  const applications = [...mainHtml.matchAll(/<article class="application"[^>]*>([\s\S]*?)<\/article>/g)].map((match) => match[1]);
  for (const [index, [name]] of appIcons.entries()) {
    const expectedIcon = 'src="/assets/brand/apps/' + name + '.png"';
    assert.equal((applications[index].match(/<img\b/g) || []).length, 1, prefix + name + ": one identity icon");
    assert(applications[index].includes(expectedIcon), prefix + name + ": correct app identity");
    const outcome = applications[index].match(/<p class="outcome">([^<]+)<\/p>/)?.[1];
    assert(outcome && outcome.endsWith(".") && (outcome.match(/[.!?]/g) || []).length === 1, prefix + name + ": one clear closing sentence");
  }
  assert.equal((mainHtml.match(/<img\b/g) || []).length, 3, prefix + "only the three authorised app icons in content");
  assert(!/<picture\b|<video\b|<svg\b/.test(mainHtml), prefix + "no other content media");
  assert(!/og:image|twitter:image/.test(html), prefix + "no inherited social image");
  assert(!/{{[A-Z_]+}}/.test(html), prefix + "rendered template");
  assert(!/<form\b|<input\b|<textarea\b|data-contact-form|localStorage/.test(html), prefix + "no inactive capture form");
  assert(!/Forward Deployed|Palantir|idempotencia|fallback|roadmap|gate crítico|\bPMS\b|\bleads\b/.test(html), prefix + "plain language");
  if (!contact.active) assert(!/href="mailto:/.test(html), prefix + "no unverified email action");
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert(graph["@graph"].some((item) => item["@type"] === "Organization"), prefix + "organization schema");
  assert(graph["@graph"].some((item) => item.url === page.canonical && item["@type"] === "WebPage"), prefix + "page schema");
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)(?:#[^"]*)?"/g)) {
    const target = match[1];
    if (target.endsWith("/")) assert(Object.values(pages).some((record) => new URL(record.canonical).pathname === target), prefix + "active internal route " + target);
    else await access(resolve(root, target.slice(1)));
  }
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1].replace(/<[^>]+>/g, " ");
  const words = main.trim().split(/\s+/).length;
  assert(words < 500, prefix + "content is too long: " + words);
  console.log(page.output + ": content, metadata, links and media verified (" + words + " words)");
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
console.log("Verified 2 active pages and 18 legacy redirects. No new collection or indexing enabled.");
