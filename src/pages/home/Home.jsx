import './home.css';
import { useContext, useState, useEffect } from 'react';
import Profile from '../../components/profile/Profile';
import { useAuthState } from '../../firebase';
import { GlobalContext } from '../../context/GlobalContext';
import BlackScreen from '../../components/blackScreen/BlackScreen';
import Weather from '../../components/weather/Weather';
import News from '../../components/news/News';
import Covid from '../../components/covid/Covid';
import Time from '../../components/time/Time';
import Calculator from '../../components/calculator/Calculator';
import Forex from '../../components/forex/Forex';

function Home() {
  const { list } = useContext(GlobalContext);
  const [proOpenClose, setProOpenClose] = useState(true);
  const { currentUser } = useAuthState();
  const [newList, setNewList] = useState(list);

  const widgetList = [
    {
      id: 'time',
      name: 'Time',
      status: false,
      component: <Time key="time" />,
    },
    {
      id: 'weather',
      name: 'Weather',
      status: false,
      component: <Weather key="weather" />,
    },
    {
      id: 'news',
      name: 'News',
      status: false,
      component: <News key="news" />,
    },
    {
      id: 'covid',
      name: 'Covid Info',
      status: false,
      component: <Covid key="covid" />,
    },
    {
      id: 'blackScreen',
      name: 'Colorfull Screen',
      status: false,
      component: <BlackScreen key="blackScreen" />,
    },
    {
      id: 'calculator',
      name: 'Calculator',
      status: false,
      component: <Calculator key="calculator" />,
    },
    {
      id: 'forex',
      name: 'Crypto Prices',
      status: false,
      component: <Forex key="forex" />,
    },
  ];

  useEffect(() => {
    setNewList(list);
  }, [list]);

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

      {widgetList.map((item, index) => {
        if (newList[index].status) {
          return item.component;
        }
        return null;
      })}
    </div>
  );
}

export default Home;
