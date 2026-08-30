const esArticleUrl = "/recursos/conectar-reservas-operacion-reporting/";
const enArticleUrl = "/en/resources/connect-reservations-operations-reporting/";

const hubEs = {
  kind: "hub",
  lang: "es",
  output: "recursos/index.html",
  assetPrefix: "../",
  canonical: "https://tricotconsulting.com/recursos/",
  languageUrl: "/en/resources/",
  homeUrl: "/",
  title: "Recursos sobre operaciones, software y automatización — TRICOT",
  description: "Guías prácticas de TRICOT para ordenar operaciones, conectar sistemas y automatizar con fuentes, responsables y límites claros.",
  breadcrumb: "Recursos",
  kicker: "Recursos · Operaciones · Property Management",
  h1: "La automatización empieza mucho antes de pulsar «conectar».",
  subtitle: "Guías para entender qué dato manda, qué estado cambia y quién responde cuando la operación no sigue el camino feliz.",
  answer: "Los recursos de TRICOT convierten problemas operativos recurrentes en modelos de decisión, contratos de datos y secuencias de implantación. No son recetas universales ni catálogos de herramientas.",
  principles: [
    { title: "Fuente", text: "Cada dato crítico necesita una autoridad identificable." },
    { title: "Estado", text: "Reserva, tarea, cobro y documento no significan lo mismo." },
    { title: "Responsable", text: "Toda excepción necesita una persona y una siguiente acción." }
  ],
  featured: {
    eyebrow: "Guía 01 · Property Management",
    title: "Tu PMS sabe que hay una reserva. La operación necesita saber qué ocurre después.",
    text: "Cómo conectar reservas, tareas, limpieza, cobros y reporting sin mezclar estados ni sustituir herramientas por reflejo.",
    url: esArticleUrl,
    cta: "Leer la guía"
  },
  note: "Contenido basado en patrones operativos anonimizados. No describe un cliente, una herramienta concreta ni resultados comerciales.",
  contactKicker: "Diagnóstico operativo",
  contactTitle: "Una guía puede aclarar el problema. Tu operación decide la solución.",
  contactText: "Si reconoces este patrón en tu negocio, la primera consulta sirve para revisar el contexto y decidir si existe encaje.",
  contactButton: "Ver primera consulta",
  contactUrl: "/diagnostico-operativo/"
};

const hubEn = {
  ...hubEs,
  lang: "en",
  output: "en/resources/index.html",
  assetPrefix: "../../",
  canonical: "https://tricotconsulting.com/en/resources/",
  languageUrl: "/recursos/",
  homeUrl: "/en/",
  title: "Operations, software and automation resources — TRICOT",
  description: "Practical TRICOT guides for structuring operations, connecting systems and automating with clear sources, owners and boundaries.",
  breadcrumb: "Resources",
  kicker: "Resources · Operations · Property Management",
  h1: "Automation starts long before you click ‘connect’.",
  subtitle: "Guides for deciding which data source is authoritative, which state has changed and who responds when the operation leaves the happy path.",
  answer: "TRICOT resources turn recurring operational problems into decision models, data contracts and implementation sequences. They are not universal recipes or tool catalogues.",
  principles: [
    { title: "Source", text: "Every critical data point needs an identifiable authority." },
    { title: "State", text: "A booking, task, payment and document are not the same thing." },
    { title: "Owner", text: "Every exception needs a person and a next action." }
  ],
  featured: {
    eyebrow: "Guide 01 · Property Management",
    title: "Your PMS knows there is a booking. Operations need to know what happens next.",
    text: "How to connect bookings, tasks, cleaning, payments and reporting without merging unrelated states or replacing tools by reflex.",
    url: enArticleUrl,
    cta: "Read the guide"
  },
  note: "Content based on anonymised operational patterns. It does not describe a client, a specific tool or commercial outcomes.",
  contactKicker: "Operational assessment",
  contactTitle: "A guide can clarify the problem. Your operation determines the solution.",
  contactText: "If you recognise this pattern in your business, the initial consultation is used to review the context and determine fit.",
  contactButton: "See the initial consultation",
  contactUrl: "/en/initial-consultation/"
};

const articleEs = {
  kind: "article",
  lang: "es",
  output: "recursos/conectar-reservas-operacion-reporting/index.html",
  assetPrefix: "../../",
  canonical: `https://tricotconsulting.com${esArticleUrl}`,
  languageUrl: enArticleUrl,
  homeUrl: "/",
  hubUrl: "/recursos/",
  title: "Cómo conectar reservas, operación y reporting — TRICOT",
  description: "Arquitectura práctica para conectar PMS, reservas, tareas, limpieza, cobros y reporting sin mezclar estados ni perder trazabilidad.",
  breadcrumb: "Conectar reservas y operación",
  kicker: "Guía 01 · Property Management · Arquitectura operativa",
  h1: "Tu PMS sabe que hay una reserva. La operación necesita saber qué ocurre después.",
  subtitle: "Una arquitectura práctica para conectar reservas, tareas, limpieza, cobros y reporting sin convertir una sola herramienta en juez de todo.",
  readingTime: "12 min de lectura",
  updatedLabel: "Actualizado el 30 de agosto de 2026",
  answerTitle: "No necesitas empezar sustituyendo el PMS.",
  answer: "Necesitas definir qué sistema manda en cada dato, separar los estados que hoy se confunden y decidir qué debe ocurrir cuando una reserva cambia. Después puedes conectar las capas y automatizar únicamente los pasos que tengan una fuente fiable, una regla explícita y un responsable para las excepciones.",
  answerNote: "Esta guía presenta un método general construido a partir de patrones operativos anonimizados. No describe una implantación concreta ni sustituye asesoramiento contable, fiscal o legal.",
  tocLabel: "En esta guía",
  toc: [
    { label: "El problema real", url: "#problema" },
    { label: "Las cinco capas", url: "#capas" },
    { label: "Los estados", url: "#estados" },
    { label: "El evento", url: "#evento" },
    { label: "El contrato mínimo", url: "#contrato" },
    { label: "La implantación", url: "#implantacion" }
  ],
  sections: [
    {
      id: "problema", number: "01", title: "El problema no suele ser la falta de software. Es que cada herramienta responde una pregunta distinta.",
      paragraphs: [
        "El canal confirma que existe una reserva. El calendario refleja ocupación. La persona de operaciones necesita saber si puede preparar la entrada. Finanzas necesita distinguir lo previsto de lo recibido. El propietario necesita una salida comprensible y aprobada.",
        "Cuando estas respuestas se guardan en el mismo campo, el sistema parece sencillo hasta que aparece una modificación, un cobro parcial, una incidencia o una salida fuera de horario. Entonces una actualización correcta para un equipo puede ser incorrecta para otro."
      ],
      callout: "Centralizar no significa obligar a una herramienta a ser la fuente de todo. Significa que cada dato tiene una autoridad y que las conexiones respetan ese contrato."
    },
    {
      id: "capas", number: "02", title: "Cinco capas. Cinco responsabilidades que conviene no mezclar.",
      intro: "La herramienta concreta puede cambiar. La separación de responsabilidades debería sobrevivir al cambio.",
      layers: [
        { title: "Canales y PMS", text: "Originan o consolidan reservas, fechas, disponibilidad y referencias externas. Son la autoridad solo para los datos que realmente controlan." },
        { title: "Operación", text: "Convierte una reserva en trabajo: preparación, limpieza, check-in, mantenimiento, incidencias, responsables y plazos." },
        { title: "Datos y documentos", text: "Conserva fichas canónicas, permisos, versiones y documentos controlados sin exponerlos en salidas públicas." },
        { title: "Finanzas", text: "Separa importes previstos, obligaciones, cobros confirmados, ajustes y liquidaciones. Una fecha de llegada no prueba un cobro." },
        { title: "Salidas", text: "Genera reporting interno, vistas para propietarios y datos públicos desde información validada y con el nivel de detalle adecuado." }
      ]
    },
    {
      id: "estados", number: "03", title: "Una reserva no tiene un estado. Tiene varias familias de estados.",
      intro: "Separarlas evita que un «confirmado» termine significando cinco cosas diferentes.",
      stateRows: [
        { state: "Reserva", question: "¿Existe, cambió o se canceló?", examples: "consulta · opción · confirmada · modificada · cancelada" },
        { state: "Operación", question: "¿Qué trabajo está preparado o bloqueado?", examples: "pendiente · asignado · en curso · completado · incidencia" },
        { state: "Cobro", question: "¿Qué se esperaba y qué tiene evidencia?", examples: "previsto · vencido · recibido · conciliado · ajustado" },
        { state: "Documento", question: "¿Qué soporte existe y está aprobado?", examples: "solicitado · recibido · revisado · rechazado · archivado" },
        { state: "Excepción", question: "¿Qué impide seguir el flujo normal?", examples: "abierta · asignada · resuelta · escalada" }
      ],
      callout: "Un cambio de reserva puede crear trabajo operativo sin crear todavía un movimiento financiero. Esa diferencia debe existir en el modelo, no solo en la cabeza del equipo."
    },
    {
      id: "evento", number: "04", title: "Diseña el evento completo antes de automatizar el primer paso.",
      intro: "Ejemplo: cambia la fecha de salida de una reserva ya confirmada.",
      steps: [
        "El sistema autorizado recibe el cambio y conserva la referencia y la versión del origen.",
        "La reserva canónica se actualiza sin sobrescribir el historial anterior.",
        "La capa operativa recalcula limpieza, acceso, tareas y posibles conflictos.",
        "Las personas afectadas reciben una acción concreta, no una notificación genérica.",
        "Finanzas reevalúa lo previsto, pero no registra un cobro sin evidencia autorizada.",
        "El reporting se actualiza solo con los campos validados para cada audiencia.",
        "Si una conexión falla, el evento queda visible, reintentable y con responsable."
      ],
      callout: "La automatización útil no es «cuando pase A, manda un mensaje». Es un cambio de estado trazable, con idempotencia, excepción y forma de volver atrás."
    },
    {
      id: "contrato", number: "05", title: "El contrato mínimo de datos cabe en una página. La ambigüedad cuesta mucho más.",
      intro: "Antes de integrar, acuerda al menos estos campos y quién puede modificarlos.",
      fields: [
        { field: "Identificador de reserva", purpose: "Reconocer el mismo evento entre sistemas sin emparejar solo por fecha o importe." },
        { field: "Identificador de propiedad", purpose: "Evitar nombres libres y mantener permisos, tareas y reporting en la entidad correcta." },
        { field: "Entrada y salida", purpose: "Activar planificación operativa desde fechas con fuente y zona horaria definidas." },
        { field: "Fuente y versión", purpose: "Saber de dónde viene el dato, cuándo cambió y qué sistema tiene autoridad." },
        { field: "Estados separados", purpose: "Representar reserva, operación, cobro, documento y excepción sin falsos cierres." },
        { field: "Responsable y siguiente acción", purpose: "Convertir cada excepción en trabajo asignable y verificable." },
        { field: "Última actualización", purpose: "Detectar datos obsoletos, reintentos y conflictos de sincronización." }
      ]
    },
    {
      id: "implantacion", number: "06", title: "Pilota un ciclo completo. No una pantalla bonita.",
      intro: "Una implantación pequeña tiene valor cuando atraviesa el trabajo real de principio a fin.",
      steps: [
        "Mapea fuentes, decisiones, responsables y excepciones del flujo actual.",
        "Asigna una autoridad a cada dato crítico y documenta qué ocurre si dos fuentes discrepan.",
        "Define estados y criterios de transición antes de construir automatizaciones.",
        "Elige una o dos propiedades y cubre reserva, cambio, entrada, salida, tarea, incidencia y salida de información.",
        "Reconcilia el resultado contra las fuentes originales y revisa permisos, historial, exportación y reversión.",
        "Automatiza progresivamente lo estable; mantén revisión humana donde la evidencia o el impacto lo exijan.",
        "Mide tiempo de ciclo, excepciones, correcciones manuales, adopción y calidad del dato."
      ],
      callout: "Una demo valida que la interfaz puede representar una idea. Un piloto valida que la operación puede completar un ciclo y explicar cualquier diferencia."
    }
  ],
  decisionTitle: "¿Conectar o sustituir el PMS?",
  decisionIntro: "Conectar suele ser la primera opción cuando el PMS conserva bien la reserva y permite exportar o integrar los datos necesarios.",
  decisionRows: [
    { label: "Conectar", text: "Si el sistema actual es autoridad fiable para reservas y disponibilidad, y sus límites pueden cubrirse en otras capas." },
    { label: "Configurar", text: "Si la capacidad existe, pero faltan estados, permisos, reglas o una implantación coherente." },
    { label: "Construir", text: "Si existe un vacío operativo específico que ninguna herramienta cubre de forma responsable." },
    { label: "Sustituir", text: "Si los límites afectan funciones críticas, propiedad del dato, portabilidad, permisos o continuidad del negocio." }
  ],
  faqTitle: "Preguntas antes de conectar nada",
  faqs: [
    { question: "¿Necesito sustituir mi PMS para automatizar la operación?", answer: "No necesariamente. Si el PMS conserva de forma fiable reservas y disponibilidad, puede seguir siendo la fuente de esos datos mientras otras capas gestionan tareas, documentos, finanzas o reporting." },
    { question: "¿Un calendario iCal es suficiente?", answer: "Suele ser útil para ocupación y coordinación básica, pero no contiene por sí solo todos los estados operativos, financieros, documentales ni el historial necesario para gobernar la operación." },
    { question: "¿Puedo automatizar la limpieza a partir de cada reserva?", answer: "Sí, cuando están definidos la fuente de fechas, las reglas de cambio y cancelación, los responsables, los conflictos y el tratamiento de fallos. La tarea debe seguir siendo visible y verificable." },
    { question: "¿Los cobros deberían vivir en la misma herramienta que las reservas?", answer: "Pueden visualizarse juntos, pero sus estados y evidencias deben mantenerse separados. Una reserva confirmada, una obligación de pago y un cobro conciliado son hechos distintos." },
    { question: "¿Qué debería ver un propietario?", answer: "Solo información validada para esa audiencia: datos de reserva sanitizados, importes y fechas aprobados, estados comprensibles y fecha de actualización. No contactos privados, documentos internos, referencias bancarias ni notas operativas." }
  ],
  relatedLabel: "Seguir explorando",
  related: [
    { label: "Property Management", url: "/automatizacion-property-management/" },
    { label: "Método", url: "/metodo/" },
    { label: "Todos los recursos", url: "/recursos/" }
  ],
  contactKicker: "Llevarlo a tu operación",
  contactTitle: "Si todo depende de que alguien recuerde el siguiente paso, ya tienes el primer síntoma.",
  contactText: "La primera consulta sirve para entender el flujo actual, localizar el punto de fricción y decidir si conviene conectar, configurar, construir o no tocar todavía.",
  contactButton: "Ver primera consulta",
  contactUrl: "/diagnostico-operativo/"
};

const articleEn = {
  ...articleEs,
  lang: "en", output: "en/resources/connect-reservations-operations-reporting/index.html", assetPrefix: "../../../",
  canonical: `https://tricotconsulting.com${enArticleUrl}`, languageUrl: esArticleUrl, homeUrl: "/en/", hubUrl: "/en/resources/",
  title: "How to connect bookings, operations and reporting — TRICOT",
  description: "A practical architecture for connecting PMS data, bookings, tasks, cleaning, payments and reporting without merging states or losing traceability.",
  breadcrumb: "Connect bookings and operations", kicker: "Guide 01 · Property Management · Operational architecture",
  h1: "Your PMS knows there is a booking. Operations need to know what happens next.",
  subtitle: "A practical architecture for connecting bookings, tasks, cleaning, payments and reporting without making one tool the judge of everything.",
  readingTime: "12 min read", updatedLabel: "Updated 30 August 2026",
  answerTitle: "You do not need to start by replacing the PMS.",
  answer: "You need to decide which system is authoritative for each data point, separate the states that are currently being merged and define what should happen when a booking changes. Then you can connect the layers and automate only the steps with a reliable source, an explicit rule and an owner for exceptions.",
  answerNote: "This guide presents a general method built from anonymised operational patterns. It does not describe a specific implementation or replace accounting, tax or legal advice.",
  tocLabel: "In this guide",
  toc: [{ label: "The real problem", url: "#problem" }, { label: "The five layers", url: "#layers" }, { label: "The states", url: "#states" }, { label: "The event", url: "#event" }, { label: "The minimum contract", url: "#contract" }, { label: "Implementation", url: "#implementation" }],
  sections: [
    { id: "problem", number: "01", title: "The problem is rarely a lack of software. Each tool answers a different question.", paragraphs: ["The channel confirms that a booking exists. The calendar shows occupancy. Operations need to know whether the arrival can be prepared. Finance needs to distinguish expected money from received money. The owner needs a clear, approved output.", "When those answers are stored in the same field, the system appears simple until a modification, partial payment, incident or late departure occurs. An update that is correct for one team can then be wrong for another."], callout: "Centralising does not mean forcing one tool to be the source of everything. It means every data point has an authority and the connections respect that contract." },
    { id: "layers", number: "02", title: "Five layers. Five responsibilities that should not be merged.", intro: "The specific tool may change. The separation of responsibilities should survive that change.", layers: [
      { title: "Channels and PMS", text: "Originate or consolidate bookings, dates, availability and external references. They are authoritative only for the data they actually control." },
      { title: "Operations", text: "Turns a booking into work: preparation, cleaning, check-in, maintenance, incidents, owners and deadlines." },
      { title: "Data and documents", text: "Keeps canonical records, permissions, versions and controlled documents away from public outputs." },
      { title: "Finance", text: "Separates expected amounts, obligations, confirmed receipts, adjustments and settlements. An arrival date is not proof of payment." },
      { title: "Outputs", text: "Creates internal reporting, owner views and public data from validated information at the right level of detail." }
    ]},
    { id: "states", number: "03", title: "A booking does not have one status. It has several families of states.", intro: "Separating them prevents ‘confirmed’ from ending up with five different meanings.", stateRows: [
      { state: "Booking", question: "Does it exist, did it change or was it cancelled?", examples: "enquiry · option · confirmed · modified · cancelled" },
      { state: "Operations", question: "Which work is ready or blocked?", examples: "pending · assigned · in progress · completed · incident" },
      { state: "Payment", question: "What was expected and what has evidence?", examples: "expected · due · received · reconciled · adjusted" },
      { state: "Document", question: "Which evidence exists and is approved?", examples: "requested · received · reviewed · rejected · archived" },
      { state: "Exception", question: "What prevents the normal flow?", examples: "open · assigned · resolved · escalated" }
    ], callout: "A booking change can create operational work without creating a financial movement yet. That difference must exist in the model, not only in the team's memory." },
    { id: "event", number: "04", title: "Design the whole event before automating the first step.", intro: "Example: the departure date changes on a confirmed booking.", steps: ["The authorised system receives the change and preserves the source reference and version.", "The canonical booking is updated without overwriting its previous history.", "The operational layer recalculates cleaning, access, tasks and possible conflicts.", "Affected people receive a concrete action, not a generic notification.", "Finance reassesses what is expected but records no payment without authorised evidence.", "Reporting updates only fields validated for each audience.", "If a connection fails, the event remains visible, retryable and owned."], callout: "Useful automation is not ‘when A happens, send a message’. It is a traceable state change with idempotency, an exception path and a way back." },
    { id: "contract", number: "05", title: "The minimum data contract fits on one page. Ambiguity costs far more.", intro: "Before integrating, agree at least these fields and who can modify them.", fields: [
      { field: "Booking identifier", purpose: "Recognise the same event across systems without matching only by date or amount." },
      { field: "Property identifier", purpose: "Avoid free-form names and keep permissions, tasks and reporting attached to the correct entity." },
      { field: "Arrival and departure", purpose: "Trigger planning from dates with a defined source and timezone." },
      { field: "Source and version", purpose: "Know where the data came from, when it changed and which system is authoritative." },
      { field: "Separate states", purpose: "Represent booking, operations, payment, document and exception without false closure." },
      { field: "Owner and next action", purpose: "Turn every exception into assignable, verifiable work." },
      { field: "Last updated", purpose: "Detect stale data, retries and synchronisation conflicts." }
    ]},
    { id: "implementation", number: "06", title: "Pilot a complete cycle. Not a polished screen.", intro: "A small implementation is valuable when it crosses real work from beginning to end.", steps: ["Map sources, decisions, owners and exceptions in the current flow.", "Assign an authority to every critical data point and document what happens when sources disagree.", "Define states and transition criteria before building automation.", "Choose one or two properties and cover booking, change, arrival, departure, task, incident and output.", "Reconcile the result against original sources and review permissions, history, export and rollback.", "Progressively automate what is stable; retain human review where evidence or impact requires it.", "Measure cycle time, exceptions, manual corrections, adoption and data quality."], callout: "A demo validates that an interface can represent an idea. A pilot validates that the operation can complete a cycle and explain every difference." }
  ],
  decisionTitle: "Connect or replace the PMS?", decisionIntro: "Connecting is usually the first option when the PMS reliably holds the booking and can export or integrate the necessary data.",
  decisionRows: [{ label: "Connect", text: "When the current system is a reliable authority for bookings and availability, and its limits can be covered in other layers." }, { label: "Configure", text: "When the capability exists but states, permissions, rules or coherent implementation are missing." }, { label: "Build", text: "When a specific operational gap cannot be covered responsibly by an existing tool." }, { label: "Replace", text: "When limitations affect critical functions, data ownership, portability, permissions or business continuity." }],
  faqTitle: "Questions to ask before connecting anything", faqs: [
    { question: "Do I need to replace my PMS to automate operations?", answer: "Not necessarily. If the PMS reliably holds bookings and availability, it can remain the source for that data while other layers manage tasks, documents, finance or reporting." },
    { question: "Is an iCal calendar enough?", answer: "It is often useful for occupancy and basic coordination, but it does not contain every operational, financial or document state, nor the history needed to govern the operation." },
    { question: "Can cleaning be automated from each booking?", answer: "Yes, once the date source, change and cancellation rules, owners, conflicts and failure handling are defined. The task must remain visible and verifiable." },
    { question: "Should payments live in the same tool as bookings?", answer: "They can be displayed together, but their states and evidence should remain separate. A confirmed booking, a payment obligation and a reconciled receipt are different facts." },
    { question: "What should an owner see?", answer: "Only information validated for that audience: sanitised booking data, approved dates and amounts, understandable states and the last update date. Not private contacts, internal documents, bank references or operational notes." }
  ],
  relatedLabel: "Keep exploring", related: [{ label: "Property Management", url: "/en/property-management-automation/" }, { label: "Method", url: "/en/method/" }, { label: "All resources", url: "/en/resources/" }],
  contactKicker: "Apply it to your operation", contactTitle: "If everything depends on someone remembering the next step, you already have the first symptom.",
  contactText: "The initial consultation is used to understand the current flow, locate the friction and decide whether to connect, configure, build or leave it alone for now.", contactButton: "See the initial consultation", contactUrl: "/en/initial-consultation/"
};

export const resourcePages = [hubEs, hubEn, articleEs, articleEn];
