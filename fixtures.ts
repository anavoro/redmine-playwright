import { test as base } from "@playwright/test";
import { config } from "dotenv";
import { BasePage } from "./tests/pages/BasePage";
import { LoginPage } from "./tests/pages/LoginPage";

config();

type RedmineFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  authenticatedPage: LoginPage;
};

export const test = base.extend<RedmineFixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
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
});

export { expect } from "@playwright/test";
