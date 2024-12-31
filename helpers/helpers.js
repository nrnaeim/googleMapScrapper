/*
 * Title: Helper
 * Description: Helpers for scrapping
 * Author: Niemur Rahman
 * Date: 01/01/2025
 */
//dependencies
import puppeteer from "puppeteer";

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
