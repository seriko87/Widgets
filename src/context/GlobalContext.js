import { createContext, useReducer, useEffect } from 'react';

import GlobalReducer from './GlobalReducer';

import { newList } from './widgetList';
// initial state

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
