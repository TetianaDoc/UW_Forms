import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('https://qa.userway.dev/widget/', { waitUntil: 'networkidle' })
    await page.getByTitle('Website, meet Accessibility Widget')
})

test('Check if Pricing Tab has all elements', async ({ page }) => {
    await scrollToLoadAllContent(page, 'h2');
    const allH2s = await page.locator('h2').allTextContents();
    
    expect(allH2s).toEqual([
        'Fixes your code. Adapts to your users.',
        'Trusted by millions of websites globally',
        'Adapts to your visitors. All the time.',
        'The only Widget proven to boost performance',
        'Plug and play with our Accessibility Widget',
        'Pixel perfect',
        'Lightweight Widget. More impact at any size.',
        'Works anywhere you do business',
        'Enhance the Widget with  powerful add-ons.',
        'The Widget  prioritizes your users’ privacy and security',
        'Accessibility Widget Bundles pricing',
        'Seamless onboarding for every user.',
        'Seamless, Free Onboarding for Every User: Get Started Effortlessly',
        'The Widget\u00A0speaks your language.',
        'FAQs'
      ])

    //await page.waitForSelector('h2', { timeout: 30000 });
    //await page.locator('h2')//.scrollIntoViewIfNeeded({ timeout: 30000 })

    // const pricingPlanProTitle = page.locator('pricing-plan__title', {hasText: "Pro"})
    // await pricingPlanProTitle.scrollIntoViewIfNeeded()
    // const tooltip = pricingPlanProTitle.getByRole('tooltip')
    // await tooltip.scrollIntoViewIfNeeded()
    // const getAutomaticAlertsTooltip = await page.locator('tooltip_code-alerts-1').textContent()
    // expect(getAutomaticAlertsTooltip).toEqual("Get automatic alerts about the accessibility status of your website With actionable suggestions for code-level violation fixes")

});

async function scrollToLoadAllContent(page, selector) {
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = Math.floor(window.innerHeight / 2);
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 250);
      });
    });
    await page.waitForTimeout(1000);
  }
