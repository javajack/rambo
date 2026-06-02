---
title: Business Case
description: Pricing, packaging, unit economics, and monetization logic.
sidebar:
  order: 1
---

## Revenue thesis

Rambo should monetize only the workflows where the vendor adds recurring value:

- backend sync;
- team collaboration and roles;
- encrypted sharing;
- audit trails;
- enterprise self-hosted support;
- optional cloud execution or AI evaluation resources if introduced later.

It should not meter local requests, local collections, local environments, local scripts, or local files. That would contradict the trust wedge.

## Pricing posture

| Tier | Suggested launch model | Rationale |
|---|---|---|
| Free | Local-first, no account, solo and small-team local/git collaboration | Competes with Bruno/Yaak/Hoppscotch and exploits Postman free-team resentment |
| Team | $8-$12/user/month annual plus backend-resource guardrails | Undercuts Postman Team $19 while leaving margin |
| Enterprise | $30-$40/user/month equivalent or annual contract | Undercuts Postman $49 and Insomnia $45 while packaging governance/storage control |

## Free cap

Free-up-to-5 remains defensible, not proven. Evidence supports a cap in the 3-5 range:

- Postman reports 84% of API teams work in groups of 1-9.
- Insomnia now offers free Git Sync projects for up to 3 users.
- Apidog secondary pricing profiles claim free up to 4 users.
- Postman Team is $19/user/month annual.

The cap should be instrumented and revisited once real workspace-seat data exists.

## Unit economics

Local-first architecture can keep infrastructure cost low, but support and enterprise compliance will dominate early cost. Avoid cloud AI features as default because AI token/compute costs can damage gross margin.

## Packaging rules

- Gate collaboration scale, not local creation.
- Gate governance and storage policy, not basic security.
- Do not make SSO a punitive "tax" if basic SSO is needed to win mid-market trust; gate advanced SSO/SCIM/domain capture/audit at Enterprise.
- Keep self-hosted as enterprise annual contract, not free community self-host, if closed-source is the locked model.
