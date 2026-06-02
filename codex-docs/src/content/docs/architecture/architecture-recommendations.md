---
title: Architecture Recommendations
description: Build choices for the hard subsystems.
sidebar:
  order: 1
---

## Architecture target

Rambo should be a local-first desktop product with shared core libraries for desktop, CLI, MCP server, and future extension/web surfaces.

## Recommended subsystem choices

| Subsystem | Recommendation | Reason |
|---|---|---|
| Desktop shell | Tauri/Rust/React or equivalent | Yaak proves fit; lower bloat story than Electron |
| File format | Directory of small readable files | Git diff/merge, local ownership, import/export |
| Secret storage | OS keychain plus encrypted file grants | Prevent accidental cloud sync; enables sharing |
| Sync | Local/git free; paid Yjs/Loro-style CRDT sync | Separates trust wedge from paid collaboration |
| Response viewer | Worker/off-main-thread parser + virtualization | Large payloads must not freeze UI |
| SSE/LLM | Streaming parser, event timeline, rendered transcript | Directly addresses LLM debugging gap |
| Import engine | Structured converters with loss report | Switching depends on trustable migration |
| CLI | Same core as desktop | Deterministic CI and agent operations |
| MCP | Local server first; hosted optional later | Avoids cloud-trust contradiction |
| Request diagnostics | Separate diagnostics core for DNS, TCP, TLS, proxy, and timing | Keeps network utilities request-adjacent instead of becoming a NetOps suite |
| Telemetry | Opt-in, privacy-preserving, local redaction | Trust contract and product learning |

## LLM/agent-debugger requirements

- Display raw SSE events exactly as received.
- Preserve first event and timestamps.
- Detect OpenAI-compatible `delta.content`.
- Show raw JSON, parsed events, and rendered Markdown.
- Correlate tool calls, request retries, model parameters, latency, and finish reason.
- Export trace as local JSON for CI/regression.

## Anti-requirements

- Do not make hosted cloud the source of truth.
- Do not require login for local work.
- Do not sync secrets by default.
- Do not bolt MCP onto a cloud-only object model.
- Do not turn request diagnostics into a broad port scanner/LAN scanner by default.
