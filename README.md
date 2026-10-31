# TRICOT Site

Fuente tecnica canonica de [untricot.com](https://untricot.com/).
GitHub Pages publica la rama `main` desde la raiz del repositorio.

## Oferta vigente desde 2026-10-31

Tres aplicaciones para empresas de alquiler turistico:

1. Catalogo para colaboradores: propiedades, disponibilidad, precios, contenido y solicitudes.
2. Gestion de propiedades y reservas: contactos, documentos, calendario, reparto economico, cobros, pagos y exportacion para contabilidad.
3. Portal privado de propietarios: reservas, importes cobrados, parte correspondiente, pagos recibidos y pendientes.

TRICOT observa como trabaja cada empresa, adapta las aplicaciones con ella,
identifica tareas repetitivas que conviene automatizar y acompana al equipo.
El servicio incluye la incorporacion de un asistente de IA conectado a las
aplicaciones para consultas y acciones autorizadas. Se comunica como parte de
la implantacion acordada, no como una cuarta aplicacion lista para todo uso.
La portada comunica esta oferta en menos de 500 palabras por idioma.
La consultoria generica, Palantir y Forward Deployed siguen fuera del recorrido.

## Estructura

- Dos paginas comerciales activas: castellano `/` e ingles `/en/`.
- Cinco secciones: presentacion, aplicaciones, recorrido compartido, como trabajamos y contacto.
- Dieciocho rutas anteriores llevan a la seccion equivalente de la portada.
  Son redirecciones estaticas con canonical, meta refresh y enlace de respaldo,
  no respuestas HTTP 301. JavaScript conserva los parametros de consulta.
- Sin fotos, videos, capturas, demos, huecos de imagen ni imagen social heredada.
  El logotipo original aprobado se conserva en cabecera y pie, sin sustituirlo
  por texto. Se incorporan solo los tres iconos originales de aplicaciones
  autorizados: ave dorada para colaboradores, roja para reservas y azul para
  propietarios. No se editan ni se usan como identidad global de TRICOT.
- Tipografia local existente: Cinzel, Courier New y Montserrat.
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
estructurados, extension del contenido, logotipo original, identidad y bytes
de los tres iconos aprobados, ausencia de otras imagenes y estado del contacto.

La migracion de dominio permanece documentada en `docs/DOMAIN_MIGRATION.md`.
La revision actual y el rollback se documentan en `docs/CONTENT_SIMPLIFICATION.md`.
