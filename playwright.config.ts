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
  timeout: 60 *1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2: undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],
            ['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    ignoreHTTPSErrors: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
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
