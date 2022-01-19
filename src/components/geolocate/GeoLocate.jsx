import React, { useContext } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './geoLocate.css';
import { setUserLocation } from '../../context/ApiCalls';
import { GlobalContext } from '../../context/GlobalContext';
import GpsFixedOutlinedIcon from '@mui/icons-material/GpsFixedOutlined';
import Autocomplete from '@mui/material/Autocomplete';

const GeoLocate = ({ setCordinates, setSearchOn }) => {
  const { dispatch } = useContext(GlobalContext);
  const geo_access_token = process.env.REACT_APP_GEO_TOKEN;
  const [locationList, setLocationList] = useState([]);
  const [location, setLocation] = useState('');

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
    setUserLocation(`${cords[1]},${cords[0]}`, dispatch);
  };

  function getCurLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    function showPosition(position) {
      setUserLocation(
        `${position.coords.latitude},${position.coords.longitude}`,
        dispatch
      );
      setCordinates(`${position.coords.latitude},${position.coords.longitude}`);
      setLocation('');
      setLocationList([]);
      setSearchOn(false);
      console.log(position.coords.latitude, position.coords.longitude);
    }
  }

  return (
    <div className="searchGeo">
      <div className="searchForm">
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
        {!location && (
          <button className="getLocationBtn" onClick={() => getCurLocation()}>
            GPS
            <GpsFixedOutlinedIcon fontSize="small" />
          </button>
        )}
        <button className="cancelSearch" onClick={() => setSearchOn(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GeoLocate;
