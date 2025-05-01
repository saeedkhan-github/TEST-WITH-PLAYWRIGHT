import {test,expect} from "@playwright/test"
import { LoginPage } from "../../page/LoginPage"
import { LeftMenu } from "../../page/LeftMenu";
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

test.use({ storageState: authFile});

test.describe('PIM Page Tests',()=>{
    let loginPage : LoginPage;
    let list: LeftMenu;
    test.beforeEach(async({page})=>{

        // loginPage= new LoginPage(page);
        list= new LeftMenu(page);
        await page.goto('/');
        // await loginPage.Login('Admin','admin123');
        await page.waitForLoadState('domcontentloaded');
         await list.ListItem('PIM').click(); // pass any left menu item,admin,PIM, Leave, Time, to click on the item
         await page.waitForSelector('h6.oxd-topbar-header-breadcrumb-module');
         expect(await page.locator('h6.oxd-topbar-header-breadcrumb-module').textContent()).toContain('PIM');
    })

   

    test('Add Employee on PIM Page',async({page})=>{
        await page.waitForLoadState('domcontentloaded');
        const headerList= await page.locator('ul[data-v-5327b38a] li');
        expect(headerList).toHaveText(["Configuration ","Employee List","Add Employee","Reports"]);
        await page.locator('button.oxd-button.oxd-button--secondary').filter({ hasText: "Add" }).click();
         await page.getByRole('button', { name: 'Save' }).click();
         await page.waitForTimeout(2000);
        expect(await page.getByPlaceholder('First Name')).toHaveClass(/oxd-input--error/);
        expect(await page.getByPlaceholder('Last Name')).toHaveClass(/oxd-input--error/);
        // expect(await page.getByLabel('Last Name')).toHaveClass('oxd-input--error');

        await expect(
            page.locator('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').nth(0)
        ).toHaveText('Required');

        await expect(
            page.locator('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').nth(0)
        ).toHaveText('Required');
    })

})