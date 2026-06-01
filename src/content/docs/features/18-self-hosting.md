---
title: "Feature 18 — Self-Hosting"
description: "Customer-run deployment of the team-sync backend (Docker/K8s/air-gap) — the enterprise on-prem story, reusing the same Yjs+S3 backend at ~$0 infra cost to us."
sidebar:
  order: 18
---

# Feature 18 — Self-Hosting

## What it is
The ability for an enterprise to run the **team-sync backend on their own infrastructure** — Docker / Kubernetes / air-gapped — with their own object storage, so collaboration data never leaves their network. Recurring license + support.

## ⭐ Pain points & competitor complaints (validated)
- **Regulated / security-conscious orgs can't use cloud-only tools.** Postman's cloud-first model is a non-starter for air-gapped or data-residency-bound teams — a verified opening ([Research-Findings §1, §11](/rambo/evidence/research-findings/)).
- The forced-cloud trust wound (#1 pain) is most acute at enterprises with strict data-egress rules.

## Differentiation
The **same Yjs + S3 sync backend** built for the team tier **self-hosts unchanged** — so on-prem costs us **~$0 infra** while commanding the highest price. And it **shrinks our compliance burden** (customer = Controller + Processor; [17](/rambo/features/17-audit-and-compliance/)). One architecture serves free (git-sync), team (managed sync), and enterprise (self-host).

## UX
A documented Docker image / Helm chart; license-key activation; admin points it at their IdP ([15](/rambo/features/15-sso-and-identity/)) and their S3/MinIO; upgrades on their schedule.

## Feasibility
**Medium** — packaging + license enforcement + support, but the backend is **designed self-hostable from day one** (the y-sweet/object-storage model), so no architectural retrofit.

## Implementation & tech choices
- Distribute the Rust sync server as a container/Helm chart; customer-supplied S3/MinIO; no hard dependency on our cloud.
- **License-key + support** model; **withhold at-scale management/governance features** from any free self-host edition (the verified [Plausible](https://plausible.io/blog/community-edition) lesson — self-host is a trust/adoption channel, not a donation-funded revenue line).
- *Complexity flag:* air-gap update mechanism, license enforcement offline, and support SLAs need a dedicated note.

## Dependencies
Is the deployment mode of **[12 · team sync](/rambo/features/12-realtime-team-sync/)**; underpins **[15 SSO](/rambo/features/15-sso-and-identity/)/[16 RBAC](/rambo/features/16-rbac-and-governance/)/[17 audit](/rambo/features/17-audit-and-compliance/)** for enterprise.

## Open questions
- Air-gap specifics, offline license enforcement, support model; SOC 2 for our own control plane ([Open-Questions Q2/Q5](/rambo/strategy/open-questions/)).
