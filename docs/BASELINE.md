# TRICOT site baseline

## T0 checkpoint

- Date recorded: 2026-08-30
- Branch: `main`
- Local HEAD: `f73c866`
- Remote reference: `origin/main` at `f73c866`
- Public source check: `https://tricotconsulting.com/` matched the local
  `index.html` byte for byte before T0 edits.
- Hosting: GitHub Pages from the repository root.
- Public indexing state: `noindex, nofollow`.

## Rollback boundary

No commit, tag, DNS, hosting or deployment mutation is part of T0 or T1. The
public rollback reference remains commit `f73c866`.

To discard this uncommitted implementation, review the worktree and restore
only the files created or changed by T0/T1. Do not use a destructive repository
reset because unrelated user changes may exist in future sessions.

## Scope of T0 and T1

- Add dependency-free generation and static verification.
- Generate Spanish and English home pages from a shared document shell.
- Add canonical, reciprocal hreflang, Open Graph and base entity JSON-LD.
- Keep both pages `noindex, nofollow` during local QA.
- Remove the public prototype interaction that stored an email in localStorage.
- Do not add robots, sitemap, lead endpoint, analytics or legal placeholders.
- Do not commit or publish.
