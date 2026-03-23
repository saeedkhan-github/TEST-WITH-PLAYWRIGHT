import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
const authFile = path.join(__dirname, 'tests/.auth/user.json');
const testDir = process.env.CI 
  ? (fs.existsSync('./build/tests') ? './build/tests' : './tests')
  : './tests';
export default defineConfig({
  testDir,
 
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2: undefined,
  reporter: [['html'] ,
             ['allure-playwright']],
 
  use: {
    
    baseURL: process.env.BASE_URL,
    ignoreHTTPSErrors: true,
    
    trace: 'on-first-retry',
  },

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
