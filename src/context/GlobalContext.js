import { createContext, useReducer, useEffect } from 'react';
import BlackScreen from '../components/blackScreen/BlackScreen';
import Covid from '../components/covid/Covid';
import News from '../components/news/News';
import Time from '../components/time/Time';
import Weather from '../components/weather/Weather';
import GlobalReducer from './GlobalReducer';

// initial state

const list = JSON.parse(localStorage.getItem('list')) || null;

const initialState = {
  location: null,
  list: list || [
    { id: 'time', status: false },
    { id: 'weather', status: false },
    { id: 'news', status: false },
    { id: 'covid', status: false },
    { id: 'blackScreen', status: false },
  ],
};

//create context
export const GlobalContext = createContext(initialState);

//provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(state.list));
  }, [state.list]);

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
