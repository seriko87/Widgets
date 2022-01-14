import Weather from '../../components/weather/Weather';
import Time from '../../components/time/Time';
import News from '../../components/news/News';
import Covid from '../../components/covid/Covid';
import BlackScreen from '../../components/blackScreen/BlackScreen';
import './home.css';
import { logout } from '../../firebase';

function Home() {
  return (
    <div className="container">
      <button onClick={logout}>LogOut</button>
      <Weather />
      <Time />

      <Covid />
      <BlackScreen />
    </div>
  );
}

export default Home;
