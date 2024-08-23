// src/utils.ts

import axios from "axios";
import { LocationResponse, Location } from "./types";

export function getLocation(locationName: string): Promise<LocationResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
  return axios.get(url).then((response) => response.data);
}

import { WeatherResponse } from "./types";

export function getCurrentWeather(
  locationDetails: Location
): Promise<WeatherResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;

  return axios.get(url).then((response) => response.data);
}

export function displayLocation(locationDetails: Location): void {
  const locationNameElement = document.getElementById("location-name");
  const countryElement = document.getElementById("country");

  if (locationNameElement && countryElement) {
    locationNameElement.textContent = locationDetails.name;
    countryElement.textContent = locationDetails.country;
  }
}

export function displayWeatherData(weatherData: WeatherResponse): void {
  const temperatureElement = document.getElementById("temperature");
  const windspeedElement = document.getElementById("windspeed");
  const winddirectionElement = document.getElementById("winddirection");

  if (temperatureElement && windspeedElement && winddirectionElement) {
    temperatureElement.textContent = `${weatherData.current_weather.temperature} °C`;
    windspeedElement.textContent = `${weatherData.current_weather.windspeed} km/h`;
    winddirectionElement.textContent = `${weatherData.current_weather.winddirection} °`;
  }
}

export function updateBackground(weatherCode: number, isDay: number): void {
  const bodyElement = document.body;
  let className = "";

  if (weatherCode === 0 || weatherCode === 1) {
    className = isDay === 0 ? "sunny-night" : "sunny";
  } else if (weatherCode === 2) {
    className = isDay === 0 ? "partly-cloudy-night" : "partly-cloudy";
  } else if (weatherCode === 3) {
    className = "cloudy";
  } else if (weatherCode === 4) {
    className = "foggy";
  } else if (weatherCode === 5) {
    className = "drizzle";
  } else if (weatherCode === 6) {
    className = "rain";
  } else if (weatherCode === 7) {
    className = "snow";
  } else if (weatherCode === 8) {
    className = "showers";
  } else if (weatherCode === 9) {
    className = "thunderstorm";
  }

  bodyElement.className = className;
}
