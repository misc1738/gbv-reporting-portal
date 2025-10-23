# GBV reporting portal

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/misc1738s-projects/v0-gbv-reporting-portal)

This repository contains a Next.js application for reporting and managing GBV-related evidence and reports.

Developer setup
---------------

This project uses pnpm. Recommended node: 18+ (LTS) or 20.

Install and run locally:

```bash
# install pnpm if you don't have it
npm install -g pnpm

pnpm install
pnpm dev
```

Useful scripts
--------------

```
pnpm dev     # run Next.js in development
pnpm build   # build for production
pnpm lint    # run ESLint (fail on warnings)
pnpm test    # run unit tests (Vitest)
pnpm format  # run Prettier formatting
pnpm prepare # setup husky hooks
```

What I changed
--------------

- Added ESLint + Prettier configuration for consistent code style.
- Added Husky pre-commit hook and lint-staged to auto-fix/format staged files.
- Added Vitest + basic tests for utility functions and a test setup shim.
- Added a GitHub Actions CI workflow to run install, lint and tests on push/PR.

CI notes
--------

CI expects `pnpm` to be available. The workflow uses `actions/setup-node` and runs `pnpm install`.

Next steps / Recommendations
----------------------------

- Run `pnpm install` locally and execute `pnpm lint` and `pnpm test` to see current issues.
- I recommend adding more unit tests (encryption, form validation) and integrating Playwright for E2E.
- Review `lib/encryption.ts` for server-side encryption complements and RLS policies in the Supabase project.
# GBV reporting portal


[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/misc1738s-projects/v0-gbv-reporting-portal)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/U6kuX8Xynbx)



**[https://vercel.com/misc1738s-projects/v0-gbv-reporting-portal](https://vercel.com/misc1738s-projects/v0-gbv-reporting-portal)**

## Build your app
