---
name: coverage-analysis
description: E2E UI test scenario coverage gap analysis for this UW_Forms Playwright + TypeScript test suite. Maps existing spec files against UserWay functional domains (request a demo modal, parameterized demo forms, widget pricing tabs & lazy-loaded sections), positive journeys, form validation errors, accessibility state checks, and boundary cases. Use during review to surface missing E2E test scenarios; pair with test-generation to implement them.
---

# E2E Test Coverage Analysis Skill — UW_Forms Playwright Tests

In an E2E UI test automation repository (`tests/**/*.spec.ts`), coverage analysis evaluates **user journey & validation scenario completeness** across UserWay forms and widget pricing features rather than application source-code line coverage. Apply this skill to identify high-value missing negative, validation, boundary, and state-verification test cases for the target `.spec.ts` file.

## Scenario Coverage Matrix per Feature Area

| Feature Area (`tests/`) | Page Objects / Fixtures Used | High-Value Scenarios Expected | Priority |
|---|---|---|---|
| **Request a Demo Modal** (`tests/request_demo_form.spec.ts`) | Direct page locators or `BaseFormPage` | 1. Modal open & structural element presence (title, subtitle, email, label, buttons, links)<br>2. Empty email submission validation (`#email_error`, `aria-invalid="true"`)<br>3. Invalid email format validation (`invalid-email-string`)<br>4. Error clearance and `aria-invalid="false"` upon valid input<br>5. Modal dismissal via close button<br>6. Modal dismissal via keyboard `Escape`<br>7. Whitespace-only email validation | High |
| **Data-Driven Demo Forms** (`tests/demo-forms.spec.ts`) | `BaseFormPage`, `ThankYouPage`, `testFixtures`, `demoForms` | 1. Parameterized submission across demo forms with Thank You URL (`/\/thank-you/i`) verification<br>2. Success heading visibility on Thank You page<br>3. Form validation when submitted with empty name or email<br>4. Network failure / routing interception resilience | High |
| **Widget Pricing & Tabs** (`tests/widget_pricing_tabs.spec.ts`) | Direct page locators, `scrollToLoadAllContent` | 1. Section heading verification across lazy-loaded content<br>2. Pricing bundle card visibility and CTA buttons<br>3. FAQ accordion expand/collapse interaction<br>4. Responsive layout verification | High |

## Procedure

### 1. Determine Target Feature & Existing Tests
- Read the target file.
- **Fast-path skip for non-spec targets:** If `target` is in `src/pages/`, `src/data/`, `src/fixtures/`, `playwright.config.ts`, `package.json`, or any file that is **not** a `*.spec.ts` file, write `_N/A — E2E scenario coverage analysis applies only to *.spec.ts files._` to `output_path` and return `COUNT=0`.
- Identify the feature under test and scan sibling `.spec.ts` files in `tests/` so you do not flag a scenario as missing if another spec file already covers it.
- Read the corresponding Page Object(s) in `src/pages/` to see which locators and methods already exist.

### 2. Identify High-Value Missing Scenarios in the Target Spec
- Check the Scenario Coverage Matrix above against the existing `test(...)` blocks in the target file.
- Also check whether existing positive tests omit critical contract assertions on properties returned by or visible on the Page Object.
- If a proposed test requires a new locator on a Page Object, note `out-of-scope: src/pages/<page>.ts` in the Fix.

### 3. Cap and Prioritize Findings
- Emit **at most 3 coverage findings per file** so spec files remain focused and deterministic.
- Prioritize:
  1. `High` — Missing core feature variant or critical validation path (e.g. keyboard accessibility `Escape` to close modal, whitespace-only input)
  2. `Medium` — Secondary validation scenario or interaction (e.g. FAQ accordion toggle)
  3. `Low` — Minor layout or cosmetic edge case

## Output Contract

When invoked with `feedback_path`, write findings using the shared format:

```markdown
### [ ] F<N> · <Severity> · Coverage
**Location:** `tests/request_demo_form.spec.ts:90`
**Issue:** `request_demo_form.spec.ts` tests closing the modal via the close button, but lacks a test verifying modal dismissal via the `Escape` key for keyboard accessibility.
**Fix:**
```typescript
  test('Validate closing the demo popup modal with Escape key', async ({ page }) => {
    const popup = page.locator('.popup-main');
    await expect(popup).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(popup).not.toBeVisible();
  });
```
**Apply with:** the `test-generation` skill.
```

`<Category>` is always `Coverage`.

## Scope Discipline

- Do **not** flag TypeScript style, unused imports, or POM refactoring issues in existing tests — those belong to `code-review` and `playwright-review`.
- Every proposed `test(...)` block must compile cleanly with existing fixtures or page objects.
