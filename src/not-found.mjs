export function renderNotFound() {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Página no encontrada — TRICOT</title>
    <link rel="icon" href="/assets/brand/favicon-t.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <header class="site-header"><a class="brand" href="/" aria-label="TRICOT, inicio"><img src="/assets/brand/tricot-wordmark-600.webp" alt="TRICOT" width="140" height="42" /></a></header>
    <main class="not-found-main">
      <p class="kicker">404</p>
      <h1>Esta página no está.</h1>
      <p>Vuelve a la portada para conocer nuestros servicios para gestoras de alquiler vacacional.</p>
      <div class="hero-actions"><a class="button" href="/">Volver a TRICOT</a><a href="/en/" lang="en">Continue in English</a></div>
      <aside lang="en">Page not found. Follow the links above to return to TRICOT.</aside>
    </main>
  </body>
</html>
`;
}
