import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import Contact from '../contact/Contact';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import WidgetsIcon from '@mui/icons-material/Widgets';

const Main = () => {
  const [navbar, setNavbar] = useState(true);
  const [hamb, setHamb] = useState(false);
  const [winSize, setWinSize] = useState(window.innerHeight);

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

  return (
    <div className="mainContainer">
      <nav className={navbar ? 'mainNav' : 'mainNav navScrolled'}>
        <div
          className="navWrap"
          style={
            hamb
              ? { backgroundColor: '#204b8b' }
              : { backgroundColor: 'transparent' }
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

            <Link to="/home">
              <button className="mainGotryBtn">Launch</button>
            </Link>
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
          src="https://firebasestorage.googleapis.com/v0/b/rapid-info-433c6.appspot.com/o/websiteImg%2FaboutPic1.png?alt=media&token=20523736-a991-4158-ba3d-8c18dc5f911c"
          alt="weather"
          className="mainWeather"
        />

        <section className="aboutTextCont">
          <h1 className="aboutTitle">About</h1>
          <span className="aboutMainText">
            <p>Widgets is a passion project of mine that I built to make desktop computing more convenient and enjoyable. It's a collection of draggable components, or widgets, that give you quick access to useful information like weather, news, and cryptocurrency prices.</p>
<p>I built the app using HTML, CSS, JavaScript, and React Js, along with React packages like React Charts, Axios, Material UI, Draggable, and React-Router. To make sure it's always reliable and secure, I used Firebase, Firebase Auth, Firebase database, and NoSQL for the back-end.</p>
<p>Widgets relies on a range of APIs, including Rapid API, Weather API, Covid Data API, Geo Location Mapbox, Bing News API, ExchangeRate API, and Pexels API to provide you with real-time and accurate information.</p>
<p>I created Widgets as a way to make my own desktop experience more efficient and enjoyable, and I hope it does the same for you. Thanks for checking it out!</p>
          </span>
        
        </section>
      </div>

      <Contact />
      <footer> © 2023 All Rights Reserved</footer>
    </div>
  );
};

export default Main;
