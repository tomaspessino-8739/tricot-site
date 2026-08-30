export function renderNotFound() {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#fafaf9" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="description" content="La página solicitada no existe. Vuelve a TRICOT o explora su versión en inglés." />
    <title>Página no encontrada — TRICOT</title>
    <link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <header class="site-header is-solid"><a class="brand" href="/" aria-label="TRICOT, inicio"><img src="/assets/brand/tricot-wordmark-600.webp" srcset="/assets/brand/tricot-wordmark-600.webp 600w, /assets/brand/tricot-wordmark-900.webp 900w" sizes="140px" alt="TRICOT" width="140" height="42" /></a><nav class="not-found-nav" aria-label="Idioma"><a href="/">ES</a><a href="/en/" lang="en" hreflang="en">EN</a></nav></header>
    <main class="not-found-main" id="contenido">
      <p class="kicker">Error 404 · Página no encontrada</p>
      <h1>Esta página no está. El resto de la operación sigue en su sitio.</h1>
      <p>No hemos encontrado la dirección solicitada. Puedes volver a la portada de TRICOT o continuar en inglés.</p>
      <div class="hero-actions"><a class="button button-primary" href="/">Volver a TRICOT <span aria-hidden="true">↗</span></a><a class="text-link" href="/en/">Continue in English</a></div>
      <aside><strong>Page not found.</strong> The requested address does not exist. Use the links above to return to TRICOT.</aside>
    </main>
  </body>
</html>
`;
}
