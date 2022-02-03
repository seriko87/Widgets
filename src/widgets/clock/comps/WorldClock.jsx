import React, { useState, useEffect } from 'react';
import './worldClock.css';

const WorldClock = () => {
  const [time, setTime] = useState({ hh: 0, mm: 0, ss: 0 });

  let newTime = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  let date = newTime.toLocaleDateString([], options);

  useEffect(() => {
    // let interval = setInterval(() => {
    //   let newTime1 = new Date().toLocaleTimeString([], {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     second: '2-digit',
    //   });
    //   setTime(newTime1);
    // }, 1000);
    let interval = setInterval(() => {
      let day = new Date();
      let hh = day.getHours();
      let mm = day.getMinutes();
      let ss = day.getSeconds();

      var ampm = hh >= 12 ? 'PM' : 'AM';
      hh = hh % 12;
      hh = hh ? hh : 12; // the hour '0' should be '12'
      mm = mm < 10 ? '0' + mm : mm;
      ss = ss < 10 ? '0' + ss : ss;

      setTime({ hh, mm, ss, ampm });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="worldClockCont">
      <div className="worldClockMain">
        <span className="clockTime">
          <span className="clockHour">{time.hh}</span>:
          <span className="clockSecond">{time.mm}</span>:
          <span className="clockSecond">{time.ss}</span>
          {'  '}
          <span className="clockAmPm"> {time.ampm}</span>
        </span>

        <div className="worldDateMain"> {date}</div>
      </div>
    </div>
  );
};

export default WorldClock;
