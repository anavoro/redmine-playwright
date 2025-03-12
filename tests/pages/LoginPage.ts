import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin() {
    await this.navigate("/login");
  }

  async enterUsername(username: string) {
    await this.page.fill("#username", username);
  }

  async enterPassword(password: string) {
    await this.page.fill("#password", password);
  }

  async checkRememberMe() {
    await this.page.check("#autologin");
  }

  async clickLogin() {
    await this.page.click("#login-submit");
  }

  async login(username: string, password: string, rememberMe: boolean = false) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    if (rememberMe) {
      await this.checkRememberMe();
    }
    await this.clickLogin();
    await this.waitForLoadState();
  }
  async isUserLoggedIn(): Promise<boolean> {
    return await this.page
      .locator("a.logout")
      .waitFor({ state: "visible", timeout: 5000 })
      .then(() => true)
      .catch(() => false);
  }
  async getErrorMessage() {
    return await this.page.locator("#flash_error").innerText();
  }
  async logout() {
    await this.page.click("text=Sign out");
    await this.page.waitForSelector("a.logout", { timeout: 5000 });
  }
}
