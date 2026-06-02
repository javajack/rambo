---
title: Feature Deep Dives
description: Every Rambo feature, dependency-ordered and research-backed — what it is, the validated competitor complaints, the differentiation, feasibility, and implementation/tech choices.
---

Each feature page carries: *what it is · validated competitor pain (cited) · differentiation · UX · feasibility · implementation & tech choices · dependencies · open questions.* They're **dependency-ordered** — each builds on the last.

:::tip[The infra discipline these reflect]
**Client-side first.** One backend only — **team sync**. Scheduled runs offload to the user's CI. Only **two** features are deferred indefinitely: hosted monitors/alerting and hosted LLM eval/observability. Everything else is committed; backend-heavy features ship as a sequenced "backend wave." See [the feature map](/rambo/product/feature-map/).
:::

## Core-offline cluster
1. [File format & local storage](/rambo/features/01-file-format-and-storage/) — the foundation everything serializes into
2. [HTTP request/response engine & UX](/rambo/features/02-http-request-response/) — the daily driver
3. [Collections & organization](/rambo/features/03-collections-and-organization/)
4. [Environments, variables & secrets](/rambo/features/04-environments-variables-secrets/) — *the standout pain*
5. [Authentication](/rambo/features/05-auth/)
6. [Protocols (GraphQL/WS/SSE/gRPC)](/rambo/features/06-protocols/)
7. [Client-side LLM request testing](/rambo/features/07-client-side-llm-testing/) — *the wedge*
8. [Scripting & testing](/rambo/features/08-scripting-and-testing/)
9. [Agent pillar — MCP server + CLI](/rambo/features/09-agent-pillar-mcp-cli/) — *agent-native*
10. [Import & migration](/rambo/features/10-import-and-migration/) — *the migration wedge*
11. [App shell & UX foundation](/rambo/features/11-app-shell-and-ux/)
- *companion:* [Request diagnostics (adjacent network utilities)](/rambo/features/19-request-diagnostics/) — DNS/TCP/TLS/timing/proxy checks beside a failing request; build into core *if resources allow*, else a fast-follow (numbered 19 as adjacent scope, not because it ships last)

## Team-sync cluster
12. [Real-time team sync](/rambo/features/12-realtime-team-sync/) — the one backend
13. [Collaboration & merge/conflict UX](/rambo/features/13-collaboration-and-merge-ux/)
14. [Shared workspaces](/rambo/features/14-shared-workspaces/)

## Enterprise cluster
15. [SSO & identity](/rambo/features/15-sso-and-identity/)
16. [RBAC & governance](/rambo/features/16-rbac-and-governance/)
17. [Audit & compliance](/rambo/features/17-audit-and-compliance/)
18. [Self-hosting](/rambo/features/18-self-hosting/)
