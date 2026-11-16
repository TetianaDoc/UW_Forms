---
name: security-audit
description: Security, credential, and PII hygiene audit for this UW_Forms Playwright + TypeScript test automation codebase. Covers credential sourcing, environment configuration, synthetic email test data in fixtures and datasets, browser-context evaluations (page.evaluate), and .gitignore/package.json hygiene. Use when reviewing fixtures, datasets, page objects, specs, or project config.
---

# Security Audit Skill — UW_Forms E2E Tests (Playwright + TypeScript)

Apply this security checklist to the target file, directory, or configuration (`playwright.config.ts`, `package.json`, `.gitignore`). Be strict on credential hygiene, PII safety in test datasets, and artifact/cache exclusions.

## Audit Scope

### 1. Credential & Environment Variable Hygiene
- [ ] **No real credentials in source control:** Real usernames, passwords, API tokens, or session cookies must never appear in `src/`, `tests/`, or `playwright.config.ts`.
- [ ] **Environment URL validation:** `playwright.config.ts` sources `process.env.BASE_URL` with a safe fallback to `https://qa.userway.dev`. Never hardcode internal URLs with embedded basic-auth credentials (`https://user:pass@host`).
- [ ] **No secrets logged to console:** Never print sensitive tokens, session state, or environment variables via `console.log` in tests, fixtures, or page objects.

### 2. Test Data & PII Hygiene (`src/data/`)
- [ ] **Synthetic test emails only (RFC 2606):** All static test datasets (`src/data/formsData.ts`) and spec fixtures must use reserved domains (`@example.com`, `@test.example.com`) rather than real corporate or personal email domains.
- [ ] **No real user data:** Fictional contact names and synthetic addresses only.

### 3. Browser Context & DOM Execution Safety
- [ ] **Safe `page.evaluate` / `page.waitForFunction` usage:** Any browser-context evaluation in helper functions (e.g. `scrollToLoadAllContent` in `widget_pricing_tabs.spec.ts`) must avoid injecting unsanitized external strings into DOM queries — pass arguments safely as parameters if dynamic values are ever needed.
- [ ] **Storage state isolation:** Saved browser authentication state (if any) must never be committed to Git.

### 4. Repository & Build Hygiene (`.gitignore` & `package.json`)
- [ ] `.gitignore` excludes `node_modules/`, `playwright-report/`, `test-results/`, `blob-report/`, `playwright/.cache/`, `.env`, `.claude/.review-cache/`, and `.agents/.review-cache/`.
- [ ] Dependencies in `package.json` use explicit semver ranges under `devDependencies` (`@playwright/test`, `typescript`) with lockfile (`package-lock.json`) committed.

## Severity Classification

| Severity | Examples |
|---|---|
| **Critical** | Real credentials, API keys, or session tokens hardcoded in source files or committed in test artifacts |
| **High** | `.env`, `.claude/.review-cache/`, or `.agents/.review-cache/` missing from `.gitignore`; sensitive secrets printed to stdout |
| **Medium** | Real PII (real personal emails, corporate domains) in `src/data/formsData.ts` or `tests/`; unsafe string interpolation inside `page.evaluate` |
| **Low** | Minor dependency or configuration hardening in `package.json` / `playwright.config.ts` |

## Output Contract

When invoked by an agent with a `feedback_path`, write findings to the feedback file using the shared format:

```markdown
### [ ] F<N> · <Severity> · Security
**Location:** `.gitignore:12`
**Issue:** `.gitignore` does not exclude `.claude/.review-cache/` and `.agents/.review-cache/`, risking accidental commit of review artifacts and cached snippets.
**Fix:**
```gitignore
# AI review cache
.claude/.review-cache/
.agents/.review-cache/
```
```

`<Category>` is always `Security`.

## Scope Discipline

- Own credential handling, PII/email hygiene in test data, `page.evaluate` safety, and `.gitignore`/`package.json` security.
- Defer TypeScript typing and code style to `code-review` and Playwright locator/POM mechanics to `playwright-review`.
