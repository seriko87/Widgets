import { createSlice } from '@reduxjs/toolkit';
import { widgetsList } from './widgetList';

let list = JSON.parse(localStorage.getItem('widgetList'))
  ? JSON.parse(localStorage.getItem('widgetList'))
  : widgetsList;

if (list.version < widgetsList.version) {
  list = [...widgetsList];
}

const widgetListSlice = createSlice({
  name: 'widgetList',
  initialState: {
    list: list,
  },
  reducers: {
    addRemoveWidget: (state, action) => {
      console.log(state.list);
      state.list = state.list.data.map((item) => {
        if (item.id === action.payload) {
          return { ...item, status: !item.status };
        }
        return item;
      });
      localStorage.setItem('widgetList', JSON.stringify(state.list));
    },
  },
});

export const { addRemoveWidget } = widgetListSlice.actions;

export const widgets = (state) => state.widgetList.list.data;

export default widgetListSlice.reducer;
