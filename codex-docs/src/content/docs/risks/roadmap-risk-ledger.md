---
title: Roadmap And Risk Ledger
description: Sequencing and honest risks.
sidebar:
  order: 1
---

## Roadmap sequence

### Phase 0: Proof spikes

- Import fidelity spike for Postman and Insomnia.
- LLM SSE viewer prototype against Ollama/OpenAI-compatible streams.
- Large-response performance benchmark.
- Tauri/Rust/React shell benchmark.
- OS keychain and encrypted shared-secret prototype.

### Phase 1: Local MVP

- Local workspace and file format.
- REST/GraphQL/SSE/WebSocket.
- Auth helpers and environments.
- Secrets local-by-default.
- Import from top incumbents.
- CLI runner.

### Phase 2: Agent-native depth

- Local MCP server.
- Deterministic request execution.
- LLM stream trace export.
- CI regression runner for LLM/API traces.

### Phase 3: Team paid

- Backend sync.
- Review/diff/merge.
- Team roles.
- Encrypted shared secrets.
- Audit history for synced objects.

### Phase 4: Enterprise

- SSO/SCIM/RBAC/domain capture.
- Storage control.
- Self-hosted sync.
- Audit export and security program.

## Risk ledger

| Risk | Severity | Status | Mitigation |
|---|---|---|---|
| Yaak already covers much of thesis | High | Validated | Differentiate on LLM trace depth, team/enterprise, import |
| Postman copies LLM stream UX | High | Plausible | Build full local trace/provenance, not just render Markdown |
| Closed-source trust friction | Medium-high | Plausible | Strong privacy docs, no-account local, signed builds, SBOM/security review |
| In-client LLM debugging WTP | High | Not validated | Prototype and measure usage/interviews |
| Free cap too generous | Medium | Not validated | Instrument team size, adjust before broad paid launch |
| Enterprise compliance cost | Medium | Not validated | Avoid certification promises; sell self-host/control first |
| Import complexity underestimated | High | Validated category risk | Treat import as product and test with real exported workspaces |
| Sync conflict complexity | Medium-high | Validated category risk | Keep CRDT scope narrow; review UX first |
