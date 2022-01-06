import './App.css';
import Weather from './components/weather/Weather';
import DarkModeToggle from './components/darkMode/DarkModeToggle';
import Time from './components/time/Time';
import News from './components/news/News';
import Draggable from 'react-draggable';
import Covid from './components/covid/Covid';
import Example from './example';
import BlackScreen from './components/blackScreen/BlackScreen';

function App() {
  return (
    <div className="App">
      <DarkModeToggle />

      <div className="container">
        {/* <Weather />
        <Time />
        <News />
        <Covid /> */}
        <BlackScreen />
      </div>
    </div>
  );
}

export default App;
