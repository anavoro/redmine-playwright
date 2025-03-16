import { test, expect } from "../fixtures";

test.describe("Redmine Logout Functionality", () => {
  test("should logout successfully", async ({ authenticatedPage }) => {
    await authenticatedPage.logout();
    const isLoggedIn = await authenticatedPage.isUserLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });
});
