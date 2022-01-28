import React from 'react';
import './main.css';

const Main = () => {
  return (
    <div className="mainContainer">
      <nav className="mainNav">
        <button>About</button>
      </nav>
      <div className="headerMain">
        <div className="mainGradient"></div>
        <span>Welcome to Rapid Info Widgets App</span>
        <button className="mainGotryBtn">Go to try</button>
      </div>
      <div className="aboutMain">
        <section className="aboutImgCont">
          <img src="images/weather.png" alt="weather" />
          <img src="images/matchCard.png" alt="match card" />
          <img src="images/crypto.png" alt="crypto" />
        </section>
        <section className="aboutTextCont">
          <h1>About</h1>
          <span>
            This is widgets web app that show usefull information about chosen
            topic. You can think it like windows - mac widgets.
          </span>
          <ul>
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
