---
title: Enterprise Dealbreakers
description: The validated can't-buy-without list for org-wide adoption — data control, real deprovisioning, enforceable governance, and compliance — plus the honest gaps still to research.
sidebar:
  order: 1
---

Ranked by strength of validated evidence.

## 🔴 Data control / no forced cloud — *the strongest, and it's our wedge*
The #1 validated enterprise dealbreaker. *"My employer has a hard requirement that NOTHING I use can sync to the cloud. Full stop… an audited, fireable offense"* ([Kong/insomnia#6624](https://github.com/Kong/insomnia/issues/6624)); a 106-reaction comment: *"explicit policies against storing our data in someone else's cloud… we cannot audit it"* ([#6577](https://github.com/Kong/insomnia/issues/6577), 346 reactions). Kong's CTO conceded and restored local-only.
**→ Local-first + login-optional is an enterprise *requirement*.** Note: even Insomnia's restored "Local Vault" *still requires an account* — so a **truly no-account local tier remains differentiated.**

## 🔴 Real deprovisioning — SSO is necessary but *not sufficient*
Validated: for personal-account enterprises, disabling SAML SSO does **not** stop sign-in — *"SSO only applies to enterprise-owned resources"* (GitHub). True offboarding needs **SCIM auto-deprovision + a managed-identity / domain-capture boundary** (GitHub EMU, Atlassian domain-verified managed accounts). Seat reclamation depends on it.

## 🔴 Enforceable governance — no-public-sharing + secret-scanning
The CloudSEK leak (**30,000+ public Postman workspaces** exposing tokens/keys) validates demand for **admin-enforced org policies**: disable public sharing, mandatory secret-scanning, enforced SSO. See [secrets](/rambo/features/04-environments-variables-secrets/).

## 🟠 Compliance gates (segment-specific)
**FedRAMP** is a *statutory* blocker for U.S. federal cloud sales (FISMA + the 2023 FedRAMP Authorization Act); even the lightest path needs FedRAMP-authorized hosting. **The self-host sidestep:** when the customer self-hosts, much of data-residency / air-gap / FedRAMP-hosting becomes *their* responsibility, and our compliance surface shrinks (the PostHog pattern) — a structural advantage of [self-hosting](/rambo/features/18-self-hosting/).

## Honest gaps (not validated this round — flagged, not assumed)
These are plausible enterprise needs the research did **not** confirm with primary pain this pass — treat as open, research before betting:
- The exact bite of the **"SSO tax"** at our price point; **SCIM as an explicit named dealbreaker**; **custom RBAC roles**; **IP allowlisting**; **audit-log SIEM export**; the relative weight of **SOC 2 / ISO 27001 / HIPAA BAA / data residency**.
- ~~Enterprise sizing~~ — **now resolved**: ~50% of teams are 2-7, 84% of API teams 1-9 → free cap set to **up to 5** ([customer segments](/rambo/enterprise/customer-segments/) · [pricing](/rambo/business/pricing-and-plans/)). Residual: org-*workspace-seat* (vs immediate-team) distribution.
