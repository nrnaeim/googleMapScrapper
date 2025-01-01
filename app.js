/*
 * Title: Google Map Scrapper
 * Description:
 * Author: Niemur Rahman
 * Date: 01/01/2025
 */
//dependencies
import puppeteer from "puppeteer";
import fs from "fs";
import lodash from "lodash";
import { searchInput } from "./helpers/searchInput.js";
import { selectors } from "./helpers/selectors.js";
import { helpers } from "./helpers/helpers.js";
//module scaffolding
export const app = {};
//Final data as an array of object
app.collectedData = [];
//Main function
app.mainFunction = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--lang=en-US"],
    devtools: false,
  });
  //created page instance
  const page = await browser.newPage();
  page.setDefaultTimeout(0);
  await page.setExtraHTTPHeaders({ "Accept-Language": "en" });
  const context = browser.defaultBrowserContext();
  await context.overridePermissions(selectors.googleUrl, ["geolocation"]);
  //looping through searchInput
  for (let i = 0; i < searchInput.length; i++) {
    //changin geolocation for each search
    await page.setGeolocation({
      latitude: parseFloat(searchInput[i].lat),
      longitude: parseFloat(searchInput[i].lon),
    });
    await page.goto(selectors.googleMapurl, { waitUntil: "load" });
    //Typing search string and waiting for result load
    await page.waitForSelector(selectors.searchInput);
    await page.type(selectors.searchInput, searchInput[i].srcStr, {
      delay: 20,
    });
    await page.keyboard.press("Enter");
    await page.waitForNetworkIdle();
    //scrolling search result container
    if ((await page.$(selectors.searchResultContainer)) !== null) {
      //Scrolling result
      await helpers.scrolling(page, selectors.searchResultContainer);
      //Search results for each keyword and handling them
      const searchResults = await page.$$(selectors.searchResults);
      for (let searchResult of searchResults) {
        await searchResult.click();
        // Wait for the click action to complete
        await page.waitForNetworkIdle();
        //Data container scrolling
        await helpers.scrolling(page, selectors.dataContainer);
        //Collecting final data for each search result
        await helpers.dataCollect(page, app.collectedData, searchResult);
      }
    }
    //filtering uniq data
    app.uniqData = lodash.uniqBy(app.collectedData, "name");
    //clearning reviews
    const cleanData = helpers.reviewClean(app.uniqData);
    //writing file for each search results
    fs.writeFile("./output.json", JSON.stringify(cleanData), (err) => {
      if (err) {
        console.log(err);
      }
    });
    //printing working progress
    console.log(`${i + 1} of ${searchInput.length} completed successfully`);
  }
  console.log(`Congratulations! You job is done`);
  await browser.close();
};
app.mainFunction();
