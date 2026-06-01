---
title: "Feature 06 — Protocols (GraphQL / WebSocket / SSE / gRPC)"
description: "Protocols beyond REST, where gRPC and streaming are the weakest, buggiest layer across incumbents — and SSE reliability matters for the LLM wedge."
sidebar:
  order: 6
---

# Feature 06 — Protocols (GraphQL / WebSocket / SSE / gRPC)

## What it is
First-class support for GraphQL, WebSocket, **Server-Sent Events (SSE)**, and gRPC alongside REST. Table-stakes for breadth — but the incumbents do the streaming/gRPC end *badly*, which is the opening.

## ⭐ Pain points & competitor complaints (validated)
- **gRPC is the weakest, buggiest layer.** Postman's proto-import-with-`import`-statements and server-reflection completeness both broke ([#10570](https://github.com/postmanlabs/postman-app-support/issues/10570), 2022; fixed v10). Insomnia surfaced an opaque *"Uh Oh!"* on reflection ([#6380](https://github.com/Kong/insomnia/issues/6380), fixed) and **still cannot resolve cross-file proto imports** ([#3316](https://github.com/Kong/insomnia/issues/3316), **OPEN**). Bruno shipped gRPC/WebSocket **only in 2025** after a ~year-long gap ([#3390](https://github.com/usebruno/bruno/issues/3390)).
- **SSE rendering is unreliable — and it bites LLMs.** Postman's SSE viewer **dropped the first event** for LLM streams (v11.40.1), returning empty/`[DONE]` while curl returned the real tokens ([#13537](https://github.com/postmanlabs/postman-app-support/issues/13537)). Directly reinforces [07 client-side LLM testing](/rambo/features/07-client-side-llm-testing/).
- **Hoppscotch WS/SSE can't set custom headers** (Authorization/User-Agent), blocking header-auth servers ([#5002](https://github.com/hoppscotch/hoppscotch/issues/5002), OPEN) — a browser-WebSocket-API limitation.

## Differentiation
**First-class streaming + gRPC done right:** SSE that *never drops the first event* and renders incrementally; gRPC with **compiled `.pb` descriptor ingestion**, robust **cross-file proto resolution**, both `v1`+`v1alpha` **reflection**, full service enumeration, and human-readable errors; and **custom headers on WS/SSE** (a native client can set what an in-browser one cannot).

## UX
Reliable token-by-token streaming; gRPC reflection that "just lists the services"; WS/SSE connection config with arbitrary auth headers.

## Feasibility
**Mixed:** WebSocket/SSE clients are comparatively cheap; **gRPC + reflection is the expensive subsystem.**

## Implementation & tech choices *(gRPC is complex → dedicated deliberation note)*
- **Native shell enables WS/SSE custom headers** that browser tools can't ([11](/rambo/features/11-app-shell-and-ux/)).
- gRPC candidates: `grpc-reflection-js` (Kong's choice, Node/Electron) **or** a Rust core using **`tonic` + `prost` + `tonic-reflection`** for reliable multi-file import resolution + streaming. Support `FileDescriptorSet` ingestion.

## Dependencies
Extends [02 request engine](/rambo/features/02-http-request-response/); **SSE underpins [07 LLM streaming](/rambo/features/07-client-side-llm-testing/)**.

## Open questions
- gRPC stack choice (Node grpc-reflection-js vs Rust tonic). GraphQL subscriptions UX was only lightly evidenced — deepen if prioritized.
