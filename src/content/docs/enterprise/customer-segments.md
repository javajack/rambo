---
title: Customer Segments
description: How validated needs diverge across individual → small team → mid-market → enterprise, what current tools get wrong for each, and how Rambo's tiers map to them.
sidebar:
  order: 4
---

Needs diverge sharply by segment — vendors encode it in pricing (Postman's four tiers), and each segment has a *specific* validated pain current tools mishandle.

| Segment | Core validated need | What tools get wrong today | Rambo tier |
|---|---|---|---|
| **Individual** | local/offline, **no account**, fast, no paywalled basics | forced cloud/account; Postman now **paywalls 2-person collab** | **Free** (local, login-optional) |
| **Small team** | cheap, frictionless shared collaboration | Postman **removed free team collab (Mar 2026)** → fresh exodus | **Free up to X** → metered Team |
| **Mid-market** | SSO, RBAC, the personal-vs-work / contractor boundary, more seats | **no account-merge**; single-identity assumptions; contractor scoping | **Team** + governance |
| **Enterprise** | compliance, governance, SSO/SCIM, audit, **data control / self-host** | un-auditable cloud violates policy ([dealbreakers](/rambo/enterprise/dealbreakers/)) | **Enterprise** (self-host) |

## What each gets wrong (validated)
- **Individuals** are punished by forced cloud + account, and now by Postman paywalling basic 2-user collaboration.
- **Small teams** just lost free collaboration entirely (Postman Mar 2026) — *"collaboration went from a free feature to a metered resource overnight,"* driving surging "Postman alternative" searches.
- **Mid-market & contractors** are hurt by the no-account-merge / personal-vs-work boundary and historical single-team locks.
- **Enterprises** need compliance-grade auditability that un-auditable third-party cloud structurally violates.

## The implication for Rambo
Our [three tiers](/rambo/product/product-tiers/) map cleanly onto this divergence, and the wedge for each is the incumbents' *specific* mistake:
- **Win individuals** with true local-first + no-account + free basics (the thing Postman/Insomnia broke).
- **Win small teams** by giving free small-team collaboration (the thing Postman just removed).
- **Win mid-market** with a sane personal-vs-work boundary + contractor scoping (the thing nobody does well).
- **Win enterprise** with self-host + data control + governance (the thing cloud-first tools *can't* offer).

## Honest gap
The **quantitative** segment sizing — org-size distribution and typical seat counts per segment — is **unquantified** (E1's Q4 returned nothing). Needed to calibrate the free-*X*-member threshold and packaging. See [Open Questions](/rambo/strategy/open-questions/).
