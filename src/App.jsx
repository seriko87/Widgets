import './App.css';
import Weather from './components/weather/Weather';
import DarkModeToggle from './components/darkMode/DarkModeToggle';

function App() {
  return (
    <div className="App">
      <DarkModeToggle />
      <Weather />
    </div>
  );
}

export default App;
