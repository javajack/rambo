---
title: "Feature 09 — Agent Pillar: MCP Server + Deterministic CLI"
description: "Making the client agent-drivable — a first-party MCP server that exposes saved requests as callable tools, and a deterministic, machine-readable CLI for CI and AI agents."
sidebar:
  order: 9
---

# Feature 09 — Agent Pillar: MCP Server + Deterministic CLI

## What it is
Two client-side capabilities that make the product **agent-drivable**: (1) a **first-party MCP server** that exposes each saved request in a collection as a named, callable tool, so AI coding agents (Claude Code, Cursor, Copilot) can invoke real requests by name; and (2) a **deterministic CLI** with machine-readable (JSON) I/O that runs requests/collections — the CI runner *and* the interface agents script against.

## ⭐ Pain points & competitor complaints (validated)
- **Bruno has no first-party MCP server** — only a community bolt-on ([djkz/bruno-api-mcp](https://github.com/djkz/bruno-api-mcp)); official support is still an open issue ([usebruno/bruno#4806](https://github.com/usebruno/bruno/issues/4806)). The window is open but closing.
- **Postman already ships MCP** (built-in client + AI Tool Builder) — so "MCP exists" is *not* a differentiator; the edge is **MCP unified with git-native + local-first + a clean CLI** ([Research-Findings §2](/rambo/evidence/research-findings/)).
- **Yaak shipped an agent CLI + MCP server** ("designed for AI agents like Claude and Codex") — it's the competitor that validates demand *and* the bar to clear; our edge over it is git-native storage + deeper request→tool fidelity.
- **RESTK validates agent-safe privacy** — embedded MCP alone is not enough; agents need schema-only modes, synthetic examples, credential redaction, collection gating, and audit trails.
- **ApiArk lists an MCP server package** in an MIT local-first/Git-native repo, further weakening "we have MCP" as a standalone claim.
- Postman's automation has historically meant **Newman + a proprietary cloud**; developers want a **deterministic, local, scriptable** runner without lock-in.

## Differentiation
Become **the API client AI agents can safely use**: every saved request is both a human artifact *and* an agent tool, over an **open git-native format** ([01](/rambo/features/01-file-format-and-storage/)), driven by a **deterministic CLI** with stable JSON output, redacted context, explicit permissions, and audit trails. No cloud account required.

## UX
"Expose as MCP tool" toggle per request/folder; an MCP endpoint the agent connects to; CLI verbs like `run <request>`, `run <collection>`, `--json`, `--env`, exit codes for CI; identical results in GUI, CLI, and MCP. Agent mode includes redaction previews, schema-only output, synthetic examples, and a visible audit log.

## Feasibility
**High.** MCP server + CLI both wrap the same client-side request engine; no backend. Reuses the collection model and file format directly.

## Implementation & tech choices
- MCP server implementing the standard transport(s); auto-generate one tool per saved request (name, description, params from the request's variables) — the proven [bruno-api-mcp](https://github.com/djkz/bruno-api-mcp) pattern, made native.
- CLI sharing the core engine; **deterministic, machine-readable output** (stable JSON), proper exit codes, env injection.
- Agent-safe response adapter: redact credentials/PII, summarize schemas, generate synthetic examples, and attach request/response provenance IDs.
- Permission model: tool exposure is denied by default for mutating requests and gated by collection/environment scope.
- *Complexity flag:* MCP transport choices (stdio / streamable-HTTP) and the request→tool schema mapping deserve a dedicated implementation note.

## Dependencies
Depends on **[03 · Collections](/rambo/features/03-collections-and-organization/)** + **[01 · File format](/rambo/features/01-file-format-and-storage/)** + the **[02 · request engine](/rambo/features/02-http-request-response/)** + **[04 · Secrets](/rambo/features/04-environments-variables-secrets/)**. Enables CI use and agent workflows; complements **[07 · LLM testing](/rambo/features/07-client-side-llm-testing/)**.

## Open questions
- Which MCP transports to support first; how much request metadata to surface as tool schema. Monitor Bruno #4806 for incumbent catch-up.
