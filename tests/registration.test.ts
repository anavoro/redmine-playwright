import { test, expect } from "../fixtures";

test.describe("Redmine Register Functionality", () => {
  test("should register the user in the system", async ({
    registrationPage,
  }) => {
    const confirmationMessage = await registrationPage.getConfirmationMessage();

    expect(confirmationMessage).toContain(
      "Account was successfully created. An email containing the instructions to activate your account was sent to "
    );
  });
});
