import React, { useState, useEffect } from 'react';
import './worldClock.css';

const WorldClock = () => {
  const [time, setTime] = useState();

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
    <div className="worldClockCont">
      <div className="worldClockMain">
        {time}
        <div className="worldDateMain"> {date}</div>
      </div>
    </div>
  );
};

export default WorldClock;
