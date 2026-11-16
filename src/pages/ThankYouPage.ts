import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ThankYouPage encapsulates locators and verification methods for the shared
 * success / thank-you landing page reached upon form submission.
 */
export class ThankYouPage extends BasePage {
  readonly successHeading: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.successHeading = page.locator(
      'h1, h2, [data-testid="thank-you-heading"], .thank-you-title'
    ).filter({
      hasText: /thank you|thank-you|success|request received|we've received your request/i,
    }).first();

    this.confirmationMessage = page.locator(
      'p.thank-you-message, [data-testid="thank-you-message"], .confirmation-text, p'
    ).filter({
      hasText: /thank you|received|touch shortly|confirmation|demo/i,
    }).first();
  }

  /**
   * Asserts that the browser URL matches the expected Thank You endpoint pattern.
   * @param expectedPattern Pattern to validate (default: /.*\/thank-you.*\/i)
   */
  async verifyUrl(expectedPattern: RegExp | string = /.*\/thank-you.*/i): Promise<void> {
    await expect(this.page).toHaveURL(expectedPattern);
  }

  /**
   * Asserts that the Thank You success heading is visible on the page.
   * Optionally verifies the heading contains expected text.
   * @param expectedText Optional text or regular expression to match against the heading.
   */
  async verifySuccessHeading(expectedText?: string | RegExp): Promise<void> {
    await expect(this.successHeading).toBeVisible();
    if (expectedText) {
      await expect(this.successHeading).toHaveText(expectedText);
    }
  }

  /**
   * Convenience method to assert both URL pattern and success heading visibility.
   * @param options Optional overrides for URL pattern and heading text.
   */
  async verifySuccessfulSubmission(options?: {
    urlPattern?: RegExp | string;
    expectedHeading?: string | RegExp;
  }): Promise<void> {
    await this.verifyUrl(options?.urlPattern);
    await this.verifySuccessHeading(options?.expectedHeading);
  }
}
