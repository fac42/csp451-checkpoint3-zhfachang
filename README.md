# CSP-451 GitHub Actions Seed Repo

![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg?branch=main)
![CodeQL](https://github.com/OWNER/REPO/actions/workflows/codeql.yml/badge.svg?branch=main)

Seed repository for the GitHub Actions CI/CD CheckPoint in CSP-451 — Computer Systems
Projects. The pipeline lints, formats, tests with coverage thresholds, runs `npm audit`,
and analyses the source with GitHub CodeQL on every push and pull request. Dependabot
keeps npm packages and GitHub Actions versions current.

## Local setup

1. Install Node.js 20 LTS (18+ is acceptable).
2. Install deps:
   ```bash
   npm ci
   ```
3. Run checks:
   ```bash
   npm run format:check
   npm run lint
   npm test          # runs Jest with coverage thresholds
   npm run audit:check
   ```
4. Run the app:
   ```bash
   npm start
   ```
   Then visit http://localhost:3000

## Continuous Integration

This repository ships with two workflows:

- `.github/workflows/ci.yml` — formats, lints, tests with coverage threshold, and runs
  `npm audit` on every push and pull request.
- `.github/workflows/codeql.yml` — runs GitHub CodeQL on every push and pull request to
  `main`, plus a weekly scheduled scan every Monday at 06:00 UTC.

Triggers:

- Pushes to `main` or `develop`
- Pull requests to `main`
- Manual trigger via the GitHub Actions tab

## Code Scanning Stack

- **GitHub CodeQL** — semantic security analysis for JavaScript with the
  `security-and-quality` query suite. Results appear under the repository's Security tab.
- **Dependabot** (`.github/dependabot.yml`) — opens weekly pull requests for npm and
  GitHub Actions version bumps and ships security alerts.
- **`npm audit`** — the `audit` job in CI fails the build on advisories at moderate
  severity or higher.

## Testing Stack

- **Jest** with `--ci --coverage` produces an lcov report under `coverage/` that is
  uploaded as a workflow artifact.
- **Coverage threshold gate** is enforced in `package.json` (Jest `coverageThreshold`).
  The build fails if coverage drops below: statements 80%, lines 80%, functions 80%,
  branches 70%.
- **Supertest** drives Express HTTP assertions inside Jest.

## Exercise Goals

Students will:

1. Clone the seed and run the full quality pipeline locally.
2. Add a new `/health` endpoint with Jest + supertest tests.
3. Push the work through a feature branch and pull request.
4. Confirm the CI, CodeQL, and Dependabot configurations all behave correctly on the PR.
5. Drive a red-then-green debug cycle and capture it on the PR timeline.
6. Configure branch protection so the CI checks gate every merge to `main`.
