import { test, expect } from "../fixtures";

test.describe("Redmine Login Functionality", () => {
  test("should display error with invalid login", async ({ loginPage }) => {
    await loginPage.login("ana.voro.test@gmail.com", "Test2025!");
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("Invalid user or password");
  });

  test("should login successfully with valid credentials", async ({
    authenticatedPage,
  }) => {
    const isLoggedIn = await authenticatedPage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });
});
