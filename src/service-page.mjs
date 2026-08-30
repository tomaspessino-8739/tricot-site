function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderItems(items, renderItem) {
  return items.map(renderItem).join("");
}

function renderHighlightedText(value, highlight) {
  if (!highlight || !value.includes(highlight)) return escapeHtml(value);
  const [before, ...after] = value.split(highlight);
  return `${escapeHtml(before)}<em>${escapeHtml(highlight)}</em>${escapeHtml(after.join(highlight))}`;
}

export function renderServicePage(page) {
  const gated = Boolean(page.evidenceNotice);
  const consultationUrl = gated ? "#contacto" : (page.lang === "es" ? "/diagnostico-operativo/" : "/en/initial-consultation/");
  const gatedTitle = page.lang === "es" ? "Esta capacidad todavía no está abierta a solicitudes." : "This capability is not open to requests yet.";
  const gatedButton = page.lang === "es" ? "Solicitud no disponible" : "Requests not available";
  const labels = page.lang === "es"
    ? {
        breadcrumbHome: "Inicio",
        synthetic: "Ejemplo conceptual",
        related: "Explorar páginas relacionadas",
        readiness: "Canal en preparación",
        unavailable: "Primero revisamos el contexto.",
        unavailableBody: "Consulta qué información pediremos, qué incluye la conversación y qué puede ocurrir después. El envío todavía no recoge datos.",
        unavailableButton: "Ver cómo funciona",
        noindex: "Esta página permanece fuera del índice durante implementación y revisión."
      }
    : {
        breadcrumbHome: "Home",
        synthetic: "Conceptual example",
        related: "Explore related pages",
        readiness: "Channel in preparation",
        unavailable: "We review the context first.",
        unavailableBody: "See what information we will request, what the conversation includes and what may happen next. Submission does not collect data yet.",
        unavailableButton: "See how it works",
        noindex: "This page remains outside the index during implementation and review."
      };

  const evidenceNotice = page.evidenceNotice
    ? `<aside class="evidence-notice" aria-label="${escapeHtml(page.evidenceNoticeLabel)}"><strong>${escapeHtml(page.evidenceNoticeLabel)}</strong><p>${escapeHtml(page.evidenceNotice)}</p></aside>`
    : "";

  return `
    <main id="contenido">
      <section class="hero service-hero" id="inicio" aria-labelledby="hero-title">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${page.homeUrl}">${labels.breadcrumbHome}</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(page.breadcrumb)}</span></nav>
        <div class="hero-grid">
          <div class="hero-copy reveal">
            <p class="kicker">${escapeHtml(page.kicker)}</p>
            <h1 id="hero-title">${renderHighlightedText(page.h1, page.h1Accent)}</h1>
            <p class="hero-lede">${escapeHtml(page.subtitle)}</p>
            <div class="hero-actions"><a class="button button-primary" href="${consultationUrl}">${escapeHtml(page.primaryCta)} <span aria-hidden="true">↗</span></a><a class="text-link" href="#respuesta">${escapeHtml(page.secondaryCta)} <span aria-hidden="true">↓</span></a></div>
          </div>
          <div class="service-hero-panel reveal" data-delay="1" role="group" aria-label="${escapeHtml(page.heroPanelLabel)}">
            ${renderItems(page.heroFacts, (fact, index) => `<div><span>0${index + 1}</span><strong>${escapeHtml(fact.title)}</strong><p>${escapeHtml(fact.text)}</p></div>`)}
          </div>
        </div>
      </section>

      <section class="story-section section-dark service-answer" id="respuesta" aria-labelledby="answer-title">
        <div class="story-copy reveal">
          <p class="kicker kicker-inverse">${escapeHtml(page.answerKicker)}</p>
          <h2 id="answer-title">${escapeHtml(page.answerTitle)}</h2>
          <div class="entity-answer"><p>${escapeHtml(page.directAnswer)}</p></div>
          ${evidenceNotice}
        </div>
      </section>

      <section class="reality-section" aria-labelledby="tension-title">
        <div class="section-heading reveal"><p class="kicker">${escapeHtml(page.tensionKicker)}</p><h2 id="tension-title">${escapeHtml(page.tensionTitle)}</h2></div>
        <div class="reality-grid"><div class="reality-lede reveal"><p>${escapeHtml(page.tensionLead)}</p><p><strong>${escapeHtml(page.tensionClose)}</strong></p></div><div class="friction-list reveal" data-delay="1">${renderItems(page.symptoms, (item, index) => `<p><span>0${index + 1}</span>${escapeHtml(item)}</p>`)}</div></div>
        <blockquote class="reality-quote reveal">${escapeHtml(page.quoteLead)} <em>${escapeHtml(page.quoteAccent)}</em></blockquote>
      </section>

      <section class="systems-section" id="decisiones" aria-labelledby="decision-title">
        <div class="section-heading section-heading-wide reveal"><div><p class="kicker">${escapeHtml(page.decisionKicker)}</p><h2 id="decision-title">${escapeHtml(page.decisionTitle)}</h2></div><p class="section-intro">${escapeHtml(page.decisionIntro)}</p></div>
        <div class="system-list">${renderItems(page.decisions, (item, index) => `<article class="system-row service-row reveal"><div class="system-copy"><span class="system-number">0${index + 1}</span><p class="eyebrow">${escapeHtml(item.eyebrow)}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p><p class="system-outcome">${escapeHtml(item.outcome)}</p></div><div class="product-demo decision-demo" tabindex="0"><div class="demo-bar"><span>${escapeHtml(labels.synthetic)}</span><span>${escapeHtml(item.demoLabel)}</span></div>${renderItems(item.points, (point) => `<div class="decision-point"><span aria-hidden="true">→</span><p>${escapeHtml(point)}</p></div>`)}</div></article>`)}</div>
      </section>

      <section class="method-section" id="metodo" aria-labelledby="method-title">
        <div class="section-heading reveal"><p class="kicker">${escapeHtml(page.processKicker)}</p><h2 id="method-title">${escapeHtml(page.processTitle)}</h2></div>
        <ol class="method-list">${renderItems(page.steps, (step, index) => `<li class="reveal"><span>0${index + 1}</span><div><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.text)}</p></div><small>${escapeHtml(step.gate)}</small></li>`)}</ol>
        <p class="method-close reveal">${escapeHtml(page.processClose)}</p>
      </section>

      <section class="agent-section" id="control" aria-labelledby="control-title">
        <div class="agent-layout"><div class="agent-intro reveal"><p class="kicker">${escapeHtml(page.controlKicker)}</p><h2 id="control-title">${escapeHtml(page.controlTitle)}</h2><p>${escapeHtml(page.controlIntro)}</p></div><div class="agent-commands reveal" data-delay="1" role="group" aria-label="${escapeHtml(page.controlLabel)}">${renderItems(page.controls, (item, index) => `<article><span>0${index + 1}</span><p>${escapeHtml(item)}</p></article>`)}</div></div>
        <p class="agent-close reveal">${escapeHtml(page.controlCloseLead)} <em>${escapeHtml(page.controlCloseAccent)}</em></p>
      </section>

      <section class="benefits-section" aria-labelledby="faq-title">
        <div class="section-heading section-heading-wide reveal"><div><p class="kicker">FAQ</p><h2 id="faq-title">${escapeHtml(page.faqTitle)}</h2></div><p class="section-intro">${escapeHtml(page.faqIntro)}</p></div>
        <div class="faq-list">${renderItems(page.faqs, (item) => `<details><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`)}</div>
        <nav class="related-links" aria-label="${escapeHtml(labels.related)}"><p>${escapeHtml(labels.related)}</p>${renderItems(page.related, (item) => `<a href="${item.url}">${escapeHtml(item.label)} <span aria-hidden="true">↗</span></a>`)}</nav>
      </section>

      <section class="contact-section" id="contacto" aria-labelledby="contact-title">
        <div class="contact-intro reveal"><p class="kicker kicker-inverse">${escapeHtml(page.contactKicker)}</p><h2 id="contact-title">${escapeHtml(page.contactTitle)}</h2><p>${escapeHtml(page.contactText)}</p></div>
        ${gated ? `<div class="contact-form readiness-panel reveal" data-delay="1" role="status"><p class="readiness-label">${escapeHtml(page.evidenceNoticeLabel)}</p><h3>${escapeHtml(gatedTitle)}</h3><p>${escapeHtml(page.evidenceNotice)}</p><span class="contact-submit is-disabled" aria-disabled="true">${escapeHtml(gatedButton)}</span><p class="privacy-note">${escapeHtml(labels.noindex)}</p></div>` : `<div class="contact-form readiness-panel reveal" data-delay="1"><p class="readiness-label">${escapeHtml(labels.readiness)}</p><h3>${escapeHtml(labels.unavailable)}</h3><p>${escapeHtml(labels.unavailableBody)}</p><a class="contact-submit" href="${consultationUrl}">${escapeHtml(labels.unavailableButton)} <span aria-hidden="true">↗</span></a><p class="privacy-note">${escapeHtml(labels.noindex)}</p></div>`}
      </section>
    </main>`;
}
