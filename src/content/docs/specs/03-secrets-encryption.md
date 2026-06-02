---
title: "Spec 03 — Secrets Encryption (Shareable-yet-Encrypted)"
description: Envelope encryption that lets a team share a secret which still never leaks — encrypted-at-rest, sync/git-safe, and decryptable only by members. The unmet sweet spot.
sidebar:
  order: 3
---

## Pain it solves *(validated)*
**30,000+ public Postman workspaces leaked credentials**; Postman's Initial/Current model silently syncs secrets to the cloud (it [admitted this](https://github.com/postmanlabs/postman-app-support/issues/13760)). Bruno encrypts secrets locally but **can't share them with a team** ([#7275 class](https://github.com/usebruno/bruno/issues/3943)). Nobody fills the gap. See [Feature 04](/rambo/features/04-environments-variables-secrets/).

## Differentiation (what sells)
**"Share a secret with your teammates that *still* can't leak — not in git, not in sync, not to us."** Encrypted-at-rest **and** team-shareable **and** sync/git-safe, simultaneously. This is the prize no competitor holds — and a security-team-friendly selling point.

## The scheme — envelope encryption with a recipient model
Borrowed from the proven **age / SOPS** pattern (X25519 + XChaCha20-Poly1305):

1. **Device keys.** Each member's device holds an X25519 keypair; the private key sits in the **OS keychain** (`safeStorage` / Keychain / DPAPI) — never synced.
2. **Workspace key (KEK).** A symmetric workspace key encrypts the secret values. The KEK is **wrapped to each member's public key** (one wrapped copy per member).
3. **Secret values** are encrypted with the KEK → ciphertext only. The ciphertext (the "vault" blob) is safe to **sync or commit to git** — it's useless without a member's device key.
4. **Decryption** happens locally: a member's device key unwraps the KEK, which decrypts the value, only in memory, only at request time.

```
secrets.vault (synced/committable — ciphertext only)
  recipients:
    - { user: alice, wrapped_kek: <base64> }     # KEK sealed to Alice's pubkey
    - { user: bob,   wrapped_kek: <base64> }
  values:
    STRIPE_KEY: <XChaCha20-Poly1305 ciphertext>
```

- **Files reference, never contain:** `secret://STRIPE_KEY`. Plaintext never touches disk-in-the-clear, git, or our servers (we hold only ciphertext we can't read).
- **Solo/offline:** a single-recipient vault (just your device key) — works with zero backend.

## Member lifecycle
- **Add member:** an admin re-wraps the KEK to the new member's public key (one new `wrapped_kek` entry). No re-encryption of values.
- **Remove member / rotate:** generate a **new** KEK, re-encrypt values, re-wrap to remaining members (the removed member's old key can't decrypt new ciphertext). This is the costly path — design the UX for it.

## Tech choices
**libsodium / `age`** (recipients model), OS keychain for device keys, **scrub-on-export / scrub-on-share** scanning (TruffleHog-style) as a backstop. Enterprise/self-hosted option: back the KEK with the customer's **KMS/HSM**.

## Open decisions
- Use `age` directly vs. a custom envelope (audited simplicity vs. control).
- Rotation/revocation UX and key history; whether admins can recover a member's secrets (escrow) — a real policy tension to decide.
