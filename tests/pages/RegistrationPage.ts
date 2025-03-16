import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToRegistration() {
    await this.navigate("/account/register");
  }

  async enterUserLogin(userLogin: string) {
    await this.page.fill("#user_login", userLogin);
  }

  async enterPassword(password: string) {
    await this.page.fill("#user_password", password);
  }

  async enterConfirmPassword(confirmPassword: string) {
    await this.page.fill("#user_password_confirmation", confirmPassword);
  }

  async enterFirstName(firstName: string) {
    await this.page.fill("#user_firstname", firstName);
  }

  async enterLastName(lastName: string) {
    await this.page.fill("#user_lastname", lastName);
  }

  async enterEmail(email: string) {
    await this.page.fill("#user_mail", email);
  }

  async clickRegister() {
    await this.page.click('input[name="commit"]');
  }

  async register(
    userLogin: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    email: string
  ) {
    await this.enterUserLogin(userLogin);
    await this.enterPassword(password);
    await this.enterConfirmPassword(confirmPassword);
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterEmail(email);

    await this.clickRegister();
    await this.waitForLoadState();
  }

  async getConfirmationMessage() {
    return await this.page.locator(".flash.notice").innerText();
  }
}
