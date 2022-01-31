import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import './currency.css';
import { curData } from './curData';
import axios from 'axios';
import { formatPrice } from '../../functions/functions';
const Currency = () => {
  const [currency, setCurrency] = useState({});
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('USD');
  const [fromCurValue, setFromCurValue] = useState(1);
  const [toCurValue, setToCurValue] = useState(1);
  const [convertRate, setConvertRate] = useState(1);
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
      let timestamp = res.data.time_last_update_unix;
      setUpdateDate(new Date(timestamp * 1000));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrency(options);
  }, []);

  useEffect(() => {
    const first = 1 / currency[fromCur] || 1;
    const fff = currency[toCur] || 1;
    const second = first * fff;
    setConvertRate(second);
    setToCurValue(fromCurValue * second);
  }, [fromCur, toCur]);

  const handleChange = (cur, value) => {
    if (cur === 'from') {
      setFromCurValue(Number(value));
      let newValue = value * convertRate;

      if (newValue > 1) {
        setToCurValue(newValue.toFixed(2));
      } else {
        setToCurValue(value * convertRate);
      }
    } else {
      setToCurValue(Number(value));
      let newValue1 = value / convertRate;

      if (newValue1 > 1) {
        setFromCurValue(newValue1.toFixed(2));
      } else {
        setFromCurValue(value / convertRate);
      }
    }
  };

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
                onChange={(e) => handleChange('from', e.target.value)}
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
                onChange={(e) => handleChange('to', e.target.value)}
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
            {' '}
            Last update:{' '}
            {updateDate &&
              updateDate.getMonth() +
                1 +
                '/' +
                updateDate.getDate() +
                '/' +
                updateDate.getFullYear()}
          </div>
          <div className="currFromLabel">
            {fromCurValue} {fromCur} equals to
          </div>
          <div className="currToLabel">
            {fromCurValue * convertRate > 1
              ? (fromCurValue * convertRate).toFixed(2)
              : fromCurValue * convertRate}{' '}
            {toCur}{' '}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Currency;
