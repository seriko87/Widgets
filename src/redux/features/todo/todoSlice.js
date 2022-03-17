import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    list: [
      {
        listId: 1543215,
        taskArray: [],
        name: 'New Tab 2',
      },
      {
        listId: 15432215,
        taskArray: [],
        name: 'New Tab 3',
      },
    ],
  },
  reducers: {
    addList: (state, action) => {
      let listId = Date.now();
      let name = 'New Note';
      state.list.unshift({
        listId: listId,
        taskArray: [],
        name: name + ' ' + state.list.length + 1,
      });
    },
    addTask: (state, action) => {
      state.list[action.payload.listIndex].taskArray.push(action.payload.task);
    },
    removeTask: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    taskComplete: (state, action) => {
      state.list = state.list.taskArray.map((item) => {
        if (item.taskId === action.payload) {
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
