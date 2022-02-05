import React, { useEffect, useState } from 'react';
import './rollDice.css';
import Draggable from 'react-draggable';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import Dice from './Dice';

const RollDice = () => {
  const [diceNum, setDiceNum] = useState(1);
  const [randArray, setRandArray] = useState([]);

  const handleIncrease = (incDec) => {
    if (incDec === 'inc') {
      setDiceNum(diceNum === 8 ? 1 : diceNum + 1);
    } else {
      setDiceNum(diceNum === 1 ? 8 : diceNum - 1);
    }
  };
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const handleRoll = () => {
    const element = [];
    for (let index = 0; index < diceNum; index++) {
      element.push(getRandomInt(1, 7));
    }
    setRandArray([...element]);
  };
  return (
    <Draggable handle="strong">
      <div className="rdCont box no-cursor">
        <strong className="cursor" style={{ width: 90 + '%' }}></strong>
        <CloseWidget id="rollDice" />
        <div className="rdWrap">
          <div className="timerIncBtn">
            <button onClick={() => handleIncrease('inc')}>+</button>
            <span id="timerSecond">{diceNum}</span>
            <button onClick={() => handleIncrease('dec')}>-</button>
          </div>
          <div className="rdScreen">
            {randArray.map((item, index) => {
              return <Dice key={index} number={item} />;
            })}
          </div>
        </div>
        <button className="rdRollDiceBtn" onClick={handleRoll}>
          Roll
        </button>
      </div>
    </Draggable>
  );
};

export default RollDice;
