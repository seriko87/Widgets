import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Autocomplete from '@mui/material/Autocomplete';
import './forex.css';
import Crypto from './Crypto';
import { forexData } from './forexData';

const Forex = () => {
  const [crypto, setCrypto] = useState('');
  const [token, setToken] = useState('');

  const RAPID_KEY = process.env.REACT_APP_RAPID_API;

  const getToken = async () => {
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
    try {
      const res = await axios(get_token);
      setToken(res.data.access_token);
    } catch (error) {
      console.log('API call error:', error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

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
        onChange={(event, item) => {
          setCrypto(item);
        }}
      />
      {crypto && <Crypto token={token} crypto={crypto} />}
    </div>
  );
};

export default Forex;
