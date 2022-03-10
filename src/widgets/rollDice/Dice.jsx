import React from 'react';
import './dice.css';
import PropTypes from 'prop-types';

const diceClass = {
  1: ['centerDot'],
  2: ['rightTopDot', 'leftBottomDot'],
  3: ['rightTopDot', 'centerDot', 'leftBottomDot'],
  4: ['leftTopDot', 'rightTopDot', 'rightBottomDot', 'leftBottomDot'],
  5: [
    'leftTopDot',
    'rightTopDot',
    'centerDot',
    'rightBottomDot',
    'leftBottomDot',
  ],
  6: [
    'leftTopDot',
    'rightTopDot',
    'centerRightDot',
    'centerLeftDot',
    'rightBottomDot',
    'leftBottomDot',
  ],
};

const Dice = ({ number }) => {
  let diceNum = diceClass[number];
  return (
    <div className="diceComp">
      <div className="diceWrap">
        {diceNum.map((item, index) => {
          return <div className={`diceDot ${item}`} key={index}></div>;
        })}
      </div>
    </div>
  );
};

Dice.propTypes = {
  number: PropTypes.number,
};

export default Dice;
