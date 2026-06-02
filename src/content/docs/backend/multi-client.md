---
title: Multi-Client Architecture (Desktop · Extension · CLI)
description: One shared core engine and one set of backend services consumed identically by the desktop app, a Chrome extension, and the CLI — so a new surface is cheap and behavior is consistent.
sidebar:
  order: 2
---

The goal: **meet developers wherever they work** — the desktop power user, the quick in-browser test, the CI/agent in a terminal — with **one account, one collection format, one sync, one entitlement**, and at **low marginal cost per surface.** That requires deliberately carving the system into shared pieces.

## The three shared layers

```
        Desktop (Tauri)     Chrome extension     CLI
            │  UI shell          │  UI shell        │  argv/stdout   ← only this differs per client
        ────┴────────────────────┴──────────────────┴────
        ▼ Shared CORE ENGINE  (Rust → native for desktop/CLI, WASM for the browser)
          request engine · file format · scripting sandbox · LLM engine · MCP
        ────────────────────────────────────────────────
        ▼ Shared CLIENT SDK   (wraps the backend APIs; auth, sync, entitlement)
        ────────────────────────────────────────────────
        ▼ Shared BACKEND SERVICES  (HTTP/WS, portable primitives)
          identity · sync relay · billing/metering · licensing
```

**Only the UI shell is per-client.** Everything that defines behavior — how a request runs, how the format serializes, how scripts execute, how LLM streams render, how MCP tools are exposed — lives in **one core engine**, compiled **native** for desktop/CLI and to **WASM** for the browser extension. So the differentiators behave *identically* everywhere, and a bug is fixed once.

## The backend, carved for reuse
Each backend service is **independently useful** and consumed the same way by all three clients via the shared SDK:
- **Identity** → a token. (All clients authenticate the same way; one account.)
- **Sync relay** → a WebSocket to a workspace `Y.Doc`. (All clients sync the same collections.)
- **Billing / licensing** → a REST entitlement check. (All clients enforce the same plan.)

No client has a private backend path; add a fourth surface (a JetBrains plugin, a web app) and it reuses the same three layers.

## What each surface is *for*
| Surface | Best at | Notes |
|---|---|---|
| **Desktop (Tauri)** | full-power daily driver | native sockets → any header, gRPC, mTLS, large responses, offline |
| **CLI** | CI/CD + AI agents (MCP) | headless core; deterministic JSON; the automation surface |
| **Chrome extension** | quick in-browser tests, capture from a tab | lighter; shares format/sync/auth/entitlement |

## Honest nuance: the extension inherits browser limits
A browser extension **cannot set arbitrary WebSocket/SSE headers or do raw mTLS** (the same constraint that hobbles Hoppscotch). So the model is deliberate: **native clients (desktop/CLI) are full-power; the extension is a fast, convenient quick-test surface** that shares everything portable (format, sync, auth, scripting via WASM) and **defers header-sensitive or raw-socket work to the desktop app** (e.g., "open in desktop"). We don't pretend the browser can do what it can't.

## Why this is the right call
- **Consistency:** the LLM-testing engine, the sandbox, the format — one implementation, three surfaces.
- **Leverage:** new client surface ≈ a UI shell, not a re-implementation.
- **Lean backend:** three clients, *one* set of services to run and secure.
- **Trust intact:** the core engine is local in every surface; the backend only ever sees what the user chose to sync.
