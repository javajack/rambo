---
title: "Feature 03 — Collections & Organization"
description: "Folders/collections, workspaces, and navigation that scales to thousands of requests — where incumbents visibly break down."
sidebar:
  order: 3
---

# Feature 03 — Collections & Organization

## What it is
The structure layer: collections, nested folders, workspaces, the request sidebar, tab management, and find-across-collections — and keeping all of it fast at hundreds-to-thousands of requests.

## ⭐ Pain points & competitor complaints (validated)
- **Navigation degrades at scale.** Postman's Collection Runner folder-browsing is a maintainer-triaged **performance bug** ([#8642](https://github.com/postmanlabs/postman-app-support/issues/8642), labeled bug+performance), with a cluster of sibling Runner perf issues. *(Avoid the refuted "2,000+ requests" framing; the verified bug is Runner folder browsing.)*
- **Tab management is a recurring failure.** Insomnia first **lacked tabs entirely** (spurring a 3rd-party plugin at ~115k weekly downloads), then over-corrected: native tabs (v11, Feb 2025) opened **a tab on every left-click** — *"every single endpoint I click on opens in a new tab… a million tabs"* ([#6108](https://github.com/Kong/insomnia/discussions/6108), [#8488](https://github.com/Kong/insomnia/issues/8488) "Tabs are half baked"). *(Substantially fixed in v12.4, Mar 2026 — cite as v11-era.)*
- **Pagination/rendering collapses at scale:** self-hosted Hoppscotch v2024.7.2 **rendered only 30 of 811 collections** in the UI (all 811 in the DB, search-findable) ([#4423](https://github.com/hoppscotch/hoppscotch/issues/4423)).

## Differentiation
A **virtualized, scalable tree/sidebar** that stays smooth at thousands of requests; **find-across-collections** search; and a **sane tab model** (preview/temporary tabs by default — open-in-place, promote-on-edit) so power users aren't drowned in tabs.

## UX
Single-click previews in a temporary tab; double-click/edit promotes to a pinned tab; fuzzy command-palette search across all collections; collapsible virtualized tree.

## Feasibility
**Medium** — virtualized rendering + a local search index are standard; the bar is "stays fast where incumbents don't."

## Implementation & tech choices
- Virtualized tree rendering; in-memory/local search index over the [01 file-format](/rambo/features/01-file-format-and-storage/) collection tree (ties to lazy-loading there).
- Temporary/preview tab state model (VS Code's preview-tab pattern is a good reference).

## Dependencies
Structures [02 requests](/rambo/features/02-http-request-response/); serialized by [01 file format](/rambo/features/01-file-format-and-storage/); shared via [12 sync](/rambo/features/12-realtime-team-sync/)/[14 workspaces](/rambo/features/14-shared-workspaces/).

## Open questions
- Exact temporary-tab interaction model; whether workspaces are folders or a higher construct.
