import { expect, Locator, Page } from '@playwright/test';

export class LeftMenu{

    readonly listItem: Locator;
    readonly page: Page;
    constructor(page:Page){

        this.page= page;
        
    }
}