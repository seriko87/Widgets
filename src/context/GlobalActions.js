export const addRemoveWidget = (id) => ({
  type: 'ADD_REMOVE_WIDGET',
  payload: id,
});
export const setCordinates = (cords) => ({
  type: 'SET_USER_CORDS',
  payload: cords,
});
export const addCryptoData = (crypto) => ({
  type: 'ADD_CRYPTO',
  payload: crypto,
});
export const removeCryptoList = (id) => ({
  type: 'REMOVE_CRYPTO',
  payload: id,
});
