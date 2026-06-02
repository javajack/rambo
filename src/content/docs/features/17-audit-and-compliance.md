---
title: "Feature 17 — Audit & Compliance"
description: "Audit logs, data residency, and the SOC 2 / ISO posture — with self-hosting as a compliance-burden-reducing advantage."
sidebar:
  order: 17
---

# Feature 17 — Audit & Compliance

## What it is
Enterprise audit and compliance surface: **audit logs** (who did what, when), **exportable** audit trails, **data residency** options, and the organizational **SOC 2 / ISO 27001** posture buyers require.

## ⭐ Pain points & competitor complaints (validated)
- Enterprises **gate purchase on audit logs + SOC 2/ISO** and a security questionnaire; without them, deals stall ([Research-Findings §11](/rambo/evidence/research-findings/)).
- Regulated buyers need **data residency / air-gap** that cloud-only Postman serves poorly — a verified opening for a self-hostable entrant.

## Differentiation
**Self-hosting reduces *our* compliance burden** (verified via PostHog): when the customer self-hosts, **they** become Data Controller *and* Processor and **we have no access to their end-user data** — removing our GDPR obligations to those users and shrinking our audit surface, while *also* giving regulated buyers exactly what they want. A double win unavailable to cloud-only competitors. See [05 · GTM & Moat](/rambo/gtm/motion/).

## UX
Admin-viewable, filterable, **exportable** audit log; residency/region selection for managed tier; a Trust Center surfacing SOC 2 / pen-test reports.

## Feasibility
- **Audit logs:** medium — an append-only event log on the team backend.
- **SOC 2 Type II / ISO 27001:** a **certification program**, not a code feature — cost & timeline are an [open question (Q2)](/rambo/strategy/open-questions/) (industry rule-of-thumb, *unverified*: ~$20–100k, 6–12 months; compliance-automation via Vanta/Drata/Secureframe).

## Implementation & tech choices
- Append-only audit event store on the team backend; export (CSV/JSON/SIEM).
- For **self-host**, audit logs stay entirely on the customer's infra (no exfiltration).
- We still need SOC 2 for **our own** managed/control-plane — scope it to first enterprise deals.

## Operating artifacts (the non-product compliance layer)
Enterprise buyers don't purchase on product features alone; a closed-source desktop vendor also needs a minimum operating package. Beyond the SOC 2 / ISO / VPAT / residency items above, the validated checklist adds: **ToS/EULA + privacy policy** (covering local data, sync data, telemetry, and subprocess/agent access), **DPA/MSA templates**, a **security overview + architecture diagram**, a **vulnerability disclosure policy (VDP)**, an **incident-response process**, **SBOM / dependency disclosure**, **code-signing & release integrity**, a **data deletion/export process**, and **support/SLA + billing/tax operations**. Self-hosting *reduces* data-processing exposure but does **not** remove buyer diligence — security practices, dependency controls, incident process, and contract terms are still required. *(The full finance/legal/security-program/support/DevRel build-out is a [deliberately deferred ops layer](/rambo/strategy/roadmap/); this is the compliance-critical subset.)*

## Dependencies
Requires **[12 · backend](/rambo/features/12-realtime-team-sync/)** + **[16 · RBAC](/rambo/features/16-rbac-and-governance/)**; tightly linked to **[18 · self-hosting](/rambo/features/18-self-hosting/)**.

## Open questions
- SOC 2/ISO **cost & timeline** (Q2); full compliance checklist beyond IAM — pen tests, audit export formats, residency, air-gap, VPAT (Q5). See [Open-Questions](/rambo/strategy/open-questions/).
