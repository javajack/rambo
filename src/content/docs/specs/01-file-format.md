---
title: "Spec 01 — Open File Format & Storage"
description: A YAML, git-native collection format with deterministic, prose-legible diffs — solving Bruno's seq-renumber mess and Postman's cloud lock-in.
sidebar:
  order: 1
---

## Pain it solves *(validated)*
Bruno's own maintainer reversed the custom `.bru` DSL → **YAML** (no tooling, 4–5× slower); its `seq` field **renumbers every later file on insert**, muddying git diffs ([#2149](https://github.com/usebruno/bruno/discussions/2149)); Postman holds data in the cloud. See [Feature 01](/rambo/features/01-file-format-and-storage/).

## Differentiation (what sells)
**"Git diffs that read like prose."** One change = one changed file. Plain YAML any tool, human, or AI can read. Your data in your repo, forever. This is *structurally* impossible for a cloud-first tool to match.

## The format
**Layout** — folders mirror the collection tree; one file per request:
```
my-api/
  collection.yaml            # collection metadata + settings
  environments/
    staging.yaml
  Auth/
    _folder.yaml             # folder metadata (incl. order)
    login.req.yaml
    refresh.req.yaml
```

**A request** (`login.req.yaml`):
```yaml
schema: rambo/v1
name: Login
method: POST
url: "{{baseUrl}}/auth/login"
headers:
  - { key: Content-Type, value: application/json }
auth: { type: none }
body:
  type: json
  json: |
    { "email": "{{email}}", "password": "{{password}}" }
scripts:
  pre: ""
  post: |
    rambo.test("200", () => rambo.expect(res.status).toBe(200));
secrets: []            # references only — never values
```

## Key design decisions
- **Deterministic serialization.** Fixed key order, stable quoting/whitespace, LF endings — so identical state → identical bytes (`safe-stable-stringify`-style). *Mandatory*: without it, diffs/merges degrade regardless of format.
- **Ordering without renumber** — the fix for Bruno's `seq` bug. Order lives in the parent `_folder.yaml` as an explicit list, **or** each file carries a **fractional index** (a string key between neighbors, e.g. `"a0"`, `"a0V"`). Inserting touches **one** file, never siblings.
- **Secrets are never values in files** — only references; values live in the [keychain](/rambo/specs/03-secrets-encryption/).
- **Binary / large bodies** — stored as sidecar files (`login.req.body.bin`) referenced by path, not inlined.
- **Versioning** — top-level `schema:` field; a migration runs on open when the version lags.

## Tech choices
YAML 1.2 + a published **JSON Schema** (free editor validation/autocomplete); a deterministic emitter; parser via `serde_yaml` (Rust core) or `yaml` (JS). Evaluate interop/alignment with the emerging **OpenCollection** spec.

## Open decisions
- Adopt OpenCollection vs. our own schema (interop vs. control).
- Explicit order-list vs. fractional-index (simplicity vs. zero-sibling-churn) — **prototype both on a 1,000-request collection and diff them.**
