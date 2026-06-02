---
title: Enterprise And Tenancy
description: Enterprise dealbreakers, org hierarchy, collaboration models, and segmentation.
sidebar:
  order: 1
---

## Enterprise dealbreakers

| Need | Why it matters | Minimum Rambo posture |
|---|---|---|
| SSO/SAML/OIDC | Central authentication | Enterprise tier, with mid-market-friendly basic SSO decision to validate |
| SCIM | Deprovisioning | Required for serious enterprise |
| RBAC/custom roles | Least privilege | Org/team/project role model |
| Audit logs | Compliance and incident review | Exportable, immutable-enough event log |
| Storage control | Cloud-restricted environments | Local-only, Git-only, cloud, hybrid policies |
| Self-hosting | Air-gap/residency/security review | Self-hosted sync/control plane package |
| DPA/MSA/security docs | Procurement | Standard docs before first enterprise pilots |
| SOC 2 evidence | Buyer trust | Timeline/cost to validate; do not promise before program exists |

## Tenancy model

Use this hierarchy:

`Organization -> Workspace/Team -> Project/Collection -> Request/Environment/Secret Grant -> Member/Service Account`

Billing is organization-level. Access is workspace/team/project-level. Personal workspaces are separate data ownership domains, not just hidden org folders.

## Collaboration models

| Model | Build status | Notes |
|---|---|---|
| Team workspace sync | Build | Core paid feature |
| Git-native local collaboration | Build | Free/trust wedge |
| Scoped guest access | Build later | Enterprise and agency workflows |
| Cross-org partner workspace | Validate | Useful but complex |
| Personal-to-personal sharing | Validate | Could create abuse/support load |
| Live co-editing/presence | Defer | Not strongly validated |

## Segmentation

- **Individuals:** no account, local speed, import, secrets, CLI.
- **Small teams:** free/cheap sync, reviewable diffs, encrypted shared secrets.
- **Mid-market:** SSO, roles, audit basics, domain/account boundaries.
- **Enterprise:** SCIM, storage control, self-host, audit export, support/SLA, procurement artifacts.
