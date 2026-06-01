---
title: "Feature 07 — Client-Side LLM Request Testing"
description: "Testing LLM/agent APIs as ordinary HTTP/SSE requests — streaming render, client-computed token/cost, tool-call inspection. Client-side only, no backend (D8)."
sidebar:
  order: 7
---

# Feature 07 — Client-Side LLM Request Testing

## What it is
First-class support for hitting LLM/agent APIs (OpenAI/Anthropic/Gemini-compatible, plus local models) **as ordinary HTTP/SSE requests**, with a response surface that understands LLM shapes: live token-by-token streaming render, Markdown/rich preview, tool-call/function-call inspection, and **client-computed** token counts, cost estimates, and TTFT/latency. **Scope: client-side only — no hosted eval/observability backend** ([D8](/rambo/strategy/decision-log/)); the data syncs like any other request.

## ⭐ Pain points & competitor complaints (validated)
- **No API client renders streaming LLM output well.** Bruno has generic SSE but **does not render streaming responses in real time and lacks Markdown preview** for streamed LLM content — open issue [usebruno/bruno#7835](https://github.com/usebruno/bruno/issues/7835).
- **Even "AI-forward" Insomnia 12 ships only three AI features** (AI mock-gen, AI commit messages, an MCP client) — **no** streaming render, **no** tool-call inspection, **no** token/cost tracking, **no** evals ([Kong/Insomnia AI docs](https://developer.konghq.com/insomnia/ai-in-insomnia/)).
- **Dedicated LLM tools solve a different problem.** Langfuse/Braintrust/Helicone are *production* observability/eval platforms (ClickHouse acquired Langfuse, Jan 2026) — they instrument deployed apps, not the **interactive, request-level debugging** moment an API client owns. See [Research-Findings §9](/rambo/evidence/research-findings/).

## Differentiation
Be the **first API client with genuine live LLM request debugging** — and do it **locally/privately** (no prompts leave the machine except to the provider the user chose). This reinforces the trust wedge instead of fighting it.

## UX
Dual **raw (SSE/JSON) ↔ rendered (Markdown)** view; token stream animates as it arrives; a **tool-call tree** (which tool, args, result); inline badges for **tokens / est. cost / TTFT / tok-per-sec**; provider-aware request templates so a chat/completions call is one click.

## Feasibility
**High, and cheap.** It is an SSE/HTTP client + response parsing + a client-side tokenizer and a local cost table. No backend, no new infra.

## Implementation & tech choices
- SSE/chunked-stream parsing; provider-specific response adapters (OpenAI `delta.content`, Anthropic events, Gemini).
- **Client-side token counting** via embeddable tokenizers (e.g., tiktoken/`tiktoken-rs`, Anthropic tokenizer); **cost estimates from a locally-bundled price table** (needs periodic update — flag).
- Tool-call parsing from `tool_calls`/function-call fields into a structured view.
- *Complexity flag:* the multi-provider response abstraction + keeping token/price tables current warrant a small dedicated implementation note later.

## Dependencies
Builds on **[06 · Protocols (SSE)](/rambo/features/06-protocols/)** and **[02 · Response viewer](/rambo/features/02-http-request-response/)**. Synced via **[01 · File format](/rambo/features/01-file-format-and-storage/)**.

## Open questions
- **In-client LLM-testing willingness-to-pay is unproven** — validate by shipping a thin prototype, not desk research ([Open-Questions Q1](/rambo/strategy/open-questions/)). Positioned as an **adoption hook**, not a revenue bet ([D7](/rambo/strategy/decision-log/)).
- Streaming-render basics are *catchable* by incumbents → defend with the fuller tool-call + cost + multi-provider depth.
