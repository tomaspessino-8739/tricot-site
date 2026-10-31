# Simplificacion de la oferta — 2026-10-31

## Autorizacion y punto de partida

El propietario autorizo reformular toda la web, retirar lo ajeno a las tres
aplicaciones actuales, eliminar imagenes, revisar el resultado y publicar.
Baseline: `385e6f2` en `main`; dominio `https://untricot.com`, GitHub Pages.

## Decisiones de contenido

- Oferta dirigida a empresas de alquiler turistico, no consultoria tecnologica general.
- Tres aplicaciones: catalogo para colaboradores; gestion de propiedades y
  reservas; portal de propietarios.
- Distinguir empresa gestora, colaboradores comerciales y propietarios de inmuebles.
- Explicar calendario, contactos, documentos, reparto de importes, cobros,
  pagos y exportacion contable con palabras cotidianas.
- No prometer integracion universal: los canales se conectan segun el alcance.
- No atribuir rentabilidad garantizada, cumplimiento fiscal ni calculo de beneficio neto.
- Retirar historia Palantir, Forward Deployed, agentes IA, automatizaciones
  futuras, paginas metodologicas extensas y consultas con condiciones internas.
- Dos versiones equivalentes, castellano e ingles; menos de 400 palabras
  principales por idioma y cinco secciones.
- Cero imagenes renderizadas y sin placeholders, fotografias ni imagen social.
- El propietario confirma `info@tricot.com` como contacto provisional aunque el
  dominio de la web es `untricot.com`. El buzon no existe todavia; se muestra
  en preparacion y sin enlace de envio. No se habilita captacion.

## Continuidad

Las 18 URLs interiores anteriores conservan una salida a la seccion pertinente
de la portada. GitHub Pages no soporta reglas propias HTTP 301 en este flujo:
se usa meta refresh, canonical a la portada de su idioma, enlace visible y
`location.replace` con conservacion de query. No se afirma que estas rutas
devuelvan HTTP 301. La politica previa de indexacion permanece intacta.

Los generadores de paginas extensas que ya no se usan se retiran. Las versiones
anteriores son recuperables en Git. Los activos de imagen no se borran.

## Verificacion y publicacion

Ejecutar `npm run check`, `node --check app.js` y `git diff --check`.
Comprobar ambas versiones a 320, 390, 768 y 1440 px, el menu movil por teclado,
idiomas, 18 rutas anteriores y lectura sin JavaScript. Las capturas de QA se
generan fuera del checkout y fuera de Drive, sin datos privados.

Publicar solo el estado comprobado y esperar a que Pages confirme ese mismo
SHA. Comprobar por HTTPS el HTML de los dos idiomas, CSS y JS contra la fuente,
ademas de las rutas de salida anteriores.

Verificacion local ejecutada:

- `npm run check`, sintaxis de `app.js` y whitespace: PASS.
- 383 palabras principales ES y 388 EN, incluidas las etiquetas de contacto.
- Chrome real en headless a 320, 390, 768 y 1440 px, ambas versiones: PASS.
- Sin overflow horizontal, imagenes, texto oculto, errores de consola ni formularios.
- Cinzel y Montserrat cargadas; contenido visible tambien sin JavaScript.
- Menu movil: abrir, Escape con retorno de foco y cierre al seguir ancla: PASS.
- Cambio de idioma y 18 redirecciones con parametros y anclas: PASS.
- Salida por meta refresh sin JavaScript y enlaces de recuperacion 404: PASS.
- Capturas completas revisadas en escritorio y movil: PASS.

Rollback: revertir el commit de esta revision sobre `main` y esperar su nuevo
build de Pages. No cambiar dominio, DNS, proyecto de redireccion legado,
politica de indexacion ni infraestructura de correo durante este rollback.

## Restauracion del logotipo

El propietario aclara que debe conservarse el logotipo original aprobado.
Se restaura el activo `tricot-wordmark-600.webp` y su variante responsiva en
cabecera y pie de ambos idiomas, ademas de la pagina 404. Los archivos de
imagen son los mismos de la version anterior a la simplificacion, sin edicion.
La restriccion de fotografias y demos se limita al contenido. La comprobacion
automatica distingue estas imagenes de marca y exige el logotipo original.
