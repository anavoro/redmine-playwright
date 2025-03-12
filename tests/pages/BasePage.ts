import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string = "") {
    await this.page.goto(`https://www.redmine.org${path}`);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async waitForLoadState() {
    await this.page.waitForLoadState("load");
  }
}
