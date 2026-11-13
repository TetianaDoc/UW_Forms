import { test, expect } from '@playwright/test';

test.describe('Request a Demo Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByText('Request a Demo').click();
  });

  test('Check if Demo form has all expected elements', async ({ page }) => {
    const popupTitle = page.locator('h2#popupTitle.popup-main__title');
    await expect(popupTitle).toBeVisible();
    await expect(popupTitle).toHaveText('Request a Demo');

    const subText = page.locator('p#popupDescription.popup-main__sub-title');
    await expect(subText).toBeVisible();
    await expect(subText).toHaveText(
      'Discover how we can help you manage and maintain the accessibility of your websites, apps, digital products, and more.'
    );

    const email = page.locator('#email');
    await expect(email).toBeVisible();
    await expect(email).toBeEditable();

    const emailLabel = page.locator('label[for="email"]');
    await expect(emailLabel).toBeVisible();
    await expect(emailLabel).toHaveText('Business Email (required)');

    const submitBtn = page.locator('form.demo-form button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText('Continue');

    const termsLink = page.locator('form.demo-form a[href="/terms/"]');
    await expect(termsLink).toBeVisible();

    const privacyLink = page.locator('form.demo-form a[href="/privacy/"]');
    await expect(privacyLink).toBeVisible();

    const closeBtn = page.locator('button[aria-label="Close modal"]');
    await expect(closeBtn).toBeVisible();
  });

  test('Validate error message on empty email submission', async ({ page }) => {
    const submitBtn = page.locator('form.demo-form button[type="submit"]');
    const emailInput = page.locator('#email');
    const errorFeedback = page.locator('#email_error');

    await submitBtn.click();

    await expect(errorFeedback).toBeVisible();
    await expect(errorFeedback).toHaveText(/Please enter your email address/);
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('Validate error message on invalid email format', async ({ page }) => {
    const submitBtn = page.locator('form.demo-form button[type="submit"]');
    const emailInput = page.locator('#email');
    const errorFeedback = page.locator('#email_error');

    await emailInput.fill('invalid-email-string');
    await submitBtn.click();

    await expect(errorFeedback).toBeVisible();
    await expect(errorFeedback).toHaveText(/Please enter your email address/);
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('Validate error disappears after entering valid email', async ({ page }) => {
    const submitBtn = page.locator('form.demo-form button[type="submit"]');
    const emailInput = page.locator('#email');
    const errorFeedback = page.locator('#email_error');

    // Trigger validation error
    await submitBtn.click();
    await expect(errorFeedback).toBeVisible();

    // Fill valid email
    await emailInput.fill('qa.test@example.com');
    await expect(errorFeedback).toHaveText('');
    await expect(emailInput).toHaveAttribute('aria-invalid', 'false');
  });

  test('Validate closing the demo popup modal', async ({ page }) => {
    const popup = page.locator('.popup-main');
    await expect(popup).toBeVisible();

    const closeBtn = page.locator('button[aria-label="Close modal"]');
    await closeBtn.click();

    await expect(popup).not.toBeVisible();
  });
});
