import { createSlice } from '@reduxjs/toolkit';
import { widgetsList } from './widgetList';

let list = JSON.parse(localStorage.getItem('widgetList'))
  ? JSON.parse(localStorage.getItem('widgetList'))
  : widgetsList;

/* checking localStorage version with new version, if true change local version and use new widget list*/
if (list.version < widgetsList.version) {
  list = { ...widgetsList };
  localStorage.setItem('widgetList', JSON.stringify(widgetsList));
}

const widgetListSlice = createSlice({
  name: 'widgetList',
  initialState: {
    list: list['data'],
    version: list.version,
  },
  reducers: {
    addRemoveWidget: (state, action) => {
      /* Updating the state of the widget list. */

      state.list = state.list.map((item) => {
        if (item.id === action.payload) {
          return { ...item, status: !item.status };
        }
        return item;
      });

      /* updating local storage state on every update */
      localStorage.setItem(
        'widgetList',
        JSON.stringify({ version: state.version, data: state.list })
      );
    },
  },
});

export const { addRemoveWidget } = widgetListSlice.actions;

export const widgets = (state) => state.widgetList.list;

export default widgetListSlice.reducer;
