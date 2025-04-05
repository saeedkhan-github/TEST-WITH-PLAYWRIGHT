import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { json } from 'stream/consumers';
dotenv.config({ path: path.resolve(__dirname, '.env') });
const authFile = path.join(__dirname, 'tests/.auth/user.json');
const testDir = process.env.CI ? './build/tests' : './tests';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir,
  timeout: 30 *1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2: undefined,
  reporter: [['html'] ,
             ['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
    baseURL: process.env.BASE_URL,
    ignoreHTTPSErrors: true,
    actionTimeout: 15 * 1000,
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch:[ 
        /.*\.setup\.ts/,
        /.*\.setup\.js/,
      ],
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: fs.existsSync(authFile) ? authFile : undefined, // Use stored state if available
      },
      dependencies: fs.existsSync(authFile) ? [] : ['setup'], // Run setup only if state doesn't exist
    },
  ],
    
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
