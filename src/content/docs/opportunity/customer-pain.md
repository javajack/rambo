---
title: Validated Customer Pain
description: The catalog of real, cited complaints developers have about today's API clients — the demand evidence behind every Rambo design decision.
sidebar:
  order: 3
---

Every complaint below survived adversarial verification against primary sources. Severity reflects how strongly and widely it's evidenced.

## 🔴 Forced accounts & cloud lock-in — *the #1 pain*
The strongest, most recurring grievance. Insomnia 8.0.0 (Sept 2023) forced sign-in on update and **locked users out of their own data** — the issue is literally titled *"enshittification / needing an account"* ([Kong/insomnia#6577](https://github.com/Kong/insomnia/issues/6577)). Postman's 2023 Scratch Pad removal left a binary choice — cloud account or a lightweight client that **doesn't support collections** — so collections "disappeared" ([#12472](https://github.com/postmanlabs/postman-app-support/issues/12472)).
**→ Rambo:** local-first, no account until you sync, data never hostage.

## 🔴 Secret leakage — *structural and severe*
A CloudSEK year-long study found **30,000+ public Postman workspaces leaking credentials**; TruffleSecurity found **~4,000+ live secrets**. Root cause: Postman's "Secret"-typed variables still **sync Initial Values to the cloud** ([#10768](https://github.com/postmanlabs/postman-app-support/issues/10768)), and Postman **officially admitted** (Sept 2025) the model made users *"accidentally sync secrets… to public workspaces,"* shipping a local-by-default fix ([#13760](https://github.com/postmanlabs/postman-app-support/issues/13760)).
**→ Rambo:** secrets local-by-default, OS-keychain encrypted, never silently synced; the [shareable-yet-encrypted](/rambo/features/04-environments-variables-secrets/) sweet spot.

## 🟠 Electron bloat & RAM
Postman's [#4687 "Eating too much RAM"](https://github.com/postmanlabs/postman-app-support/issues/4687) has been **open since 2018**; a sibling reports **17.8 GB while the app wasn't even open** ([#7870](https://github.com/postmanlabs/postman-app-support/issues/7870)). HN: *"Postman is so incredibly bloated and slow."*
**→ Rambo:** fast, low-RAM, native-feeling shell.

## 🟠 Large responses freeze the app
The most-corroborated UX failure — Postman *admits it's architectural* ([master issue #4751](https://github.com/postmanlabs/postman-app-support/issues/4751): *"core changes"* needed); Insomnia's main-thread textarea froze the UI; Bruno went *"unusably slow"* on large bodies ([#6847](https://github.com/usebruno/bruno/issues/6847)).
**→ Rambo:** off-main-thread parsing + virtualized viewer.

## 🟠 Streaming/SSE is unreliable — and it breaks LLMs
Postman's SSE viewer **dropped the first event** on LLM streams, returning empty/`[DONE]` while curl returned the real tokens ([#13537](https://github.com/postmanlabs/postman-app-support/issues/13537)).
**→ Rambo:** first-class, never-drop-the-first-event streaming; the [LLM-testing wedge](/rambo/features/07-client-side-llm-testing/).

## 🟡 gRPC is the weakest layer
Cross-file proto imports still broken in Insomnia ([#3316](https://github.com/Kong/insomnia/issues/3316), open); Postman's proto-import + reflection both broke (2022); Bruno shipped gRPC/WS only in 2025.
**→ Rambo:** `.pb` descriptor ingestion, cross-file resolution, complete reflection.

## 🟡 Request failures are ambiguous — devs leave the client to debug
When a call fails or stalls, the client rarely says *why* — DNS, TCP, firewall, proxy, TLS, timeout, or route? Postman's own SSL guide enumerates exactly this failure taxonomy ([SSL troubleshooting](https://blog.postman.com/self-signed-ssl-certificate-troubleshooting/)), and developers fall back to `curl`/`dig` to disambiguate — one Postman thread shows generated `curl` succeeding while the same `.local` request failed *in* Postman ([community #65102](https://community.postman.com/t/postman-unable-to-talk-to-local-endpoint-ip-is-fine/65102)). Postman even *added* a network-info icon (IP/TLS/cert/cipher) acknowledging the gap ([blog](https://blog.postman.com/see-network-info-for-postman-api-requests/)), and Cloudflare's docs route users to DNS-resolver comparison and curl timing breakdowns ([1.1.1.1](https://developers.cloudflare.com/1.1.1.1/troubleshooting/), [gathering info](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/)).
**→ Rambo:** in-app [request diagnostics](/rambo/features/19-request-diagnostics/) (DNS/TCP/TLS/timing/proxy) against the actual request — request-adjacent, not a NetOps suite.

## 🟡 Organization collapses at scale
Postman's Collection Runner folder browsing is a perf bug ([#8642](https://github.com/postmanlabs/postman-app-support/issues/8642)); Insomnia's tabs opened on every click (*"a million tabs"*, [#6108](https://github.com/Kong/insomnia/discussions/6108)); Hoppscotch rendered **only 30 of 811 collections** ([#4423](https://github.com/hoppscotch/hoppscotch/issues/4423)).
**→ Rambo:** virtualized tree, find-across-collections, sane preview tabs.

## 🟡 Migration loses data
Postman→Insomnia silently breaks variable references ([#6204](https://github.com/Kong/insomnia/issues/6204)); Postman→Bruno lossily translates `pm.*` scripts ([#3061](https://github.com/usebruno/bruno/issues/3061)).
**→ Rambo:** a [high-fidelity import engine](/rambo/features/10-import-and-migration/) — the migration wedge.

## 🟡 Pricing resentment & the "SSO tax"
Postman removed free team collaboration (Mar 2026); basic SSO is commonly gated behind the most expensive tier (the [sso.tax](https://sso.tax/) pattern).
**→ Rambo:** free small-team collaboration; basic SSO low, advanced governance gated.

## 🔴 Enterprise & collaboration (validated)
- **Forced cloud is a *fireable offense*.** Enterprises with "nothing syncs to a cloud we can't audit" policies are blocked outright — *"a hard requirement that NOTHING I use can sync to the cloud"* ([Insomnia #6624](https://github.com/Kong/insomnia/issues/6624); 346-reaction backlash on [#6577](https://github.com/Kong/insomnia/issues/6577)). **→ local-first + no-account is an enterprise *requirement*, not a nicety.**
- **The personal-vs-work account boundary is broken everywhere.** No account-merge exists in any tool; worse, *"leaving an external team workspace **wiped** my personal workspaces"* ([Postman community #89176](https://community.postman.com/t/leaving-an-external-team-workspace-wiped-my-personal-workspaces/89176)). **→ one identity, data-level ownership, never wipe personal data.**
- **No symmetric cross-org collaboration.** Postman's Guest role is community-called *"crippled"*; Partner Workspaces is one-directional. **→ sharing = a scoped sync grant** (team / guest / partner / personal account).
- **Deprovisioning is unreliable** — SSO alone doesn't deprovision. **→ SCIM + a managed-identity / domain-capture boundary.**

Full treatment in [Enterprise & Multi-Tenancy](/rambo/enterprise/).

For where these add up to genuinely *unowned* territory, see [Unfulfilled Gaps](/rambo/opportunity/unfulfilled-gaps/).
