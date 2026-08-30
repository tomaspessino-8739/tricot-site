# TRICOT Site

Fuente tecnica canonica de la landing publica de TRICOT.

## Estado

- Sitio estatico.
- Datos de las demostraciones: sinteticos.
- Veinte paginas generadas en castellano e ingles desde un shell compartido.
- Verticales locales: Property Management, consultoria de automatizacion,
  software a medida, metodo y Agentes IA.
- Agentes IA permanece fuera de la navegacion comercial y sujeto a su gate de
  evidencia.
- Entidad institucional y recorrido de primera consulta completados en local.
- Hub de recursos y primera guia original de Property Management publicados en
  castellano e ingles, con aprendizaje operativo anonimizado y sin presentarlo
  como caso de cliente.
- Captacion: desactivada de forma explicita; no se recoge ni guarda el email.
- Indexacion: desactivada desde una politica central. Las paginas revisadas usan
  `noindex, follow`; Agentes IA conserva `noindex, nofollow`.
- Descubrimiento local: `robots.txt`, sitemap derivado de rutas autorizadas y
  pagina 404 bilingue.
- Rendimiento: T5 publicado con imágenes responsivas, wordmark optimizado y
  fuentes locales. La última traza móvil fría registró LCP 1,78 s y CLS 0.
- Estado publico: T0-T6 estan publicados. La indexacion y la captacion siguen
  bloqueadas por sus gates separados.

## Publicacion

GitHub Pages publica la rama `main` desde la raiz del repositorio.

Dominio canonico: `https://tricotconsulting.com`.

## Desarrollo local

No hay dependencias externas de proyecto. Se necesita Node.js para generar y
verificar las paginas:

```bash
npm run check
python3 -m http.server 4173
```

`npm run build` genera las dos portadas, nueve parejas de paginas interiores,
`robots.txt`, `sitemap.xml` y `404.html`. `npm run verify` comprueba canonical,
`hreflang`, H1, schema, unicidad, enlaces internos, politica de indexacion,
sitemap, robots, el aislamiento de Agentes IA y que no reaparezca la captacion
de prototipo.

La lista `indexablePaths` de `src/indexing-policy.mjs` esta vacia. Por eso el
sitemap no anuncia ninguna URL hasta que la indexacion se autorice por parejas
ES/EN.

El checkpoint anterior a T0/T1 esta documentado en `docs/BASELINE.md`.
