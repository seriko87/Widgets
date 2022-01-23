import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './forex.css';
import Crypto from './Crypto';
import { forexData } from './forexData';

const Forex = () => {
  const [crypto, setCrypto] = useState('');
  const [cryptoPrice, setCryptoPrice] = useState();
  const RAPID_KEY = process.env.REACT_APP_RAPID_API;

  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EVXhNRGhHT0VReE56STVOelJCTTBJM1FrUTVOa0l4TWtRd1FrSTJSalJFTVRaR1F6QTBOZyJ9.eyJpc3MiOiJodHRwczovL2F1dGguYnJhdmVuZXdjb2luLmNvbS8iLCJzdWIiOiJvQ2RRb1pvSTk2RVJFOUhZM3NRN0ptYkFDZkJmNTVSWUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hcGkuYnJhdmVuZXdjb2luLmNvbSIsImlhdCI6MTY0Mjg3Nzk2MCwiZXhwIjoxNjQyOTY0MzYwLCJhenAiOiJvQ2RRb1pvSTk2RVJFOUhZM3NRN0ptYkFDZkJmNTVSWSIsInNjb3BlIjoicmVhZDppbmRleC10aWNrZXIgcmVhZDpyYW5raW5nIHJlYWQ6bXdhIHJlYWQ6Z3dhIHJlYWQ6YWdncmVnYXRlcyByZWFkOm1hcmtldCByZWFkOmFzc2V0IHJlYWQ6b2hsY3YgcmVhZDptYXJrZXQtY2FwIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.LUc2seQB-vfTBZF9QA5sOcL1WX5J8bJS-0NPH4mXyyLfO5xaAx4Rx75EGaqzqejRH72wDBfyR3pAtjPViRZQhX5OfuooHgqKXgZ3eIfcAYGGhrZ3IPVor1lI3P7xEPnEY17Mbi9WKPE0HMNvjlbfzsj3u9xOet14PdgG0hbbrg7H9jHHlRvhbVWrDO_ODLqKTO3fq8etlV3z_YIq_FVGbQobmXncXAojDQ_hNxVeH1au8lQSNOpq3KWr5etJmpLyyFNvEoyn97Q9jpOkDWxwyHm9UDVLrQ7hmbX9UAB3AI4I2gEZmywKnbmPGotBqwc5xtuKYT0JkCqWlYI6-CY50g';
  //   const get_price = {
  //     method: 'GET',
  //     url: 'https://bravenewcoin.p.rapidapi.com/market-cap',
  //     params: { assetId: crypto.id },
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       'x-rapidapi-host': 'bravenewcoin.p.rapidapi.com',
  //       'x-rapidapi-key': RAPID_KEY,
  //     },
  //   };
  const get_token = {
    method: 'POST',
    url: 'https://bravenewcoin.p.rapidapi.com/oauth/token',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'bravenewcoin.p.rapidapi.com',
      'x-rapidapi-key': RAPID_KEY,
    },
    data: {
      audience: 'https://api.bravenewcoin.com',
      client_id: 'oCdQoZoI96ERE9HY3sQ7JmbACfBf55RY',
      grant_type: 'client_credentials',
    },
  };
  const get_asset = {
    method: 'GET',
    url: 'https://bravenewcoin.p.rapidapi.com/asset',
    params: { status: 'ACTIVE', type: 'CRYPTO' },
    headers: {
      'x-rapidapi-host': 'bravenewcoin.p.rapidapi.com',
      'x-rapidapi-key': 'f3c43aa4bbmshb551f3831774a99p12cdf3jsn2618791e08b9',
    },
  };

  const handeChange = async (id) => {
    const get_price = {
      method: 'GET',
      url: 'https://bravenewcoin.p.rapidapi.com/market-cap',
      params: { assetId: id },
      headers: {
        authorization: `Bearer ${token}`,
        'x-rapidapi-host': 'bravenewcoin.p.rapidapi.com',
        'x-rapidapi-key': RAPID_KEY,
      },
    };
    try {
      const res = await axios(get_price);
      setCryptoPrice(res.data);
    } catch (error) {
      console.log('API call error:', error);
    }
  };

  console.log(cryptoPrice);

  return (
    <div className="forexContainer">
      <Autocomplete
        id="cryptoInput"
        disablePortal
        options={forexData}
        sx={{
          width: 400,
          display: 'inline-block',
          '& input': {
            height: 40,
            bgcolor: 'background.paper',
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },
        }}
        renderInput={(params) => (
          <div ref={params.InputProps.ref} className="searchInputForex">
            <input
              type="text"
              {...params.inputProps}
              placeholder="Search Crypto"
            />
          </div>
        )}
        // renderInput={(params) => (
        //   <TextField {...params} label="Search Crypto" />
        // )}
        onChange={(event, item) => {
          setCrypto(item);
          handeChange(item.id);
        }}
      />

      <div>
        {crypto.label} <br />
        {crypto.symbol} <br />
        {crypto.url} <br />
      </div>
    </div>
  );
};

export default Forex;
