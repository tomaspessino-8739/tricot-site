export const origin = "https://untricot.com";

// Contact remains a preview until its mailbox is created and verified.
export const contact = { email: "info@tricot.com", active: false };

export const pages = {
  es: {
    lang: "es",
    output: "index.html",
    canonical: origin + "/",
    title: "TRICOT — Consultora PropTech para gestoras de alquiler vacacional",
    description: "Software a medida, automatizaciones y agentes de WhatsApp para gestoras de alquiler vacacional. También puedes delegar parte de tu operativa.",
    ogLocale: "es_ES",
    homeUrl: "/",
    languageUrl: "/en/",
    otherLang: "en",
    languageLabel: "Read in English",
    skipLink: "Saltar al contenido",
    brandLabel: "TRICOT, inicio",
    menuLabel: "Menú",
    navLabel: "Navegación principal",
    navServices: "Servicios",
    navCases: "Casos reales",
    navApplications: "Herramientas",
    navImplementation: "Cómo trabajamos",
    navContact: "Contacto",
    servicesUrl: "#servicios",
    casesUrl: "#casos",
    applicationsUrl: "#aplicaciones",
    implementationUrl: "#puesta-en-marcha",
    footerDescriptor: "Consultora PropTech para gestoras de alquiler vacacional",
    backToTop: "Volver arriba ↑",
    contactLabel: "Correo en preparación",
    contactHint: "Pronto podrás escribirnos aquí."
  },
  en: {
    lang: "en",
    output: "en/index.html",
    canonical: origin + "/en/",
    title: "TRICOT — PropTech consultancy for holiday rental operators",
    description: "Tailored software, workflow automation and WhatsApp agents for holiday rental operators, with the option to delegate back-office work.",
    ogLocale: "en_GB",
    homeUrl: "/en/",
    languageUrl: "/",
    otherLang: "es",
    languageLabel: "Leer en castellano",
    skipLink: "Skip to content",
    brandLabel: "TRICOT, home",
    menuLabel: "Menu",
    navLabel: "Primary navigation",
    navServices: "Services",
    navCases: "Case studies",
    navApplications: "Our tools",
    navImplementation: "How we work",
    navContact: "Contact",
    servicesUrl: "#services",
    casesUrl: "#case-studies",
    applicationsUrl: "#applications",
    implementationUrl: "#getting-started",
    footerDescriptor: "PropTech consultancy for holiday rental operators",
    backToTop: "Back to top ↑",
    contactLabel: "Email coming soon",
    contactHint: "You will be able to contact us here soon."
  }
};

export const legacyRoutes = [
  ["automatizacion-property-management", "/#aplicaciones"],
  ["consultoria-automatizacion", "/#aplicaciones"],
  ["software-a-medida", "/#aplicaciones"],
  ["metodo", "/#puesta-en-marcha"],
  ["agentes-ia-empresas", "/#aplicaciones"],
  ["tricot", "/"],
  ["diagnostico-operativo", "/#contacto"],
  ["recursos", "/#recorrido"],
  ["recursos/conectar-reservas-operacion-reporting", "/#recorrido"],
  ["en/property-management-automation", "/en/#applications"],
  ["en/automation-consulting", "/en/#applications"],
  ["en/custom-software", "/en/#applications"],
  ["en/method", "/en/#getting-started"],
  ["en/ai-agents-for-business", "/en/#applications"],
  ["en/tricot", "/en/"],
  ["en/initial-consultation", "/en/#contacto"],
  ["en/resources", "/en/#journey"],
  ["en/resources/connect-reservations-operations-reporting", "/en/#journey"]
];

export function entityGraph(page) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": origin + "/#website", url: origin + "/", name: "TRICOT", inLanguage: ["es", "en"], publisher: { "@id": origin + "/#organization" } },
      { "@type": "Organization", "@id": origin + "/#organization", name: "TRICOT", url: origin + "/", description: pages.es.description },
      { "@type": "WebPage", "@id": page.canonical + "#webpage", url: page.canonical, name: page.title, description: page.description, inLanguage: page.lang, isPartOf: { "@id": origin + "/#website" }, about: { "@id": origin + "/#organization" } }
    ]
  };
}
