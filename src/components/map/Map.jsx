import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './weather.css';

const Map = () => {
  const [weather, setWeather] = useState();
  const [unit, setUnit] = useState('imperial');
  const [location, setLocation] = useState();
  const [mapPic, setMapPic] = useState('');

  const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API;

  const config_data = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q: location,
      days: '3',
    },
    headers: {
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const getWeather = async () => {
      try {
        const res = await axios(config_data);

        console.log(res.data);
        setWeather(res.data);
        // let cordLon = res.data['location']['lon'];
        // let cordLat = res.data['location']['lat'];
        // const mapPicture = `https://static-maps.yandex.ru/1.x/?lang=en_US&ll=${cordLon},${cordLat}&size=400,400&l=sat,skl&pt=${cordLon},${cordLat},pm2rdm&z=11`;

        // setMapPic(mapPicture);
      } catch (err) {
        console.log(err);
      }
    };

    getWeather();
  };

  return (
    <div className="weatherMain">
      <form>
        <div className="inputWeather">
          <input
            type="text"
            placeholder="Search for city or town"
            onChange={(e) => setLocation(e.target.value)}
            id="locationWeather"
          />
          <select
            name="unit"
            id="unitWeather"
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="imperial">F</option>
            <option value="metric">C</option>
          </select>
        </div>

        <button onClick={handleSubmit} className="weatherSubmit">
          Go
        </button>
      </form>
      {weather && (
        <div className="weatherInfo">
          <div>
            <span>{weather['location']['name']}</span>
            <span>{weather['current']['temp_c']}C</span>
            <img
              src={'http:' + weather['current']['condition']['icon']}
              alt=""
            />
          </div>

          <img src={mapPic} alt="" />
        </div>
      )}
    </div>
  );
};

export default Map;
