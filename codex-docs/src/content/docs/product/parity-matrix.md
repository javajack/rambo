---
title: Parity Matrix
description: Features Rambo must match before differentiation matters.
sidebar:
  order: 1
---

## Must-match capabilities

| Feature | Why it is table stakes | Rambo requirement |
|---|---|---|
| REST HTTP client | Category baseline | Full method/body/header/cookie/proxy support |
| GraphQL | Common in every serious client | Schema introspection, variables, persisted queries |
| WebSocket | Multi-protocol baseline | Frame inspector, replay, auth, saved sessions |
| SSE | Required for LLM/API streams | Never drop first event; raw/rendered timeline |
| gRPC | Enterprise/backend baseline | Reflection, proto import, cross-file resolution |
| Auth helpers | Daily workflow | OAuth2 callback, PKCE, JWT, mTLS, AWS SigV4, API keys |
| Environments/variables | Core API-client workflow | Local values, shared encrypted values, scopes |
| Collections/folders | Core organization | Fast tree, search, tags, bulk actions |
| Import/export | Switching prerequisite | Postman, Insomnia, Bruno, OpenAPI, curl |
| Scripting/tests | Automation baseline | Safe sandbox, runner, CLI, migration shims |
| CLI/CI | Team workflow | Deterministic local runner and machine-readable output |
| Secrets | Trust-critical | OS keychain and encrypted sharing |
| Sync/collaboration | Paid wedge | Local/git free; backend sync paid; review/diff |
| RBAC/audit/SSO/SCIM | Enterprise buyability | Enterprise tier primitives from the start |

## Dealbreaker rule

If Rambo lacks any of REST, GraphQL, environments, auth helpers, import, collections, runner/CLI, or secrets, it is not a serious replacement. If it lacks SSE/LLM correctness, it loses the differentiating story.
