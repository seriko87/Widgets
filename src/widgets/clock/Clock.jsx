import './clock.css';
import React from 'react';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import Draggable from 'react-draggable';
import WorldClock from './comps/WorldClock';
import StopWatch from './comps/StopWatch';
import Timer from './comps/Timer';

const Clock = () => {
  return (
    <Draggable handle="strong">
      <div className="clockCont box no-cursor">
        <strong className="cursor" style={{ width: 90 + '%' }}></strong>
        <CloseWidget id="clock" />
        <Timer />
      </div>
    </Draggable>
  );
};

export default Clock;
