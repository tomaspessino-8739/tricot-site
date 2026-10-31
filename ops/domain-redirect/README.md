# Legacy-domain redirect

Vercel project: `tricot-domain-redirect`.
Owner: `tomaspessino-8739s-projects`.
Project ID: `prj_ySU9TOyCcioDieM3vzAYSngp2Yw9`.

This directory is the complete source of a static redirect deployment. It
serves the previous public hosts `tricotconsulting.com` and
`www.tricotconsulting.com`, redirecting every path and query to
`https://untricot.com` with HTTP 301. The main website stays on GitHub Pages.

The registrar's simple forwarding was tested during migration but returned
404 for interior URLs and did not provide a working HTTPS endpoint during
the initial checks. It is replaced by this path-preserving redirect.

The active redirect is the project-level CDN rule in `project-route.json`.
Rule ID: `84c16c22-badc-461a-8824-c910a66e5847`.
Published rule version: `984eae2d-86a5-43ed-9175-b1b59a3eebeb`.
Deployment: `dpl_7qntHmmMwVhzZjKaMHuYp7kmVzcc` (static fallback).

Create or update this single project rule through the Vercel routes API, inspect
the staged diff, verify its staging URL and promote that exact route version.
The staging check returned 301 preserving `/metodo/?origen=migracion`.

`vercel.json` also expresses the same rule for future normal CLI/Git builds.
The raw source-files Deployment API did not apply it, so do not rely on merely
uploading that file. The project rule is required for the current deployment.
Deploy only this directory, with no framework, install or build command.
Never deploy the website root to this Vercel project.

DNS returned for this project: apex A `216.198.79.1` and `64.29.17.1`;
`www` CNAME `e802cadad7b555cd.vercel-dns-017.com`. Refresh the domain
configuration API before future DNS changes; these are observed values, not
universal Vercel defaults.
