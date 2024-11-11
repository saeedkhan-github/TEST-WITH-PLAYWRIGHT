import {test,expect} from "@playwright/test"

test.describe("Validate Login Functionality",()=>{

    test.beforeEach(async({page})=>{
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })
    test.fixme('Verify Login with invalid credentials ',async({page})=>{
        await page.locator('input[placeholder="Username"]').fill('user');
        await page.locator('input[placeholder="Password"]').fill('usera123');
        await page.locator('button[type="submit"]').click();
        // await page.getByText('div[role="alert"]').isVisible
        await expect(page.locator('div[role="alert"]')).toHaveText('Invalid credentials');
    })
    test('Verify successful Login with valid credentials and logout ',async({page})=>{
        await page.locator('input[placeholder="Username"]').fill('Admin');
        await page.locator('input[placeholder="Password"]').fill('admin123');
        await page.locator('button[type="submit"]').click();
        await page.waitForLoadState();
        await page.locator('.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon').click();
        await page.locator('oxd-userdropdown-link').filter({hasText:'Logout'}).click();
    })

    

})