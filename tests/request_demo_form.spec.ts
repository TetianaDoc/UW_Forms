import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('https://userway.org')
    await page.getByText('Request a Demo').click()
})

test('Check if "Demo" form has all elements', async ({ page }) => {
    const popupTitle = page.locator('h1#popupTitle.popup-main__title')
    await expect(popupTitle).toHaveText('Request a Demo')
});
