import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import './currency.css';
import { curData } from './curData';
import axios from 'axios';
const Currency = () => {
  const [currency, setCurrency] = useState({});
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('USD');
  const [result, setResult] = useState(1);
  const [fromCurValue, setFromCurValue] = useState(1);
  const [toCurValue, setToCurValue] = useState(1);
  const [updateDate, setUpdateDate] = useState();

  const RAPID_KEY = process.env.REACT_APP_RAPID_API;

  const options = {
    method: 'GET',
    url: 'https://exchangerate-api.p.rapidapi.com/rapid/latest/USD',
    params: {
      Base_Code: 'USD',
    },
    headers: {
      'x-rapidapi-host': 'exchangerate-api.p.rapidapi.com',
      'x-rapidapi-key': RAPID_KEY,
    },
  };

  const getCurrency = async (conf) => {
    try {
      const res = await axios(conf);
      setCurrency(res.data.rates);
      setUpdateDate(new Date(res.data.time_last_update_unix));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrency(options);
  }, []);
  console.log(fromCur, 'to', toCur);
  console.log(updateDate);
  return (
    <Draggable handle="strong">
      <div className="currencyCont box no-cursor">
        <strong className="cursor" style={{ width: 90 + '%' }}></strong>
        <CloseWidget id="currency" />
        <div className="currencyForm">
          <div className="fromWrap">
            <label htmlFor="fromCur">From:</label>
            <div className="curInputWrap">
              <input
                type="number"
                id="fromCur"
                value={fromCurValue}
                onChange={(e) => setFromCurValue(e.target.value)}
              />
              <select
                name="currency"
                id="fromCurSel"
                onChange={(e) => setFromCur(e.target.value)}
                defaultValue="United States Dollar"
              >
                {curData.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.country}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="fromWrap">
            <label htmlFor="fromCur">To:</label>
            <div className="curInputWrap">
              <input
                type="number"
                id="fromCur"
                value={toCurValue}
                onChange={(e) => setToCurValue(e.target.value)}
              />
              <select
                name="currency"
                id="fromCurSel"
                onChange={(e) => setToCur(e.target.value)}
                defaultValue="United States Dollar"
              >
                {curData.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.country}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="currencyResult">
          <div className="curUptDate">
            {/* {updateDate.getDate() +
              '/' +
              (updateDate.getMonth() + 1) +
              '/' +
              updateDate.getFullYear() +
              ' ' +
              updateDate.getHours() +
              ':' +
              updateDate.getMinutes() +
              ':' +
              updateDate.getSeconds()} */}
          </div>
          <div className="currFromLabel">
            {fromCurValue} {fromCur} equals to
          </div>
          <div className="currToLabel">
            {result} {toCur}{' '}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Currency;
