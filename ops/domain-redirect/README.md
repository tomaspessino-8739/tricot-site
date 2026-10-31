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

Deploy only `vercel.json` and `index.html` from this directory, with no
framework, install command or build command. Do not deploy the website root
to this Vercel project. Validate a root, an ES route, an EN route and a query
string before assigning the legacy domains.
