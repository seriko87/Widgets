import {
  addRemoveWidget,
  setCordinates,
  addCryptoData,
  removeCryptoList,
} from './GlobalActions';

export const addRemoveList = (id, dispatch) => {
  dispatch(addRemoveWidget(id));
};

export const setUserLocation = (cords, dispatch) => {
  dispatch(setCordinates(cords));
};

export const addCryptoList = (cryptos, dispatch) => {
  dispatch(addCryptoData(cryptos));
};
export const remCryptoList = (id, dispatch) => {
  dispatch(removeCryptoList(id));
};
