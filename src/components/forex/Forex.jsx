import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Autocomplete from '@mui/material/Autocomplete';
import './forex.css';
import Crypto from './Crypto';
import { forexData } from './forexData';

const Forex = () => {
  const [crypto, setCrypto] = useState('');
  const [cryptoPrice, setCryptoPrice] = useState();
  const RAPID_KEY = process.env.REACT_APP_RAPID_API;

  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EVXhNRGhHT0VReE56STVOelJCTTBJM1FrUTVOa0l4TWtRd1FrSTJSalJFTVRaR1F6QTBOZyJ9.eyJpc3MiOiJodHRwczovL2F1dGguYnJhdmVuZXdjb2luLmNvbS8iLCJzdWIiOiJvQ2RRb1pvSTk2RVJFOUhZM3NRN0ptYkFDZkJmNTVSWUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hcGkuYnJhdmVuZXdjb2luLmNvbSIsImlhdCI6MTY0Mjk1NTU5MSwiZXhwIjoxNjQzMDQxOTkxLCJhenAiOiJvQ2RRb1pvSTk2RVJFOUhZM3NRN0ptYkFDZkJmNTVSWSIsInNjb3BlIjoicmVhZDppbmRleC10aWNrZXIgcmVhZDpyYW5raW5nIHJlYWQ6bXdhIHJlYWQ6Z3dhIHJlYWQ6YWdncmVnYXRlcyByZWFkOm1hcmtldCByZWFkOmFzc2V0IHJlYWQ6b2hsY3YgcmVhZDptYXJrZXQtY2FwIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.RU5fDsNvs2v3_i6WLDerLo73BfVyJ3si3fGhpDxRVs0cpePeiUSyIGa7SmLdQ3aDlueZsm6RI8h7m_jFnGIbuVm7S_8LQB-lucP5iLWmANThRIhiIlmZpuvLqp_vMI20BUFw7rzpgCkiVMw4rHT9P25gDlto3pXnGpeNaihvCXKFbshyEbi9No4nF1LFrhdSQmYintQYiQnHMArHuvZfBWUB6Z076KYfdA2u28jjepJs5Z1VBacohpp4bOABiZx8Tg_JgXBYfaQkj_zCUwL1CqB2u73Zw6emlBznIlRg1WRQGUFe44yugPHCBmGQbh0BpzHj3XQIJ07cVeA3Vc8CXA';

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

  const handeChange = async (id) => {
    const get_price = {
      method: 'GET',
      url: 'https://bravenewcoin.p.rapidapi.com/market-cap',
      params: { assetId: id, percentChange: true },
      headers: {
        authorization: `Bearer ${token}`,
        'x-rapidapi-host': 'bravenewcoin.p.rapidapi.com',
        'x-rapidapi-key': RAPID_KEY,
      },
    };
    try {
      const res = await axios(get_price);
      setCryptoPrice(res.data.content[0]);
    } catch (error) {
      console.log('API call error:', error);
    }
  };

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

          handeChange(item.id);
        }}
      />
      {cryptoPrice && <Crypto cryptoPrice={cryptoPrice} crypto={crypto} />}
    </div>
  );
};

export default Forex;
