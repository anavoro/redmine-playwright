import { test, expect } from "../fixtures";

test("Search results should match the chosen search term", async ({
  searchPage,
}) => {
  await searchPage.navigateToSearch();
  const chosenTerm = searchPage.getRandomSearchTerm();
  await searchPage.enterSearch(chosenTerm);
  await searchPage.clickSearch();
  const resultsText = await searchPage.getSearchResults();
  expect(resultsText.toLowerCase()).toContain(chosenTerm);
});
