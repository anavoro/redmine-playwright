import { test, expect } from "../fixtures";
import { SearchPage } from "./pages/SearchPage";

test("Search results should match the chosen search term", async ({
  searchPage,
}) => {
  await searchPage.navigateToSearch();
  const chosenTerm = await searchPage.search(); // Get the search term used
  const resultsText = await searchPage.getSearchResults();

  expect(resultsText.toLowerCase()).toContain(chosenTerm);
});
