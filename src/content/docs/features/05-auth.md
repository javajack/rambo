---
title: "Feature 05 — Authentication"
description: "Request auth (Bearer/Basic/API-key/OAuth2/SigV4/mTLS) with a credential model that never silently syncs secrets — the validated failure mode behind mass token leakage."
sidebar:
  order: 5
---

# Feature 05 — Authentication

## What it is
Per-request/collection authentication — API key, Bearer, Basic, **OAuth 2.0** (auth-code, PKCE, refresh), **AWS SigV4**, **mTLS** — and, critically, *where the auth credentials live and whether they ever leave the machine*.

## ⭐ Pain points & competitor complaints (validated)
- **The validated auth pain is mass credential leakage rooted in auth-config UX.** TruffleSecurity found **~4,000+ live credentials** (1,689 confirmed across ~40k scanned) leaking via Postman public workspaces — access/refresh tokens, API keys, basic-auth URIs, GitHub PATs, OpenAI/AWS keys, Slack webhooks [[TruffleSecurity](https://trufflesecurity.com/blog/postman-carries-lots-of-secrets)]; CloudSEK independently found **30,000+** leaking workspaces.
- **Root cause = the "Initial value vs Current value" sync model:** Initial values **sync to Postman's servers** (and are viewable publicly) while Current values stay local — so auth tokens silently leave the machine [[TruffleSecurity](https://trufflesecurity.com/blog/postman-carries-lots-of-secrets); Postman docs].
- **The OAuth callback handoff is the #1 *flow* failure (validated by follow-up research).** Postman's authorization-code "Get New Access Token" / "Authorize using browser" step repeatedly **completes in the browser but never delivers the token back into the app** — users left stuck on the token dialog, across providers (Azure, Auth0) and versions ([postman#13335](https://github.com/postmanlabs/postman-app-support/issues/13335), [#8717](https://github.com/postmanlabs/postman-app-support/issues/8717)). The **browser→app return** (loopback / custom-URI deep link) is the single most failure-prone auth component category-wide (corroborated, lower-confidence, in Insomnia #6443, Bruno #6817, Hoppscotch #5218).

## Differentiation
**Auth credentials are local-by-default and never silently synced.** A clear secret taxonomy (no "initial/current" trap), pre-share/pre-publish **secret scanning + redaction**, and standard flows (OAuth2 auth-code + PKCE + refresh, SigV4, mTLS) implemented cleanly. This makes "you literally cannot leak your token by sharing a collection" a security selling point.

## UX
Auth panel makes it obvious the token is local; OAuth2 "Get token" that just works (loopback + PKCE, auto-refresh); a guard before any share/export that scans for live credentials.

## Feasibility
**Medium** — OAuth2 flow handling and mTLS are the fiddly parts; the secret-locality model rides [04](/rambo/features/04-environments-variables-secrets/).

## Implementation & tech choices *(complex → dedicated deliberation note)*
- **Build the redirect/callback handler cleanly — it's the highest-leverage auth differentiator.** A **loopback HTTP listener on `127.0.0.1` per RFC 8252** + PKCE, parsing the token whether it returns as a query **or** fragment (and tolerating unexpected appended params like `session_state`), plus **proactive token refresh** before expiry. This is exactly where the incumbents break.
- OAuth2 (loopback redirect + PKCE + refresh rotation) — candidate Rust crate **`clio-auth`**; secrets stored via the [04 encrypted store](/rambo/features/04-environments-variables-secrets/); **live-credential detection on save/share** (TruffleHog-style regex + verification).
- OAuth2 flows + mTLS warrant a dedicated implementation note.

## Dependencies
Consumes [04 secrets](/rambo/features/04-environments-variables-secrets/); part of [02 requests](/rambo/features/02-http-request-response/).

## Open questions
- **Partially closed by follow-up research:** the OAuth **callback handoff** is now a *validated* flow pain (above). What remains **low-confidence / uncontested**: token auto-refresh-rotation specifics, AWS SigV4 signing, mTLS config, and folder-inheritance refresh bugs — corroborated across tools but not adversarially verified. Deepen if prioritized. (Tracked in [Open-Questions](/rambo/strategy/open-questions/).)
