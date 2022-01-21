import React, { useState } from 'react';
import './calculator.css';
import { calcFunc } from './calfFunc';

const Calculator = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="calcContainer">
      <div className="calcScreen">
        <div className="calcMemScreen">{value}</div>
        <div className="calcResScreen">{value}</div>
      </div>
      <div className="calcNumFuncWrap">
        {calcFunc.map((item) => {
          return (
            <button
              className={item.className}
              onClick={() => setValue(item.label + value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
