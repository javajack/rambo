---
title: Roadmap
description: The first 12 months — wedge-first, then teams, then enterprise, with the de-risking spikes.
sidebar:
  order: 4
---

## First 12 months

1. **v0.1 = the wedge, not the platform.** A lean local-first client + **full client-side LLM/agent-API testing** + the **MCP server** + the **deterministic CLI**. Free, login-optional. ([feature map → v0.1 scope](/rambo/product/feature-map/))
2. **Match table-stakes** — protocols, collections, OpenAPI import — enough to be credible.
3. **Distribution push** — VS Code Marketplace + CLI + MCP registries + the trust narrative.
4. **Team tier** — real-time cloud sync + seat/consumption metering, once adoption shows.
5. **Defer enterprise** until team pull, then SSO/SCIM/compliance + self-host.
6. **Run the de-risking spikes** — sync cost at scale, SOC 2 path/cost, Tauri-vs-Electron benchmarks, and (via prototype, not desk research) in-client LLM-testing willingness-to-pay.

## Sequencing logic
The build order mirrors the [dependency-ordered features](/rambo/features/): the open file format and request engine first (everything serializes into them), then the agent surface and the LLM-testing wedge (the reasons to switch), then the one backend (team sync) for monetization, then enterprise governance.

## What "done" looks like at each stage
- **v0.1:** a developer can switch from Postman, import their collections losslessly, debug an LLM API better than anywhere else, and drive it from an agent — all offline, no account.
- **Team:** a small team collaborates in real time without leaking secrets or surrendering their data.
- **Enterprise:** a regulated org self-hosts it, with SSO/RBAC/audit, and *their* data never touches our infra.

See the [risk ledger](/rambo/strategy/risk-ledger/) for what could go wrong and [open questions](/rambo/strategy/open-questions/) for what to validate first.
