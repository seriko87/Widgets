import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(3609);

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
    setIsActive(true);
    setIsPaused(false);
  };
  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  let sounds = {
    test: new Audio('assets/alarm.wav'),
  };

  function playSound(sound) {
    // sounds[sound].volume = 0.1;
    sounds[sound].play();
  }
  function stopSound(sound) {
    sounds[sound].stop();
  }

  playSound(sounds.test);
  return (
    <div className="timerCont">
      <div className="timerCircle">
        <div>{formatTime(time)}</div>
      </div>
      <div className="timerFinished">{formatTime(time)}</div>
      {!isActive ? (
        <button className="stwBtnStart" onClick={() => handleStart()}>
          Start
        </button>
      ) : (
        <button className="stwBtnStart" onClick={() => handlePause()}>
          {!isPaused ? 'Pause' : 'Resume'}
        </button>
      )}
    </div>
  );
};

export default Timer;
