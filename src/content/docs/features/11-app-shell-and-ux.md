---
title: "Feature 11 — App Shell & UX Foundation"
description: "A fast, low-RAM, offline-first native desktop app — the anti-Postman-bloat foundation; Tauri/Rust vs Electron is the key tech deliberation."
sidebar:
  order: 11
---

# Feature 11 — App Shell & UX Foundation

## What it is
The cross-cutting desktop shell: **fast startup, low memory, offline-first, keyboard-friendly**, cross-platform. The shell hosts every other feature; its performance *is* a differentiator given the incumbents' bloat.

## ⭐ Pain points & competitor complaints (validated)
- **Postman's Electron RAM bloat is long-standing and widely corroborated.** Issue [#4687 "Eating too much RAM"](https://github.com/postmanlabs/postman-app-support/issues/4687) has been **open since 2018** (79 comments, 31 👍; OP saw 400+ MB at startup, wanted 100–150 MB); a verified sibling [#7870](https://github.com/postmanlabs/postman-app-support/issues/7870) reports **17.8 GB RAM while the app wasn't even open**, amid a cluster of memory issues (#8761 `performance`, #6015, #12588). HN: *"Postman is so incredibly bloated and slow"* ([30177337](https://news.ycombinator.com/item?id=30177337)). *(Extreme single figures are user task-manager readings — medium-confidence; the bloat reputation is high-confidence. Last activity ~2023 — framed historically.)*
- Developers repeatedly ask for a **lightweight, native-feeling** alternative — direct demand for this wedge.

## Differentiation
**Lightweight and fast by design** — instant startup, small memory footprint, offline-first, keyboard-first. In a market where the leader is synonymous with bloat, "fast and out of your way" is a real wedge (and pairs with the local-first/no-account trust story).

## UX
Command palette; full keyboard navigation; instant cold start; minimal idle memory; responsive even with large collections (ties to [01](/rambo/features/01-file-format-and-storage/) lazy-loading).

## Feasibility
**Medium.** Modern native-webview stacks deliver small bundles + low RAM. **Yaak** is a proof point: built with **Tauri + Rust + React**.

## Implementation & tech choices *(complex → dedicated deliberation note)*
- **Tauri (Rust + OS webview) vs Electron (bundled Chromium):** Tauri → far smaller binaries + lower memory + Rust core (fits the sync engine in [12](/rambo/features/12-realtime-team-sync/)); Electron → consistent bundled webview + larger ecosystem. **Tradeoff flag:** Tauri uses the OS webview, so cross-platform rendering consistency needs validation.
- Rust core is synergistic with a Yjs/Loro + y-sweet-style sync engine and a fast file/parse layer.
- *This is a foundational, hard-to-reverse decision → its own implementation-deliberation note.*

## Dependencies
Cross-cutting — hosts all features. Tech choice here constrains [12 sync](/rambo/features/12-realtime-team-sync/) and performance of [01 storage](/rambo/features/01-file-format-and-storage/).

## Open questions
- **Final Tauri-vs-Electron call needs primary benchmarks.** Research confirmed Postman's RAM bloat (the *demand* signal) but found **no verified head-to-head Tauri/Rust-vs-Electron data** (bundle size, baseline memory, startup, webview consistency) — run our own benchmark spike, including measuring Yaak/Bruno/Thunder Client. (Flagged in [Open-Questions](/rambo/strategy/open-questions/).)
