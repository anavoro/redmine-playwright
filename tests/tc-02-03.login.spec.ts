import { test, expect } from "../fixtures";

test.describe("Redmine Login Functionality", () => {
  test("should login successfully with valid credentials", async ({
    authenticatedPage,
  }) => {
    const isLoggedIn = await authenticatedPage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test("should display error with invalid login", async ({
    invalidLoginPage,
  }) => {
    const errorMessage = await invalidLoginPage.getErrorMessage();
    expect(errorMessage).toContain("Invalid user or password");
  });
});
