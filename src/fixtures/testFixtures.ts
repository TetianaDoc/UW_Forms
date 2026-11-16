import { test as base, expect } from '@playwright/test';
import { BaseFormPage } from '../pages/BaseFormPage';
import { ThankYouPage } from '../pages/ThankYouPage';
import { setupDemoMockRoutes } from './mockRouting';

/**
 * Fixture type definition declaring custom page objects.
 */
export interface TestFixtures {
  baseFormPage: BaseFormPage;
  thankYouPage: ThankYouPage;
  mockDemoRoutes: void;
}

/**
 * Custom Playwright test fixture extending base test with pre-instantiated
 * BaseFormPage and ThankYouPage objects.
 */
export const test = base.extend<TestFixtures>({
  mockDemoRoutes: async ({ page }, use) => {
    await setupDemoMockRoutes(page);
    await use();
  },
  baseFormPage: async ({ page }, use) => {
    const baseFormPage = new BaseFormPage(page);
    await use(baseFormPage);
  },
  thankYouPage: async ({ page }, use) => {
    const thankYouPage = new ThankYouPage(page);
    await use(thankYouPage);
  },
});

export { expect, setupDemoMockRoutes };
