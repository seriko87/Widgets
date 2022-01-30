import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import Contact from '../contact/Contact';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';

const Main = () => {
  const [navbar, setNavbar] = useState(true);
  const [hamb, setHamb] = useState(false);

  const scrollEventListener = () => {
    if (window.scrollY < 200) {
      return setNavbar(true);
    } else if (window.scrollY > 200) {
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
      <nav className={navbar ? 'mainNav' : 'mainNav navScrolled'}>
        <div className="navWrap">
          <div className="navLogo">Rapid Info</div>

          <button className="navHamb" onClick={() => setHamb(!hamb)}>
            {!hamb ? (
              <MenuIcon fontSize="large" />
            ) : (
              <MenuOpenIcon fontSize="large" />
            )}
          </button>
          <div className="navBtnCont">
            <button className="navBtn">About</button>
            <button className="navBtn">Contact</button>
            <Link to="/home">
              <button className="mainGotryBtn">Launch</button>
            </Link>
          </div>
        </div>

        {hamb && (
          <div className="navBtnCont1">
            <div className="navBtnHover">
              <button className="navBtn" onClick={() => setHamb(false)}>
                <a href="#aboutMain">About</a>
              </button>
              <button className="navBtn" onClick={() => setHamb(false)}>
                <a href="#contactMain">Contact</a>
              </button>
              <Link to="/home">
                <button className="mainGotryBtn">Launch</button>
              </Link>
            </div>

            <div className="navContInfo">
              <a
                href="mailto:serdarash@gmail.com"
                className="contactLink"
                target="_blank"
                rel="noreferrer"
              >
                <MailOutlineIcon />
              </a>
              <a
                href="https://github.com/seriko87/rapid_info"
                target="_blank"
                rel="noreferrer"
                className="contactLink"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        )}
      </nav>
      <div className="headerMain">
        {/* <div className="mainGradient"></div> */}
        <span className="mainTitleText">Welcome to Rapid Info Widgets App</span>
        <Link to="/home">
          <button className="mainGotryBtn">Try now</button>
        </Link>
      </div>
      <div className="aboutMain" id="aboutMain">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/rapid-info-433c6.appspot.com/o/websiteImg%2FaboutPic.png?alt=media&token=6ae3c6e2-bc2b-4720-8b0b-7efd89769f6b"
          alt="weather"
          className="mainWeather"
        />

        <section className="aboutTextCont">
          <h1 className="aboutTitle">About</h1>
          <span className="aboutMainText">
            This is widgets web app that show usefull information about chosen
            topic similar to windows or MacOS widgets. It is designed to use on
            desktop enviroment.
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
