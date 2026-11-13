# TRICOT Site

Fuente tecnica canonica de [untricot.com](https://untricot.com/).
GitHub Pages publica la rama `main` desde la raiz del repositorio.

## Oferta vigente

TRICOT se presenta como consultora PropTech para gestoras de alquiler
vacacional. La oferta incluye software a medida, automatizaciones, agente
de WhatsApp y gestion operativa delegada de los procesos acordados.
El ejemplo de WhatsApp ilustra un flujo con revision humana, no una
integracion activa en la web ni una promesa de confirmacion autonoma.

Las tres herramientas propias se muestran como ejemplos de software:

1. Catalogo para colaboradores: propiedades, disponibilidad, precios, contenido y solicitudes.
2. Gestion de propiedades y reservas: contactos, documentos, calendario, reparto economico, cobros, pagos y exportacion para contabilidad.
3. Portal privado de propietarios: reservas, importes cobrados, parte correspondiente, pagos recibidos y pendientes.

TRICOT parte de como trabaja cada empresa. Puede adaptar herramientas
propias o conectar las del cliente. La empresa puede operar con su equipo
o delegar los procesos acordados. En ambos casos decide que requiere su
aprobacion y tiene acceso a su panel de control.
La carta de ventas presenta la oferta con la historia de una reserva.
Infinity 8 es el caso principal y los otros cuatro se pueden desplegar.
La consultoria generica, Palantir y Forward Deployed siguen fuera del recorrido.

## Estructura

- Dos paginas comerciales activas: castellano `/` e ingles `/en/`.
- Siete secciones: promesa, historia externa, ejemplo de WhatsApp, fundador,
  servicios con herramientas y casos, como trabajamos con preguntas frecuentes,
  y contacto con posdata.
- Dieciocho rutas anteriores llevan a la seccion equivalente de la portada.
  Son redirecciones estaticas con canonical, meta refresh y enlace de respaldo,
  no respuestas HTTP 301. JavaScript conserva los parametros de consulta.
- Una foto editorial existente y los tres iconos originales de aplicaciones:
  ave dorada para colaboradores, roja para reservas y azul para propietarios.
  Se conserva el logotipo original en cabecera y pie.
- Tipografia local: Cinzel para titulares y Montserrat para el resto del texto.
- Contacto provisional confirmado por el propietario: `info@tricot.com`.
  Buzon aun no creado: se muestra en preparacion, sin `mailto:`, formulario,
  recogida de datos ni simulacion de envio.
- Indexacion: politica anterior conservada; `indexablePaths` sigue vacio.

## Desarrollo

No hay dependencias externas de proyecto. Node.js genera y comprueba las paginas:

```sh
npm run check
python3 -m http.server 4181 --bind 127.0.0.1
```

`src/home.es.html` y `src/home.en.html` contienen el texto.
`src/layout.html` contiene la estructura compartida.
`src/site-data.mjs` define metadatos, contacto y rutas anteriores.
`scripts/build.mjs` genera HTML, rutas anteriores, robots, sitemap y 404.
`scripts/verify-site.mjs` verifica enlaces, idiomas, metadatos, datos
estructurados, orden y extension de la carta, logotipo original, identidad y
bytes de los tres iconos aprobados, foto editorial y estado del contacto.

La migracion de dominio permanece documentada en `docs/DOMAIN_MIGRATION.md`.
La version anterior y su rollback se documentan en `docs/CONTENT_SIMPLIFICATION.md`.
