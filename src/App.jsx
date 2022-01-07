import './App.css';
import Weather from './components/weather/Weather';
import DarkModeToggle from './components/darkMode/DarkModeToggle';
import Time from './components/time/Time';
import News from './components/news/News';
import Draggable from 'react-draggable';
import Covid from './components/covid/Covid';

import BlackScreen from './components/blackScreen/BlackScreen';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <DarkModeToggle />

      <div className="container">
        <Weather />
        <Time />
        <News />
        <Covid />
        <BlackScreen />
      </div>
    </div>
  );
}

export default App;
