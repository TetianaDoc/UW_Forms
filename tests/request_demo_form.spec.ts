import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('https://qa.userway.dev/')
    await page.getByText('Request a Demo').click()
})

test('Check if Demo form has all elements', async ({ page }) => {
    const popupTitle = page.locator('h1#popupTitle.popup-main__title')
    await expect(popupTitle).toHaveText('Request a Demo')

    const subText = page.locator('p#popupDescription.popup-main__sub-title')
    await expect(subText).toHaveText("Discover how we can help you manage and maintain the accessibility of your websites, apps, digital products, and more.")

    const email = page.locator('#email')
    await expect(email).toBeEditable()

    const placeholder = await email.getAttribute('placeholder')
    expect(placeholder).toEqual("Business Email (required)")

});
