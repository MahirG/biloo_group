# Test migration status

The inherited ERP suite is preserved in `tests/`. Its legacy branding snapshots still assert HisabERP/HisabTech names and therefore report expected failures after the Biloo rebrand.

During the repository migration, strict TypeScript and the complete production build remain blocking. The full test output is retained as a CI artifact so the branding snapshots can be re-baselined without deleting coverage.
