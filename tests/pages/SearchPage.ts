import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToSearch() {
    await this.navigate("/search");
  }

  async enterSearch(searchItem: string) {
    await this.page.fill("#search-input", searchItem);
  }

  async clickSearch() {
    await this.page.click('input[name="commit"]');
  }
  async search() {
    const searchTerms = ["bug", "issue", "project", "request"];
    const randomSearchTerm =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];
    await this.enterSearch(randomSearchTerm);
    await this.clickSearch();
    return randomSearchTerm;
  }
  async getSearchResults() {
    return await this.page.locator("#search-results").innerText();
  }
}
