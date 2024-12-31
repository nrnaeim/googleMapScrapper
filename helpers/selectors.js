/*
 * Title: Selectors
 * Description: All the selectors to bulid the scrapper
 * Author: Niemur Rahman
 * Date: 31/12/2024
 */
//module scaffolding
export const selectors = {};
selectors.googleUrl = "https://www.google.com";
selectors.lang = "#SIvCob > a";
selectors.googleMapurl = "https://www.google.com/maps/";
selectors.searchInput = "#searchboxinput";
selectors.searchResultContainer = `div[role="feed"]`;
selectors.searchResults =
  "#QA0Szd > div > div > div > div > div > div > div > div > div > div > div > div > a";

//Selectors for collecting data
selectors.dataContainer =
  "#QA0Szd > div > div > div > div:nth-child(3) > div > div > div > div >div:nth-child(2)";
selectors.name = `${selectors.dataContainer} >div:nth-child(2)>div>div>div>h1`;
selectors.address = `${selectors.dataContainer} button[data-item-id="address"] div div:nth-child(2)`;
selectors.phone = `${selectors.dataContainer} button[data-tooltip="Copy phone number"] div div:nth-child(2)`;
selectors.website = `${selectors.dataContainer} a[data-tooltip="Open website"] div div:nth-child(2)`;
selectors.rateCatRevContainer = `${selectors.dataContainer}>div:nth-child(2)>div>div>div:nth-child(2)>div`;
selectors.ratting = `${selectors.rateCatRevContainer}>div:nth-child(1)>div:nth-child(2)>span:nth-child(1)>span:nth-child(1)`;
selectors.reviews = `${selectors.rateCatRevContainer}>div:nth-child(1)>div:nth-child(2)>span:nth-child(2)>span`;
selectors.catagory = `${selectors.rateCatRevContainer}>div:nth-child(2)>span>span>button`;
selectors.iframe = `${selectors.dataContainer} iframe[align="middle"]`;
