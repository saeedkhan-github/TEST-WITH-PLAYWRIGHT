import { Page , Locator} from '@playwright/test';

export class AdminPage {
  readonly page: Page;

  // Locators

  readonly searchInputField: Locator;
  // readonly submitSearch: Locator;


  constructor(page: Page) {
    this.page = page;
    this.searchInputField= page.locator('//div[@class="oxd-input-group oxd-input-field-bottom-space"]//div//input[@class="oxd-input oxd-input--active"]')
  }

  // Navigate to Admin Page
  async getSearchInputLocator(name:string) {
     this.searchInputField.fill(name);
  }

  // Add a new user
  async addUser(
    username: string,
    userRole: string,
    employeeName: string,
    status: string
  ) {
    await this.addUserButton.click();
    await this.usernameInput.fill(username);
    await this.userRoleDropdown.selectOption(userRole); // e.g., '1' for Admin
    await this.employeeNameInput.fill(employeeName);
    await this.statusDropdown.selectOption(status); // e.g., '1' for Enabled
    await this.saveButton.click();
  }

  // Get success message
//   async getSuccessMessage() {
//     return await this.successToast.innerText();
//   }
}
