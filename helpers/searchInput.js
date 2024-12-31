/*
 * Title: Search string
 * Description: Generating all the search string from userInput and geolocations file
 * Author: Niemur Rahman
 * Date: 01/01/2025
 */

//dependencies
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { userInput } from "./../userInputData/userInput.js";

//module scaffolding
export const searchInput = [];

//taking geolocation diename
const __filename = fileURLToPath(import.meta.url);
const geoLocationDirname = path.join(
  path.dirname(__filename),
  "./../userInputData/geolocations.json"
);

//taking all the locations from geolocations file
const allLocations = JSON.parse(fs.readFileSync(geoLocationDirname, "utf-8"));

//user selected locations filtering
for (let location of allLocations) {
  if (
    location.countryCode.toLowerCase() ===
      userInput.countryCode.toLowerCase() &&
    location.locationType.toLowerCase() === userInput.locationType.toLowerCase()
  ) {
    for (let item of userInput.searchItems) {
      const tempObj = {};
      tempObj.lat = location.latitude;
      tempObj.lon = location.longitude;
      tempObj.srcStr = `${item} in ${location.name} in ${location.country}`;
      searchInput.push(tempObj);
    }
  }
}
