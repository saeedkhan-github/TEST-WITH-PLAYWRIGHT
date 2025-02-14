import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { LoginPage } from '../../page/LoginPage';
const authDir = path.join(__dirname, '../.auth');


const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
  if (fs.existsSync(authFile)) {
    console.log('Auth state already exists. Skipping login.');
    return;
  }

  console.log('Auth state not found. Performing login...');
  await page.goto('/');
  
  const loginPage = new LoginPage(page);
  await loginPage.Login('Admin', 'admin123');

  await page.context().storageState({ path: authFile });
  console.log('Auth state saved.');
});



// if (!fs.existsSync(authDir)) {
//   fs.mkdirSync(authDir, { recursive: true });
// }

// setup('authenticate', async ({ page }) => {
//   // Perform authentication steps. Replace these actions with your own.
//   await page.goto('/');

//   const loginPage = new LoginPage(page);
//   await loginPage.Login('admin', 'admin123');
//   await page.waitForLoadState('domcontentloaded');
 

//   await page.context().storageState({ path: authFile });
// });