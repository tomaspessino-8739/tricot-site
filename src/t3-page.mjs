function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderList(items) {
  return items.map((item, index) => `<article class="t3-card"><span>0${index + 1}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("");
}

function renderHighlightedText(value, highlight) {
  if (!highlight || !value.includes(highlight)) return escapeHtml(value);
  const [before, ...after] = value.split(highlight);
  return `${escapeHtml(before)}<em>${escapeHtml(highlight)}</em>${escapeHtml(after.join(highlight))}`;
}

export function renderT3Page(page) {
  const homeLabel = page.lang === "es" ? "Inicio" : "Home";
  const noindex = page.lang === "es"
    ? "Esta página permanece fuera del índice durante implementación y revisión."
    : "This page remains outside the index during implementation and review.";

  return `
    <main id="contenido">
      <section class="hero service-hero t3-hero" id="inicio" aria-labelledby="hero-title">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${page.homeUrl}">${homeLabel}</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(page.breadcrumb)}</span></nav>
        <div class="hero-grid">
          <div class="hero-copy reveal">
            <p class="kicker">${escapeHtml(page.kicker)}</p>
            <h1 id="hero-title">${renderHighlightedText(page.h1, page.h1Accent)}</h1>
            <p class="hero-lede">${escapeHtml(page.subtitle)}</p>
            <div class="hero-actions"><a class="button button-primary" href="${page.primaryUrl}">${escapeHtml(page.primaryCta)} <span aria-hidden="true">↗</span></a><a class="text-link" href="${page.secondaryUrl}">${escapeHtml(page.secondaryCta)}</a></div>
          </div>
          <div class="service-hero-panel reveal" data-delay="1" role="group" aria-label="${escapeHtml(page.heroPanelLabel)}">
            ${page.heroFacts.map((fact, index) => `<div><span>0${index + 1}</span><strong>${escapeHtml(fact.title)}</strong><p>${escapeHtml(fact.text)}</p></div>`).join("")}
          </div>
        </div>
      </section>

      <section class="story-section section-dark service-answer" id="respuesta" aria-labelledby="answer-title">
        <div class="story-copy reveal"><p class="kicker kicker-inverse">${escapeHtml(page.answerKicker)}</p><h2 id="answer-title">${escapeHtml(page.answerTitle)}</h2><div class="entity-answer"><p>${escapeHtml(page.directAnswer)}</p></div>${page.answerNote ? `<p class="source-note">${escapeHtml(page.answerNote)}</p>` : ""}</div>
      </section>

      ${page.sections.map((section) => `<section class="t3-section${section.dark ? " section-dark" : ""}" id="${escapeHtml(section.id)}" aria-labelledby="${escapeHtml(section.id)}-title"><div class="section-heading section-heading-wide reveal"><div><p class="kicker${section.dark ? " kicker-inverse" : ""}">${escapeHtml(section.kicker)}</p><h2 id="${escapeHtml(section.id)}-title">${escapeHtml(section.title)}</h2></div><p class="section-intro">${escapeHtml(section.intro)}</p></div><div class="t3-grid">${renderList(section.items)}</div>${section.close ? `<p class="t3-close reveal">${escapeHtml(section.close)}</p>` : ""}</section>`).join("")}

      <section class="benefits-section" aria-labelledby="faq-title">
        <div class="section-heading section-heading-wide reveal"><div><p class="kicker">FAQ</p><h2 id="faq-title">${escapeHtml(page.faqTitle)}</h2></div><p class="section-intro">${escapeHtml(page.faqIntro)}</p></div>
        <div class="faq-list">${page.faqs.map((item) => `<details><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`).join("")}</div>
        <nav class="related-links" aria-label="${escapeHtml(page.relatedLabel)}"><p>${escapeHtml(page.relatedLabel)}</p>${page.related.map((item) => `<a href="${item.url}">${escapeHtml(item.label)} <span aria-hidden="true">↗</span></a>`).join("")}</nav>
      </section>

      <section class="contact-section" id="contacto" aria-labelledby="contact-title">
        <div class="contact-intro reveal"><p class="kicker kicker-inverse">${escapeHtml(page.contactKicker)}</p><h2 id="contact-title">${escapeHtml(page.contactTitle)}</h2><p>${escapeHtml(page.contactText)}</p></div>
        ${page.contactMode === "disabled" ? `<div class="contact-form readiness-panel intake-preview reveal" data-delay="1" role="status"><p class="readiness-label">${escapeHtml(page.contactStatus)}</p><h3>${escapeHtml(page.contactPanelTitle)}</h3><div class="intake-fields">${page.intakeFields.map((field) => `<span>${escapeHtml(field)}</span>`).join("")}</div><span class="contact-submit is-disabled" aria-disabled="true">${escapeHtml(page.contactButton)}</span><p class="privacy-note">${escapeHtml(page.contactPrivacy)} ${escapeHtml(noindex)}</p></div>` : `<div class="contact-form readiness-panel reveal" data-delay="1"><p class="readiness-label">${escapeHtml(page.contactStatus)}</p><h3>${escapeHtml(page.contactPanelTitle)}</h3><p>${escapeHtml(page.contactPanelText)}</p><a class="contact-submit" href="${page.contactUrl}">${escapeHtml(page.contactButton)} <span aria-hidden="true">↗</span></a><p class="privacy-note">${escapeHtml(noindex)}</p></div>`}
      </section>
    </main>`;
}
