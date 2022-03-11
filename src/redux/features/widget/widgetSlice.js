import { createSlice } from '@reduxjs/toolkit';

const widgetSlice = createSlice({
  name: 'widgetData',
  initialState: {
    location: JSON.parse(localStorage.getItem('location')) ?? null,
    cryptoData: [],
  },
  reducers: {
    setLocationGps: (state, action) => {
      console.log(action);
      state.location = action.payload;
      localStorage.setItem('location', JSON.stringify(state.location));
    },
    addCrypto: (state, action) => {
      state.cryptoData = [...state.cryptoData, action.payload];
    },
    removeCrypto: (state, action) => {
      state.cryptoData = state.cryptoData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addCrypto, setLocationGps, removeCrypto } = widgetSlice.actions;

export const locationGps = (state) => state.widgetData.location;
export const cryptoList = (state) => state.widgetData.cryptoData;

export default widgetSlice.reducer;
