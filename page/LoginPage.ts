import { expect, Locator, Page } from '@playwright/test';


export class LoginPage{
    readonly page:Page;
    readonly userinput: Locator;
    readonly passwordinput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    constructor(page:Page){
        this.page= page;
        this.userinput= page.locator('input[placeholder="Username"]');
        this.passwordinput= page.locator('input[placeholder="Password"]');
        this.submitButton = page.locator('button[type="submit"]')
        this.errorMessage = page.locator('div[role="alert"]')
    }
    async Login(username:string,password:string){
       
        await this.userinput.fill(username);
        await this.passwordinput.fill(password);
        await this.submitButton.click();

    }
    async Logout(){
        await this.page.locator('.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon').click();
        await this.page.locator('.oxd-userdropdown-link:has-text("Logout")').click();
       
    }

}