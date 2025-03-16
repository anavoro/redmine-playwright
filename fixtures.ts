import { test as base } from "@playwright/test";
import { config } from "dotenv";
import { BasePage } from "./tests/pages/BasePage";
import { LoginPage } from "./tests/pages/LoginPage";
import { RegistrationPage } from "./tests/pages/RegistrationPage";
import { SearchPage } from "./tests/pages/SearchPage";

config();

type RedmineFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  authenticatedPage: LoginPage;
  registrationPage: RegistrationPage;
  searchPage: SearchPage;
};

export const test = base.extend<RedmineFixtures>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToRegistration();
    await use(registrationPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await use(loginPage);
  },

  authenticatedPage: async ({ loginPage }, use) => {
    const username = process.env.REDMINE_USERNAME!;
    const password = process.env.REDMINE_PASSWORD!;
    await loginPage.login(username, password);
    await loginPage.isUserLoggedIn();
    await use(loginPage);
  },

  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await searchPage.navigateToSearch();
    await use(searchPage);
  },
});

export { expect } from "@playwright/test";
