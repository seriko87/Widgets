import './time.css';
import Drag from '../../Draggable';
import React, { useState, useEffect, useRef } from 'react';

const Time = () => {
  const [time, setTime] = useState();
  const ref = useRef(null);
  Drag(ref);
  let newTime = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  let date = newTime.toLocaleDateString([], options);

  useEffect(() => {
    setInterval(() => {
      let newTime1 = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setTime(newTime1);
    }, 1000);

    return () => {
      clearInterval(setTime());
    };
  }, []);

  return (
    <div className="timeWrapper" ref={ref}>
      <div className="timeMain">
        {time}
        <div className="dateMain"> {date}</div>
      </div>
    </div>
  );
};

export default Time;
