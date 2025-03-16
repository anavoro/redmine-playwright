import { test, expect } from "../fixtures";
import { LoginPage } from "./pages/LoginPage";

test("should display error with invalid login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const invalidLogin = process.env.REDMINE_USERNAME_INVALID!;
    const password = process.env.REDMINE_PASSWORD!;
    
    await loginPage.navigateToLogin();
    await loginPage.login(invalidLogin, password);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("Invalid user or password");
  });