import React, { useRef } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './geoLocate.css';

import Autocomplete from '@mui/material/Autocomplete';

const GeoLocate = ({ setCordinates, setSearchOn }) => {
  const geo_access_token = process.env.REACT_APP_GEO_TOKEN;
  const [locationList, setLocationList] = useState([]);
  const [location, setLocation] = useState('');
  let options = [];

  console.log(locationList);
  const config_data = {
    method: 'GET',
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
    params: {
      access_token: geo_access_token,
    },
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const res = await axios(config_data);

        const newList = res.data.features.map((element) => {
          let label = element.place_name;
          let cords = element['geometry']['coordinates'];
          return { label: label, cords: cords, id: element.id };
        });
        console.log(newList);
        setLocationList(newList);
      } catch (err) {
        console.log(err);
      }
    };
    location && getLocation();
  }, [location]);

  const handleClickInput = (cords) => {
    setCordinates(`${cords[1]},${cords[0]}`);
    setLocation('');
  };

  return (
    <div className="searchGeo">
      <form className="searchForm">
        <Autocomplete
          id="locationInput"
          disablePortal
          options={locationList}
          sx={{
            width: 410,
            display: 'inline-block',
            '& input': {
              height: 40,
              bgcolor: 'background.paper',
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.background.paper),
            },
          }}
          renderInput={(params) => (
            <div ref={params.InputProps.ref} className="searchInputGeo">
              <input
                type="text"
                {...params.inputProps}
                placeholder="Search Location"
              />
            </div>
          )}
          filterOptions={(x) => x}
          onChange={(event, newValue) => {
            handleClickInput(newValue.cords);
            setLocation('');
            setLocationList([]);
            setSearchOn(false);
          }}
          onInputChange={(event, newInputValue) => {
            setLocation(newInputValue);
          }}
        />
        <button className="cancelSearch" onClick={() => setSearchOn(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default GeoLocate;
