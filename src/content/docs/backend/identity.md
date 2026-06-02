---
title: Identity & Accounts
description: Accounts, sessions, and tokens — needed only at sync, consumed identically by every client, and portable enough to self-host for enterprise.
sidebar:
  order: 3
---

## Responsibility
Accounts, sessions, and **access tokens** — the thing that turns "anonymous local user" into "synced/paid user." Per [D4](/rambo/strategy/decision-log/), identity is **only needed when you sync** — local/offline use stays anonymous (the trust wedge).

## Design
- **Data:** Postgres (`users`, `sessions`, `devices`, `org_members`). Minimal PII.
- **Tokens:** short-lived access token + refresh; opaque or JWT. Every client ([desktop/extension/CLI](/rambo/backend/multi-client/)) authenticates the same way and carries the same token to the sync, billing, and licensing services.
- **Login flows:** social OAuth/OIDC + passkeys/password. Desktop & CLI use **loopback OAuth (RFC 8252 + PKCE)** — the same robust callback handler specced for [auth](/rambo/specs/04-agent-interface/); the extension uses the browser flow.
- **Enterprise SSO** (SAML/OIDC + SCIM) plugs in here for the [self-hosted tier](/rambo/features/15-sso-and-identity/) — identity is **pluggable** so a customer points it at their IdP.

## Portability (build vs adopt)
Use a **self-hostable** identity system, never a lock-in SaaS. Options:
- **Adopt:** Ory / Zitadel / Keycloak — open-source, self-hostable, standards-based (so the *same* identity layer ships in our cloud *and* the enterprise on-prem build).
- **Build:** a thin Postgres-backed token service for the simple cases.

Avoid Auth0/Firebase-style lock-in (can't self-host → can't ship enterprise on-prem).

## Trust constraints
- **Anonymous until sync:** no account, no tracking, no calls for local use.
- **Offline grace:** once signed in, the desktop app caches entitlement so it **keeps working offline** (it must — that's the wedge); see [licensing](/rambo/backend/licensing/).
- Minimal data; clear, scoped privacy claims.

## Open decisions
- Adopt (Ory/Zitadel) vs. build the token service.
- Passkey-first vs. password+social.
- Token lifetime + offline-grace duration.
