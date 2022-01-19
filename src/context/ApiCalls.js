import { addRemoveWidget, setCordinates } from './GlobalActions';

export const addRemoveList = (id, dispatch) => {
  dispatch(addRemoveWidget(id));
};

export const setUserLocation = (cords, dispatch) => {
  dispatch(setCordinates(cords));
};
