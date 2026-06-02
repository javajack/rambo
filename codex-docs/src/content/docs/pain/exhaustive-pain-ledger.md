---
title: Exhaustive Pain Ledger
description: Validated pains by theme and competitor.
sidebar:
  order: 1
---

## Ranked pain themes

| Rank | Theme | Evidence | Product implication |
|---:|---|---|---|
| 1 | Forced account / cloud lock-in | Insomnia #6577: "you just locked me out"; Postman #12472: "hold my data ransom" | No account until sync; exportable local data; never hostage |
| 2 | Secrets and unsafe sharing | CloudSEK reported 30,000+ public Postman workspaces leaking sensitive data; Postman docs now say Vault secrets are not synced | OS keychain, local-by-default secrets, encrypted share grants |
| 3 | Pricing and free-tier erosion | Postman Team is $19/user/month annual; Free and Solo are single-player plans | Free small-team cap; paid only for sync/governance/cloud resources |
| 4 | Bloat and performance | Long-running Postman RAM/perf issues plus large-response freezing evidence in incumbent trackers | Native-feeling shell; worker parsing; virtualized response viewers |
| 5 | LLM/SSE streaming correctness | Postman #13537: "first event is missing"; Bruno #7835 asks for "real-time streaming experience" | Streaming transcript viewer, token timeline, raw/rendered dual mode |
| 6 | Import/migration fidelity | Switching discussions repeatedly mention migration ownership and broken variable/script translation | Migration must be a first-class product, not an afterthought |
| 7 | Collaboration and merge pain | Git-native tools validate demand but also expose conflict/review pain | Review-before-sync, diffs, branch-aware workspaces |
| 8 | Enterprise governance | Postman/Insomnia gate SSO, SCIM, RBAC, audit, storage control, and support into high tiers | Enterprise tier must be real from architecture day one |

## Evidence-backed theme detail

### 1. Forced accounts and cloud lock-in

- **Claim:** Forced account/cloud changes create high-emotion switching intent.
- **Confidence:** High.
- **Evidence:** Insomnia #6577 was opened against v8.0.0 and says: "you just locked me out." Postman #12472 says: "hold my data ransom?"
- **Sources:** [Insomnia #6577](https://github.com/Kong/insomnia/issues/6577), [Postman #12472](https://github.com/postmanlabs/postman-app-support/issues/12472)
- **Caveat:** Individual issues prove pain and backlash, not total market size.

### 2. Secrets and unsafe sharing

- **Claim:** Secret handling is a structural trust risk in cloud-synced API clients.
- **Confidence:** High.
- **Evidence:** CloudSEK reported 30,000+ public Postman workspaces exposing sensitive data. Postman docs now state Vault secrets are local and not synced to Postman cloud.
- **Sources:** [CloudSEK](https://www.cloudsek.com/blog/postman-data-leaks-the-hidden-risks-lurking-in-your-workspaces), [Postman variables docs](https://learning.postman.com/docs/postman/variables-and-environments/variables/), [Postman persist values support](https://support.postman.com/hc/en-us/articles/4409005403031-How-to-persist-variable-values)
- **Caveat:** Postman has improved its secret model; Rambo should not attack stale behavior without acknowledging current Vault guidance.

### 3. Pricing and free-tier erosion

- **Claim:** Postman's current pricing creates a small-team wedge, but price alone will not win.
- **Confidence:** High for pricing, Medium for switching impact.
- **Evidence:** Postman lists Team at $19/user/month and Enterprise at $49/user/month, billed annually. Bruno, Hoppscotch, Thunder Client, and Yaak all offer lower-cost alternatives.
- **Sources:** [Postman pricing](https://www.postman.com/pricing/), [Bruno pricing](https://www.usebruno.com/pricing), [Hoppscotch pricing](https://hoppscotch.com/pricing), [Thunder Client pricing](https://extapi.thunderclient.com/pricing), [Yaak pricing](https://yaak.app/pricing)
- **Caveat:** Cheap competitors already exist; switching needs import, secrets, sync, and team workflow superiority.

### 4. Performance, large responses, and UI scale

- **Claim:** Performance complaints are recurring enough to justify native-feeling performance as a product pillar.
- **Confidence:** Medium-high.
- **Evidence:** Existing repo research cites long-running Postman RAM issues and large-response freezing across Postman, Insomnia, and Bruno. This pass did not fully re-mine every linked performance issue.
- **Sources:** Current repo evidence pages; prior source list in `/src/content/docs/evidence/sources.md`.
- **Caveat:** Needs a fresh benchmark pass against current app versions before marketing numeric performance claims.

### 5. LLM/SSE streaming correctness

- **Claim:** LLM stream debugging is the best specific AI wedge found in this pass.
- **Confidence:** Medium-high.
- **Evidence:** Postman #13537 reports that "the first event is missing" and sometimes only `[DONE]` appears; Bruno #7835 asks for OpenAI-compatible streaming, incremental rendering, and Markdown preview.
- **Sources:** [Postman #13537](https://github.com/postmanlabs/postman-app-support/issues/13537), [Bruno #7835](https://github.com/usebruno/bruno/issues/7835)
- **Caveat:** This validates pain and feature demand, not willingness to pay.

### 6. Import and migration fidelity

- **Claim:** Import fidelity is a switching gate, not a convenience feature.
- **Confidence:** Medium-high.
- **Evidence:** Public community threads around Postman pricing frequently mention moving to Bruno/Apidog/Hoppscotch, while migration comments warn that collections, variables, and shared workspaces are hard to move cleanly.
- **Sources:** [Reddit early-stage SaaS Postman thread](https://www.reddit.com/r/SaaS/comments/1rfzxpq/earlystage_saas_teams_are_you_paying_for_postman/), [Source ledger](/rambo/codex-docs/evidence/source-ledger/)
- **Caveat:** Reddit is sentiment evidence; real validation requires importing production workspaces.

### 7. Collaboration and merge

- **Claim:** Collaboration demand is real, but the valuable shape is safe sharing/review rather than chat-like presence.
- **Confidence:** Medium.
- **Evidence:** Insomnia and Hoppscotch price collaboration by users/orgs; Bruno validates git-native collaboration; current notes show friction around merge and import edge cases.
- **Sources:** [Insomnia pricing](https://insomnia.rest/pricing), [Hoppscotch pricing](https://hoppscotch.com/pricing), [Bruno pricing](https://www.usebruno.com/pricing)
- **Caveat:** Live co-editing remains weakly evidenced.

### 8. Enterprise governance

- **Claim:** Enterprise buyer requirements are visible in competitor packaging.
- **Confidence:** High.
- **Evidence:** Insomnia Enterprise lists SSO, SCIM, storage mandates, domain capture, enterprise support, SOC2 access, and vault integrations. Postman Enterprise lists organization-wide governance and security controls at $49/user/month.
- **Sources:** [Insomnia pricing](https://insomnia.rest/pricing), [Postman pricing](https://www.postman.com/pricing/)
- **Caveat:** Feature-list parity does not prove a new closed-source vendor can pass procurement quickly.

## By competitor

### Postman

- Account/cloud trust: Scratch Pad deprecation and lightweight-client transition created loss/hostage complaints.
- Pricing: Team at $19/user/month annual; free and Solo are single-player plans.
- Bloat: repeated user complaints and old GitHub support issues.
- Secrets: public workspace leakage plus legacy Initial/Current confusion.
- LLM streaming: issue #13537 reports empty/missing first SSE event when testing LLM streams.
- Counterpoint: Postman has the broadest enterprise/lifecycle feature set and now a serious MCP server.

### Insomnia

- Account backlash: issue #6577 directly objects to needing an account and being locked out.
- Counterpoint: current Insomnia pricing advertises local/Git/cloud storage, E2EE, Git Sync, free up to 3 Git Sync users, and enterprise storage mandates.
- Product gap: Rambo cannot rely on old Insomnia cloud-only claims; it must beat current Insomnia on polish, import, stream correctness, agent determinism, and trust contract.

### Bruno

- Strength: open-source, git-native, local-first positioning.
- Gaps: issue #7835 validates demand for OpenAI-compatible streaming rendering; Git merge/diff friction remains relevant; enterprise packaging is less mature than Postman/Insomnia.
- Counterpoint: Bruno's $6/$11 pricing puts pressure on Rambo's paid tier.

### Yaak

- Strength: closest thesis overlap: offline-first, Tauri/Rust/React, REST/GraphQL/SSE/WebSocket/gRPC, encrypted secrets, OS keychain, MCP plugin, MIT license.
- Gap: less evidence of deep LLM stream trace/debugging, enterprise org hierarchy, or high-fidelity incumbent migration as a paid wedge.

### Hoppscotch

- Strength: generous free tier and $6 organization plan.
- Gap: browser/PWA model is less aligned with strict local-first desktop trust and high-performance large payload workflows.

### Thunder Client

- Strength: VS Code distribution and low paid prices.
- Gap: free plan is non-commercial/limited, advanced protocol and team capabilities are paid; paywall history creates trust sensitivity.
