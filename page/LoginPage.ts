// LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userinput: Locator;
  readonly passwordinput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userinput = page.locator('input[placeholder="Username"]');
    this.passwordinput = page.locator('input[placeholder="Password"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async Login(username: string, password: string) {
    await this.userinput.waitFor({ state: 'visible' });
    await this.userinput.fill(username);
    await this.passwordinput.fill(password);
    await Promise.all([
      this.page.waitForNavigation(),
      this.submitButton.click(),
    ]);
  }
}
