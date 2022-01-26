import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import './matchCards.css';
import { matchCards } from './cardsSvg';
import { shuffle } from '../../functions/functions';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';

const MatchCards = () => {
  const [cardList, setCardList] = useState([]);
  const [firstCard, setFirstCard] = useState({ id: '', i: '' });
  const [twoOpened, setTwoOpened] = useState(false);
  const [temp, setTemp] = useState([]);
  const [trueCards, setTrueCards] = useState([]);
  const [cardOpened, setCardOpened] = useState(0);
  const [moveNum, setMoveNum] = useState(0);

  useEffect(() => {
    const newArr = matchCards.map((item) => {
      item.status = false;
      return item;
    });
    setCardList(shuffle(newArr));
  }, []);

  const handleClick = (id, index) => {
    if (firstCard.id === '') {
      setFirstCard({ id, i: index });
      setTemp([...temp, index]);
    } else if (firstCard.i !== index) {
      setTwoOpened(true);
      setTemp(true);
      setMoveNum(moveNum + 1);
      setTemp([...temp, index]);
      handleCheck(firstCard.id, id);
    }
  };

  const handleCheck = (a, b) => {
    if (a === b) {
      setTrueCards([...trueCards, a]);
      setCardOpened(cardOpened + 1);
      cardList.map((item) => {
        if (item.id === a) {
          item.status = true;
        }
      });
    }
    setFirstCard({ id: '', i: '' });

    setTimeout(() => {
      setTemp([]);
      setTwoOpened(false);
    }, 1500);
  };

  const handleReset = () => {
    setTrueCards([]);
    setFirstCard({ id: '', i: '' });
    setTemp([]);
    setCardList(
      shuffle(
        cardList.map((item) => {
          item.status = false;
          return item;
        })
      )
    );
    setCardOpened(0);
    setMoveNum(0);
  };

  return (
    <Draggable handle="strong">
      <div className="matchGameCont box no-cursor">
        <strong className="cursor" style={{ width: 90 + '%' }}></strong>
        <CloseWidget id="matchCards" />

        <div className="matchControlsCont">
          <div className="matchCardsLeft">
            <div
              className="matchProgress"
              style={{ width: (100 * cardOpened) / 8 + '%' }}
            ></div>
            <span>Cards Matched</span>
            <span className="matchNumbers">{cardOpened} / 8</span>
          </div>
          <div className="matchTotalMoves">
            <span>Total Moves</span>
            <span className="matchNumbers">{moveNum}</span>
          </div>
          <button
            className="matchStartBtn"
            onClick={() => {
              handleReset(false);
            }}
            disabled={moveNum === 0 ? true : false}
          >
            Reset
          </button>
        </div>
        <div className="matchCardsCont">
          {cardList.map((item, i) => {
            return (
              <button
                className="matchCard"
                key={i}
                onClick={twoOpened ? '' : () => handleClick(item.id, i)}
                disabled={trueCards.includes(item.id) ? true : false}
              >
                {item.status ? (
                  <span className="matchCardWrap1">{item.path}</span>
                ) : temp[0] === i || temp[1] === i ? (
                  <span className="matchCardWrap1">{item.path}</span>
                ) : (
                  <span className="matchCardWrap">
                    <FilterVintageIcon fontSize="large" className="matchImg" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Draggable>
  );
};

export default MatchCards;
