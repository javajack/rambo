---
title: "Feature 19 — Request Diagnostics (Adjacent Network Utilities)"
description: "An API-adjacent diagnostic workbench — DNS, TCP, TLS, HTTP-timing and proxy checks that answer 'why did this request fail?' without leaving the client — not a full NetOps suite."
sidebar:
  order: 19
---

# Feature 19 — Request Diagnostics (Adjacent Network Utilities)

> **Cluster:** core-offline *companion*. This is a client-side, offline diagnostic annexure to the [request engine](/rambo/features/02-http-request-response/) — built into the core **if resources allow**, otherwise a fast-follow. It is numbered last because it is adjacent scope, not because it ships last.

## What it is
A **"diagnose this request"** workbench that runs *next to* a failing or slow API call: DNS resolution (with resolver comparison), TCP connect, TLS/certificate inspection, an HTTP **timing waterfall**, and the effective proxy/VPN/system context — assembled into a single evidence timeline, with copyable `curl`/`dig`/`openssl` equivalents.

The discipline is the verdict: **yes, adjacent network utilities make product sense — but only as diagnostic companions to API requests, not as a general-purpose NetOps observability suite.** The strong evidence is for *diagnostics around a failing HTTP/API request*; there is far weaker evidence that developers want a GUI for every sysadmin tool inside an API client. So the product is an **API-adjacent diagnostic workbench**, not "Postman plus every network tool."

## ⭐ Pain points & competitor complaints (validated)
- **API failures are ambiguous** — app bug, DNS, firewall, proxy, TLS, timeout, or route? Postman's own SSL-troubleshooting guide enumerates firewall, proxy, SSL certificate, client certificate, incorrect URL/protocol, timeout, and invalid-response as causes ([Postman SSL troubleshooting](https://blog.postman.com/self-signed-ssl-certificate-troubleshooting/)).
- **Developers already leave the API client for the CLI.** A Postman community thread shows a generated `curl` succeeding while the same `.local` request failed *inside* Postman — the user fell back to curl to rule out machine/network/API root cause ([Postman `.local` thread](https://community.postman.com/t/postman-unable-to-talk-to-local-endpoint-ip-is-fine/65102)).
- **DNS resolver comparison is standard troubleshooting.** Cloudflare's docs instruct users to compare `dig`/`nslookup` across `1.1.1.1`, `1.0.0.1`, and `8.8.8.8` ([Cloudflare 1.1.1.1 troubleshooting](https://developers.cloudflare.com/1.1.1.1/troubleshooting/)).
- **HTTP timing breakdown is valuable.** Cloudflare's support docs show `curl -w` output for DNS-lookup, connect, TLS-handshake, TTFB, redirects, transfer, and total time ([Cloudflare gathering troubleshooting info](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/)).
- **TLS/certificate visibility matters — Postman already recognized this.** Postman *added* a per-request network-info icon to show IP, TLS, certificate owner/issuer/expiration, protocol, and cipher ([Postman network info](https://blog.postman.com/see-network-info-for-postman-api-requests/)). Differentiation is **unified diagnosis**, not mere cert display.
- **Global perspective helps when local checks disagree with users elsewhere.** Globalping runs ping/traceroute/dig/curl/MTR from distributed probes, and Raycast ships an official Globalping extension — precedent that this UX has demand ([Globalping](https://globalping.io/), [Raycast extension](https://www.raycast.com/globalping/globalping)).

## Differentiation
**"Postman shows the response status; Rambo explains the *path* to the response."** When a request fails or stalls, Rambo re-runs the call's network path using the *same* hostname, port, scheme, proxy mode, TLS settings, and environment variables, then shows one evidence timeline. No incumbent unifies DNS + TCP + TLS + timing + proxy context against the *actual request*; the pieces exist scattered across `curl`, `dig`, `openssl`, and Postman's read-only network icon. It also feeds the agent surface: an agent can ask Rambo *why* a request failed before changing code.

## UX
1. A request fails or is slow; the response pane offers **"Diagnose network path."**
2. Rambo runs local checks with the request's exact connection settings.
3. Result is a single evidence timeline: resolved hostname + resolver · chosen IP + family · TCP connect result · TLS handshake/certificate details · HTTP timing waterfall · proxy/VPN/system context · optional DNS resolver comparison · copyable `curl`/`dig`/`openssl` equivalents.
4. For team/enterprise: a diagnostic run can be attached to a bug report or **shared as a redacted artifact** (hostnames/headers/secrets stripped).

### Feature taxonomy — what to build, defer, and refuse
**Tier 1 — build into MVP diagnostics** (directly improve request troubleshooting, feasible locally):

| Utility | User job | UX |
|---|---|---|
| DNS lookup | "What does this host resolve to, and does it differ by resolver?" | Record tabs (A/AAAA/CNAME/TXT/MX/SRV), resolver selector, TTL, DNSSEC flag |
| TCP connect | "Can this host:port accept connections?" | Connect latency, failure reason, IPv4/IPv6 |
| TLS/cert inspector | "Is the chain valid and what cert did I get?" | Chain, issuer, SANs, expiry, protocol, cipher, mismatch warnings |
| HTTP timing waterfall | "Where did the time go?" | DNS, TCP, TLS, upload, TTFB, download, redirects |
| Proxy/system context | "Did proxy/VPN/system settings affect this?" | Effective proxy, local interface, resolved IP, desktop-vs-cloud execution context |
| curl export/parity | "Can I reproduce this outside the app?" | Copy exact curl; run equivalent local diagnostic; compare |

**Tier 2 — build after request diagnostics prove use** (useful, but scope-creep risk): ICMP ping, traceroute, MTR, WHOIS/RDAP, narrow local-only port check, DNS trace/DNSSEC.

**Tier 3 — do not build initially:** LAN scanner, speed test, Wake-on-LAN, packet capture (abuse/security-review/complexity/privacy burden, weak API-client fit).

## Feasibility
| Area | Feasibility | Notes |
|---|---|---|
| DNS lookup | High | OS resolver + explicit DoH/UDP resolver option; don't pretend resolver behavior matches browsers |
| TCP connect | High | Simple socket connect; useful for ports/reachability |
| TLS inspect | High–medium | Rust libs inspect certs; platform trust-store behavior must be explicit |
| HTTP timing | High | Already part of request runtime; expose curl-style name-lookup/connect/TLS/TTFB breakdown |
| ICMP ping | Medium | Needs privileges/OS-specific APIs; **TCP ping** is easier and more API-relevant |
| Traceroute/MTR | Medium–low | OS permissions + interpretation complexity; consider Globalping or TCP-traceroute later |
| Remote probes | Medium | Globalping proves demand/feasibility but adds quota/privacy/dependency questions |

## Implementation & tech choices
- A **`diagnostics` module separate from request execution** — keep it request-adjacent, never a NetOps suite.
- Store diagnostic results as **local artifacts, not synced by default**; redact hostnames/headers/secrets before any share.
- Always provide **copyable CLI equivalents** (`curl`, `dig`, `openssl`) for reproducibility.
- Keep the MVP **local-only**; any remote-probe integration (Globalping) is opt-in and paid/limited.
- Expose diagnostics to the [CLI and MCP surface](/rambo/features/09-agent-pillar-mcp-cli/) as **read-only tools**: `diagnose_http_target`, `resolve_dns`, `inspect_tls`, `tcp_connect`, `request_timing_summary` (redacted, deterministic, permissioned — consistent with the [agent-safe contract](/rambo/product/positioning-and-trust/)).

## GTM hooks
This is **not** a primary wedge like local-first trust or LLM-stream debugging — it's a sharp **workflow enhancer**:
- **Demo:** *"Why did this API fail: DNS, TLS, proxy, or the server?"*
- **Migration hook:** *"Postman shows response status; Rambo explains the path to the response."*
- **Agent hook:** *"Let Codex/Claude ask Rambo why a request failed before changing code."*
- **Enterprise hook:** *"Share redacted diagnostics with platform/network teams without leaking secrets."*

## Dependencies
Extends [02 request engine](/rambo/features/02-http-request-response/) (reuses its timing + connection settings); surfaces through [09 agent pillar](/rambo/features/09-agent-pillar-mcp-cli/) as read-only tools; redaction/sharing follow [04 secrets](/rambo/features/04-environments-variables-secrets/) and the [trust contract](/rambo/product/positioning-and-trust/).

## Open questions
- **Will developers use (or pay for) in-client diagnostics, or keep reaching for `curl`/`dig`?** Validated: API troubleshooting needs network-layer visibility; devs already use CLI tools beside the client; Postman recognized the need; Globalping/Raycast validate the UX demand. **Not validated:** that developers will pay *separately* for these utilities, that a full network toolbox belongs in an API client, or that ICMP ping/traceroute/MTR should ship before request-centric diagnostics. Resolve by measuring repeated use of the Tier-1 flow before funding Tier 2/3.
