
const { test, expect } = require('@playwright/test');

const baseURL = 'https://the-internet.herokuapp.com';

test.describe('Add/Remove Elements', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${baseURL}/add_remove_elements/`);
    });

    test('1. Navigate to Add/Remove Elements page', async ({ page }) => {
        await page.goto(baseURL);

        await page.getByRole('link', { name: 'Add/Remove Elements' }).click();

        await expect(page).toHaveURL(/add_remove_elements/);
        await expect(
            page.getByRole('button', { name: 'Add Element' })
        ).toBeVisible();
    });

    test('2. Add a single Delete button', async ({ page }) => {
        await page.getByRole('button', { name: 'Add Element' }).click();

        const deleteButtons = page.locator('button.added-manually');

        await expect(deleteButtons).toHaveCount(1);
        await expect(deleteButtons).toHaveText('Delete');
    });

    test('3. Add multiple Delete buttons', async ({ page }) => {
        const addButton = page.getByRole('button', {
            name: 'Add Element'
        });

        const deleteButtons = page.locator('button.added-manually');

        await addButton.click();
        await addButton.click();
        await addButton.click();

        await expect(deleteButtons).toHaveCount(3);
        await expect(deleteButtons).toHaveText([
            'Delete',
            'Delete',
            'Delete'
        ]);
    });

    test('4. Remove a Delete button', async ({ page }) => {
        await page.getByRole('button', { name: 'Add Element' }).click();
        await page.getByRole('button', { name: 'Add Element' }).click();

        const deleteButtons = page.locator('button.added-manually');

        await expect(deleteButtons).toHaveCount(2);

        await deleteButtons.first().click();

        await expect(deleteButtons).toHaveCount(1);
    });

    test('5. Remove all Delete buttons', async ({ page }) => {
        const addButton = page.getByRole('button', {
            name: 'Add Element'
        });

        const deleteButtons = page.locator('button.added-manually');

        await addButton.click();
        await addButton.click();
        await addButton.click();

        await expect(deleteButtons).toHaveCount(3);

        for (let i = 0; i < 3; i++) {
            await deleteButtons.first().click();
        }

        await expect(deleteButtons).toHaveCount(0);
    });

    test('6. Add another button after removing one', async ({ page }) => {
        const addButton = page.getByRole('button', {
            name: 'Add Element'
        });

        const deleteButtons = page.locator('button.added-manually');

        await addButton.click();
        await expect(deleteButtons).toHaveCount(1);

        await deleteButtons.first().click();
        await expect(deleteButtons).toHaveCount(0);

        await addButton.click();

        await expect(deleteButtons).toHaveCount(1);
        await expect(deleteButtons.first()).toHaveText('Delete');
    });

});

