
const { test, expect } = require('@playwright/test');

const baseURL = 'https://the-internet.herokuapp.com';

test.describe('A/B Testing', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
        await page.getByRole('link', { name: 'A/B Testing' }).click();
    });

    test('1. Navigate to the A/B Testing page', async ({ page }) => {
        await expect(page).toHaveURL(/\/abtest$/);

        await expect(
            page.getByRole('heading', { name: 'A/B Test Variation 1' })
                .or(page.getByRole('heading', { name: 'A/B Test Control' }))
        ).toBeVisible();
    });

    test('2. Verify the page heading', async ({ page }) => {
        const heading = page.locator('h3');

        await expect(heading).toBeVisible();

        await expect(heading).toContainText(/A\/B Test (Variation 1|Control)/);
    });

    test('3. Verify the page contains explanatory content', async ({ page }) => {
        await expect(page.locator('#content')).toContainText(
            /Also known as split testing/i
        );
    });

    test('4. Reload the page and verify it loads correctly', async ({ page }) => {
        await page.reload();

        await expect(page).toHaveURL(/\/abtest$/);

        await expect(page.locator('h3')).toContainText(
            /A\/B Test (Variation 1|Control)/
        );
    });

});
