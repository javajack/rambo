---
title: "Spec 08 — Import-Fidelity Engine"
description: High-fidelity, reportable import from Postman/Insomnia/OpenAPI/cURL/HAR — the "import and nothing breaks" migration wedge, with a variable + pm.* transpiler.
sidebar:
  order: 8
---

## Pain it solves *(validated)*
Every tool loses data on import: Postman→Insomnia silently breaks variable references ([#6204](https://github.com/Kong/insomnia/issues/6204)); Postman→Bruno lossily translates `pm.*` scripts ([#3061](https://github.com/usebruno/bruno/issues/3061)). See [Feature 10](/rambo/features/10-import-and-migration/).

## Differentiation (what sells)
**"Import from Postman and *nothing* breaks."** A concrete, demonstrable reason to switch — the single highest-leverage GTM feature. Plus round-trip export, so users never feel trapped (reinforces the no-lock-in trust story).

## The pipeline
```
source (Postman v2.1 | Insomnia | OpenAPI | HAR | cURL)
  ─▶ Parser            → neutral intermediate model
  ─▶ Variable transpiler → {{var}}, {{_.var}}, hyphenated names handled
  ─▶ Script transpiler  → pm.* → rambo.* (AST-based, not regex)
  ─▶ Writer             → our open file format
  ─▶ Fidelity Report    → what translated cleanly / what needs review
```

- **Parsers** per source format → one neutral model (auth, env, scripts, bodies preserved).
- **Variable-syntax transpiler** — the exact thing Insomnia gets wrong; normalize all variable dialects.
- **`pm.*` script transpiler** — AST-based translation to `rambo.*`, with a **coverage matrix**; anything unsupported is flagged *"needs manual review"* (never silently dropped). Fallback: run it through the [`pm.*` compat shim](/rambo/specs/07-scripting-sandbox/) instead of transpiling.
- **Fidelity report** — the anti-Postman move: tell the user exactly what came over and what to check, instead of a silent lossy import.
- **Round-trip export** back to Postman/OpenAPI/cURL.

## Tech choices
Per-format parsers; an **AST-based** `pm.*` transpiler (reusing the sandbox's parser); a **regression test corpus** of real public Postman/Insomnia collections to measure fidelity %.

## Open decisions
- Target fidelity % and the published coverage matrix.
- **Transpile vs. shim** — translate `pm.*` to `rambo.*` (clean, native) vs. just run it under the compat shim (zero translation loss, but keeps Postman idioms). Likely **both**: shim for instant fidelity, optional transpile for cleanliness.
