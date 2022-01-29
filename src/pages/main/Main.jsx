import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import Contact from '../contact/Contact';

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

  const widgetImg = [
    {
      id: 'time',
      name: 'Time',
      imgUrl: 'images/blkscr.png',
      tech: '',
    },
    {
      id: 'weather',
      name: 'Weather',
      imgUrl: 'images/weather.png',
      tech: 'Track weather up to 3 day, used Weather api.',
    },
    {
      id: 'news',
      name: 'News',
      imgUrl: 'images/news.png',
      tech: 'Browse categorized news, used Bing news api.',
    },
    {
      id: 'covid',
      name: 'Covid Info',
      imgUrl: 'images/covid.png',
      tech: 'Covid data for daily and totals, used Disease sh api.',
    },
    {
      id: 'blackScreen',
      name: 'Colorfull Screen',
      imgUrl: 'images/blkscr.png',
      tech: 'Check different colors on your screen.',
    },
    {
      id: 'calculator',
      name: 'Calculator',
      imgUrl: 'images/calc.png',
      tech: '',
    },
    {
      id: 'forex',
      name: 'Crypto Prices',
      imgUrl: 'images/crypto_d.png',
      tech: 'Track Crypto prices, you can add up to 3 crypto, used Crypto api.',
    },
    {
      id: 'matchCards',
      name: 'Match Cards',
      imgUrl: 'images/matchCard.png',
    },
  ];

  return (
    <div className="mainContainer">
      <nav className={navbar ? 'mainNav' : 'mainNav'}>
        <div className="navLogo">Rapid Info</div>
        <div className="navBtnCont">
          <button className="navBtn">About</button>

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
      {/* <div className="widgetsMain">
        <div className="widgetsTitle">Widgets</div>
        <section className="widgetsImgCont">
          {widgetImg.map((item) => {
            return (
              <span className="widgetsMainImgWrap">
                <span className="widgetImgTitle">
                  <div className="widgetNameTitle">
                    <h3>{item.name}</h3>
                    <span className="widgetNameDesc">{item.tech}</span>
                  </div>
                </span>
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  key={item.id}
                  className="widgetImgMain"
                />
              </span>
            );
          })}
        </section>
      </div> */}
      <Contact />
      <footer> © 2022 All Rights Reserverd Rapid Info</footer>
    </div>
  );
};

export default Main;
