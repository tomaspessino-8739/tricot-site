export const origin = "https://untricot.com";

// Set this when the email intake endpoint is ready to receive submissions.
export const contact = { endpoint: "https://tricot-contact.vercel.app/api/contact" };

export const pages = {
  es: {
    lang: "es",
    output: "index.html",
    canonical: origin + "/",
    title: "TRICOT — Gestión de reservas para gestoras de alquiler vacacional",
    description: "TRICOT se ocupa del seguimiento de reservas, documentos y cobros para gestoras de alquiler vacacional. Nuestra tecnología también se puede contratar por separado.",
    ogLocale: "es_ES",
    homeUrl: "/",
    languageUrl: "/en/",
    otherLang: "en",
    languageLabel: "Read in English",
    skipLink: "Saltar al contenido",
    brandLabel: "TRICOT, inicio",
    menuLabel: "Menú",
    navLabel: "Navegación principal",
    navServices: "Gestión",
    navCases: "Casos reales",
    navApplications: "Tecnología",
    navImplementation: "Cómo trabajamos",
    navContact: "Contacto",
    servicesUrl: "#servicios",
    casesUrl: "#casos",
    applicationsUrl: "#aplicaciones",
    implementationUrl: "#puesta-en-marcha",
    footerDescriptor: "Gestión de reservas para gestoras de alquiler vacacional",
    backToTop: "Volver arriba ↑",
    contactLabel: "Tu email",
    contactButton: "Quiero hablar",
    contactHint: "El envío se activará cuando conectemos el formulario.",
    contactPrivacy: "Usaremos tu email para responder a esta solicitud.",
    contactSent: "Hemos recibido tu email. Te escribiremos para ver por dónde empezar.",
    contactInvalid: "Revisa la dirección de email y vuelve a intentarlo.",
    contactError: "No se ha podido enviar. Inténtalo de nuevo en un momento."
  },
  en: {
    lang: "en",
    output: "en/index.html",
    canonical: origin + "/en/",
    title: "TRICOT — Booking operations for holiday rental managers",
    description: "TRICOT handles booking, paperwork and payment follow-up for holiday rental operators. Our technology is also available separately.",
    ogLocale: "en_GB",
    homeUrl: "/en/",
    languageUrl: "/",
    otherLang: "es",
    languageLabel: "Leer en castellano",
    skipLink: "Skip to content",
    brandLabel: "TRICOT, home",
    menuLabel: "Menu",
    navLabel: "Primary navigation",
    navServices: "Booking operations",
    navCases: "Case studies",
    navApplications: "Technology",
    navImplementation: "How we work",
    navContact: "Contact",
    servicesUrl: "#services",
    casesUrl: "#case-studies",
    applicationsUrl: "#applications",
    implementationUrl: "#getting-started",
    footerDescriptor: "Booking operations for holiday rental managers",
    backToTop: "Back to top ↑",
    contactLabel: "Your email",
    contactButton: "Let’s talk",
    contactHint: "You can send your email once the form is connected.",
    contactPrivacy: "We’ll use your email to respond to this enquiry.",
    contactSent: "We’ve received your email and will be in touch.",
    contactInvalid: "Check your email address and try again.",
    contactError: "We couldn’t send your request. Please try again in a moment."
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
