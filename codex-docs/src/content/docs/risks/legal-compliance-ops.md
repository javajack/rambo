---
title: Legal Compliance Ops
description: Non-product requirements that affect enterprise viability.
sidebar:
  order: 2
---

## Required operating layer

Rambo cannot sell enterprise on product features alone. The minimum operating package includes:

- ToS and EULA for closed-source desktop distribution.
- Privacy policy that explains local data, sync data, telemetry, and subprocess/agent access.
- DPA/MSA templates.
- Security overview and architecture diagram.
- Vulnerability disclosure policy.
- Incident response process.
- SBOM or dependency disclosure strategy.
- Code signing and release integrity.
- Data deletion/export process.
- Support policy and SLA for enterprise.
- Billing/tax/subscription operations.
- Accessibility/VPAT decision if enterprise/public-sector buyers are targeted.

## Telemetry policy

Default posture should be:

- local use works with telemetry disabled;
- product telemetry opt-in or clearly disclosed;
- no request bodies, headers, secrets, URLs, or environment values;
- local redaction before any event leaves device;
- enterprise admin policy can disable telemetry.

## Compliance caveat

Self-hosting lowers some vendor data-processing exposure, but it does not remove buyer diligence. Enterprise buyers still ask for security practices, dependency controls, incident processes, contract terms, and sometimes certification evidence.
