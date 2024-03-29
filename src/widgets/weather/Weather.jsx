import axios from 'axios';
import { useEffect, useState } from 'react';
import './weather.css';
import GeoLocate from '../../components/geolocate/GeoLocate';
import WeatherDay from './WeatherDay';
import WeatherBackImg from './WeatherBackImg';
import WeatherChart from './WeatherChart';
import Draggable from 'react-draggable';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { addRemoveWidget } from '../../redux/features/widgetList/widgetListSlice';
import { locationGps } from '../../redux/features/widget/widgetSlice';

const Weather = () => {
  const [weather, setWeather] = useState();
  const [cordinates, setCordinates] = useState();
  const [metric, setMetric] = useState(false);
  const [weatherCode, setWeatherCode] = useState();
  const [searchOn, setSearchOn] = useState(true);
  const location = useSelector(locationGps);
  const API_KEY = process.env.REACT_APP_RAPID_API;
  const dispatch = useDispatch();

  useEffect(() => {
    if (location) {
      setCordinates(location);
      setSearchOn(false);
    }
  }, []);
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
    <Draggable handle="strong">
      <div className="weatherMain">
        {searchOn && (
          <div>
            <GeoLocate
              setCordinates={setCordinates}
              setSearchOn={setSearchOn}
            />
          </div>
        )}
        {weather ? (
          <div className="weatherInfo">
            {weatherCode && (
              <WeatherBackImg
                code={weatherCode}
                isDay={weather.current.is_day}
              />
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
              <strong
                className="cursor"
                style={{ width: 280 + 'px', zIndex: 0, top: 5 + 'px' }}
              ></strong>
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
                <div
                  className="closeWidgetCont"
                  onClick={() => dispatch(addRemoveWidget('weather'))}
                  style={{
                    position: 'relative',
                    width: 30 + 'px',
                    right: -3 + 'px',
                    top: 2 + 'px',
                  }}
                >
                  <CloseOutlinedIcon
                    className="closeWidget"
                    style={{ color: 'white' }}
                  />
                </div>
              </div>
            </div>
            <div className="weatherIconsWrapper">
              {!weather && (
                <strong className="cursor">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="20px"
                  >
                    <path d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" />
                  </svg>
                </strong>
              )}
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
                  <span>
                    {weather.forecast.forecastday[0]['astro'].sunrise}
                  </span>
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
        ) : (
          <div className="emptyWeatherContainer">
            <strong className="cursor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="20px"
              >
                <path d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" />
              </svg>
            </strong>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Weather;
