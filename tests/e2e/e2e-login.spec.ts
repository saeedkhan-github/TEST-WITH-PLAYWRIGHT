import { test, expect, BrowserContext } from "@playwright/test";
import { LoginPage } from "../../page/LoginPage";

// Ensure no stored session state
test.use({ storageState: undefined });

test.describe("Validate Login Functionality", () => {
    let context: BrowserContext;
    let loginPage: LoginPage;
    let page;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext({
            storageState: undefined, // Ensure no stored state is carried over
        });
        page = await context.newPage();
        loginPage = new LoginPage(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.waitForLoadState();
    });

    test.afterEach(async () => {
        await context.close(); // Close the browser context after each test
    });

    test('Verify Login with invalid credentials', async () => {
        await loginPage.Login('Admin11', 'admin123');
        await expect(page.locator('div[role="alert"]')).toHaveText('Invalid credentials');
    });

    test('Verify successful Login with valid credentials and logout', async () => {
        await loginPage.Login('Admin', 'admin123');
        await loginPage.Logout();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
});
