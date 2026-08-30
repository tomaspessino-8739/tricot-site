# TRICOT Site

Fuente tecnica canonica de la landing publica de TRICOT.

## Estado

- Sitio estatico.
- Datos de las demostraciones: sinteticos.
- Doce paginas generadas en castellano e ingles desde un shell compartido.
- Verticales locales: Property Management, consultoria de automatizacion,
  software a medida, metodo y Agentes IA.
- Agentes IA permanece fuera de la navegacion comercial y sujeto a su gate de
  evidencia.
- Captacion: desactivada de forma explicita; no se recoge ni guarda el email.
- Indexacion: desactivada hasta completar paginas, privacidad, identidad y QA.
- Estado publico: el dominio no cambia hasta que exista autorizacion separada.

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

`npm run build` genera las dos portadas y las cinco parejas de paginas
interiores. `npm run verify` comprueba canonical, `hreflang`, H1, schema,
unicidad, enlaces internos, el aislamiento de Agentes IA y que no reaparezca la
captacion de prototipo.

El checkpoint anterior a T0/T1 esta documentado en `docs/BASELINE.md`.
