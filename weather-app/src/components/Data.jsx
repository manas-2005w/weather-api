import React, { useState } from "react";
import "./Data.css";

import sunnyImage from "../assets/Sunny.png";
import brokenClouds from "../assets/brokenClouds.png";
import clearSky from "../assets/clearSky.png";
import scatteredClouds from "../assets/scatteredClouds.png";
import overcastClouds from "../assets/overcastClouds.png";
import rain from "../assets/rain.png";
import thunderStorm from "../assets/thunderstorm.png";
import snow from "../assets/snow.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faDroplet, faTemperature0 } from "@fortawesome/free-solid-svg-icons";

function Data() {
  const apiKey = "2f7d3d7b8b9e54ede995a94f7b63188d";

  const [cityInput, setCityInput] = useState("");
  const [weather, setWeather] = useState(null);q
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  function getWeather(cityName) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        console.log(data);

        const weatherCondition = data.weather[0].description.toLowerCase();
        let imageUrl = "";

        switch (weatherCondition) {
          case "mist":
          case "haze":
            imageUrl = sunnyImage;
            break;
          case "clear sky":
            imageUrl = clearSky;
            break;
          case "scattered clouds":
            imageUrl = scatteredClouds;
            break;
          case "few clouds":
          case "broken clouds":
            imageUrl = brokenClouds;
            break;
          case "overcast clouds":
            imageUrl = overcastClouds;
            break;
          case "rain":
          case "shower rain":
            imageUrl = rain;
            break;
          case "thunderstorm":
            imageUrl = thunderStorm;
            break;
          case "snow":
            imageUrl = snow;
            break;
          default:
            imageUrl = "";
        }

        setBackgroundImage(imageUrl);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setWeather(null);
      });
  }

  const handleClick = () => {
    if (cityInput.trim() === "") {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }
    getWeather(cityInput);
  };

  return (
    <div id="container">
      <input
        type="text"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleClick}>Get Weather</button>

      {error && <p>{error}</p>}
      {weather && (
        <>
          <div
            id="weatherImage"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <h1>{weather.name}</h1>
            <p>{weather.weather[0].description}</p>
          </div>

          <div id="weatherBox">
            <p className="temperature"><FontAwesomeIcon icon={faTemperature0} size="sm"/>{weather.main.temp}°C</p>
            <p className="manas">
              MAX: {weather.main.temp_max} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MIN:{" "}
              {weather.main.temp_min}
            </p>
            <p><FontAwesomeIcon icon={faDroplet} size="2x" /> {weather.main.humidity}%</p>
            <p className="manas">
              <FontAwesomeIcon icon={faWind} size="2x"/>
              {weather.wind.speed} m/s
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Data;
