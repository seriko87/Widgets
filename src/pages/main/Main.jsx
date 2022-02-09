import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import Contact from '../contact/Contact';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAuthState } from '../../firebase';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { style } from '@mui/system';

const Main = () => {
  const [navbar, setNavbar] = useState(true);
  const [hamb, setHamb] = useState(false);
  const [winSize, setWinSize] = useState(window.innerHeight);
  const { currentUser } = useAuthState();

  const scrollEventListener = () => {
    if (window.scrollY < 200) {
      return setNavbar(true);
    } else if (window.scrollY > 200) {
      return setNavbar(false);
    }
  };

  const resizeEventListener = () => {
    setWinSize(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEventListener);

    return () => {
      window.removeEventListener('scroll', scrollEventListener);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeEventListener);
    return () => {
      window.removeEventListener('resize', resizeEventListener);
    };
  }, []);

  console.log(currentUser);
  return (
    <div className="mainContainer">
      <nav className={navbar ? 'mainNav' : 'mainNav navScrolled'}>
        <div
          className="navWrap"
          style={
            hamb ? { backgroundColor: '#204b8b' } : { backgroundColor: 'none' }
          }
        >
          <div className="navLogo">
            {' '}
            <WidgetsIcon sx={{ fontSize: 35 }} /> <span>Widgets</span>
          </div>

          <button className="navHamb" onClick={() => setHamb(!hamb)}>
            {!hamb ? (
              <MenuIcon fontSize="large" />
            ) : (
              <MenuOpenIcon fontSize="large" />
            )}
          </button>
          <div className="navBtnCont">
            <button className="navBtn" onClick={() => setHamb(false)}>
              <a href="#aboutMain">About</a>
            </button>
            <button className="navBtn" onClick={() => setHamb(false)}>
              <a href="#contactMain">Contact</a>
            </button>
            {currentUser ? (
              <Link to="/home">
                <button className="mainGotryBtn">Launch</button>
              </Link>
            ) : (
              <Link to="/signup">
                <button className="mainGotryBtn">Register</button>
              </Link>
            )}
          </div>
        </div>

        {hamb && (
          <div className="navBtnCont1" style={{ height: winSize - 70 }}>
            <div className="navBtnHover">
              <button className="navBtn" onClick={() => setHamb(false)}>
                <a href="#aboutMain">About</a>
              </button>
              <button className="navBtn" onClick={() => setHamb(false)}>
                <a href="#contactMain">Contact</a>
              </button>
              {currentUser ? (
                <Link to="/home">
                  <button className="mainGotryBtn">Launch</button>
                </Link>
              ) : (
                <Link to="/signup">
                  <button className="mainGotryBtn">Register</button>
                </Link>
              )}
            </div>

            <div className="navContInfo">
              <a
                href="mailto:serdarash@gmail.com"
                className="contactLink"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'white' }}
              >
                <MailOutlineIcon />
              </a>
              <a
                href="https://github.com/seriko87/rapid_info"
                target="_blank"
                rel="noreferrer"
                className="contactLink"
                style={{ color: 'white' }}
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        )}
      </nav>
      <div className="headerMain">
        <span className="mainTitleText">
          Welcome to Widgets Web Application
        </span>
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
            This is a widgets app that shows useful information about chosen
            topics that are similar to Windows or macOS widgets. It is designed
            to use in a desktop environment.
          </span>
          <ul className="aboutList">
            <li>
              <strong>Front-end:</strong> HTML, CSS, JavaScript, React Js
            </li>
            <li>
              <strong>Back-end:</strong> Firebase, Firebase Auth, Firebase
              database, NoSQL
            </li>
            <li>
              <strong>React Packages:</strong> React Charts, Axios, Material Ui,
              Draggable, React-Router
            </li>
            <li>
              <strong>State:</strong> useContext, useReducer
            </li>
            <li>
              <strong>API:</strong> Rapid Api, Weather API, Covid Data API, Geo
              Location Mapbox, Bing News Api, ExchangeRate Api, Pexels Api
            </li>
          </ul>
        </section>
      </div>

      <Contact />
      <footer> © 2022 All Rights Reserved</footer>
    </div>
  );
};

export default Main;
