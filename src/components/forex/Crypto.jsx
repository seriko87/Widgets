import React, { useEffect, useState } from 'react';
import './crypto.css';

const Crypto = ({ crypto, cryptoPrice }) => {
  const [priChange, setPriChange] = useState();
  const { label, icon, symbol } = crypto;
  const price = cryptoPrice.price;
  const priceChange = cryptoPrice.pricePercentChange.change24h;

  useEffect(() => {
    priceChange > 0 ? setPriChange(true) : setPriChange(false);
  }, [priceChange]);

  let str = price.toString().split('');
  let newPrice = '';
  console.log(str);

  str.map((item, index) => {
    if (item === '.') {
    }
  });
  return (
    <div className="forexTitle">
      <div className="forexIcon">
        <img src={icon} alt={label} />
        <span>{label + '-' + symbol}</span>
      </div>
      <div className="forexPrice">
        <div className="cryptoPrice">
          <span>{Math.fround(price)}</span>
          <span className={priChange ? 'priceUp' : 'priceDown'}>
            {priceChange}
          </span>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Crypto;
