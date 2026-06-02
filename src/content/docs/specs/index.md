---
title: Engineering Specs — Overview
description: The buildable layer beneath the feature deep-dives, and the concrete, hard-to-copy capabilities that actually sell — each traced to a validated pain.
sidebar:
  order: 0
---

The [feature deep-dives](/rambo/features/) say *what* and *why*. This section is the layer below: *how, precisely* — data models, protocols, interfaces, and algorithms — enough to start building. Each spec traces to a **validated pain** ([customer pain](/rambo/opportunity/customer-pain/)) and a **proven technique**, and flags open design decisions honestly.

## The differentiation that sells

Strategy doesn't sell; **demoable capability** does. These are the concrete things a developer can *see* in 30 seconds that no incumbent does well — each is a validated pain turned into a feature, and each is made buildable by a spec here:

| "What sells" (the demo) | Beats | Spec |
|---|---|---|
| **"Import from Postman and *nothing* breaks"** | everyone loses data on import | [Import engine](/rambo/specs/08-import-engine/) |
| **"Share a secret with your team that *still* can't leak"** | Postman leaks, Bruno can't share | [Secrets scheme](/rambo/specs/03-secrets-encryption/) |
| **"Your AI agent runs and asserts on real requests"** | nobody unifies MCP + a clean CLI | [Agent interface](/rambo/specs/04-agent-interface/) |
| **"Actually *debug* an LLM API — live tokens, tool-calls, cost"** | unowned surface | [LLM engine](/rambo/specs/05-llm-testing-engine/) |
| **"Git diffs that read like prose"** | Bruno's `seq` renumber mess | [File format](/rambo/specs/01-file-format/) |
| **"Paste a 50 MB response — it stays smooth"** | Postman freezes (admits it) | [File format](/rambo/specs/01-file-format/) + app shell |
| **"Modern scripting, no lock-in, identical in CI"** | Postman's restricted sandbox + Newman's leak | [Scripting sandbox](/rambo/specs/07-scripting-sandbox/) |
| **"Streaming that never drops the first token"** | Postman SSE drops it (#13537) | [LLM engine](/rambo/specs/05-llm-testing-engine/) |

The unifying thesis: **each of these is hard to copy not because it's clever, but because it's a deliberate architectural choice the incumbents can't make without breaking their own model** (Postman can't be local-first; Bruno can't easily add an encrypted-yet-shareable backend; cloud tools can't be offline). That's what makes the differentiation durable.

## The specs

1. [Open file format & storage](/rambo/specs/01-file-format/)
2. [Sync protocol & data model](/rambo/specs/02-sync-protocol/)
3. [Secrets encryption (shareable-yet-encrypted)](/rambo/specs/03-secrets-encryption/)
4. [Agent interface (MCP + CLI + machine-readable I/O)](/rambo/specs/04-agent-interface/)
5. [LLM testing engine](/rambo/specs/05-llm-testing-engine/)
6. [Protocols & gRPC](/rambo/specs/06-protocols-grpc/)
7. [Scripting sandbox](/rambo/specs/07-scripting-sandbox/)
8. [Import-fidelity engine](/rambo/specs/08-import-engine/)
9. [UX & information architecture](/rambo/specs/09-ux-and-ia/)

:::note[Status]
These are **v0 design specs** — enough to begin implementation and to surface the real engineering risk early. Each names the open decisions that need a spike or a prototype before code is final.
:::
