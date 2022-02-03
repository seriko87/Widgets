import './clock.css';
import React, { useState } from 'react';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import Draggable from 'react-draggable';
import WorldClock from './comps/WorldClock';
import StopWatch from './comps/StopWatch';
import Timer from './comps/Timer';

const Clock = () => {
  let obj = [
    { id: 'Clock', status: true },
    { id: 'Stopwatch', status: false },
    { id: 'Timer', status: false },
  ];
  const [active, setActive] = useState(obj);

  const handleClick = (item) => {
    const newD = active.map((it) => {
      return it.id === item
        ? { ...it, status: true }
        : { ...it, status: false };
    });

    setActive(newD);
  };

  console.log(active);
  return (
    <Draggable handle="strong">
      <div className="clockCont box no-cursor">
        <strong className="cursor" style={{ width: 90 + '%' }}></strong>
        <CloseWidget id="clock" />
        {active[0].status && <WorldClock />}
        {active[1].status && <StopWatch />}
        {active[2].status && <Timer />}
        <div className="clockBtnWrap">
          {active.map((item) => {
            return (
              <>
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={
                    item.status
                      ? 'clockBtnAll clockBtnAllActive'
                      : 'clockBtnAll'
                  }
                >
                  {item.id}
                </button>
              </>
            );
          })}
        </div>
      </div>
    </Draggable>
  );
};

export default Clock;
