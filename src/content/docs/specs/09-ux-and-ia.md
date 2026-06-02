---
title: "Spec 09 — UX & Information Architecture"
description: The interaction model, key flows, tab behavior, states, and a calm/fast design language — engineered against the incumbents' bloat and clutter.
sidebar:
  order: 9
---

## Pain it solves *(validated)*
Postman bloat/complexity and RAM ([#4687](https://github.com/postmanlabs/postman-app-support/issues/4687)); Insomnia's tabs open on every click → *"a million tabs"* ([#6108](https://github.com/Kong/insomnia/discussions/6108)); navigation collapses at scale (Hoppscotch rendered 30 of 811). See [Feature 03](/rambo/features/03-collections-and-organization/) + [11](/rambo/features/11-app-shell-and-ux/).

## Differentiation (what sells)
**"Fast, calm, out of your way."** It feels instant, it doesn't drown you in tabs, and it stays smooth at thousands of requests — a felt contrast to Postman's heaviness the moment you open it.

## Information architecture
A three-pane shell + a command palette:
```
┌────────────┬───────────────────────────┐
│ Sidebar    │  Tab bar                   │
│ (collection│ ┌───────────────────────┐  │
│  tree,     │ │ Request editor        │  │
│  virtual-  │ ├───────────────────────┤  │
│  ized)     │ │ Response (streaming,  │  │
│  + search  │ │ virtualized)          │  │
└────────────┴─┴───────────────────────┴──┘
   ⌘K command palette · everything keyboard-reachable
```

## Key flows (must be frictionless)
1. **New request → send** (≤ 2 keystrokes via palette).
2. **Import from Postman** → fidelity report → first successful request.
3. **Debug an LLM stream** → live tokens + tool-call tree + cost.
4. **Resolve a sync conflict** → readable side-by-side, not silent overwrite.
5. **Share a secret with a teammate** → pick members → encrypted, done.

## Tab model (fixes Insomnia)
**Preview/temporary tabs by default** — single-click *previews* in one reused tab; editing or double-click *promotes* it to a pinned tab. No tab avalanche.

## States to design (not afterthoughts)
empty · loading/streaming · error · **large-response** (virtualized, "load full body") · **offline** (works, shows sync status) · **conflict** · unauthenticated.

## Design language
- **Tokens:** a small set — 4 px spacing grid, one type scale, semantic colors, restrained motion. Light/dark. Calm, dense-but-legible, *not* busy.
- **Performance budget** (the anti-bloat contract): fast cold start, low idle RAM, response rendering **off the main thread** ([Spec 01](/rambo/specs/01-file-format/) + app shell). These are *acceptance criteria*, tied to the [Tauri/Electron benchmark](/rambo/strategy/open-questions/).
- **Keyboard-first + command palette** as a primary navigation mode.

## Open decisions
- Design system from scratch vs. a headless base (Radix/shadcn-style) under our tokens.
- Concrete performance budgets (set numbers after the shell benchmark).
- Accessibility target (WCAG AA) — call it now so it's built in, not retrofitted.
