import React, { useRef } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './geoLocate.css';

const GeoLocate = ({ setCordinates, setSearchOn }) => {
  const geo_access_token = process.env.REACT_APP_GEO_TOKEN;
  const [locationList, setLocationList] = useState([]);
  const [location, setLocation] = useState('');
  const ref = useRef();

  const config_data = {
    method: 'GET',
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
    params: {
      access_token: geo_access_token,
    },
  };

  console.log('i am called');
  useEffect(() => {
    console.log(location);

    const getLocation = async () => {
      try {
        const res = await axios(config_data);

        console.log(res.data);
        setLocationList(res.data.features);
      } catch (err) {
        console.log(err);
      }
    };

    getLocation();
  }, [location]);

  const handleClickInput = (cords) => {
    console.log('select called');
    setCordinates(`${cords[1]},${cords[0]}`);
    setLocation('');
  };

  return (
    <div className="searchGeo">
      <form className="searchForm">
        <div className="inputLocation">
          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            id="locationInput"
            ref={ref}
            list="data"
            value={location}
            placeholder="Search for citi or town"
          />
          <div id="data" className="locationListResults">
            {locationList.map((item, index) => {
              return (
                <div
                  className="locationItem"
                  key={index}
                  value={item['place_name']}
                  onClick={(e) => {
                    handleClickInput(item['geometry']['coordinates']);
                    setLocation('');
                    setLocationList([]);
                    setSearchOn(false);
                  }}
                >
                  {item['place_name']}
                </div>
              );
            })}
          </div>
        </div>

        {/* <button onClick={handleSubmit} className="weatherSubmit">
          Go
        </button> */}
      </form>
    </div>
  );
};

export default GeoLocate;
