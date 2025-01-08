import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory where your test files are stored
  retries: 1,         // Number of retries for failed tests
  reporter: 'html',   // Test report format
  use: {
    headless: true,   // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Browser viewport size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors during tests
  },
});
