import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    list: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
    removeTask: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = todoSlice.actions;
export const todoLists = (state) => state.todoList.list;

export default todoSlice.reducer;
