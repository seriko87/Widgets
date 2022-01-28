import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';

const Main = () => {
  const [navbar, setNavbar] = useState(true);

  const scrollEventListener = () => {
    if (window.scrollY < 400) {
      return setNavbar(true);
    } else if (window.scrollY > 400) {
      return setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEventListener);
    return () => {
      window.removeEventListener('scroll', scrollEventListener);
    };
  }, []);

  return (
    <div className="mainContainer">
      <nav className={navbar ? 'mainNav' : 'mainNav'}>
        <div className="navLogo">Rapid Info</div>
        <div className="navBtnCont">
          <button className="navBtn">About</button>
          <button className="navBtn">Widgets</button>
          <button className="navBtn">Contact</button>
        </div>
      </nav>
      <div className="headerMain">
        <div className="mainGradient"></div>
        <span className="mainTitleText">Welcome to Rapid Info Widgets App</span>
        <Link to="/home">
          <button className="mainGotryBtn">Try now</button>
        </Link>
      </div>
      <div className="aboutMain">
        <img src="images/aboutPic.png" alt="weather" className="mainWeather" />

        <section className="aboutTextCont">
          <h1 className="aboutTitle">About</h1>
          <span className="aboutMainText">
            This is widgets web app that show usefull information about chosen
            topic. You can think it like windows - mac widgets.
          </span>
          <ul className="aboutList">
            <li> Front-end: HTML, CSS, JavaScript, React Js</li>
            <li>Back-end: Firebase, Firebase Auth, Firebase database, NoSQL</li>
            <li>
              React Packages: React Charts, Axios, Material Ui, Draggable,
              React-Router
            </li>
            <li>State: useContext, useReducer</li>
            <li>
              API: Rapid Api, Weather Api, Covid Data API, Geo Location Mapbox,
              Bing News Api
            </li>
          </ul>
        </section>
      </div>
      <div className="widgetsMain">
        <div className="widgetsTitle">Widgets</div>
        <section className="widgetsImgCont">
          <img src="images/news.png" alt="news" />
          <img src="images/crypto_d.png" alt="crypto" />
          <img src="images/matchCard_d.png" alt="match card" />
          <img src="images/covid.png" alt="covid" />
        </section>
      </div>
    </div>
  );
};

export default Main;
