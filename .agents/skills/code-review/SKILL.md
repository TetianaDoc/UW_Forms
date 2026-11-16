---
name: code-review
description: Comprehensive TypeScript and Playwright test architecture review for this UW_Forms E2E test automation codebase. Checks TypeScript strictness and idioms, layered architecture boundaries (src/pages, src/fixtures, src/data, tests), fixture and test isolation, and test automation antipatterns. Use when reviewing a spec file, page object, data module, or fixture for code quality, reliability, and maintainability.
---

# Code Review Skill — UW_Forms E2E Tests (TypeScript + Playwright)

Apply this review checklist to the target code (file, directory, or diff). Be exhaustive yet precise — surface real defects, flakiness risks, and maintainability issues rather than stylistic noise. The codebase uses **TypeScript (ES2022, strict mode)** and **Playwright Test (`@playwright/test`)** organized into: `src/pages/` (Page Objects), `src/fixtures/` (Test Fixtures), `src/data/` (Form Data Models & Datasets), and `tests/` (Feature Specs).

## Checklist

### TypeScript Idioms & Type Safety
- [ ] Strict typing enforced: no explicit `any`, untyped parameters, or unsafe type assertions (`as unknown as ...`) when proper interfaces exist (e.g. `DemoFormData` in `src/data/formsData.ts`, `TestFixtures` in `src/fixtures/testFixtures.ts`)
- [ ] `readonly` modifier applied to all `Locator`, `Page`, and sub-element properties on Page Objects (`BasePage`, `BaseFormPage`, `ThankYouPage`)
- [ ] Explicit return types (`Promise<void>`, `Promise<string>`, `Promise<Response | null>`, etc.) declared on all public Page Object methods
- [ ] No unused imports or dead variables in specs, fixtures, or page objects
- [ ] Clean, consistent relative imports (`../src/fixtures/testFixtures`, `../src/pages/BaseFormPage`, etc.)
- [ ] No leftover `console.log(...)` or `page.pause()` debugging statements in specs, fixtures, or page objects

### Layered Architecture & Test Isolation
- [ ] **Separation of concerns:**
  - `src/pages/` encapsulating locators and actions, extending `BasePage`
  - `src/data/` remaining pure data/models (`formsData.ts`) without Playwright DOM dependencies
  - `tests/**/*.spec.ts` using page objects and custom fixtures (`src/fixtures/testFixtures.ts`) where appropriate
- [ ] **Independent, isolated tests:** Each `test(...)` block must be self-contained and independent of execution order. Never share mutable state across `test(...)` blocks in module-scoped `let` variables
- [ ] **Data-driven tests:** Parameterized loops (such as in `tests/demo-forms.spec.ts`) must cleanly bind loop-scoped variables (`form`) and configure parallel isolation (`test.describe.configure({ mode: 'parallel' })`)

### Antipatterns in Test Automation
- [ ] **Hardcoded UI strings & magic paths:** Centralize recurring paths, titles, or messages into typed constants/datasets rather than duplicating raw string literals
- [ ] **Vacuous or weak assertions:** Avoid `expect(value).toBeTruthy()` when a stronger web-first or regex matcher applies (e.g. `await expect(page).toHaveURL(/\/thank-you/i)`)
- [ ] **Unawaited promises:** Every Playwright async call (`fill`, `click`, `goto`, `waitFor`, `expect(...)`) must be `await`ed
- [ ] **Swallowed errors or silent fallbacks:** Avoid returning empty strings via `(await locator.textContent()) || ''` when asserting critical values if web-first assertions (`await expect(locator).toHaveText(...)`) can be asserted directly on the `Locator`
- [ ] **Dead code or misleading comments:** Comments and test names must accurately reflect test actions and assertions

## Output Contract

When invoked by an agent that supplies a `feedback_path`, write findings to that file using **exactly** the format below. The first line of every finding **must** be `### [ ] F<N> · <Severity> · <Category>` — the `[ ]` checkbox is parsed downstream.

```markdown
# Code Review — Iteration <N>

**Target:** <path or scope>
**Date:** <YYYY-MM-DD>

## Summary

- Total findings: <N>
- Critical: <X> | High: <Y> | Medium: <Z> | Low: <W>

## Findings

### [ ] F1 · Medium · TypeScript
**Location:** `src/pages/BaseFormPage.ts:18`
**Issue:** `form`, `nameInput`, `emailInput`, `submitButton` are declared without `readonly` modifier.
**Fix:**
```typescript
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
```
```

`<Category>` is always `TypeScript`.
