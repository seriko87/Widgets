import './home.css';
import { useContext, useState, useEffect } from 'react';
import Profile from '../../components/profile/Profile';
import { useAuthState } from '../../firebase';
import { GlobalContext } from '../../context/GlobalContext';
import BlackScreen from '../../components/blackScreen/BlackScreen';
import Weather from '../../components/weather/Weather';
import News from '../../components/news/News';
import Covid from '../../components/covid/Covid';
import Calculator from '../../components/calculator/Calculator';
import Forex from '../../components/forex/Forex';
import MatchCards from '../../widgets/matchCards/MatchCards';
import Currency from '../../widgets/currency/Currency';
import Clock from '../../widgets/clock/Clock';
import Quotes from '../../widgets/quotes/Quotes';
import RollDice from '../../widgets/rollDice/RollDice';
import ImgWidget from '../../widgets/imgWidget/ImgWidget';
import WidgetsIcon from '@mui/icons-material/Widgets';

function Home() {
  const { list } = useContext(GlobalContext);
  const [proOpenClose, setProOpenClose] = useState(true);
  const { currentUser } = useAuthState();
  const [newList, setNewList] = useState(list);

  const widgetList = [
    {
      status: false,
      component: <Clock key="clock" />,
    },
    {
      status: false,
      component: <Weather key="weather" />,
    },

    {
      status: false,
      component: <Covid key="covid" />,
    },
    {
      status: false,
      component: <BlackScreen key="blackScreen" />,
    },
    {
      status: false,
      component: <Calculator key="calculator" />,
    },
    {
      status: false,
      component: <Forex key="forex" />,
    },
    {
      status: false,
      component: <MatchCards key="matchCards" />,
    },
    {
      status: false,
      component: <Currency key="currency" />,
    },
    {
      status: false,
      component: <Quotes key="quotes" />,
    },
    {
      status: false,
      component: <RollDice key="rollDice" />,
    },
    {
      status: false,
      component: <ImgWidget key="imgWidget" />,
    },
    {
      status: false,
      component: <News key="news" />,
    },
  ];

  useEffect(() => {
    setNewList(list);
  }, [list]);

  return (
    <div className="container">
      <div className="profileBtnHomeOpen" onClick={() => setProOpenClose(true)}>
        <WidgetsIcon
          fontSize="large"
          className="profileIconHome"
          sx={{ fontSize: 48 }}
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
