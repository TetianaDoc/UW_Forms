---
name: playwright-review
description: Domain review for Playwright and Page Object Model (POM) idioms in this UW_Forms E2E automation project. Checks Locator encapsulation in Page Objects, web-first assertions, BasePage inheritance, synchronization without arbitrary sleeps (page.waitForTimeout), and Playwright fixture patterns. Use when reviewing spec files, page objects, or Playwright configuration.
---

# Playwright Review Skill — UW_Forms E2E Tests

Apply this checklist to the target code. Focus strictly on idiomatic **Playwright (`@playwright/test`)** usage, Page Object Model (POM) encapsulation, resilient locator strategies, web-first assertions, and eliminating flaky synchronization delays.

## Checklist

### 1. Page Object Model (POM) Encapsulation (`src/pages/`)
- [ ] **Encapsulate locators in Page Objects:** Where Page Objects exist (`BaseFormPage`, `ThankYouPage`), spec files should leverage their locators and action methods rather than repeatedly defining raw selectors directly in tests.
- [ ] **All Page Objects extend `BasePage`:** Every page class in `src/pages/` extends `BasePage` and leverages inherited helpers (`navigate`, `waitForLoadState`, `waitForNetworkIdle`, `waitForUrl`).
- [ ] **Constructor locator initialization:** Initialize `readonly` locators in the `constructor(page: Page)`.

### 2. Locator Strategy & Resilience
- [ ] Prefer resilient, user-facing selectors (`getByRole`, `getByLabel`, `getByText`, or scoped container locators) over fragile positional or deep hierarchical selectors (`div > div:nth-child(2) > p`).
- [ ] Avoid string interpolation inside CSS selectors when dynamic text could contain special characters; prefer `.filter({ hasText: ... })` or Playwright text/role matchers.
- [ ] For validation error elements (e.g. `#email_error`, `aria-invalid="true"`), expose dedicated `Locator` properties or methods on the Page Object.

### 3. Web-First Assertions vs Manual Extraction
- [ ] Prefer Playwright web-first assertions (`await expect(locator).toBeVisible()`, `await expect(locator).toHaveText(...)`, `await expect(locator).toContainText(...)`, `await expect(locator).toHaveAttribute(...)`, `await expect(page).toHaveURL(...)`) over extracting primitive values with `await locator.textContent()`, `await locator.isVisible()`, or `allTextContents()` and passing them to synchronous `expect(...)`.
- [ ] Web-first assertions automatically retry until the expectation passes or the timeout expires, preventing race conditions.

### 4. Synchronization & Waiting (No Flaky Sleeps)
- [ ] **Never use `page.waitForTimeout(...)`** or hardcoded delays. Flag any occurrences (e.g. in lazy-load helpers or after navigation) and replace them with auto-retrying web-first locator assertions (`await expect(lastElement).toBeVisible()`) or state predicates (`await page.waitForLoadState('networkidle')`).
- [ ] **Navigation & form submission waits:** Use web-first assertions on the resulting URL (`await thankYouPage.verifyUrl(...)`) or UI state (`await thankYouPage.verifySuccessHeading(...)`) rather than brittle fixed timeouts.

### 5. Playwright Configuration & Fixtures (`playwright.config.ts`, `src/fixtures/testFixtures.ts`)
- [ ] `testFixtures.ts` cleanly extends base test with pre-instantiated page objects (`baseFormPage`, `thankYouPage`).
- [ ] CI/Diagnostic artifacts (`trace: 'on-first-retry'`, `screenshot: 'only-on-failure'`) remain configured in `playwright.config.ts`.

## Output Contract

When invoked by an agent with a `feedback_path`, write findings to that file using the shared format:

```markdown
# Playwright Review — Iteration <N>

**Target:** <path or scope>
**Date:** <YYYY-MM-DD>

## Summary

- Total findings: <N>
- Critical: <X> | High: <Y> | Medium: <Z> | Low: <W>

## Findings

### [ ] F1 · High · Playwright
**Location:** `tests/widget_pricing_tabs.spec.ts:50`
**Issue:** Hardcoded arbitrary sleep `await page.waitForTimeout(1000)` creates flakiness and slows down the test suite.
**Fix:**
```typescript
  // Replace arbitrary sleep with an assertion on the final expected lazy-loaded section:
  await expect(page.locator('h2').filter({ hasText: 'FAQs' })).toBeVisible();
```
```

`<Category>` is always `Playwright`.
