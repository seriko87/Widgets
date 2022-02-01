import React, { useEffect, useState } from 'react';
import './stopWatch.css';

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [lap, setLap] = useState([]);
  const [lapTimer, setLapTimer] = useState(0);
  const [fastLap, setFastLap] = useState();

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  const handlePause = () => {
    setIsPaused(!isPaused);
  };
  const handleReset = () => {
    setLapTimer(0);
    setLap([]);
    setIsActive(false);
    setTime(0);
  };

  const handleLap = () => {
    if (lap.length === 0) {
      setLap([...lap, time]);
    } else {
      setLap([...lap, time - lapTimer]);
    }

    setLapTimer(time);
  };
  useEffect(() => {
    let minNum = Math.min(...lap);
    setFastLap(minNum);
  }, [lap]);

  const formatTime = (e) => {
    let ms = ('0' + ((e / 10) % 100)).slice(-2);
    let s = Math.floor(e / 1000) % 60;
    let m = Math.floor(e / 60000) % 60;

    let mins = `${m}`.padStart(2, '0');
    let secs = `${s}`.padStart(2, '0');
    return mins + ':' + secs + ':' + ms;
  };

  return (
    <div className="stopWatchCont">
      <div className="stopWatchMain">{formatTime(time)}</div>
      {lap.length !== 0 && (
        <div className="stwLapListCont">
          {lap?.map((item, index) => {
            return (
              <div
                className={
                  fastLap === item ? 'stwLapList fastLap' : 'stwLapList'
                }
              >
                <span>Lap{index + 1}</span>
                <span>{formatTime(item)}</span>
              </div>
            );
          })}
        </div>
      )}
      <div className="stwBtn">
        <button
          className="stwBtnLap"
          onClick={handleLap}
          disabled={isPaused ? true : false}
        >
          Lap
        </button>
        {!isActive ? (
          <button className="stwBtnStart" onClick={() => handleStart()}>
            Start
          </button>
        ) : (
          <button className="stwBtnStart" onClick={() => handlePause()}>
            {!isPaused ? 'Pause' : 'Resume'}
          </button>
        )}
        <button className="stwBtnReset" onClick={() => handleReset()}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
