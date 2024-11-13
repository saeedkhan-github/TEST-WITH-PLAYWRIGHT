// oxd-toast-content oxd-toast-content--info
import {test,expect} from "@playwright/test"
import { LoginPage } from "../../page/LoginPage"
test.describe('Admin Page Tests',()=>{
    let loginPage : LoginPage;
    test.beforeEach(async({page})=>{
        loginPage= new LoginPage(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await loginPage.Login('Admin','admin123')
    })

    test('Search for User on Admin Page',async({page})=>{
        let dashboardText =await page.locator('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').innerText();
        await expect(dashboardText).toBe('Dashboard')
        await page.locator('.oxd-main-menu-item:has-text("Admin")').click();
        expect(await page.locator('.oxd-topbar-header-title').textContent()).toContain('User Management')
        // await page.locator('.oxd-main-menu-item.active.toggle').click();
    })
})