import React, { useEffect } from 'react';
import axios from 'axios';
import { Autocomplete } from '@mui/material';
import './forex.css';

const Forex = () => {
  const RAPID_KEY = process.env.REACT_APP_CRYPTO_KEY;
  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EVXhNRGhHT0VReE56STVOelJCTTBJM1FrUTVOa0l4TWtRd1FrSTJSalJFTVRaR1F6QTBOZyJ9.eyJpc3MiOiJodHRwczovL2F1dGguYnJhdmVuZXdjb2luLmNvbS8iLCJzdWIiOiJvQ2RRb1pvSTk2RVJFOUhZM3NRN0ptYkFDZkJmNTVSWUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hcGkuYnJhdmVuZXdjb2luLmNvbSIsImlhdCI6MTY0Mjg3Nzk2MCwiZXhwIjoxNjQyOTY0MzYwLCJhenAiOiJvQ2RRb1pvSTk2RVJFOUhZM3NRN0ptYkFDZkJmNTVSWSIsInNjb3BlIjoicmVhZDppbmRleC10aWNrZXIgcmVhZDpyYW5raW5nIHJlYWQ6bXdhIHJlYWQ6Z3dhIHJlYWQ6YWdncmVnYXRlcyByZWFkOm1hcmtldCByZWFkOmFzc2V0IHJlYWQ6b2hsY3YgcmVhZDptYXJrZXQtY2FwIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.LUc2seQB-vfTBZF9QA5sOcL1WX5J8bJS-0NPH4mXyyLfO5xaAx4Rx75EGaqzqejRH72wDBfyR3pAtjPViRZQhX5OfuooHgqKXgZ3eIfcAYGGhrZ3IPVor1lI3P7xEPnEY17Mbi9WKPE0HMNvjlbfzsj3u9xOet14PdgG0hbbrg7H9jHHlRvhbVWrDO_ODLqKTO3fq8etlV3z_YIq_FVGbQobmXncXAojDQ_hNxVeH1au8lQSNOpq3KWr5etJmpLyyFNvEoyn97Q9jpOkDWxwyHm9UDVLrQ7hmbX9UAB3AI4I2gEZmywKnbmPGotBqwc5xtuKYT0JkCqWlYI6-CY50g';
  var options = {
    method: 'GET',
    url: 'https://bravenewcoin.p.rapidapi.com/market-cap',
    params: { assetId: 'f1ff77b6-3ab4-4719-9ded-2fc7e71cff1f' },
    headers: {
      authorization: `Bearer ${token}`,
      'x-rapidapi-host': 'bravenewcoin.p.rapidapi.com',
      'x-rapidapi-key': 'f3c43aa4bbmshb551f3831774a99p12cdf3jsn2618791e08b9',
    },
  };
  var options1 = {
    method: 'POST',
    url: 'https://bravenewcoin.p.rapidapi.com/oauth/token',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'bravenewcoin.p.rapidapi.com',
      'x-rapidapi-key': 'f3c43aa4bbmshb551f3831774a99p12cdf3jsn2618791e08b9',
    },
    data: {
      audience: 'https://api.bravenewcoin.com',
      client_id: 'oCdQoZoI96ERE9HY3sQ7JmbACfBf55RY',
      grant_type: 'client_credentials',
    },
  };
  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const res = await axios(options);
  //         console.log(res.data);
  //       } catch (error) {
  //         console.log('API call error:', error);
  //       }
  //     };
  //     getData();
  //   }, []);

  return (
    <div className="forexContainer">
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
    </div>
  );
};

export default Forex;
