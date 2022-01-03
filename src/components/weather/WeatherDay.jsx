import React from 'react';
import './weatherDay.css';
import { useEffect } from 'react';
import { openPage } from './tabControl';

const WeatherDay = ({ index, item, metric }) => {
  function nextDay(x) {
    var now = new Date();

    now.setDate(now.getDate() + x);
    let newNow = now.toString().split(' ');

    return `${newNow[0]} ${newNow[2]}`;
  }

  // // Get the element with id="defaultOpen" and click on it
  //
  useEffect(() => {
    if (index === 0) {
      document.getElementById('defaultOpen').click();
    }
    //
  }, []);

  return (
    <div className="wd3">
      <div
        className="wd3layer"
        onClick={(e) => openPage(index, e.target)}
        id={index === 0 ? 'defaultOpen' : ''}
      ></div>
      <span className="wd3Title">{index === 0 ? 'Today' : nextDay(index)}</span>
      <div className="wd3Temp">
        <img src={'http:' + item.day.condition['icon']} alt="weather icon" />
        <span>
          <span>{metric ? item.day.maxtemp_c : item.day.maxtemp_f}°</span>
          <span>{metric ? item.day.mintemp_c : item.day.mintemp_f}°</span>
        </span>
      </div>
    </div>
  );
};

export default WeatherDay;
