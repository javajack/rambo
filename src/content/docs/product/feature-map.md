---
title: The Feature Map
description: The full feature-by-tier map, the infra-discipline guiding principle, and the v0.1 scope.
sidebar:
  order: 3
---

## Feature × tier

| Capability | Free (local) | Team (metered cloud) | Enterprise (self-hosted) |
|---|---|---|---|
| Protocols: REST/GraphQL/gRPC/WS/SSE | ✅ all | ✅ | ✅ |
| Collections, envs, scripting, assertions | ✅ | ✅ | ✅ |
| OpenAPI import, code-gen, keychain secrets | ✅ | ✅ | ✅ |
| **Git-sync** (user's own repo, $0 infra) | ✅ free forever | ✅ | ✅ |
| **MCP server + deterministic CLI** | ✅ | ✅ | ✅ |
| **★ Live LLM/agent-API testing** | ✅ core | ✅ + team shares | ✅ |
| Request diagnostics (DNS/TCP/TLS/timing/proxy) | ✅ local (core if resources allow) | ✅ + redacted shareable artifacts | ✅ |
| Collaboration | ✅ up to *X* members | metered beyond *X* | unlimited |
| Login | optional (only when syncing) | required | SSO |
| Real-time cloud sync, shared workspaces | — | ✅ | ✅ |
| Cloud runs (mock/monitor) · scheduled runs | — | 🤖 via your CI / ☁️ later | ☁️ later |
| Basic SSO/SAML | — | optional add-on | ✅ advanced |
| SCIM, RBAC, user groups, audit logs | — | — | ✅ |
| Self-host / on-prem / air-gap, data residency | — | — | ✅ |
| Support / SLA | community | standard | priority + SLA |

## Guiding principle — infra discipline

1. **Client-side first.** Client, LLM-request UX, MCP, CLI, local mock, token/cost calc all run on the user's machine. Zero backend.
2. **Team sync (Yjs + S3) is the first/primary backend.** Other backend services (hosted mock, public sharing, hosted docs portal, usage analytics) are **in scope** but sequenced as a [backend wave](/rambo/product/backend-wave/) after the core ships and sells.
3. **CI-offload** scheduled runs to the user's own CI (run our CLI) instead of a hosted scheduler.
4. **Only two features are deferred indefinitely:** hosted monitors/alerting and hosted LLM eval/observability.
5. **LLM testing = a client-side feature**, synced like any other data — never a backend observability platform.

## v0.1 scope (the P0 set)

Core HTTP + response viewer + auth basics + collections/environments + keychain secrets + git storage + **REST & SSE** + **client-side LLM streaming render** + **MCP server** + **deterministic CLI** + imports (cURL/OpenAPI/Postman) + a fast offline app shell + the open file format. Everything else is P1+.
