import { createContext, useReducer, useEffect } from 'react';

import GlobalReducer from './GlobalReducer';

// initial state
const newList = [
  {
    id: 'time',
    name: 'Time',
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
    name: 'Black Screen',
    status: false,
  },
  { id: 'calculator', name: 'Calculator', status: false },
];

let list = JSON.parse(localStorage.getItem('list')) || null;

if (list) {
  if (list.length >= newList.length) {
    list = newList;
    console.log(true);
  }
}

const initialState = {
  location: JSON.parse(localStorage.getItem('location')) || null,
  list: list || [
    {
      id: 'time',
      name: 'Time',
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
      name: 'Black Screen',
      status: false,
    },
    { id: 'calculator', name: 'Calculator', status: false },
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
  useEffect(() => {
    localStorage.setItem('location', JSON.stringify(state.location));
  }, [state.location]);

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
