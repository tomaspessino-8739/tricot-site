export const origin = "https://untricot.com";

// Contact remains a preview until its mailbox is created and verified.
export const contact = { email: "info@tricot.com", active: false };

export const pages = {
  es: {
    lang: "es",
    output: "index.html",
    canonical: origin + "/",
    title: "TRICOT — Aplicaciones para empresas de alquiler turístico",
    description: "Tres aplicaciones conectadas para compartir propiedades con colaboradores, gestionar reservas y cuentas, y mantener informados a los propietarios.",
    ogLocale: "es_ES",
    homeUrl: "/",
    languageUrl: "/en/",
    otherLang: "en",
    languageLabel: "Read in English",
    skipLink: "Saltar al contenido",
    brandLabel: "TRICOT, inicio",
    menuLabel: "Menú",
    navLabel: "Navegación principal",
    navApplications: "Aplicaciones",
    navJourney: "Cómo se conectan",
    navImplementation: "Puesta en marcha",
    navContact: "Contacto",
    applicationsUrl: "#aplicaciones",
    journeyUrl: "#recorrido",
    implementationUrl: "#puesta-en-marcha",
    footerDescriptor: "Aplicaciones para empresas de alquiler turístico",
    backToTop: "Volver arriba ↑",
    contactLabel: "Correo en preparación",
    contactHint: "Pronto podrás escribirnos aquí."
  },
  en: {
    lang: "en",
    output: "en/index.html",
    canonical: origin + "/en/",
    title: "TRICOT — Applications for holiday rental businesses",
    description: "Three connected applications to share properties with partners, manage bookings and finances, and keep property owners informed.",
    ogLocale: "en_GB",
    homeUrl: "/en/",
    languageUrl: "/",
    otherLang: "es",
    languageLabel: "Leer en castellano",
    skipLink: "Skip to content",
    brandLabel: "TRICOT, home",
    menuLabel: "Menu",
    navLabel: "Primary navigation",
    navApplications: "Applications",
    navJourney: "How they connect",
    navImplementation: "Getting started",
    navContact: "Contact",
    applicationsUrl: "#applications",
    journeyUrl: "#journey",
    implementationUrl: "#getting-started",
    footerDescriptor: "Applications for holiday rental businesses",
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
