import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { LoginPage } from '../../page/LoginPage';
const authDir = path.join(__dirname, '../.auth');
const authFile = path.join(authDir, 'user.json');

if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true });
}

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/');

  const loginPage = new LoginPage(page);
  await loginPage.Login('admin', 'admin123');
  await page.waitForLoadState('domcontentloaded');
  // await page.getByPlaceholder('Username').click();
  // await page.getByPlaceholder('Username').fill('admin');
  // await page.getByPlaceholder('Password').fill('admin123');
  // await page.locator("button[type='submit']").click();

  await page.context().storageState({ path: authFile });
});