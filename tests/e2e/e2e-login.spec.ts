import {test,expect} from "@playwright/test"

test.describe("Validate Login Functionality",()=>{

    test.beforeEach(async({page})=>{
        await page.goto('http://zero.webappsecurity.com/login.html')
    })
    test('Validate Login with invalid credentials ',async({page})=>{
        await page.locator('#user_login').fill('Admin');
        await page.locator('#user_password').fill('Admin123');
        await page.locator('input[value="Sign in"]').click();
        await page.getByText('Login and/or password are wrong.').isVisible
        await expect(page.locator('.alert.alert-error')).toHaveText('Login and/or password are wrong.');
    })

})