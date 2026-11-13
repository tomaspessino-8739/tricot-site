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

## Iconos y servicio adaptado — revision posterior del 2026-10-31

El propietario autoriza incorporar las tres aves originales para distinguir
las aplicaciones, sin recuperar fotografias ni demos. Se usan los PNG
transparentes aprobados de 256 px, sin modificar sus bytes: dorado en catalogo,
rojo en gestion de propiedades y reservas, azul en portal de propietarios.
La verificacion exige cada icono en su articulo, ademas del logotipo original.

Cada aplicacion termina ahora con una sola frase, centrada respectivamente en
alcance comercial, control y confianza. Se retiran los dialogos humoristicos.

La seccion de implantacion explica la observacion del trabajo real, la
adaptacion conjunta, la automatizacion de tareas repetitivas y la incorporacion
de un asistente conectado a las aplicaciones. Este ultimo consulta y ejecuta
acciones autorizadas; no se promete control ilimitado, una integracion universal
ni que todas las funciones esten disponibles sin implantacion.

Se mantienen cinco secciones y menos de 500 palabras principales por idioma.
Esta decision actualiza el alcance anterior que retiraba toda mencion a IA y
automatizaciones. No cambia el contacto inactivo, la indexacion ni el hosting.
Baseline de esta revision: `2b97aaa9e2d2ede225678ce3feb4d68daf21433f`.
Rollback acotado: revertir el commit de esta revision, sin alterar otras areas.

QA de esta revision:

- Generacion, verificacion estatica, sintaxis de JS y whitespace: PASS.
- 440 palabras principales en castellano y 450 en ingles.
- Chrome a 320, 390, 768 y 1440 px en ambos idiomas: sin desbordamientos,
  con tipografias cargadas y sin errores de consola.
- Cinco imagenes cargadas: dos logotipos originales y tres iconos de app de
  80 x 80 px sin deformacion. Hashes de los PNG originales comprobados.
- Menu movil por teclado, Escape, retorno de foco y cierre al navegar: PASS.
- Lectura de aplicaciones y metodologia sin JavaScript: PASS.
- Sin formulario, enlace de correo activo ni cambios de indexacion.
- Capturas de escritorio y movil revisadas fuera de Drive y del repositorio.

## Posicionamiento PropTech

La nueva portada presenta a TRICOT como consultora PropTech para gestoras
de alquiler vacacional. Software a medida, automatizaciones, agente de
WhatsApp y gestion operativa delegada sustituyen a las tres aplicaciones
como entrada comercial. Las aplicaciones siguen visibles con sus iconos
originales, como ejemplos de software propio.

El ejemplo de WhatsApp es ilustrativo: el agente consulta el estado de una
reserva y una persona revisa el justificante y decide si confirma. El cliente
puede operar con su equipo o delegar solo procesos acordados en TRICOT.

Se conservan favicon, logotipo, 18 redirecciones, indexacion y contacto
inactivo. QA: verificacion estatica y Chrome a 320, 390, 768 y 1440 px en ES
y EN; menu movil por teclado y tacto, anclas y lectura sin JS. El rollback
acotado consiste en revertir el commit de esta revision.
