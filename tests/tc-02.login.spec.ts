import { test, expect } from "../fixtures";

test.describe("Redmine Login Functionality", () => {
  test("should login successfully with valid credentials", async ({ loginPage }) => {
    const username = process.env.REDMINE_USERNAME!;
    const password = process.env.REDMINE_PASSWORD!;

    await loginPage.login(username, password);

    const isLoggedIn = await loginPage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });
});
