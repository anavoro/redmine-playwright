import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {
  private randomSearchTerm: string = "";

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

  getRandomSearchTerm(): string {
    const searchTerms = ["bug", "issue", "project", "request"];
    this.randomSearchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    return this.randomSearchTerm;
  }

  async getSearchResults() {
    return await this.page.locator("#search-results").innerText();
  }
}
