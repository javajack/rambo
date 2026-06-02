---
title: Source Ledger
description: Primary and supporting sources used in the Codex research pass.
sidebar:
  order: 1
---

For claim-level source mapping, see [Validated Claims Register](/rambo/codex-docs/evidence/validated-claims-register/).

## Current pricing and product surface

| Source | Type | Used for |
|---|---|---|
| [Postman pricing](https://www.postman.com/pricing/) | Official pricing | Free/Solo/Team/Enterprise pricing, single-player vs team wording, AI credits |
| [Insomnia pricing](https://insomnia.rest/pricing) | Official pricing | Essentials/Pro/Enterprise pricing, Git Sync up to 3 users, E2EE, storage control, MCP Client |
| [Bruno pricing](https://www.usebruno.com/pricing) | Official pricing | Open Source/Pro/Ultimate pricing |
| [Yaak pricing](https://yaak.app/pricing) | Official pricing | Personal free, Individual annual/lifetime, Business annual |
| [Hoppscotch pricing](https://hoppscotch.com/pricing) | Official pricing | Free and Organization $6/user/month |
| [Thunder Client pricing](https://extapi.thunderclient.com/pricing) | Official pricing | Free, Starter, Business, Enterprise pricing and feature gates |
| [Apidog pricing](https://apidog.com/pricing/) | Official pricing | Pricing page target; dynamic page had weak text extraction |
| [APIs.io Apidog pricing profile](https://plans.apis.io/plans/apidog/apidog-plans-pricing/) | Secondary structured profile | Apidog free/paid plan corroboration; not primary |

## Agent/MCP and AI API workflow

| Source | Type | Used for |
|---|---|---|
| [Postman MCP Server](https://www.postman.com/product/mcp-server/) | Official product | Postman has hosted/local MCP and 100+ tools |
| [Postman product page](https://www.postman.com/product/) | Official product | AI/MCP platform positioning |
| [Yaak docs: MCP Server](https://yaak.app/docs/getting-started/mcp-server) | Official docs | Yaak MCP server plugin |
| [Yaak GitHub](https://github.com/mountain-loop/yaak) | Official repo | MIT license, offline-first, Tauri/Rust/React, protocol list, OS keychain |
| [RESTK](https://restk.ai/) | Official product | Embedded MCP, schema extraction, synthetic data, redaction, AI audit trail, native macOS posture |
| [RESTK Terms](https://restk.ai/terms) | Official legal | Free beta/future paid plan signal, proprietary ownership/no reverse engineering |
| [RESTK Privacy](https://restk.ai/privacy) | Official privacy | AES-256/client-side encryption claims, analytics/logging disclosures |
| [ApiArk](https://apiark.dev/) | Official product | Local-first/no-login/Git-native/Tauri/broad protocol/AI/plugin positioning |
| [ApiArk GitHub](https://github.com/berbicanes/apiark) | Official repo | MIT license, repo structure, CLI/MCP server package, YAML/file format, protocol claims |
| [Bruno issue #7835](https://github.com/usebruno/bruno/issues/7835) | GitHub issue | Demand for OpenAI-compatible streaming rendering and Markdown preview |
| [Postman issue #13537](https://github.com/postmanlabs/postman-app-support/issues/13537) | GitHub issue | LLM SSE first-event/missing output bug |

## Emerging API-client entrants and licenses

| Source | Type | Used for |
|---|---|---|
| [Emerging entrants page](/rambo/codex-docs/competition/emerging-api-clients-license-leverage/) | Internal synthesis | Dedicated competitor/license scan |
| [OpenReq](https://openreq.app/) | Official product | Self-hosted/standalone API client, AI collection builder, Ollama, scripts, visual flows |
| [OpenReq GitHub](https://github.com/n1kozor/OpenReq) | Official repo | MIT license, FastAPI/React/Electron stack, self-hosted and desktop modes |
| [Voiden GitHub](https://github.com/VoidenHQ/voiden) | Official repo | Apache-2.0 license, `.void` file model, offline/Git-native, agent-friendly CLI/skills |
| [LiteClient](https://liteclient.com/) | Official product | VS Code-native, local-first, no telemetry, Postman import/export, scripts/tests |
| [LiteClient GitHub](https://github.com/liteclienthq/liteclient) | Official repo | MIT license, VS Code extension architecture and privacy/storage claims |
| [API Dash GitHub](https://github.com/foss42/apidash) | Official repo | Apache-2.0 license, Flutter cross-platform API client |
| [APISense](https://apisense.dev/) | Official product | Web-native collaborative API client, self-hostable claim, CLI/runner, flat workspace pricing |
| [Postmate Client](https://www.postmateclient.com/) | Official product | VS Code-native privacy-first/free client, response comparison, CLI, no telemetry claims |
| [Hurl app](https://hurls.app/) | Official product | Browser/native API client, no-account/offline, team sync, encrypted secrets claims |
| [Restflow GitHub](https://github.com/pardeep-kumar94/restflow) | Official repo | MIT license, client-side visual API workflow builder |

## Adjacent network diagnostics

| Source | Type | Used for |
|---|---|---|
| [Cloudflare 1.1.1.1 troubleshooting](https://developers.cloudflare.com/1.1.1.1/troubleshooting/) | Official support docs | DNS resolver comparison, traceroute, TCP, DoT/DoH troubleshooting |
| [Cloudflare gathering troubleshooting information](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) | Official support docs | curl request troubleshooting, HTTP timing breakdown, MTR |
| [Postman network information blog](https://blog.postman.com/see-network-info-for-postman-api-requests/) | Vendor product blog | Demand for IP/TLS/certificate/network details inside API client |
| [Postman SSL troubleshooting](https://blog.postman.com/self-signed-ssl-certificate-troubleshooting/) | Vendor support blog | Firewall, proxy, SSL, client cert, protocol, timeout failure taxonomy |
| [Postman .local endpoint community thread](https://community.postman.com/t/postman-unable-to-talk-to-local-endpoint-ip-is-fine/65102) | User community | User reproduces with generated curl while Postman fails on `.local` hostname |
| [Postman DNSLookup local URL thread](https://community.postman.com/t/requests-to-local-url-either-timing-out-or-getting-dns-lkup-error/69154/2) | User community | Local/cloud execution context and DNSLookup explanation |
| [Globalping](https://globalping.io/) | Product/platform | Market precedent for ping, traceroute, dig, curl, MTR from distributed probes |
| [Globalping Raycast extension](https://www.raycast.com/globalping/globalping) | Product integration | UX precedent for putting network diagnostics in a developer productivity surface |

## Trust, cloud, and pain evidence

| Source | Type | Used for |
|---|---|---|
| [Insomnia issue #6577](https://github.com/Kong/insomnia/issues/6577) | GitHub issue | Forced-account/lockout backlash |
| [Postman issue #12472](https://github.com/postmanlabs/postman-app-support/issues/12472) | GitHub issue | Scratch Pad/lightweight-client data-loss complaint |
| [Postman variable docs](https://learning.postman.com/docs/postman/variables-and-environments/variables/) | Official docs | Vault secrets not synced; shared values behavior |
| [Postman persist variable values](https://support.postman.com/hc/en-us/articles/4409005403031-How-to-persist-variable-values) | Official support | Initial/current privacy change |
| [CloudSEK Postman leaks](https://www.cloudsek.com/blog/postman-data-leaks-the-hidden-risks-lurking-in-your-workspaces) | Security research | 30,000+ public Postman workspaces claim |
| [TruffleSecurity Postman secrets](https://trufflesecurity.com/blog/postman-carries-lots-of-secrets) | Security research | Live secret exposure risk |

## Market and benchmark evidence

| Source | Type | Used for |
|---|---|---|
| [Mordor API Management Market](https://www.mordorintelligence.com/industry-reports/api-management-market) | Analyst estimate | Broad API-management TAM and CAGR |
| [Postman State of API 2025](https://www.postman.com/state-of-api/) | Vendor survey | API-first and AI/API trend |
| [Postman State of API 2025 PDF](https://voyager.postman.com/doc/postman-state-of-the-api-report-2025.pdf) | Vendor survey PDF | Small API team-size claim |
| [JetBrains research portal](https://www.jetbrains.com/resources/industry-reports/) | Vendor survey portal | Developer ecosystem context |
| [ChartMogul conversion report](https://web.proxy.chartmogul.com/reports/saas-conversion-report/) | Benchmark report | Free-to-paid conversion ranges |
| [Benchmarkit SaaS metrics](https://www.benchmarkit.ai/2026-saas-ai-native-metrics) | Benchmark report | Software gross margin and SaaS metric context |

## Community sentiment used cautiously

| Source | Type | Used for |
|---|---|---|
| [Reddit: Postman pricing/free-team threads](https://www.reddit.com/r/SaaS/comments/1rfzxpq/earlystage_saas_teams_are_you_paying_for_postman/) | Community | Pricing resentment signal; not load-bearing alone |
| [Reddit: Postman bloat/pricing](https://www.reddit.com/r/programming/comments/1qwpi5i/postman_from_api_client_to_everything_app/) | Community | User sentiment corroboration |
| [Reddit: small teams switching](https://www.reddit.com/r/postman_api/comments/1rfzt7g/postman_free_is_now_1_user_what_are_small_teams/) | Community | Switching alternatives signal |

## Source hygiene notes

- Pricing pages were checked on 2026-06-02 and are fast-moving.
- Vendor survey data is useful but self-reported and may favor the vendor's framing.
- Reddit is treated as sentiment and quote evidence only, not as market proof.
- Analyst TAMs are directional; they should not be used as the claimed reachable revenue for Rambo.
