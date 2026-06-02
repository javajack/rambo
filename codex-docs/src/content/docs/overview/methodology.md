---
title: Methodology
description: Research rules, validation posture, confidence labels, and known limitations.
sidebar:
  order: 2
---

## Method

This pass followed `prompt.txt` as the research contract:

- prefer primary sources over summaries;
- verify fast-moving facts as of 2026-06-02;
- treat vendor claims as self-reported;
- separate validated pain from plausible product ideas;
- actively record refuted or weakened claims;
- keep open questions visible.

## Evidence classes

| Class | Examples | How used |
|---|---|---|
| Primary vendor | Pricing pages, official docs, changelogs, GitHub repos | Current pricing, product surface, security/storage claims |
| Public user evidence | GitHub issues/discussions, Reddit/HN when dated and specific | Pain recurrence, migration triggers, feature requests |
| Security research | CloudSEK, TruffleSecurity, vendor security docs | Secret-leakage risk and mitigation |
| Analyst/survey | Mordor, Postman State of API, JetBrains, SaaS benchmarks | Directional sizing and benchmark ranges |
| Secondary commentary | Blog comparisons, pricing trackers | Used only as corroboration, not as load-bearing proof |

## Confidence labels

- **High:** primary source or repeated independent evidence; current or date-stamped.
- **Medium:** credible source but incomplete, self-reported, narrow sample, or only partially current.
- **Estimate:** analyst/modelled number, vendor self-report, or inferred business metric.
- **Not validated:** searched but did not find enough evidence to promote the claim.
- **Refuted/weakened:** contrary evidence materially changes or kills the claim.

## Important limitations

This is desk research. It cannot prove willingness to pay for Rambo's exact product, the free cap that maximizes conversion, or enterprise security-review friction for a not-yet-known vendor. Those require prototypes, customer interviews, and sales discovery.
