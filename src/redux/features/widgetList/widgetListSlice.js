import { createSlice } from '@reduxjs/toolkit';
import { widgetsList } from './widgetList';

const widgetListSlice = createSlice({
  name: 'widgetList',
  initialState: {
    list: widgetsList,
  },
  reducers: {
    addRemoveWidget: (state, action) => {
      state.list = state.list.map((item) => {
        if (item.id === action.payload) {
          return { ...item, status: !item.status };
        }
        return item;
      });
    },
  },
});

export const { addRemoveWidget } = widgetListSlice.actions;

export const widgets = (state) => state.widgetList.list;

export default widgetListSlice.reducer;
