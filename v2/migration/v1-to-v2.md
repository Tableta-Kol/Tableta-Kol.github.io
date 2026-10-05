# Migration from v1 to v2

## Why v2 must be treated as a controlled migration

The v1 APK is signed, but the repository does not contain its private signing key. The private key cannot be recovered from the APK certificate.

Without that exact private key, Android will not accept a newly signed APK as an in-place update of the installed v1 package.

## Safe migration path

1. Keep v1 installed and unchanged.
2. Export a v1 backup from the existing app.
3. Install a test build of v2 separately.
4. Import the v1 backup into v2.
5. Verify order count, customer names, statuses, notes and dates.
6. Only after verification, switch day-to-day work to v2.
7. Preserve the v2 signing key securely for every later release.

## Future updates

Once v2 is signed with the new protected release key, every later build must keep:

- the same Android package identifier,
- the same signing key,
- a higher versionCode.

Then the in-app updater can download a release and hand it to Android for normal update confirmation.
