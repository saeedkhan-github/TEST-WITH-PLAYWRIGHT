Playwright Testing Project
using typescript. 

Clone the Repo: https://github.com/saeedkhan-github/TEST-WITH-PLAYWRIGHT

Run npm install 
run npx playwright install  // to install the browser drivers
run npm run test
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report


Test Strategy : 
The login is done in the file auth.setup.ts 
The login is done only once and the session is used for the Test files [ e2e-admin, e2e-pim] of the test cases.

CI/CD : 
Github workflow runs when there is merge/commit request for the master branch.
The test cases are run on the latest version of chrome and firefox browsers.
The test results are pushed to the gh-pages repo.
Reports are generated even when tests fail (if: always())
The gh-pages branch is force-updated with each run

Workflow Steps:
Checkout - Retrieves the latest code
Node.js Setup - Configures Node.js LTS version
Dependency Cache - Speeds up installation using cached node_modules
Dependency Installation - Uses npm ci for reproducible builds
Playwright Installation - Downloads required browsers
Test Execution - Runs Playwright test suite
Report Generation - Creates Allure reports
Artifact Upload - Stores reports as workflow artifacts
GitHub Pages Deployment - Publishes reports to gh-pages branch

Test Cases : 

1. Login to the application with Valid Credentials 
2. Login with invalid Credentials
3. Add Employee on PIM page.
4. Search for User on the Admin Page
5. Navigate to the Admin page search for User
6. Logout from the application
7. Varify login with email verification Code // separate test case using mailslurp to verify the login functionality with verification code. 



View Report by visiting 
 https://saeedkhan-github.github.io/TEST-WITH-PLAYWRIGHT/


🤝 Contributing :
Create a feature branch from main, master, or reporting
Write tests for new functionality
Ensure all tests pass locally
Create a pull request to one of the protected branches