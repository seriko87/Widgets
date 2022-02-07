import React from 'react';
import './incDec.css';

const IncDec = ({ min, max, setNumber, number }) => {
  const handleIncrease = (incDec) => {
    incDec === 'inc'
      ? setNumber(number === max ? min : number + 1)
      : setNumber(number === min ? max : number - 1);
  };

  return (
    <div className="numberIncBtn">
      <button onClick={() => handleIncrease('inc')}>+</button>
      <span className="numberIncDec">{number}</span>
      <button onClick={() => handleIncrease('dec')}>-</button>
    </div>
  );
};

export default IncDec;
