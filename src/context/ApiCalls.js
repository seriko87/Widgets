import { addRemoveWidget } from './GlobalActions';

export const addRemoveList = (id, dispatch) => {
  dispatch(addRemoveWidget(id));
};
