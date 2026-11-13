import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory where test files are stored
  fullyParallel: true,
  retries: 1,         // Number of retries for failed tests
  reporter: 'html',   // Test report format
  use: {
    baseURL: process.env.BASE_URL || 'https://qa.userway.dev',
    headless: true,   // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Browser viewport size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors during tests
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // WebKit is disabled on macOS 12 because Playwright 1.49.1 uses a frozen WebKit v2009 binary
    // that does not support the FixedBackgroundsPaintRelativeToDocument protocol setting.
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ]
});
