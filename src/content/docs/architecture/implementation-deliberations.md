---
title: Implementation Deliberations
description: The hard subsystems that need their own design pass before coding — flagged by the feature research, with candidates and the core decision in each.
sidebar:
  order: 4
---

The feature deep-dives surfaced a handful of subsystems complex enough to deserve a dedicated design note before implementation. These are where the engineering risk (and the differentiation) concentrates.

## 1. The open file format
**Decision:** YAML / an OpenCollection-style open schema (Bruno's reversal from a custom DSL validates this), with **deterministic serialization** (stable key order) for clean git diffs. **Risk:** robust filesystem-watch + per-request reconciliation so git operations never lose an open request. → [Feature 01](/rambo/features/01-file-format-and-storage/)

## 2. Shareable-yet-encrypted secrets — *the differentiation prize*
**Decision:** OS-keychain storage + AES-256 + dotenv, never syncing plaintext. **The hard part:** per-team key management / envelope encryption so a team can decrypt shared secrets *without* exposing plaintext in git/sync — the unmet sweet spot between Postman-leaky and Bruno-unshareable. → [Feature 04](/rambo/features/04-environments-variables-secrets/)

## 3. The large-response architecture
**Decision:** off-main-thread parsing + a virtualized viewport editor + streaming/lazy render + size caps. **Why it's hard:** even Postman calls this an architectural problem needing "core changes." Foundational and hard to retrofit. → [Feature 02](/rambo/features/02-http-request-response/)

## 4. gRPC + reflection
**Decision:** `.pb` FileDescriptorSet ingestion, cross-file proto resolution, both reflection versions, human-readable errors. **Candidates:** `grpc-reflection-js` (Node) or Rust `tonic`+`prost`+`tonic-reflection`. The most expensive protocol subsystem. → [Feature 06](/rambo/features/06-protocols/)

## 5. The OAuth2 callback handler
**Decision:** a loopback listener on `127.0.0.1` per RFC 8252 + PKCE, tolerant token parsing (query *or* fragment, appended params), proactive refresh. **Why:** the browser→app callback is the single most failure-prone auth component category-wide (validated). → [Feature 05](/rambo/features/05-auth/)

## 6. The JS scripting sandbox
**Decision:** an embeddable sandbox — `rquickjs` (small, Rust) vs Deno-core / V8 isolates (fuller) — plus a **`pm.*`-compat shim** to lower switching cost. → [Feature 08](/rambo/features/08-scripting-and-testing/)

## 7. The import-fidelity engine
**Decision:** format parsers + a **variable-syntax transpiler** + a **`pm.*` → our-scripting transpiler** with a coverage matrix and explicit "needs manual review" flags. "Import and nothing breaks" is the [migration wedge](/rambo/features/10-import-and-migration/).

## 8. The CRDT sync layer
**Decision:** Yjs + S3 (y-sweet-style), self-hostable. **Open:** modeling the collection tree as CRDT structures, and the per-team cost at scale. → [Sync engine](/rambo/architecture/sync-engine/)

:::note
Each of these will get its own implementation-deliberation note during the build cycle. They're called out here so the engineering risk is visible up front, not discovered mid-build.
:::
