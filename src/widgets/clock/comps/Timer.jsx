import React, { useState, useEffect, useRef } from 'react';
import './timer.css';
import alarms from './alarm.mp3';

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(3);
  const [startAlarm, setStartAlarm] = useState(false);
  const audioRef = useRef(new Audio(alarms));
  const circleRef = useRef();

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

  /**
   * It takes in a number and returns a string that is formatted as hh:mm:ss.
   * @returns The time in hours, minutes, and seconds.
   */
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
    setIsActive(true);
    setIsPaused(false);
  };
  const handlePause = () => {
    setIsPaused(!isPaused);
  };
  const handleStop = () => {
    setIsPaused(false);
    setIsActive(false);
    setStartAlarm(false);
    setTime(3);
    audioRef.current.pause();
  };

  useEffect(() => {
    if (time === 0 && isActive) {
      setStartAlarm(true);
      setIsActive(false);
      setTime(0);
      audioRef.current.play();
    }
  }, [time]);

  let circleLengh = circleRef.current.r.baseVal.value * 2 * Math.PI;

  circleRef.current.style.strokeDasharray = `${circleLengh} ${circleLengh}`;
  function setProgress(percent) {
    const offset = (percent / 100) * circleLengh;
    circleRef.current.style.strokeDashoffset = offset;
  }
  setProgress(80);
  return (
    <div className="timerCont">
      <div className="timerCircle" style={{}}>
        <div className="timerTime">{formatTime(time)}</div>
        <svg height="150" width="150" className="timerCircleSvg">
          <circle
            cx="75"
            cy="75"
            r="70"
            stroke="black"
            strokeWidth="4"
            fill="none"
            ref={circleRef}
          />
        </svg>
      </div>
      <input type="nu" />
      {startAlarm && (
        <div className="timerFinished">
          <div>{formatTime(time)}</div>
          <div className="stwBtnAlarm">
            <button className="stwBtnStart" onClick={() => handleStop()}>
              Dismiss
            </button>
            <button className="stwBtnStart" onClick={() => handleStart()}>
              Restart
            </button>
          </div>
        </div>
      )}
      {!isActive ? (
        <button className="stwBtnStart" onClick={() => handleStart()}>
          Start
        </button>
      ) : (
        <button className="stwBtnStart" onClick={() => handlePause()}>
          {!isPaused ? 'Pause' : 'Resume'}
        </button>
      )}
      <button className="stwBtnStart" onClick={() => handleStop()}>
        Cancel
      </button>
    </div>
  );
};

export default Timer;
