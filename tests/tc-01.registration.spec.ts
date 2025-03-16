import { test, expect } from "../fixtures";
import {
  randUser,
  randPassword,
  randFirstName,
  randLastName,
  randEmail,
} from "@ngneat/falso";

test.describe("Redmine Register Functionality", () => {
  test("should register the user in the system", async ({
    registrationPage,
  }) => {
    const user = generateRandomUser();

    await registrationPage.navigateToRegistration();
    await registrationPage.register(
      user.username,
      user.password,
      user.password,
      user.firstName,
      user.lastName,
      user.email
    );

    const confirmationMessage = await registrationPage.getConfirmationMessage();
    expect(confirmationMessage).toContain(
      "Account was successfully created. An email containing the instructions to activate your account was sent to "
    );
    expect(confirmationMessage).toContain(user.email);
  });
});

function generateRandomUser() {
  return {
    username: randUser().username,
    password: randPassword({ length: 10 }).toString(),
    firstName: randFirstName(),
    lastName: randLastName(),
    email: randEmail(),
  };
}
