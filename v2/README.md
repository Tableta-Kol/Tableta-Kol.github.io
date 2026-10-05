# LK Stickwerk Control v2

## Confirmed current state

- The published repository contains the v1 APK and download pages, but not the v1 source project.
- The installed v1 package identifier extracted from the APK is `de.lkstickwerk.control`.
- The repository does not contain the private signing key used for v1. The certificate embedded in an APK is public and cannot be used to sign an update.
- v1 already exposes backup/import in the UI, so data migration can be handled without rewriting the working v1 installation.

## v2 goal

Build one LK Stickwerk system with two entry points:

1. **LK Stickwerk Control** for the owner.
2. **Customer Portal** in the browser, no customer APK required.

Both will use the same order model and later the same authenticated backend.

## Core flow

Customer inquiry -> review -> quotation -> customer approval -> production -> ready -> pickup/shipping.

Initial status values:

- NEW
- QUOTE
- APPROVED
- EMBROIDERY
- READY
- SHIPPED
- CANCELLED

## Safety decisions

- Do not replace the working v1 APK while v2 is incomplete.
- Do not store customer personal data in this public repository.
- Do not put secrets, API keys, signing keys, tokens, customer logos, addresses or submissions in Git.
- Build and test v2 separately.
- Import a v1 backup into v2 during migration testing.
- Starting with v2, keep one protected signing key and use it for every future Android release.

## v2 foundation

- Shared order contract: `shared/order-model.schema.json`
- Update manifest contract: `update/latest.json`
- Migration notes: `migration/v1-to-v2.md`

This branch is intentionally isolated from `main` until the v2 foundation is tested.
