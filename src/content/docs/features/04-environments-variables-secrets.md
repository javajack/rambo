---
title: "Feature 04 — Environments, Variables & Secrets"
description: "Environment/variable management and — the standout validated pain — secret handling. Local-by-default, OS-keychain encrypted, never-synced-plaintext, with the unmet \"shareable-yet-encrypted\" sweet spot."
sidebar:
  order: 4
---

# Feature 04 — Environments, Variables & Secrets

## What it is
Environment/variable management (scoping, precedence, dynamic vars) and **secret handling** — storing API keys/tokens so they're usable but never leaked into synced/exported/committed files.

## ⭐ Pain points & competitor complaints (validated — this is the strongest pain in the category)
- **Secret leakage is the #1, best-evidenced pain.** A CloudSEK year-long study found **30,000+ public Postman workspaces leaking credentials** (GitHub 5,924 / Slack 5,552 / Salesforce 4,206) [[CloudSEK](https://www.cloudsek.com/blog/postman-data-leaks-the-hidden-risks-lurking-in-your-workspaces)], independently corroborated by Truffle Security and RedHunt Labs.
- **Postman's architecture is the root cause — and Postman officially admitted it.** "Secret"-typed vars only *mask* values but **still sync Initial Values to the cloud** (open since 2022, framed as a HIPAA risk — [#10768](https://github.com/postmanlabs/postman-app-support/issues/10768)). In Sept 2025 Postman conceded the old Initial/Current model made *"many users accidentally sync secrets to their teams or even public workspaces,"* and shipped a **local-by-default + explicit-sharing** redesign as the fix [[#13760](https://github.com/postmanlabs/postman-app-support/issues/13760)]. **This is the vendor-endorsed correct model.**
- **Bruno is the reference design but not leak-proof:** secrets encrypted via OS keychain (safeStorage/DPAPI) + AES256 fallback + dotenv; the `.bru` file lists *which* vars are secret, not values [[Bruno](https://blog.usebruno.com/managing-secrets)]. But it can still leak if `.env`/files are committed un-scrubbed, and **its local-encrypted secrets are NOT team-shareable** ([#7275](https://github.com/usebruno/bruno/issues/3943) class).

## Differentiation
**Local-by-default, OS-keychain-encrypted secrets that never sync as plaintext**, plus **scrub-on-export / scrub-on-sync**. And go beyond Bruno into the **unmet sweet spot**: secrets that are simultaneously **encrypted-at-rest, sync/git-safe, AND team-shareable** (the gap between Postman-cloud-leaky and Bruno-local-only-unshareable).

## UX
Clear secret vs non-secret typing; secrets visually quarantined; explicit, reviewable sharing (never silent sync); a pre-export/pre-commit "secret scrub" check.

## Feasibility
**Medium**; secret storage is well-trodden (keychain), but **shareable-yet-encrypted** team secrets need careful crypto design.

## Implementation & tech choices *(complex → dedicated deliberation note)*
- **Candidate stack:** OS keychain (Electron `safeStorage` / macOS Keychain / Windows DPAPI) + AES-256 fallback + dotenv; `.env` gitignored by default; secrets stored as references, never values, in synced files.
- **Hard part:** shareable encrypted secrets — per-team key management / envelope encryption so a team can decrypt without exposing plaintext in git/sync. Needs its own crypto deliberation.

## Dependencies
Secrets must stay out of [01 file format](/rambo/features/01-file-format-and-storage/) and out of [12 sync](/rambo/features/12-realtime-team-sync/) (references only). Auth ([05](/rambo/features/05-auth/)) consumes secrets.

## Open questions
- Shareable-yet-encrypted secret design (the differentiation prize). Variable scoping/precedence specifics (P2 covers auth; deeper env-precedence complaints lightly evidenced).
