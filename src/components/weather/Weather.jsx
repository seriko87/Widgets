import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-toggle/style.css';
import './weather.css';
import GeoLocate from '../geolocate/GeoLocate';
import WeatherDay from './WeatherDay';
import WeatherBackImg from './WeatherBackImg';
import WeatherChart from './WeatherChart';

const Weather = () => {
  const [weather, setWeather] = useState();
  const [cordinates, setCordinates] = useState();
  const [metric, setMetric] = useState(false);
  const [weatherCode, setWeatherCode] = useState();
  const [searchOn, setSearchOn] = useState(true);

  const API_KEY = process.env.REACT_APP_RAPID_API;

  const config_data = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q: cordinates,
      days: '3',
    },
    headers: {
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  };

  const getWeather = async () => {
    try {
      const res = await axios(config_data);

      setWeather(res.data);
      setWeatherCode(res.data.current.condition.code);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    cordinates && getWeather();
  }, [cordinates]);

  return (
    <div className="weatherMain">
      {searchOn && (
        <GeoLocate setCordinates={setCordinates} setSearchOn={setSearchOn} />
      )}
      {weather && (
        <div className="weatherInfo">
          {weatherCode && (
            <WeatherBackImg code={weatherCode} isDay={weather.current.is_day} />
          )}
          <div className="locationNameWrap">
            <span className="locationName">
              {weather['location']['name']}, {weather['location']['region']}
              <button
                className="searchLocation"
                onClick={() => setSearchOn(!searchOn)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="white"
                  width={'16px'}
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </span>
            <div className="chooseMetric">
              <button className="weatherRefresh" onClick={() => getWeather()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  width={'20px'}
                >
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                className={metric ? 'cImperial' : 'cImperial active'}
                onClick={() => setMetric(false)}
              >
                °F
              </button>
              <button
                className={metric ? 'cMetric active' : 'cMetric'}
                onClick={() => setMetric(true)}
              >
                °C
              </button>
            </div>
          </div>
          <div className="weatherIconsWrapper">
            <div className="weatherIcons">
              <div className="weatherIconsWrap">
                <img
                  src={'http:' + weather['current']['condition']['icon']}
                  alt="weather icon"
                />
                <span className="tempData">
                  {metric
                    ? weather['current']['temp_c']
                    : weather['current']['temp_f']}
                  <span className="tempIcon">{metric ? '°C' : '°F'}</span>{' '}
                </span>
              </div>

              <div className="weatherInfoText">
                {weather['current']['condition']['text']}
                <br />
                <span>
                  Feels like:{' '}
                  {metric
                    ? weather['current']['feelslike_c']
                    : weather['current']['feelslike_f']}
                  °
                </span>
              </div>
            </div>

            <div className="weatherInfoOther">
              <div className="weatherItems">
                Wind: <br />
                <span>
                  {metric
                    ? weather['current']['wind_kph'] + 'km/h'
                    : weather['current']['wind_mph'] + 'mph'}
                </span>
              </div>
              <div className="weatherItems">
                Humidity:
                <br />
                <span>{weather['current']['humidity']}%</span>
              </div>
              <div className="weatherItems">
                Visibility: <br />
                <span>
                  {metric
                    ? weather['current']['vis_km'] + 'km/h'
                    : weather['current']['vis_miles'] + 'mph'}
                </span>
              </div>
              <div className="weatherItems">
                Sunrise: <br />
                <span>{weather.forecast.forecastday[0]['astro'].sunrise}</span>
              </div>

              <div className="weatherItems">
                Sunset: <br />
                <span>{weather.forecast.forecastday[0]['astro'].sunset}</span>
              </div>
            </div>
          </div>

          <div className="weatherChartWrapper">
            <div className="weather3day">
              {weather.forecast.forecastday.map((item, index) => {
                return (
                  <WeatherDay
                    key={index}
                    item={item}
                    metric={metric}
                    index={index}
                  />
                );
              })}
            </div>
            {weather.forecast.forecastday.map((item, index) => {
              return (
                <div className="weatherChart" key={item.date} id={index}>
                  <WeatherChart data={item['hour']} metric={metric} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
