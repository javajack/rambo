---
title: "Spec 06 — Protocols & gRPC"
description: A native multi-protocol engine — REST, GraphQL, WebSocket, SSE, gRPC — that fixes the incumbents' streaming and gRPC weak spots and sets headers browsers can't.
sidebar:
  order: 6
---

## Pain it solves *(validated)*
gRPC is the buggiest layer — cross-file proto imports still broken in Insomnia ([#3316](https://github.com/Kong/insomnia/issues/3316)); Hoppscotch's WS/SSE **can't set custom headers** (a browser-API limit, [#5002](https://github.com/hoppscotch/hoppscotch/issues/5002)); Postman's SSE drops the first event. See [Feature 06](/rambo/features/06-protocols/).

## Differentiation (what sells)
**A native client sets *any* header on WS/SSE** (Authorization, User-Agent) — impossible in browser-first tools — and does **gRPC reflection that just works**, including multi-file protos. First-class streaming that never drops a token.

## The engine
- **HTTP/REST** — native client; arbitrary headers, redirects, mTLS, proxies.
- **WebSocket / SSE** — **native sockets**, so any connection header is settable (the thing browser tools can't do). SSE shares the [append-only, never-drop-first-event parser](/rambo/specs/05-llm-testing-engine/).
- **GraphQL** — schema introspection, a query/variables builder; subscriptions over WS.
- **gRPC** — the hard one, done right:
  - ingest a compiled **`FileDescriptorSet` (`.pb`)** *and* raw `.proto` with **include-path resolution** for cross-file imports (the unfixed Insomnia gap);
  - **server reflection** on both `grpc.reflection.v1` **and** `v1alpha`, with full service enumeration and human-readable errors;
  - unary + client/server/bidi **streaming**.

## Tech choices
A **Rust core** is the natural fit: `reqwest`/`hyper` (HTTP), `tokio-tungstenite` (WS), and **`tonic` + `prost` + `tonic-reflection`** (gRPC) — robust multi-file proto handling and streaming. (Node alternative: `grpc-reflection-js`, Kong's choice.) The native shell ([Tauri/Rust](/rambo/architecture/tech-stack/)) is what unlocks arbitrary WS/SSE headers.

## Open decisions
- gRPC stack: Rust `tonic` (preferred, composes with the core) vs. Node `grpc-reflection-js`.
- GraphQL subscription UX depth.
- mTLS / client-cert config surface (ties to [auth](/rambo/features/05-auth/)).
