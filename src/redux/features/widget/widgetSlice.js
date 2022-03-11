import { createSlice } from '@reduxjs/toolkit';

const widgetSlice = createSlice({
  name: 'widgetData',
  initialState: {
    location: '',
    cryptoData: [],
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
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

export const { addCrypto, setLocation, removeCrypto } = widgetSlice.actions;

export const location = (state) => state.widgetData.location;
export const cryptoList = (state) => state.widgetData.cryptoData;

export default widgetSlice.reducer;
