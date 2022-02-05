import React, { useEffect, useState } from 'react';
import './rollDice.css';
import Draggable from 'react-draggable';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import Dice from './Dice';
import IncDec from '../../components/incDec/IncDec';

const RollDice = () => {
  const [diceNum, setNumber] = useState(1);
  const [randArray, setRandArray] = useState([1, 2, 3, 4, 5, 6]);
  const [totalNum, setTotalNum] = useState(0);
  const [maxNum, setMaxNum] = useState(0);

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
    setTotalNum([...element].reduce((a, b) => a + b));
  };

  useEffect(() => {
    totalNum > maxNum && setMaxNum(totalNum);
  }, [totalNum]);
  const handleReset = () => {
    setMaxNum(0);
    setRandArray([1]);
    setNumber(1);
    setTotalNum(0);
  };

  return (
    <Draggable handle="strong">
      <div className="rdCont box no-cursor">
        <strong className="cursor" style={{ width: 90 + '%' }}></strong>
        <CloseWidget id="rollDice" />
        <div className="rdWrap">
          <IncDec number={diceNum} setNumber={setNumber} max={8} min={1} />

          <div className="rdScreen">
            {randArray.map((item, index) => {
              return <Dice key={index} number={item} />;
            })}
          </div>
        </div>
        <div className="rdBtnWrap">
          <div>
            <button className="rdResetBtn" onClick={handleReset}>
              Reset
            </button>
            <button className="rdRollDiceBtn" onClick={handleRoll}>
              Roll
            </button>
          </div>

          <div className="rdTotalInfo">
            <div className="rdLast">
              <div className="rdInfoTitle">Current Roll</div>
              <span className="rdInfo">{totalNum}</span>
            </div>
            <div className="rdTotal">
              <div className="rdInfoTitle">Max Roll</div>
              <span className="rdInfo">{maxNum}</span>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default RollDice;
