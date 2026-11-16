import { test, expect, setupDemoMockRoutes } from '../src/fixtures/testFixtures';
import { demoForms, type DemoFormData } from '../src/data/formsData';

test.describe('Data-Driven Demo Forms Suite', () => {
  // Configure tests in this suite to run in parallel across workers
  test.describe.configure({ mode: 'parallel' });

  test.beforeEach(async ({ page }) => {
    await setupDemoMockRoutes(page);
  });

  test('Validate demo form submission is prevented when required fields are empty', async ({
    baseFormPage,
    page,
  }) => {
    const targetForm: DemoFormData = demoForms[0];
    await baseFormPage.navigate(targetForm.path);
    await expect(baseFormPage.form).toBeVisible();

    // Attempt submission without entering name or email
    await baseFormPage.clickSubmit();

    // Verify form was not submitted and did not navigate away
    await expect(page).toHaveURL(new RegExp(targetForm.path));
    await expect(page).not.toHaveURL(/\/thank-you/i);

    // Verify HTML5 valueMissing validation flag is triggered
    const isNameInvalid = await baseFormPage.nameInput.evaluate(
      (input: HTMLInputElement) => input.validity.valueMissing
    );
    expect(isNameInvalid).toBe(true);
  });

  test('Validate demo form submission is prevented with invalid email format', async ({
    baseFormPage,
    page,
  }) => {
    const targetForm: DemoFormData = demoForms[0];
    await baseFormPage.navigate(targetForm.path);
    await expect(baseFormPage.form).toBeVisible();

    await baseFormPage.fillName('Test User');
    await baseFormPage.fillEmail('invalid-email-format');
    await baseFormPage.clickSubmit();

    // Verify form was not submitted
    await expect(page).toHaveURL(new RegExp(targetForm.path));
    await expect(page).not.toHaveURL(/\/thank-you/i);

    // Verify HTML5 typeMismatch validation flag is triggered on email field
    const isEmailMismatch = await baseFormPage.emailInput.evaluate(
      (input: HTMLInputElement) => input.validity.typeMismatch
    );
    expect(isEmailMismatch).toBe(true);
  });

  test('Verify Thank You page displays confirmation message upon submission', async ({
    baseFormPage,
    thankYouPage,
  }) => {
    const targetForm: DemoFormData = demoForms[0];
    await baseFormPage.navigate(targetForm.path);
    await expect(baseFormPage.form).toBeVisible();
    await baseFormPage.fillAndSubmitForm(targetForm.name, targetForm.testEmail);

    await thankYouPage.verifyUrl(/\/thank-you/i);
    await thankYouPage.verifySuccessHeading();
    await expect(thankYouPage.confirmationMessage).toBeVisible();
    await expect(thankYouPage.confirmationMessage).toContainText(
      'Your demo request has been successfully received'
    );
  });

  // Dynamic parameterized test loop across all 20 demo forms
  for (const form of demoForms) {
    test(`[${form.id}] Submit ${form.name} and verify Thank You redirection`, async ({
      baseFormPage,
      thankYouPage,
    }) => {
      // Step 1: Navigate to the demo form page and verify form readiness
      await baseFormPage.navigate(form.path);
      await expect(baseFormPage.form).toBeVisible();

      // Step 2: Fill out the form and submit
      await baseFormPage.fillAndSubmitForm(form.name, form.testEmail);

      // Step 3: Verify redirection and success heading via consolidated POM helper
      await thankYouPage.verifySuccessfulSubmission({ urlPattern: /\/thank-you/i });
    });
  }
});
