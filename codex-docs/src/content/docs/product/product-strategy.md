---
title: Product Strategy
description: What Rambo should actually build and avoid.
sidebar:
  order: 3
---

## Positioning

Rambo should be positioned as:

> The agent-safe, migration-perfect, local-first API client for serious human and agent workflows: no account until sync, secrets stay local, agents see sanitized structure instead of real credentials, imports are faithful, LLM streams are debuggable, and teams can collaborate without surrendering their workspace to a cloud silo.

## Product principles

1. **Local truth first.** Every object must have a durable local representation.
2. **No surprise sync.** Users explicitly choose what leaves the device.
3. **Secrets are not variables.** Treat secrets as encrypted capabilities, not masked strings.
4. **Agents get sanitized, deterministic interfaces.** CLI/MCP operations must be permissioned, reproducible, redacted, and auditable.
5. **Streaming is a first-class protocol.** LLM/SSE output must be timestamped, replayable, and inspectable.
6. **Migration is product.** Import fidelity is a core feature because switching is the business.
7. **Local-first is not enough.** ApiArk, Yaak, Voiden, Bruno, and LiteClient already claim local/file/Git/no-login workflows; Rambo must win on completeness, safety, enterprise packaging, and polish.

## MVP scope

- Local workspace file format.
- REST/GraphQL/SSE/WebSocket baseline.
- OAuth2/API key/JWT/Bearer/Basic auth.
- Environments and variables.
- OS-keychain secrets.
- Postman/Insomnia/Bruno/OpenAPI/curl import.
- Virtualized response viewer.
- LLM stream debugger for OpenAI-compatible SSE.
- Local CLI runner.
- Read-only MCP server for listing/sending saved requests, then mutation tools behind explicit permissions.
- Agent-safe response mode: schema extraction, synthetic examples, credential/PII redaction, and per-tool audit log.
- Collection and environment gating for agent access.

## Paid v1 scope

- Backend sync for shared workspaces.
- Review/diff before accepting remote changes.
- Encrypted shared secrets.
- Team roles.
- Audit trail for synced objects.
- Audit trail for agent tool calls when team sync is enabled.
- Usage limits only on backend-synced/cloud resources.

## Enterprise v1 scope

- SSO/SAML/OIDC.
- SCIM.
- Domain capture.
- RBAC/custom roles.
- Audit export.
- Storage policy: local-only, Git-only, cloud-only, hybrid.
- Self-hosted sync backend.
- Security documentation and DPA/MSA support.
