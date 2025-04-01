import { expect, Locator, Page } from '@playwright/test';
import { promises } from 'dns';

export class LeftMenu{

    // readonly listItem: Locator;
    readonly page: Page;
    constructor(page:Page){

        this.page= page;

    }
     ListItem(item:string):Locator{
        return this.page.locator(`.oxd-main-menu-item:has-text("${item}")`);
    }
}