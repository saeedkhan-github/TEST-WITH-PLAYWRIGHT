// oxd-toast-content oxd-toast-content--info
import {test,expect} from "@playwright/test"
import { LoginPage } from "../../page/LoginPage"
import { LeftMenu } from "../../page/LeftMenu";
import { AdminPage } from "../../page/AdminPage";
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

test.use({ storageState: authFile});
test.describe('Admin Page Tests',()=>{
    let loginPage : LoginPage;
    let list: LeftMenu;
    let admin: AdminPage;
    test.beforeEach(async({page})=>{
        // loginPage= new LoginPage(page);
        list= new LeftMenu(page);
        admin= new AdminPage(page);
       
        // await loginPage.Login('Admin','admin123')
    })

    test('Search for User on Admin Page',async({page})=>{
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        let dashboardText =await page.locator('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').innerText();
        await expect(dashboardText).toBe('Dashboard')
        // await (await list.ListItem('Admin')).click(); 
        await list.ListItem('Admin').click(); // pass any left menu item,admin,PIM, Leave, Time, to click on the item
        expect(await page.locator('.oxd-topbar-header-title').textContent()).toContain('User Management')
        // await page.locator('//div[@class="oxd-input-group oxd-input-field-bottom-space"]//div//input[@class="oxd-input oxd-input--active"]').fill('Zyed');
        await admin.getSearchInputLocator('zyed')
        await page.locator('button[type="submit"]').click();
        await page.waitForSelector('#oxd-toaster_1');
        let toastmsg= await page.locator('#oxd-toaster_1').textContent();
        expect(toastmsg).toContain('No Records Founding');

    })
})


//#oxd-toaster_1 id for toast message no record 