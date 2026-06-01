---
title: "Feature 02 — HTTP Request/Response Engine & UX"
description: "The daily-driver request builder and response viewer — where large-response rendering is the most-corroborated failure across every incumbent."
sidebar:
  order: 2
---

# Feature 02 — HTTP Request/Response Engine & UX

## What it is
The core loop: build a request (method/headers/params/body), send it, and render the response (pretty/raw/preview, search, large bodies) — the surface users live in all day.

## ⭐ Pain points & competitor complaints (validated)
- **Large-response rendering is the single most-corroborated failure class — and Postman admits it's architectural.** Master issue [#4751](https://github.com/postmanlabs/postman-app-support/issues/4751) (staff-opened, labeled bug/performance) collates "sluggish performance, app windows turning white/black/blank, or the app quitting or crashing," with the vendor admission *"we are looking into making **core changes** in the app to support large responses."*
- **Insomnia** froze on large bodies because its raw viewer used a **main-thread-blocking textarea** ([PR#2475](https://github.com/Kong/insomnia/pull/2475): it "blocks the main thread so nothing works until text is loaded"; fixed via CodeMirror) — yet still freezes on long JSON lines.
- **Bruno** became *"unusably slow… grinds to a halt"* on large responses from v3.0.2 ([#6847](https://github.com/usebruno/bruno/issues/6847), since fixed).
- **Root cause (documented):** Electron clients load the *entire* response into memory and render on the UI thread.

## Differentiation
**Never block the UI on a response.** Off-main-thread parsing (workers), a **virtualized/viewport editor by default**, streaming + lazy rendering of large bodies, graceful size caps with on-demand "load full body," and genuinely fast search-in-response. "Paste a 50 MB JSON and it stays smooth" is a demoable win.

## UX
Instant render regardless of size; virtualized JSON tree; fast in-response search; pretty/raw/preview; never a white screen.

## Feasibility
**Medium** — the architecture (native/worker parsing + virtualized viewer) is the whole game; the request builder itself is routine.

## Implementation & tech choices *(complex → dedicated deliberation note)*
- **Off-main-thread** response parsing (`worker_threads` / Rust core via [11 Tauri](/rambo/features/11-app-shell-and-ux/)); **virtualized viewport editor** (CodeMirror 6 / Monaco-style); streaming body handling with backpressure; configurable size caps.
- This large-response architecture is foundational and hard to retrofit → its own implementation note.

## Dependencies
The substrate for [03 collections](/rambo/features/03-collections-and-organization/), [06 protocols](/rambo/features/06-protocols/), [07 LLM rendering](/rambo/features/07-client-side-llm-testing/); saved via [01 file format](/rambo/features/01-file-format-and-storage/); constrained by the [11 app-shell](/rambo/features/11-app-shell-and-ux/) tech choice.

## Open questions
- Viewer engine (CodeMirror 6 vs Monaco) and size-cap thresholds. Whether current Insomnia long-JSON-line freeze still reproduces (re-verify on 2026 builds).
