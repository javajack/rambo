---
title: "Feature 01 — Open File Format & Local Storage"
description: "Plain-text, git-native local storage as the foundation. Learn from Bruno's reversal — use an open standard (YAML), not a custom DSL; robust file-watch; deterministic serialization."
sidebar:
  order: 1
---

# Feature 01 — Open File Format & Local Storage

## What it is
The foundation: collections/requests/environments stored as **plain-text files on the user's filesystem**, organized in folders that mirror the collection tree, **version-controllable via the user's own Git**, with **no cloud sync required**. Everything else (sync, MCP, CLI) serializes into this format. **An open format is also the anti-lock-in trust proof for a closed-source app** ("closed app, open format").

## ⭐ Pain points & competitor complaints (validated)
- **Forced cloud accounts / data lock-out is the #1 complaint** (not format details). Insomnia 8.0.0 (Sep 2023) forced sign-in on update and **locked existing users out of their data** — issue literally titled *"enshittification / needing an account"* ([Kong/insomnia#6577](https://github.com/Kong/insomnia/issues/6577)). *(Partly reversed in 8.3 — cite as 2023 history.)*
- **Postman's 2023 Scratch Pad removal** left users a binary choice — cloud account or a lightweight client that **doesn't support collections** — so collections "disappeared" ([#12472](https://github.com/postmanlabs/postman-app-support/issues/12472); [kunxi.org](https://www.kunxi.org/blog/2023/10/oops-my-postman-collection-is-gone/)). *(Avoid the refuted "purged without consent" framing.)*
- **Thunder Client** moved its git-friendly project-JSON ("Git Sync") **behind the 2023 Pro paywall**; free-tier collections now live in VS Code `globalStorage` — **not in the project, not git-tracked, not shareable** ([dev.to](https://dev.to/preecha/thunder-client-pro-paywall-what-changed-and-your-best-alternatives-2jgm)).
- **Bruno's git friction:** an open request **vanishes from the UI** when its file is renamed/moved by a merge/branch-switch, with **no per-request reload** (restart required) — [#6889](https://github.com/usebruno/bruno/issues/6889), [#6864](https://github.com/usebruno/bruno/issues/6864).

## Differentiation — learn from Bruno's two mistakes
Bruno validated plain-text/git-native/local-first as a *loved* differentiator ("No cloud sync. Your data stays local"). We copy that **and avoid its documented errors**:
1. **Use an open standard format (YAML), NOT a custom DSL.** Bruno's maintainer reversed `.bru` → **YAML (OpenCollection), default in v3.1**: a custom DSL has *"no native editor support, standard linting, schema tooling, or strong AI understanding,"* is a maintenance burden, and **parses 4–5× slower** on large collections ([blog](https://blog.usebruno.com/making-yaml-the-default-in-bruno-v3.1), [#360](https://github.com/usebruno/bruno/discussions/360)). *(TOML was rejected for deeply-nested structures.)* YAML inherits free tooling (yamllint, Prettier, JSON-Schema via the Red Hat language server) and is **AI-legible** — a real plus for our agent pillar.
2. **Robust filesystem-watch + per-request reconciliation** so external git file moves/renames never lose an open request (the #6889 class of bug).

## UX
Folder-per-collection, file-per-request; readable diffs in any git tool; "this request lives at `path/to/req.yaml`" transparency; works fully offline; open it in any editor.

## Feasibility
**High** — proven by Bruno. The hard parts are file-watch robustness and deterministic serialization, not the storage concept.

## Implementation & tech choices *(complex → dedicated deliberation note)*
- **Format:** YAML / an OpenCollection-style open schema (strongly favored over a custom DSL on the verified evidence). Consider interop with the emerging OpenCollection spec.
- **Deterministic serialization** for clean diffs/merges: stable key ordering + consistent quoting/whitespace (e.g. `safe-stable-stringify`, `deterministic: true`) — *mandatory regardless of format*.
- **Secrets stay OUT of files:** store references; values in the OS keychain ([04](/rambo/features/04-environments-variables-secrets/)).
- **File-watch/reconciliation engine**, one-file-per-request layout, binary/large-body handling, and **schema versioning/migration** — all complex enough to warrant their own implementation note.

## Dependencies
**Everything serializes into this** — [02 requests](/rambo/features/02-http-request-response/), [03 collections](/rambo/features/03-collections-and-organization/), [09 MCP/CLI](/rambo/features/09-agent-pillar-mcp-cli/), [12 sync](/rambo/features/12-realtime-team-sync/).

## Open questions
- Adopt/align with OpenCollection vs define our own YAML schema. Whether Bruno's #6889 file-watch class is fixed post-Apr-2026 (re-verify). Binary-body & migration handling unresearched (P-pass gap).
