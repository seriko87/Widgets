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

function Home() {
  const { list } = useContext(GlobalContext);
  const [proOpenClose, setProOpenClose] = useState(true);
  const { currentUser } = useAuthState();
  const [newList, setNewList] = useState(list);
  const imgUrl =
    (currentUser && currentUser.photoURL) ||
    'https://firebasestorage.googleapis.com/v0/b/rapid-info-433c6.appspot.com/o/userImg%2FHTNHxmCPGLYBTFTy3DcUOURi1Fw1avat.png?alt=media&token=b48261ad-6dbe-401c-942b-7566f621aeb6';

  const widgetList = [
    {
      id: 'clock',
      name: 'Clock',
      status: false,
      component: <Clock key="clock" />,
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
      name: 'Colorful Screen',
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
    {
      id: 'matchCards',
      name: 'Match Cards',
      status: false,
      component: <MatchCards key="matchCards" />,
    },
    {
      id: 'currency',
      name: 'Currency Convert',
      status: false,
      component: <Currency key="currency" />,
    },
    {
      id: 'quotes',
      name: 'Quotes',
      status: false,
      component: <Quotes key="quotes" />,
    },
    {
      id: 'rollDice',
      name: 'Roll Dice',
      status: false,
      component: <RollDice key="rollDice" />,
    },
    {
      id: 'imgWidget',
      name: 'Images',
      status: false,
      component: <ImgWidget key="imgWidget" />,
    },
  ];

  useEffect(() => {
    setNewList(list);
  }, [list]);

  return (
    <div className="container">
      <div className="profileBtnHomeOpen" onClick={() => setProOpenClose(true)}>
        <img
          src={currentUser ? currentUser.photoURL : imgUrl}
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
