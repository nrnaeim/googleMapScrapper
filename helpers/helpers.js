/*
 * Title: Helper
 * Description: Helpers page navigation and colleting data for scrapping public data
 * Author: Niemur Rahman
 * Date: 01/01/2025
 */
//dependencies
import puppeteer from "puppeteer";
import { selectors } from "./selectors.js";
import { dataCollectHepler } from "./dataCollectHepler.js";
//module scaffolding
export const helpers = {};
//creating scrolling function
helpers.scrolling = async (page, selector) => {
  //checking scrollable div present or not and scrolling
  if ((await page.$(selector)) !== null) {
    await page.evaluate(async (selector) => {
      //Delay function for dealy in seconds to load the dynamic content
      const delayFunction = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };
      let previousHeight = 0;
      //Scrolling page to bottom
      while (true) {
        let resultContainer = document.querySelector(selector);
        resultContainer.scrollTo({
          top: resultContainer.scrollHeight,
          left: 0,
          behavior: "smooth",
        });
        //Dealing before execute next line of code
        await delayFunction(2000);
        //Getting new scrolling height after scrolling
        let newHeight = resultContainer.scrollHeight;
        //Checking reached to bottom or not and breaking loop
        if (previousHeight === newHeight) {
          console.log("Reached to bottom");
          break;
        }
        previousHeight = newHeight;
        console.log("Scrolling the page");
      }
    }, selector);
  }
};
//hepler for data collection
helpers.dataCollect = async (page, collectedData, searchResult) => {
  //Creating object instance for data storing as an object
  const tempObj = {};
  //Collecting source url
  tempObj.sourceUrl = await page.evaluate((item) => item.href, searchResult);
  //Collecting name
  tempObj.name = await dataCollectHepler.itemCollet(page, selectors.name);
  //Collecting address
  tempObj.address = await dataCollectHepler.itemCollet(page, selectors.address);
  //Collecting phone number
  tempObj.phone = await dataCollectHepler.itemCollet(page, selectors.phone);
  //Collecting website
  tempObj.website = await dataCollectHepler.itemCollet(page, selectors.website);
  //Collecting email
  tempObj.email = await dataCollectHepler.emailCollect(tempObj.website);
  //Collecting ratting
  tempObj.ratting = await dataCollectHepler.itemCollet(page, selectors.ratting);
  //Collecting  catagory
  tempObj.catagory = await dataCollectHepler.itemCollet(
    page,
    selectors.catagory
  );
  //Collecting  reviews
  tempObj.reviews = await dataCollectHepler.itemCollet(page, selectors.reviews);
  //Selcting iframe and storing html
  const iframe = await page.$(selectors.iframe);
  if (iframe !== null) {
    //Content of iframe
    const iframeDocument = await iframe.contentFrame();
    const bodytext = await iframeDocument.content();
    //Collecting  facebook link
    tempObj.facebook = await dataCollectHepler.socialMedia(
      bodytext,
      "facebook"
    );
    //Collecting instagram link
    tempObj.instagram = await dataCollectHepler.socialMedia(
      bodytext,
      "instagram"
    );
    //Collecting linkedin link
    tempObj.linkedIn = await dataCollectHepler.socialMedia(
      bodytext,
      "linkedin"
    );
  }
  // Data pushing to final output array
  collectedData.push(tempObj);
};
