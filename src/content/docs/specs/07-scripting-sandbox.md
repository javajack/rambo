---
title: "Spec 07 — Scripting Sandbox & Runner"
description: A modern, non-leaking, lock-in-free scripting engine — real async, ESM/CDN imports, a pm.* compat shim, and a runner that survives thousands of requests.
sidebar:
  order: 7
---

## Pain it solves *(validated)*
Postman's sandbox lacked async/await for ~5 years and isn't real Node (npm with `crypto`/`fs` silently fails, [#3646](https://github.com/postmanlabs/postman-app-support/issues/3646)); the Runner/Newman **leaks memory** and crashes large runs ([#2440](https://github.com/postmanlabs/postman-app-support/issues/2440), [#10453](https://github.com/postmanlabs/postman-app-support/issues/10453)); Newman silently passes failing CI; `pm.*` lock-in is costly. See [Feature 08](/rambo/features/08-scripting-and-testing/).

## Differentiation (what sells)
**"Modern scripting, no lock-in, identical in CI."** Real async/await, `import` from a CDN, your Postman scripts run via a compat shim — and a runner that **actually finishes** a 5,000-request suite instead of crashing.

## The sandbox
- **Engine:** **`deno_core`** (V8 isolate with native Promise→Future async via tokio) for real async + fuller APIs; **`rquickjs`** (QuickJS) as the lighter alternative.
- **API:** a clean `rambo.*` surface (`rambo.test`, `rambo.expect`, `rambo.env`, `rambo.sendRequest`, `rambo.vars`).
- **`pm.*` compat shim** — maps Postman's `pm.*` onto `rambo.*` so imported scripts run with minimal changes (more complete than Bruno's subset). This *is* the [migration wedge](/rambo/specs/08-import-engine/).
- **ESM / CDN imports** (`esm.sh` / JSR) inside the sandbox — escape Postman's fixed allowlist (the validated user want).

## The runner (the anti-leak design)
The Postman/Newman failure is **retaining all request/response data for reporting**. Fix:
- **Bounded/streamed retention** — stream each result to the reporter (and to disk for large runs); keep only a rolling window in memory.
- **Data-driven** iteration over CSV/JSON without loading the whole file (stream rows).
- **Sane CI defaults** — a non-2xx **fails** the run unless explicitly allowed (no silent green pipelines).
- Same engine powers GUI, the [CLI, and MCP](/rambo/specs/04-agent-interface/) — identical results everywhere.

## Tech choices
`deno_core` (preferred) / `rquickjs`; a streaming reporter (JSON/JUnit); the `pm.*` shim; sandboxed module loader for ESM.

## Open decisions
- `deno_core` vs `rquickjs` — footprint vs. completeness (benchmark both embedded).
- ESM/CDN import policy by default — power vs. supply-chain risk (allowlist? lockfile? offline cache?).
- `pm.*` coverage target (which APIs the shim guarantees).
