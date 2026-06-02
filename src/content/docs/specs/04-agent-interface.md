---
title: "Spec 04 — Agent Interface (MCP + CLI + Machine-Readable I/O)"
description: One request engine, three faces — a first-party MCP server, a deterministic CLI, and a stable JSON result contract — so AI agents and CI drive Rambo identically.
sidebar:
  order: 4
---

## Pain it solves *(validated)*
Bruno has no first-party MCP ([#4806](https://github.com/usebruno/bruno/issues/4806)); Postman has MCP but not unified with git-native + a clean CLI; automation has meant Newman + a proprietary cloud. See [Feature 09](/rambo/features/09-agent-pillar-mcp-cli/).

## Differentiation (what sells)
**"Your AI agent runs and asserts on real requests — by name."** The same engine behind the GUI is the CLI *and* an MCP server, over an open git-native format. Be the client agents *reach for*.

## One engine, one result contract
GUI, CLI, and MCP all call the **same request engine** and get the same **machine-readable result**:
```json
{ "request": "Auth/login", "status": 200, "ok": true,
  "timing": { "ttfb_ms": 84, "total_ms": 210 },
  "headers": { "...": "..." }, "body": { "...": "..." },
  "assertions": [ { "name": "200", "passed": true } ],
  "env": "staging" }
```

## MCP server (`rambo mcp`)
- **Each saved request → a named tool.** Tool `name` = request path (`auth.login`); `description` = the request's name + docs; `inputSchema` = the request's `{{variables}}` as typed params.
- **Core tools:** `list_requests`, `run_request(path, vars)`, `run_collection(path)`, `get_response(id)`. Saved requests are also exposed as **MCP resources** (the collection files).
- Returns the result contract above — so an agent can *assert*, not just fire.
- **Transports:** stdio (local, default) + streamable-HTTP; **local-only by default**, no exposed port without opt-in.

## CLI (`rambo`)
```bash
rambo run auth/login --env staging --json      # one request, JSON to stdout
rambo run ./Auth --env staging                 # a folder/collection, in order
rambo mcp                                       # start the MCP server
```
- **Deterministic, machine-readable** (`--json` → the result contract), proper **exit codes** (non-zero on assertion/HTTP failure — sane CI defaults, unlike Newman), env injection, no hidden cloud calls.

## Tech choices
The official **MCP SDK** (Rust/TS) for the server; the CLI and MCP are thin wrappers over the shared engine (see [backend primitives](/rambo/backend/) — the same engine ships in desktop, extension, and CLI). Tool-schema generated from the request's variable set.

## Open decisions
- Which MCP transports to ship first (stdio is enough for local agents).
- How much request metadata becomes tool schema (over-exposing bloats the agent's context).
- Whether `run_collection` streams per-request results (better for long runs).
