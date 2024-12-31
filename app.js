/*
 * Title: Google Map Scrapper
 * Description:
 * Author: Niemur Rahman
 * Date: 01/01/2025
 */
//dependencies
import puppeteer from "puppeteer";
import fs from "fs";
import { searchInput } from "./helpers/searchInput.js";
import { selectors } from "./helpers/selectors.js";
import { cookieData } from "./credentials/cookies.js";
//import { helpers } from "./helpers/helpers.js";

//module scaffolding
const app = {};

//Final data as an array of object
app.finalOutput = [];

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

    //printing working progress
    console.log(`${i + 1} of ${searchInput.length} completed successfully`);
  }
  console.log(`Congratulations! You job is done`);
  await browser.close();
};
app.mainFunction();
