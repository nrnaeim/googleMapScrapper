/*
 * Title: Data collect helper
 * Description: individual data collectin function
 * Author: Niemur Rahman
 * Date: 01/01/2025
 */
//dependencies
import puppeteer from "puppeteer";
import lodash from "lodash";
//module scaffolding
export const dataCollectHepler = {};
//Social media link finding function
dataCollectHepler.socialMedia = (bodytext, platform) => {
  //Social media  link regular expression and collection
  const regExpSocialMedia = new RegExp(
    `https://(?:www\\.)?${platform}\\.com/[a-zA-Z0-9_.-]+/`,
    "i"
  );
  if (bodytext.match(regExpSocialMedia) !== null) {
    return bodytext.match(regExpSocialMedia).join(",");
  } else {
    return "Not found";
  }
};
//individual data collection function
dataCollectHepler.itemCollet = async (page, selector) => {
  if ((await page.$(selector)) !== null) {
    return await page.$eval(selector, (item) => item.textContent.trim());
  } else {
    return "Not found";
  }
};
//email collecting helper from wensite
dataCollectHepler.emailCollect = async (website) => {
  if (website === "Not found") {
    return "Not found";
  } else {
    try {
      let response = await fetch(`http://www.${website}`);
      if (response.statusText.toUpperCase() === "OK") {
        let responseText = await response.text();
        const emailRegex =
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|int|biz|info|name|pro|aero|coop|museum|asia|cat|jobs|mobi|tel|travel|app|tech|dev|online|store|xyz|website|space|cloud|guru|solutions|company|services|shop|gov|edu|mil|int|bank|insurance|health|us|uk|ca)/g;
        let emails = await responseText.match(emailRegex);
        //Checking email count and returning as string
        if (emails !== null) {
          return await lodash.uniq(emails).join(",");
        } else {
          return "Not found";
        }
      }
    } catch (err) {}
  }
};
//email collecting helper from website
dataCollectHepler.emailCollect = async (website) => {
  if (website === "Not found") {
    return "Not found";
  } else {
    try {
      let response = await fetch(`http://www.${website}`);
      if (response.statusText.toUpperCase() === "OK") {
        let responseText = await response.text();
        const emailRegex =
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|int|biz|info|name|pro|aero|coop|museum|asia|cat|jobs|mobi|tel|travel|app|tech|dev|online|store|xyz|website|space|cloud|guru|solutions|company|services|shop|gov|edu|mil|int|bank|insurance|health|us|uk|ca)/g;
        let emails = await responseText.match(emailRegex);
        //Checking email count and returning as string
        if (emails !== null) {
          return await lodash.uniq(emails).join(",");
        } else {
          return "Not found";
        }
      }
    } catch (err) {}
  }
};
