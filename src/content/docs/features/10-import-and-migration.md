---
title: "Feature 10 — Import & Migration"
description: "High-fidelity import from Postman/Insomnia/Bruno/OpenAPI/cURL/HAR — the migration wedge, where incumbents lose data on the way in."
sidebar:
  order: 10
---

# Feature 10 — Import & Migration

## What it is
Importing/migrating collections from Postman, Insomnia, Bruno, OpenAPI, cURL, and HAR with **high fidelity** — preserving variables, auth, environments, and pre/post scripts. The smoother the switch, the more of the incumbents' frustrated users you capture (the **migration wedge**).

## ⭐ Pain points & competitor complaints (validated)
- **Postman→Insomnia silently breaks variable references.** Postman `{{my-variable}}` imports as-is, but Insomnia (Nunjucks) needs `{{ _['my-variable'] }}` for hyphenated names — so references **fail to resolve / evaluate to NaN** ([Kong/insomnia#6204](https://github.com/Kong/insomnia/issues/6204), corroborated by #1172/#2051/#1666).
- **Postman→Bruno lossily translates scripts.** Importing certain `pm.*` methods triggers a *"Warning: Some commands were not translated"* dialog ([usebruno#3061](https://github.com/usebruno/bruno/issues/3061); `pm.collectionVariables.unset()/.has()` weren't mapped — later fixed in [PR#3324](https://github.com/usebruno/bruno/pull/3324)); users still report the `pm` object not fully migrating for pre-request scripts ([#5643](https://github.com/usebruno/bruno/issues/5643)), and complex scripts "need to be rewritten manually." *(Framing: partial/lossy fidelity on specific constructs — not wholesale failure.)*

## Differentiation
A **high-fidelity, bidirectional import engine**: variable-syntax transpilation (handle hyphenated/scoped vars), the most complete `pm.*` → our-scripting translation in the market, and full preservation of auth + environments. "Import from Postman and *nothing breaks*" is a concrete, demonstrable switching incentive.

## UX
One-click import with a **fidelity report** (what translated cleanly, what needs review), not a silent lossy import; round-trip export so users never feel trapped (reinforces the anti-lock-in trust story).

## Feasibility
**Medium-high**, but the script-translation layer is the hard part (mapping a foreign scripting API to ours).

## Implementation & tech choices *(complex → dedicated deliberation note)*
- **Import-fidelity engine**: format parsers (Postman v2.1 schema, Insomnia export, OpenAPI, HAR, cURL) → our [01 open format](/rambo/features/01-file-format-and-storage/); a **variable-syntax transpiler**; a **`pm.*` → script transpiler** with a coverage matrix + explicit "needs manual review" flags.
- This engine is complex enough to warrant its own implementation note (coverage targets, test corpus of real collections).

## Dependencies
Writes [01 file format](/rambo/features/01-file-format-and-storage/) + [03 collections](/rambo/features/03-collections-and-organization/) + [04 env/secrets](/rambo/features/04-environments-variables-secrets/); script translation depends on [08 scripting](/rambo/features/08-scripting-and-testing/).

## Open questions
- Target fidelity % and the `pm.*` coverage matrix; whether to translate scripts or run a Postman-compat shim. (Postman/Insomnia script specifics deepen when P2 lands.)
