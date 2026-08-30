function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderContact(page) {
  return `<section class="contact-section" id="contacto" aria-labelledby="contact-title">
    <div class="contact-intro reveal"><p class="kicker kicker-inverse">${escapeHtml(page.contactKicker)}</p><h2 id="contact-title">${escapeHtml(page.contactTitle)}</h2><p>${escapeHtml(page.contactText)}</p></div>
    <div class="contact-form readiness-panel reveal" data-delay="1"><p class="readiness-label">TRICOT</p><a class="contact-submit" href="${page.contactUrl}">${escapeHtml(page.contactButton)} <span aria-hidden="true">↗</span></a><p class="privacy-note">${page.lang === "es" ? "La captación permanece desactivada durante la revisión." : "Lead capture remains disabled during review."}</p></div>
  </section>`;
}

function renderHub(page) {
  const homeLabel = page.lang === "es" ? "Inicio" : "Home";
  return `<main id="contenido">
    <section class="hero service-hero resource-hub-hero" id="inicio" aria-labelledby="hero-title">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${page.homeUrl}">${homeLabel}</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(page.breadcrumb)}</span></nav>
      <div class="hero-grid"><div class="hero-copy reveal"><p class="kicker">${escapeHtml(page.kicker)}</p><h1 id="hero-title">${escapeHtml(page.h1)}</h1><p class="hero-lede">${escapeHtml(page.subtitle)}</p></div>
      <div class="resource-principles reveal" data-delay="1">${page.principles.map((item, index) => `<div><span>0${index + 1}</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></div>`).join("")}</div></div>
    </section>
    <section class="story-section section-dark resource-answer" aria-labelledby="resource-answer-title"><div class="story-copy reveal"><p class="kicker kicker-inverse">${page.lang === "es" ? "Criterio editorial" : "Editorial criteria"}</p><h2 id="resource-answer-title">${escapeHtml(page.answer)}</h2><p class="source-note">${escapeHtml(page.note)}</p></div></section>
    <section class="resource-library" aria-labelledby="featured-title"><div class="section-heading section-heading-wide reveal"><div><p class="kicker">${page.lang === "es" ? "Biblioteca" : "Library"}</p><h2 id="featured-title">${page.lang === "es" ? "Empezamos por la operación que ocurre después de una reserva." : "We start with the operation that follows a booking."}</h2></div><p class="section-intro">${page.lang === "es" ? "Un recurso extenso, original y diseñado para resolver una pregunta concreta." : "One in-depth, original resource designed to answer a concrete question."}</p></div>
      <article class="resource-feature"><div><p class="eyebrow">${escapeHtml(page.featured.eyebrow)}</p><h3>${escapeHtml(page.featured.title)}</h3></div><div><p>${escapeHtml(page.featured.text)}</p><a class="button button-primary" href="${page.featured.url}">${escapeHtml(page.featured.cta)} <span aria-hidden="true">↗</span></a></div></article>
    </section>
    ${renderContact(page)}
  </main>`;
}

function renderArticleSection(section) {
  const body = [];
  if (section.intro) body.push(`<p class="resource-intro">${escapeHtml(section.intro)}</p>`);
  if (section.paragraphs) body.push(section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join(""));
  if (section.layers) body.push(`<div class="resource-layer-list">${section.layers.map((item, index) => `<article><span>0${index + 1}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("")}</div>`);
  if (section.stateRows) body.push(`<div class="resource-table-wrap"><table class="resource-table"><thead><tr><th>${section.id === "estados" ? "Familia" : "Family"}</th><th>${section.id === "estados" ? "Pregunta" : "Question"}</th><th>${section.id === "estados" ? "Ejemplos" : "Examples"}</th></tr></thead><tbody>${section.stateRows.map((row) => `<tr><th scope="row">${escapeHtml(row.state)}</th><td>${escapeHtml(row.question)}</td><td>${escapeHtml(row.examples)}</td></tr>`).join("")}</tbody></table></div>`);
  if (section.steps) body.push(`<ol class="resource-steps">${section.steps.map((step) => `<li><span>${escapeHtml(step)}</span></li>`).join("")}</ol>`);
  if (section.fields) body.push(`<dl class="resource-fields">${section.fields.map((item) => `<div><dt>${escapeHtml(item.field)}</dt><dd>${escapeHtml(item.purpose)}</dd></div>`).join("")}</dl>`);
  if (section.callout) body.push(`<blockquote>${escapeHtml(section.callout)}</blockquote>`);
  return `<section class="resource-article-section" id="${escapeHtml(section.id)}" aria-labelledby="${escapeHtml(section.id)}-title"><div class="resource-section-index"><span>${escapeHtml(section.number)}</span></div><div class="resource-section-body"><h2 id="${escapeHtml(section.id)}-title">${escapeHtml(section.title)}</h2>${body.join("")}</div></section>`;
}

function renderArticle(page) {
  const homeLabel = page.lang === "es" ? "Inicio" : "Home";
  const hubLabel = page.lang === "es" ? "Recursos" : "Resources";
  return `<main id="contenido">
    <article>
      <header class="hero service-hero resource-article-hero" id="inicio">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${page.homeUrl}">${homeLabel}</a><span aria-hidden="true">/</span><a href="${page.hubUrl}">${hubLabel}</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(page.breadcrumb)}</span></nav>
        <div class="resource-hero-copy reveal"><p class="kicker">${escapeHtml(page.kicker)}</p><h1 id="hero-title">${escapeHtml(page.h1)}</h1><p class="hero-lede">${escapeHtml(page.subtitle)}</p><p class="resource-meta"><span>${escapeHtml(page.readingTime)}</span><span>${escapeHtml(page.updatedLabel)}</span></p></div>
      </header>
      <section class="resource-direct-answer section-dark" aria-labelledby="direct-answer-title"><div><p class="kicker kicker-inverse">${page.lang === "es" ? "Respuesta directa" : "Direct answer"}</p><h2 id="direct-answer-title">${escapeHtml(page.answerTitle)}</h2><p>${escapeHtml(page.answer)}</p><aside>${escapeHtml(page.answerNote)}</aside></div>
      <nav class="resource-toc" aria-label="${escapeHtml(page.tocLabel)}"><p>${escapeHtml(page.tocLabel)}</p>${page.toc.map((item) => `<a href="${item.url}">${escapeHtml(item.label)} <span aria-hidden="true">↘</span></a>`).join("")}</nav></section>
      <div class="resource-article">${page.sections.map(renderArticleSection).join("")}</div>
      <section class="resource-decision section-dark" aria-labelledby="decision-title"><div class="section-heading section-heading-wide"><div><p class="kicker kicker-inverse">${page.lang === "es" ? "Decisión" : "Decision"}</p><h2 id="decision-title">${escapeHtml(page.decisionTitle)}</h2></div><p class="section-intro">${escapeHtml(page.decisionIntro)}</p></div><div class="resource-decision-grid">${page.decisionRows.map((item) => `<article><h3>${escapeHtml(item.label)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("")}</div></section>
      <section class="benefits-section" aria-labelledby="faq-title"><div class="section-heading section-heading-wide"><div><p class="kicker">FAQ</p><h2 id="faq-title">${escapeHtml(page.faqTitle)}</h2></div></div><div class="faq-list">${page.faqs.map((item) => `<details><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`).join("")}</div><nav class="related-links" aria-label="${escapeHtml(page.relatedLabel)}"><p>${escapeHtml(page.relatedLabel)}</p>${page.related.map((item) => `<a href="${item.url}">${escapeHtml(item.label)} <span aria-hidden="true">↗</span></a>`).join("")}</nav></section>
    </article>
    ${renderContact(page)}
  </main>`;
}

export function renderResourcePage(page) {
  return page.kind === "hub" ? renderHub(page) : renderArticle(page);
}
