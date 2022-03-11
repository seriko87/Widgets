import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import Autocomplete from '@mui/material/Autocomplete';
import './forex.css';
import Crypto from './Crypto';
import { forexData } from './forexData';
import Draggable from 'react-draggable';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { cryptoList, addCrypto } from '../../redux/features/widget/widgetSlice';

const Forex = () => {
  const [crypto, setCrypto] = useState('');
  const [token, setToken] = useState('');
  const [alert, setAlert] = useState('');
  const [searchOn, setSearchOn] = useState(false);
  const cryptoData = useSelector(cryptoList);
  const dispatch = useDispatch();

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

  const handleAdd = () => {
    if (cryptoData.length >= 3) {
      setAlert('Please remove one of crypto first');
    } else {
      if (crypto === '') {
        setAlert('Please search and select crypto first');
      } else {
        let check;
        cryptoData.forEach((item) => {
          if (item.id === crypto.id) {
            check = true;
          } else {
            check = false;
          }
        });

        if (check) {
          setAlert('This crypto already added');
        } else {
          dispatch(addCrypto(crypto));
        }
      }
    }
  };

  // cleaning up the alert
  useEffect(() => {
    const interval = setTimeout(() => {
      setAlert('');
    }, 5000);
    return () => {
      clearTimeout(interval);
    };
  }, [alert]);

  return (
    <Draggable handle="strong">
      <div className="crypMainContainer box no-cursor">
        <strong
          className="cursor"
          style={{ width: 80 + '%', left: 50 + 'px' }}
        ></strong>

        {!searchOn && (
          <>
            <button
              onClick={() => {
                setSearchOn(true);
              }}
              className="cryptoSearchBtn"
            >
              <SearchOutlinedIcon />
            </button>
            <CloseWidget id={'forex'} />
          </>
        )}

        {searchOn && (
          <>
            <button onClick={handleAdd} className="cryptoAddBtn">
              Add
            </button>
            <button
              onClick={() => {
                setSearchOn(false);
              }}
              className="cryptoCancelBtn"
            >
              Cancel
            </button>
            <Autocomplete
              selectOnFocus
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
                    theme.palette.getContrastText(
                      theme.palette.background.paper
                    ),
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
          </>
        )}

        {alert && <div className="cryptoAlert">{alert}</div>}
        {cryptoData.length === 0 && (
          <div className="cryptoContainerBtn">
            <button
              className="cryptoAddBtnMain"
              onClick={() => {
                setSearchOn(true);
              }}
            >
              Search and Add Cryptocurrency
            </button>
          </div>
        )}
        {token &&
          cryptoData.map((item) => {
            return <Crypto token={token} crypto={item} key={item.label} />;
          })}
      </div>
    </Draggable>
  );
};

export default Forex;
