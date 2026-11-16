import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * BaseFormPage provides reusable locators and interactions for demo forms.
 * Extends BasePage to inherit generic navigation and loading state operations.
 */
export class BaseFormPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly form: Locator;

  constructor(page: Page) {
    super(page);

    this.form = page.locator('form').first();
    this.nameInput = page.locator('input#name, input[name="name"], input[name="fullName"], input[placeholder*="name" i]').first();
    this.emailInput = page.locator('input#email, input[name="email"], input[type="email"], input[placeholder*="email" i]').first();
    this.submitButton = page.locator('form button[type="submit"], button[type="submit"], button:has-text("Submit"), button:has-text("Continue"), button:has-text("Request")').first();
  }

  /**
   * Fills the Name input with the specified string.
   */
  async fillName(name: string): Promise<void> {
    await this.nameInput.waitFor({ state: 'visible' });
    await this.nameInput.fill(name);
  }

  /**
   * Fills the Email input with the specified email address.
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
  }

  /**
   * Clicks the form submit button.
   */
  async clickSubmit(): Promise<void> {
    await this.submitButton.waitFor({ state: 'visible' });
    await this.submitButton.click();
  }

  /**
   * Populates Name and Email fields, then triggers submission.
   * @param name Contact or submitter name
   * @param email Contact or business email
   */
  async fillAndSubmitForm(name: string, email: string): Promise<void> {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.clickSubmit();
  }
}
