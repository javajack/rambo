---
title: "Spec 05 — LLM Testing Engine (Client-Side)"
description: A provider-normalized, client-side engine for live LLM/agent-API debugging — streaming render that never drops a token, tool-call inspection, and token/cost — with zero backend.
sidebar:
  order: 5
---

## Pain it solves *(validated)*
No API client debugs LLM APIs well: Postman's SSE viewer **drops the first event** ([#13537](https://github.com/postmanlabs/postman-app-support/issues/13537)); Insomnia ships no LLM testing; dedicated tools (Langfuse) do *production* observability, not interactive debugging. See [Feature 07](/rambo/features/07-client-side-llm-testing/).

## Differentiation (what sells)
**"Actually debug an LLM API"** — live token-by-token render, a tool-call tree, and real-time token/cost — **locally**, no prompts leaving the machine except to the provider you chose. Reinforces the trust wedge. **Client-side only — no server-side LLM infra** ([D8](/rambo/strategy/decision-log/)).

## Architecture
A pipeline, entirely on-device:

```
HTTP/SSE response ─▶ Provider Adapter ─▶ normalized event stream ─▶ { render · metrics · assertions }
```

### 1. Streaming parser
A correct **SSE / chunked** parser with an **append-only** render that **never drops the leading event** and tolerates rapid bursts + appended params. Dual view: **raw (SSE/JSON) ↔ rendered (Markdown)**.

### 2. Provider adapters (the normalization layer)
A trait per provider maps wire shapes to one event model:
```
ProviderAdapter:
  parse_chunk(bytes) -> [Event]      # Event = TextDelta | ToolCallDelta | Usage | Done
```
Adapters: **OpenAI** (`choices[].delta.content`, `tool_calls`), **Anthropic** (`content_block_delta`, `message_delta.usage`), **Gemini**, **OpenAI-compatible/local** (Ollama, vLLM). New providers = one adapter.

### 3. Tool-call inspection
Concatenate `tool_call`/function deltas into a structured **tool-call tree** (tool name, streamed args, result) — the agentic-debug view nobody ships.

### 4. Token & cost
**Client-side tokenizer** (`tiktoken-rs`, Anthropic tokenizer) for prompt tokens; completion tokens from the stream/`usage`. Cost from a **bundled, versioned price table** (JSON, shipped offline; optionally refreshed). Surfaces **TTFT, tokens/sec, latency, est. cost** as badges.

### 5. Assertions / evals
Lightweight in-client assertions on the final output, run in the [scripting sandbox](/rambo/specs/07-scripting-sandbox/): `rambo.expect(out).toContain("Bern")`, JSON-shape checks, regex. (Deep eval frameworks stay out of scope — that's the dedicated-tool layer.)

## Tech choices
SSE parser; provider-adapter trait; `tiktoken-rs`; a versioned price-table JSON. All reused across desktop/CLI via the [shared engine](/rambo/backend/).

## Open decisions
- Price-table freshness: ship-only (pure offline) vs. optional signed auto-update (current costs, slight network) — a trust/UX tension.
- How far in-client evals go before deferring to a dedicated tool.
- In-client willingness-to-pay is unproven ([Q1](/rambo/strategy/open-questions/)) — this is the **adoption hook**, not the revenue bet.
