import React, { useState, useEffect, useRef } from 'react';
import './timer.css';
import alarms from './alarm.mp3';

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState({ hour: 0, minute: 0, second: 0 });

  const [startAlarm, setStartAlarm] = useState(false);

  const audioRef = useRef(new Audio(alarms));
  const circleRef = useRef();
  let circleLengh = 140 * Math.PI;

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const formatTime = (e) => {
    let h = Math.floor(e / 3600);
    let m = Math.floor(e / 60) % 60;
    let s = Math.floor(e) % 60;

    h = `${h}`.padStart(2, '0');
    m = `${m}`.padStart(2, '0');
    s = `${s}`.padStart(2, '0');
    return h + ':' + m + ':' + s;
  };

  const handleStart = () => {
    let times = timer.hour * 3600 + timer.minute * 60 + timer.second;
    if (times !== 0) {
      setIsActive(true);
      setIsPaused(false);

      setTime(times);
    }

    setStartAlarm(false);
    audioRef.current.pause();
  };
  const handlePause = () => {
    setIsPaused(!isPaused);
  };
  const handleStop = () => {
    setIsPaused(false);
    setIsActive(false);
    setStartAlarm(false);

    audioRef.current.pause();
  };

  useEffect(() => {
    if (time === 0 && isActive) {
      setStartAlarm(true);
      setIsActive(false);
      setTime(0);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    if (time !== 0) {
      setProgress(
        (circleLengh / (timer.hour * 3600 + timer.minute * 60 + timer.second)) *
          time
      );
    }
  }, [time]);

  function setProgress(percent) {
    const offset = circleLengh - percent;

    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = offset;
    }
  }

  const handleIncrease = (type, incDec) => {
    if (type === 'h') {
      if (incDec === 'inc') {
        setTimer({ ...timer, hour: timer.hour === 99 ? 0 : timer.hour + 1 });
      } else {
        setTimer({ ...timer, hour: timer.hour === 0 ? 99 : timer.hour - 1 });
      }
    }
    if (type === 'm') {
      if (incDec === 'inc') {
        setTimer({
          ...timer,
          minute: timer.minute === 59 ? 0 : timer.minute + 1,
        });
      } else {
        setTimer({
          ...timer,
          minute: timer.minute === 0 ? 59 : timer.minute - 1,
        });
      }
    }
    if (type === 's') {
      if (incDec === 'inc') {
        setTimer({
          ...timer,
          second: timer.second === 59 ? 0 : timer.second + 1,
        });
      } else {
        setTimer({
          ...timer,
          second: timer.second === 0 ? 59 : timer.second - 1,
        });
      }
    }
  };

  return (
    <div className="timerCont">
      {isActive && (
        <div className="timerCircle">
          <div className="timerTime">{formatTime(time)}</div>
          <svg height="150" width="150" className="timerCircleSvg">
            <circle
              cx="75"
              cy="75"
              r="70"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${circleLengh}`}
              ref={circleRef}
              className="cirlceSvg"
              style={{ transition: 'all 0.2s linear' }}
            />
          </svg>
        </div>
      )}
      {!isActive && (
        <div className="timerIncCont">
          <div className="timerIncBtn">
            <button onClick={() => handleIncrease('h', 'inc')}>+</button>
            <span id="timerHour">{`${timer.hour}`.padStart(2, '0')}</span>
            <button onClick={() => handleIncrease('h', 'dec')}>-</button>
          </div>
          :
          <div className="timerIncBtn">
            <button onClick={() => handleIncrease('m', 'inc')}>+</button>
            <span id="timerMinute">{`${timer.minute}`.padStart(2, '0')}</span>
            <button onClick={() => handleIncrease('m', 'dec')}>-</button>
          </div>
          :
          <div className="timerIncBtn">
            <button onClick={() => handleIncrease('s', 'inc')}>+</button>
            <span id="timerSecond">{`${timer.second}`.padStart(2, '0')}</span>
            <button onClick={() => handleIncrease('s', 'dec')}>-</button>
          </div>
        </div>
      )}

      {startAlarm && (
        <div className="timerFinished">
          <div>{formatTime(time)}</div>
          <div className="stwBtnAlarm">
            <button className="stwBtnStart " onClick={() => handleStop()}>
              Dismiss
            </button>
            <button className="stwBtnReset" onClick={() => handleStart()}>
              Restart
            </button>
          </div>
        </div>
      )}

      <div className="timerControlBtn">
        {!isActive ? (
          <button className="stwBtnStart" onClick={() => handleStart()}>
            Start
          </button>
        ) : (
          <button className="stwBtnStart" onClick={() => handlePause()}>
            {!isPaused ? 'Pause' : 'Resume'}
          </button>
        )}
        <button className="stwBtnReset" onClick={() => handleStop()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Timer;
