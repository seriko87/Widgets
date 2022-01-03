import './App.css';
import Weather from './components/weather/Weather';
import DarkModeToggle from './components/darkMode/DarkModeToggle';
import Time from './components/time/Time';
import News from './components/news/News';
import Loading from './components/loading/Loading';

function App() {
  return (
    <div className="App">
      <DarkModeToggle />

      <div className="container">
        <News />

        <Weather />
      </div>
    </div>
  );
}

export default App;
