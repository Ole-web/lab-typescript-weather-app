document.getElementById("weather-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const locationInput = (
    document.getElementById("location-input") as HTMLInputElement
  ).value;
  console.log(
    `The user has submitted the form and is searching for a location with this name: ${locationInput}`
  );
});
import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
} from "./utils";

document
  .getElementById("weather-form")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const locationInput = (
      document.getElementById("location-input") as HTMLInputElement
    ).value;
    console.log(
      `The user has submitted the form and is searching for a location with this name: ${locationInput}`
    );

    try {
      const locationResponse = await getLocation(locationInput);
      if (locationResponse.results && locationResponse.results.length > 0) {
        const locationDetails = locationResponse.results[0];
        displayLocation(locationDetails);

        const weatherData = await getCurrentWeather(locationDetails);
        displayWeatherData(weatherData);
      } else {
        console.error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

import { updateBackground } from "./utils";

document
  .getElementById("weather-form")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const locationInput = (
      document.getElementById("location-input") as HTMLInputElement
    ).value;

    try {
      const locationResponse = await getLocation(locationInput);
      if (locationResponse.results && locationResponse.results.length > 0) {
        const locationDetails = locationResponse.results[0];
        displayLocation(locationDetails);

        const weatherData = await getCurrentWeather(locationDetails);
        displayWeatherData(weatherData);

        // Update the background
        updateBackground(
          weatherData.current_weather.weathercode,
          weatherData.current_weather.is_day
        );
      } else {
        console.error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
