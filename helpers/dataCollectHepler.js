/*
 * Title: Data collect helper
 * Description: individual data collectin function
 * Author: Niemur Rahman
 * Date: 01/01/2025
 */
//dependencies
import fs from "fs";
import dns from "dns/promises";
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

dataCollectHepler.routs = JSON.parse(
  fs.readFileSync("./helpers/contactRoutes.json", "utf-8")
);
//email collecting helper from wensite
dataCollectHepler.emailCollect = async (website) => {
  if (website !== "Not found") {
    for (let rout of dataCollectHepler.routs) {
      try {
        const response = await fetch(`https://${website}${rout}`);
        if (response.statusText.toLowerCase() === "ok") {
          const responseText = await response.text();
          const emailRegex =
            /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|int|biz|info|name|pro|aero|coop|museum|asia|cat|jobs|mobi|tel|travel|app|tech|dev|online|store|xyz|website|space|cloud|guru|solutions|company|services|shop|gov|edu|mil|int|bank|insurance|health|us|uk|ca)/g;
          let emails = responseText.match(emailRegex);
          if (emails !== null) {
            const uniqEmails = lodash.uniq(emails);
            return await dataCollectHepler.emailValidator(uniqEmails);
          }
        }
      } catch (err) {}
    }
  } else {
    return "Not found";
  }
};
//emailValidator functiom
dataCollectHepler.emailValidator = async (emails) => {
  const validEmail = [];
  for (let email of emails) {
    const domain = email.split("@").pop();
    try {
      const addresses = await dns.resolveMx(domain);
      if (addresses.length > 0) {
        validEmail.push(email);
      }
    } catch (err) {}
  }
  return validEmail.join(",");
};
