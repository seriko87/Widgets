import { createContext, useReducer, useEffect } from 'react';

import GlobalReducer from './GlobalReducer';

// initial state
const newList = [
  {
    id: 'clock',
    name: 'Clock',
    status: false,
  },
  {
    id: 'weather',
    name: 'Weather',
    status: false,
  },
  {
    id: 'news',
    name: 'News',
    status: false,
  },
  {
    id: 'covid',
    name: 'Covid Info',
    status: false,
  },
  {
    id: 'blackScreen',
    name: 'Colorful Screen',
    status: false,
  },
  { id: 'calculator', name: 'Calculator', status: false },
  { id: 'forex', name: 'Crypto Prices', status: false },
  { id: 'matchCards', name: 'Match Cards', status: false },
  {
    id: 'currency',
    name: 'Currency Convert',
    status: false,
  },
  {
    id: 'quotes',
    name: 'Quotes',
    status: false,
  },
  {
    id: 'rollDice',
    name: 'Roll Dice',
    status: false,
  },
  {
    id: 'imgWidget',
    name: 'Images',
    status: false,
  },
];

let list = JSON.parse(localStorage.getItem('list')) || null;

if (list) {
  if (list.length < newList.length) {
    list = newList;
  }
} else {
  list = [...newList];
}

const initialState = {
  location: JSON.parse(localStorage.getItem('location')) || null,
  list: list,
  cryptoData: [],
};

//create context
export const GlobalContext = createContext(initialState);

//provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(state.list));
  }, [state.list]);
  useEffect(() => {
    localStorage.setItem('location', JSON.stringify(state.location));
  }, [state.location]);

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        location: state.location,
        list: state.list,
        cryptoData: state.cryptoData,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
