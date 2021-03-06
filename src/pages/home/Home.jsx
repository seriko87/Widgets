import './home.css';
import { useState } from 'react';
import Profile from '../../components/profile/Profile';
import { useAuthState } from '../../firebase';
import BlackScreen from '../../widgets/blackScreen/BlackScreen';
import Weather from '../../widgets/weather/Weather';
import News from '../../widgets/news/News';
import Covid from '../../widgets/covid/Covid';
import Calculator from '../../widgets/calculator/Calculator';
import MatchCards from '../../widgets/matchCards/MatchCards';
import Currency from '../../widgets/currency/Currency';
import Clock from '../../widgets/clock/Clock';
import Quotes from '../../widgets/quotes/Quotes';
import RollDice from '../../widgets/rollDice/RollDice';
import ImgWidget from '../../widgets/imgWidget/ImgWidget';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useSelector } from 'react-redux';
import { widgets } from '../../redux/features/widgetList/widgetListSlice';
import Forex from '../../widgets/forex/Forex';
import Todo from '../../widgets/todo/Todo';

function Home() {
  const list = useSelector(widgets);
  const [proOpenClose, setProOpenClose] = useState(true);
  const { currentUser } = useAuthState();

  const widgetList = [
    {
      user: false,
      component: <Clock key="clock" />,
    },
    {
      user: false,
      component: <Weather key="weather" />,
    },

    {
      user: false,
      component: <Covid key="covid" />,
    },
    {
      user: false,
      component: <BlackScreen key="blackScreen" />,
    },
    {
      user: false,
      component: <Calculator key="calculator" />,
    },
    {
      user: false,
      component: <Forex key="forex" />,
    },
    {
      user: false,
      component: <MatchCards key="matchCards" />,
    },
    {
      user: false,
      component: <Currency key="currency" />,
    },
    {
      user: false,
      component: <Quotes key="quotes" />,
    },
    {
      user: false,
      component: <RollDice key="rollDice" />,
    },
    {
      user: false,
      component: <ImgWidget key="imgWidget" />,
    },
    { user: false, component: <Todo key="todo" /> },
    {
      user: true,
      component: <News key="news" />,
    },
  ];

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

      {list &&
        widgetList.map((item, index) => {
          if (item.user) {
            if (currentUser) {
              if (list[index].status) {
                return item.component;
              }
            }
          } else {
            if (list[index].status) {
              return item.component;
            }
          }
          return null;
        })}
    </div>
  );
}

export default Home;
