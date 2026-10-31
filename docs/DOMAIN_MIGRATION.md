# Public domain migration

Authorised by the owner on 2026-10-31: replace `tricotconsulting.com` with
`untricot.com` as the public canonical domain.

## Source and baseline

- Hosting remains GitHub Pages, repository `tomaspessino-8739/tricot-site`,
  branch `main`, root directory, legacy build.
- Pre-migration published commit: `14bf22aaca425b6132de0d6ffedafcecc2ac3600`.
- Previous custom domain: `tricotconsulting.com`, HTTPS enforced, approved
  certificate covering the apex and `www`.
- New domain uses GoDaddy DNS, initially parked, with `www` pointing to its
  apex. No mail service or MX records were present in the new zone.

## Target configuration

- Canonical origin: `https://untricot.com`.
- Apex A records: `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, `185.199.111.153`.
- `www` CNAME: `tomaspessino-8739.github.io`.
- Old domain and its `www` variant: path-preserving permanent redirects via
  the dedicated Vercel project `tricot-domain-redirect`. The main website
  remains on GitHub Pages. Redirect sources live in `ops/domain-redirect/`.
- Sources, generated canonical/hreflang/social/schema URLs, robots sitemap
  reference, CNAME and verification expectations migrate together.
- Existing indexing and lead-capture gates remain in place.

## Verification and rollback

Run `npm run check` and `git diff --check` before publishing. Check the Pages
build commit, public DNS, TLS for apex and www, ES/EN and interior routes,
redirects and exact source hashes after publication.

Rollback requires reverting the migration commits, restoring the previous
Pages custom domain, detaching the old domain from the Vercel redirect project
and restoring its prior GitHub Pages A records and `www` CNAME. DNS caches and
certificate issuance can delay recovery; retain both domain registrations.

## Verified release, 2026-10-31

- Main migration commit: `f10f6802d96cc8fd7951f2c9b7f005d172bb364c`.
- Redirect source commit: `170554253fd1ed5b99fb43f917316be99ab81275`.
- GitHub Pages reports `built`, CNAME `untricot.com`, HTTPS enforced and an
  approved certificate for `untricot.com` and `www.untricot.com`.
- All 20 generated HTML pages plus robots, sitemap, 404, CSS and JS matched
  the published HTTPS responses byte for byte.
- `www.untricot.com/en/` returned 301 to `https://untricot.com/en/`.
- Redirect deployment is READY. The separately versioned project CDN rule
  was verified in staging before promotion; its exact source and IDs live in
  `ops/domain-redirect/project-route.json` and its README.
- Both legacy hosts returned HTTPS 301 for `/`, `/en/`, `/metodo/`,
  `/en/method/` and a nested resource route with a query string. Paths,
  trailing slashes and query strings were preserved and TLS validated.
- Legacy-host checks used the newly authoritative Vercel addresses explicitly
  to avoid cached GoDaddy forwarding DNS. Vercel configuration reports no
  DNS misconfiguration for either host. Recursive caches can continue using
  prior addresses until their TTL expires.
- GoDaddy's simple forwarding was removed after replacement because interior
  URLs returned 404 during verification. Both domain registrations, mail TXT
  records, existing nameservers and domain privacy settings are preserved.
