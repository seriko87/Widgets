import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    list: [],
  },
  reducers: {
    addList: (state, action) => {
      let listId = Date.now();
      let name = 'New List';
      state.list.push({
        listId: listId,
        task: [],
        name: name + ' ' + state.list.length + 1,
      });
    },
    addTask: (state, action) => {
      state.list[action.payload.id].push(action.payload);
    },
    removeTask: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    taskComplete: (state, action) => {
      state.list = state.list.map((item) => {
        if (item.id === action.payload) {
          return { ...item, finished: !item.finished };
        }
        return item;
      });
    },
  },
});

export const { addTask, removeTask, taskComplete, addList } = todoSlice.actions;
export const todoLists = (state) => state.todoList.list;

export default todoSlice.reducer;
