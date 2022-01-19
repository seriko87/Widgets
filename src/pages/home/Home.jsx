import './home.css';
import { useContext, useState } from 'react';
import Profile from '../../components/profile/Profile';
import { useAuthState } from '../../firebase';
import { GlobalContext } from '../../context/GlobalContext';
import BlackScreen from '../components/blackScreen/BlackScreen';
import Covid from '../components/covid/Covid';
import News from '../components/news/News';
import Time from '../components/time/Time';
import Weather from '../components/weather/Weather';

function Home() {
  const { list } = useContext(GlobalContext);
  const [proOpenClose, setProOpenClose] = useState(true);
  const { currentUser } = useAuthState();

  const widgetList = [
    {
      id: 'time',
      name: 'Time',
      status: false,
      component: <Time />,
    },
    { id: 'weather', name: 'Weather', status: false, component: <Weather /> },
    { id: 'news', name: 'News', status: false, component: <News /> },
    { id: 'covid', name: 'Covid Info', status: false, component: <Covid /> },
    {
      id: 'blackScreen',
      name: 'Black Screen',
      status: false,
      component: <BlackScreen />,
    },
  ];

  return (
    <div className="container">
      <div className="profileBtnHomeOpen" onClick={() => setProOpenClose(true)}>
        <img
          src={currentUser?.photoURL}
          alt="Profile"
          className="profile-picture"
        />
      </div>

      {proOpenClose && (
        <Profile user={currentUser} setProOpenClose={setProOpenClose} />
      )}

      {list.map((item) => {
        if (item.status) {
          return item.component;
        }
        return null;
      })}
    </div>
  );
}

export default Home;
