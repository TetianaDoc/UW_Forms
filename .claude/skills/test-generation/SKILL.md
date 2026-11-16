---
name: test-generation
description: Generates idiomatic Playwright + TypeScript E2E tests and Page Object extensions for this UW_Forms test automation project. Produces type-safe, isolated test specs leveraging Page Objects (src/pages), custom fixtures (src/fixtures/testFixtures.ts), data sets (src/data/formsData.ts), and web-first assertions. Use when fixing Coverage findings or adding new UserWay form/layout E2E tests.
---

# E2E Test Generation Skill — UW_Forms Playwright Tests

Use this skill to write new `test(...)` blocks, spec files (`tests/**/*.spec.ts`), or Page Object methods (`src/pages/*.ts`), especially when resolving `Coverage` findings during the `/review` loop.

## Conventions

- **Test Runner & Fixtures:**
  - When testing demo forms or shared thank-you endpoints, import `{ test, expect }` from `../src/fixtures/testFixtures`.
  - When testing standalone modals or pricing layout, import `{ test, expect }` from `@playwright/test`.
- **Page Objects & Encapsulation:**
  - Injected fixtures: `baseFormPage`, `thankYouPage`.
  - Encapsulate reusable selectors and actions within `BasePage`, `BaseFormPage`, or `ThankYouPage`.
- **Test Data & Constants:**
  - Use `src/data/formsData.ts` for demo form configurations (`DemoFormData`).
  - Use synthetic emails (`@example.com`, RFC 2606) for all test inputs.
- **Assertions:**
  - Prefer Playwright web-first assertions (`await expect(locator).toBeVisible()`, `await expect(locator).toHaveText(...)`, `await expect(locator).toHaveAttribute(...)`, `await expect(page).toHaveURL(...)`).
- **Never use `page.waitForTimeout(...)`:** Synchronize on web-first assertions or loading state changes instead.

## Templates

### 1. Form Validation & Interaction Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Request a Demo Modal Keyboard Accessibility', () => {
  test('should dismiss modal when pressing Escape key', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByText('Request a Demo').click();

    const popup = page.locator('.popup-main');
    await expect(popup).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(popup).not.toBeVisible();
  });
});
```

### 2. Data-Driven Demo Form Test (using `testFixtures`)

```typescript
import { test, expect } from '../src/fixtures/testFixtures';

test('should submit custom demo form and navigate to thank you page', async ({
  baseFormPage,
  thankYouPage,
}) => {
  await baseFormPage.navigate('/demo/accessibility-widget');
  await baseFormPage.fillAndSubmitForm('Test User', 'test.user@example.com');

  await thankYouPage.verifyUrl(/\/thank-you/i);
  await thankYouPage.verifySuccessHeading();
});
```

### 3. Accessible Error State Test

```typescript
test('should validate aria-invalid attribute on email input error', async ({ page }) => {
  const submitBtn = page.locator('form.demo-form button[type="submit"]');
  const emailInput = page.locator('#email');
  const errorFeedback = page.locator('#email_error');

  await submitBtn.click();

  await expect(errorFeedback).toBeVisible();
  await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
});
```

## After Writing Tests

Run the TypeScript and Playwright verification chain:

```bash
# 1. Always verify TypeScript compilation and strict types first:
npx tsc --noEmit

# 2. List/validate test registration in Playwright without launching a browser:
npx playwright test --list <path/to/spec.ts>
```

## Scope Discipline

- Generate only the `test(...)` blocks or Page Object helpers required by the finding or user request.
- Reuse `src/fixtures/testFixtures.ts`, `src/pages/`, and `src/data/formsData.ts` rather than duplicating boilerplate.
- Never use `page.waitForTimeout(...)` or hardcode real PII/credentials.
