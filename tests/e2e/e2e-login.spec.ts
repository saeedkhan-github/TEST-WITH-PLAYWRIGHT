import {test,expect} from "@playwright/test"
import { LoginPage } from "../../page/LoginPage"

test.describe("Validate Login Functionality",()=>{
    let loginPage : LoginPage;
    test.beforeEach(async({page})=>{
        loginPage= new LoginPage(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        await page.waitForLoadState();
    })
    test.afterEach(async({page})=>{
        page.close();
    })
    test('Verify Login with invalid credentials ',async({page})=>{
        await loginPage.Login('Admin11','admin123')
        await expect(page.locator('div[role="alert"]')).toHaveText('Invalid credentials');
    })
    test('Verify successful Login with valid credentials and logout ',async({page})=>{
        await loginPage.Login('Admin','admin123')
        
        await loginPage.Logout();
        await expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    })

})