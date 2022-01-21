import './time.css';
import { GlobalContext } from '../../context/GlobalContext';
import { addRemoveList } from '../../context/ApiCalls';
import React, { useState, useEffect } from 'react';

import Draggable from 'react-draggable';
import { useContext } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Time = () => {
  const [time, setTime] = useState();
  const { dispatch } = useContext(GlobalContext);
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

  const handleChange = (id) => {
    addRemoveList(id, dispatch);
  };
  return (
    <Draggable>
      <div className="timeWrapper">
        <div className="closeWidgetCont" onClick={() => handleChange('time')}>
          <CloseOutlinedIcon
            className="closeWidget"
            style={{ position: 'absolute', opacity: 0.4 }}
          />
        </div>
        <div className="timeMain">
          {time}
          <div className="dateMain"> {date}</div>
        </div>
      </div>
    </Draggable>
  );
};

export default Time;
