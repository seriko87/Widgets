import { createContext, useEffect, useReducer } from 'react';
import BlackScreen from '../components/blackScreen/BlackScreen';
import Covid from '../components/covid/Covid';
import News from '../components/news/News';
import Time from '../components/time/Time';
import Weather from '../components/weather/Weather';
import GlobalReducer from './GlobalReducer';

// initial state

const initialState = {
  location: null,
  list: [
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
  ],
};

//create context
export const GlobalContext = createContext(initialState);

//provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        location: state.location,
        list: state.list,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
