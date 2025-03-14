import { test as base } from "@playwright/test";
import { config } from "dotenv";
import { BasePage } from "./tests/pages/BasePage";
import { LoginPage } from "./tests/pages/LoginPage";
import { RegisterPage } from "./tests/pages/RegisterPage";
import { SearchPage } from "./tests/pages/SearchPage";
import {
  randUser,
  randEmail,
  randFirstName,
  randLastName,
  randPassword,
} from "@ngneat/falso";

config();
randPassword({ length: 10 });

type RedmineFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  authenticatedPage: LoginPage;
  invalidLoginPage: LoginPage;
  registrationPage: RegisterPage;
  searchPage: SearchPage;
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

  invalidLoginPage: async ({ loginPage }, use) => {
    const invalidLogin = process.env.REDMINE_USERNAME_INVALID!;
    const password = process.env.REDMINE_PASSWORD!;

    await loginPage.login(invalidLogin, password);

    await use(loginPage);
  },

  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegisterPage(page);

    const userLogin = randUser().username;
    const password: string = randPassword({ length: 10 }).toString();
    const confirmPassword = password;
    const firstName = randFirstName();
    const lastName = randLastName();
    const email = randEmail();

    await registrationPage.navigateToRegistration();
    await registrationPage.register(
      userLogin,
      password,
      confirmPassword,
      firstName,
      lastName,
      email
    );

    await use(registrationPage);
  },

  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await searchPage.navigateToSearch();
    await searchPage.search();
    await use(searchPage);
  },
});

export { expect } from "@playwright/test";
