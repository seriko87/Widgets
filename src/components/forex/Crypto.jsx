import React, { useEffect, useState, useContext } from 'react';
import './crypto.css';
import axios from 'axios';
import { formatPrice, numberFormatter } from '../../functions/functions';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { GlobalContext } from '../../context/GlobalContext';
import { remCryptoList } from '../../context/ApiCalls';

const Crypto = ({ crypto, token }) => {
  const { dispatch } = useContext(GlobalContext);
  const [priChange, setPriChange] = useState();
  const [cryptoPrice, setCryptoPrice] = useState();
  const [price, setPrice] = useState();
  const { label, icon, symbol, id } = crypto;
  const [formattedPrice, setFormattedPrice] = useState(0);
  const [fontSize, setFontSize] = useState(36);
  const RAPID_KEY = process.env.REACT_APP_RAPID_API;
  let priceChange = cryptoPrice?.pricePercentChange.change24h;

  useEffect(() => {
    priceChange > 0 ? setPriChange(true) : setPriChange(false);
  }, [priceChange]);

  useEffect(() => {
    if (price) {
      price > 1
        ? setFormattedPrice(price.toFixed(2))
        : setFormattedPrice(formatPrice(price));
    }
  }, [price]);

  const getCryptoPrice = async (id) => {
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
      setPrice(res.data.content[0].price);
    } catch (error) {
      console.log('API call error:', error);
    }
  };

  useEffect(() => {
    getCryptoPrice(crypto.id);
  }, []);

  // adding 5min update interval after crypto added

  useEffect(() => {
    const interval = setInterval(() => {
      getCryptoPrice(crypto.id);
      console.log('updated');
    }, 300001);
    return () => {
      clearInterval(interval);
    };
  }, [crypto.id]);

  /* This is a useEffect hook that is used to set the font size of the price. */
  useEffect(() => {
    let curLeng = formattedPrice.length;

    if (curLeng >= 10) {
      setFontSize(25);
    } else if (curLeng > 7 && curLeng < 10) {
      setFontSize(30);
    } else {
      setFontSize(36);
    }
  }, [formattedPrice]);

  const handleDel = (id) => {
    remCryptoList(id, dispatch);
  };

  return (
    <div className="cryptoContainer">
      <DeleteForeverOutlinedIcon
        className="deleteIconCrypto"
        onClick={() => handleDel(id)}
      />
      <div className="cryptoIconWrap">
        <img src={icon} alt={label} />
        <span>{label + '-' + symbol}</span>
      </div>
      {cryptoPrice && (
        <div className="cryptoInfoContainer">
          <div className="cryptoPriceWrap">
            <span className="cryptoPrice">
              <span style={{ fontSize: fontSize + 'px' }}>
                {formattedPrice}
              </span>
              <span style={{ fontSize: 20 + 'px' }}> USD</span>{' '}
              <span className={priChange ? 'priceUp' : 'priceDown'}>
                ({priceChange}%)
              </span>
            </span>
          </div>
          <div className="cryptoOtherWrap">
            <div className="cryptoOtherInfo">
              <span className="cryptoRank">{cryptoPrice?.marketCapRank}</span>
              <span className="cryptoRankTitle">Rank</span>
            </div>
            <div className="cryptoOtherCap">
              <span className="cryptoRank">
                ${numberFormatter(cryptoPrice?.marketCap)}
              </span>
              <span className="cryptoRankTitle">Market Cap</span>
            </div>
            <div className="cryptoOtherCap">
              <span className="cryptoRank">
                {numberFormatter(cryptoPrice?.freeFloatSupply)}
              </span>
              <span className="cryptoRankTitle">Supply</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crypto;
