import { type Page } from '@playwright/test';
import { demoForms, type DemoFormData } from '../data/formsData';

/**
 * Registers mock route handlers for demo form endpoints and the shared Thank You page
 * when USE_REAL_BACKEND is not set to 'true'.
 */
export async function setupDemoMockRoutes(page: Page): Promise<void> {
  if (process.env.USE_REAL_BACKEND !== 'true') {
    await page.route('**/demo/**', async (route) => {
      const url = new URL(route.request().url());
      const formPath = url.pathname;
      const matchedForm: DemoFormData = demoForms.find((f) => f.path === formPath) ?? {
        id: 'demo-generic',
        name: 'Demo Request Form',
        path: formPath,
        testEmail: 'demo@example.com',
      };

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${matchedForm.name}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 2rem; }
            form { max-width: 480px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
            .form-group { display: flex; flex-direction: column; gap: 0.25rem; }
            label { font-weight: 600; font-size: 0.9rem; }
            input { padding: 0.6rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; }
            button { padding: 0.75rem 1.5rem; background: #0056b3; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; }
            button:hover { background: #004494; }
          </style>
        </head>
        <body>
          <header>
            <h1 id="form-title">${matchedForm.name}</h1>
            <p>Request a personalized demo for your organization.</p>
          </header>
          <main>
            <form id="demo-request-form" action="/thank-you" method="GET">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="Enter your full name" required />
              </div>
              <div class="form-group">
                <label for="email">Business Email</label>
                <input id="email" name="email" type="email" placeholder="Enter your business email" required />
              </div>
              <button id="submit-btn" type="submit">Submit Request</button>
            </form>
          </main>
        </body>
        </html>
      `;

      await route.fulfill({
        status: 200,
        contentType: 'text/html; charset=utf-8',
        body: html,
      });
    });

    // Intercept the shared success endpoint with resilient URL pattern matching
    await page.route(/\/thank-you/i, async (route) => {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You - UserWay</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 2rem; text-align: center; }
            .container { max-width: 540px; margin: 3rem auto; }
            h1 { color: #15803d; font-size: 2rem; margin-bottom: 0.5rem; }
            p { color: #4b5563; font-size: 1.1rem; line-height: 1.6; }
          </style>
        </head>
        <body>
          <main class="container">
            <h1 class="thank-you-title" data-testid="thank-you-heading">Thank You!</h1>
            <p class="thank-you-message" data-testid="thank-you-message">
              Your demo request has been successfully received. A member of our team will be in touch shortly.
            </p>
          </main>
        </body>
        </html>
      `;

      await route.fulfill({
        status: 200,
        contentType: 'text/html; charset=utf-8',
        body: html,
      });
    });
  }
}
