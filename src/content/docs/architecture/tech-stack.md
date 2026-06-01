---
title: Tech Stack
description: The shell, language, and library choices — Tauri/Rust vs Electron, and why the bloat evidence points one way.
sidebar:
  order: 3
---

## The app shell: Tauri/Rust vs Electron — *the foundational decision*

The single most important, hardest-to-reverse tech choice.

| | **Tauri (Rust + OS webview)** | **Electron (bundled Chromium)** |
|---|---|---|
| Binary size | small | large |
| Baseline memory | low | high (the [bloat](/rambo/opportunity/customer-pain/) complaints) |
| Core language | Rust (synergy with the sync engine + fast parsing) | Node/JS |
| Webview consistency | OS webview → must validate cross-platform | bundled → consistent |
| Ecosystem | younger | mature |

**Lean:** Tauri/Rust. The validated demand signal is Postman's RAM bloat ([#4687](https://github.com/postmanlabs/postman-app-support/issues/4687), open since 2018), and a Rust core composes naturally with a [Yjs + S3 sync engine](/rambo/architecture/sync-engine/) and off-main-thread response parsing. **Yaak** (Tauri + Rust + React) is the proof point.

:::caution
This is gated on a **benchmark spike** — there's no verified head-to-head Tauri-vs-Electron data on bundle/memory/startup/webview-consistency yet ([open question](/rambo/strategy/open-questions/)). Decide with primary numbers, not vibes.
:::

## Candidate building blocks (from the feature research)

| Subsystem | Candidate(s) |
|---|---|
| Response viewer | virtualized editor — CodeMirror 6 / Monaco; off-main-thread parsing (worker_threads / Rust) |
| File format | YAML / OpenCollection-style; deterministic serialization (`safe-stable-stringify`-style) |
| Secrets | OS keychain (Electron `safeStorage` / Keychain / DPAPI) + AES-256 fallback + dotenv |
| Scripting sandbox | `rquickjs` (Rust + QuickJS) **or** Deno-core / V8 isolates |
| gRPC + reflection | `grpc-reflection-js` (Node) **or** Rust `tonic` + `prost` + `tonic-reflection` |
| OAuth2 | loopback + PKCE; candidate Rust crate `clio-auth` |
| Sync | Yjs (Loro alt) + S3/R2 (y-sweet-style) |
| MCP server | standard MCP transports; one tool per saved request |

These are starting points for the [implementation deliberations](/rambo/architecture/implementation-deliberations/) — not final decisions.
