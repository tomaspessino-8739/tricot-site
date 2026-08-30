export const pages = {
  es: {
    lang: "es",
    output: "index.html",
    assetPrefix: "",
    canonical: "https://tricotconsulting.com/",
    title: "TRICOT — Software, automatización e IA para operaciones",
    description: "Ordenamos procesos, datos y decisiones; después construimos e implantamos el software, las automatizaciones y la IA que necesita la operación.",
    ogLocale: "es_ES",
    ogImageAlt: "Arquitectura mediterránea junto a una piscina, imagen editorial de TRICOT.",
    homeUrl: "/",
    languageUrl: "/en/",
    otherLang: "en",
    languageLabel: "EN",
    skipLink: "Saltar al contenido",
    brandLabel: "TRICOT, inicio",
    menuLabel: "Menú",
    navLabel: "Navegación principal",
    navOperation: "Operación",
    navSolutions: "Soluciones",
    navMethod: "Método",
    navOperationUrl: "/automatizacion-property-management/",
    navSolutionsUrl: "/consultoria-automatizacion/",
    navMethodUrl: "/metodo/",
    headerCta: "Primera consulta",
    headerCtaUrl: "/diagnostico-operativo/",
    footerDescriptor: "Software · Automatización · IA · Implantación",
    backToTop: "Volver arriba ↑"
  },
  en: {
    lang: "en",
    output: "en/index.html",
    assetPrefix: "../",
    canonical: "https://tricotconsulting.com/en/",
    title: "TRICOT — Software, automation and AI for operations",
    description: "We bring structure to processes, data and decisions, then build and implement the software, automation and AI the operation needs.",
    ogLocale: "en_US",
    ogImageAlt: "Mediterranean architecture beside a pool, an editorial image by TRICOT.",
    homeUrl: "/en/",
    languageUrl: "/",
    otherLang: "es",
    languageLabel: "ES",
    skipLink: "Skip to content",
    brandLabel: "TRICOT, home",
    menuLabel: "Menu",
    navLabel: "Primary navigation",
    navOperation: "Operations",
    navSolutions: "Solutions",
    navMethod: "Method",
    navOperationUrl: "/en/property-management-automation/",
    navSolutionsUrl: "/en/automation-consulting/",
    navMethodUrl: "/en/method/",
    headerCta: "Initial consultation",
    headerCtaUrl: "/en/initial-consultation/",
    footerDescriptor: "Software · Automation · AI · Implementation",
    backToTop: "Back to top ↑"
  }
};

export function entityGraph(page) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://tricotconsulting.com/#website",
        url: "https://tricotconsulting.com/",
        name: "TRICOT",
        inLanguage: ["es", "en"],
        publisher: { "@id": "https://tricotconsulting.com/#organization" }
      },
      {
        "@type": "Organization",
        "@id": "https://tricotconsulting.com/#organization",
        name: "TRICOT",
        url: "https://tricotconsulting.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://tricotconsulting.com/assets/brand/tricot-wordmark.png",
          width: 1200,
          height: 360
        },
        description: page.description
      },
      {
        "@type": "WebPage",
        "@id": `${page.canonical}#webpage`,
        url: page.canonical,
        name: page.title,
        description: page.description,
        inLanguage: page.lang,
        isPartOf: { "@id": "https://tricotconsulting.com/#website" },
        about: { "@id": "https://tricotconsulting.com/#organization" }
      }
    ]
  };
}
