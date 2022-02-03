import React, { useState, useEffect, useRef } from 'react';
import './worldClock.css';

const WorldClock = () => {
  const [time, setTime] = useState({ hh: 0, mm: 0, ss: 0 });
  const [fullScreen, setFullScreen] = useState(false);
  const ref = useRef();

  let newTime = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  let date = newTime.toLocaleDateString([], options);

  useEffect(() => {
    let interval = setInterval(() => {
      let day = new Date();
      let hh = day.getHours();
      let mm = day.getMinutes();
      let ss = day.getSeconds();

      var ampm = hh >= 12 ? 'PM' : 'AM';
      hh = hh % 12;
      hh = hh ? hh : 12;
      mm = mm < 10 ? '0' + mm : mm;
      ss = ss < 10 ? '0' + ss : ss;

      setTime({ hh, mm, ss, ampm });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function openFullscreen() {
    let elem = document.querySelector('.worldClockMainFull');
    console.log(elem);
    if (!document.fullscreenElement) {
      elem
        .requestFullscreen()
        .then(() => {})
        .catch((err) => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
    } else {
      document.exitFullscreen();
    }
  }

  document.addEventListener('fullscreenchange', function () {
    var full_screen_element = document.fullscreenElement;

    if (full_screen_element === null) {
      setFullScreen(false);
    } else {
      setFullScreen(true);
    }
  });

  return (
    <div className="worldClockCont">
      {!fullScreen && (
        <div className="worldClockMain" onClick={() => openFullscreen()}>
          <span className="clockTime">
            <span className="clockHour">{time.hh}</span>:
            <span className="clockSecond">{time.mm}</span>:
            <span className="clockSecond">{time.ss}</span>
            {'  '}
            <span className="clockAmPm"> {time.ampm}</span>
          </span>

          <div className="worldDateMain"> {date}</div>
        </div>
      )}

      <div
        className="worldClockMainFull"
        onClick={() => openFullscreen()}
        style={fullScreen ? { display: 'block' } : { display: 'none' }}
      >
        <div className="clockFullWrap">
          <span className="clockTimeFull">
            <span className="clockHourFull">
              {time.hh}:{time.mm}
            </span>
            <span className="clockSecAPFull">
              <span className="clockSecondFull">{time.ss}</span>
              <span className="clockAmPmFull"> {time.ampm}</span>
            </span>
          </span>
          <div className="worldDateMainFull"> {date}</div>
        </div>
      </div>
    </div>
  );
};

export default WorldClock;
