import React from 'react';
import './weatherBackImg.css';
import { weatherData } from './weatherData';
import { useState, useEffect } from 'react';

const WeatherBackImg = ({ code, isDay }) => {
  const [weatherArray, setWeatherArray] = useState();

  useEffect(() => {
    if (code <= 1005) {
      setWeatherArray(weatherData.sunny);
    }
    if (code >= 1006 && code <= 1100) {
      setWeatherArray(weatherData.cloudy);
    }
    if (code === 1114 || code === 1117) {
      setWeatherArray(weatherData.blizzard);
    }
    if (code === 1135 || code === 1147) {
      setWeatherArray(weatherData.fogy);
    }
    if (code >= 1150 && code <= 1179) {
      setWeatherArray(weatherData.drizzle);
    }
    if (code >= 1180 && code <= 1201) {
      setWeatherArray(weatherData.rainy);
    }
    if (code >= 1202 && code <= 1239) {
      setWeatherArray(weatherData.snowy);
    }
    if (code >= 1240 && code <= 1246) {
      setWeatherArray(weatherData.rainy);
    }
    if (code >= 1249 && code <= 1264) {
      setWeatherArray(weatherData.snowy);
    }
    if (code === 1273 || code === 1276) {
      setWeatherArray(weatherData.rain_th);
    }
    if (code > 1276) {
      setWeatherArray(weatherData.snow_th);
    }
  }, [code]);

  return (
    <div className="weatherImgWrap">
      {weatherArray && (
        <img
          className="weatherImg"
          src={'/images/' + (isDay === 0 ? 'n_' : '') + weatherArray[0]}
          alt="weather"
        />
      )}
      {weatherArray && (
        <div
          className="gradient"
          style={{
            background: weatherArray[1],
          }}
        ></div>
      )}
    </div>
  );
};

export default WeatherBackImg;
