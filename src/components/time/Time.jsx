import './time.css';

import React, { useState, useEffect } from 'react';

const Time = () => {
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
    <div className="timeWrapper">
      <div className="timeMain">
        {time}
        <div className="dateMain"> {date}</div>
      </div>
    </div>
  );
};

export default Time;
