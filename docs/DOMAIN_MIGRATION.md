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
- Old domain: permanent redirect to the new origin, preserving routes where
  supported by the registrar.
- Sources, generated canonical/hreflang/social/schema URLs, robots sitemap
  reference, CNAME and verification expectations migrate together.
- Existing indexing and lead-capture gates remain in place.

## Verification and rollback

Run `npm run check` and `git diff --check` before publishing. Check the Pages
build commit, public DNS, TLS for apex and www, ES/EN and interior routes,
redirects and exact source hashes after publication.

Rollback requires reverting the migration commit, restoring the previous
Pages custom domain, disabling registrar forwarding for the old domain and
restoring its prior GitHub Pages A records and `www` CNAME. DNS caches and
certificate issuance can delay recovery; retain both domain registrations.
