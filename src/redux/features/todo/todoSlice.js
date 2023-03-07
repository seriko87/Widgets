import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    list: [],
  },
  reducers: {
    addList: (state, action) => {
      let listId = Date.now();
      state.list.unshift({
        listId: listId,
        taskArray: [],
        name: 'New Note ' + state.list.length,
      });
    },
    removeList: (state, action) => {
      state.list = state.list.filter((item) => item.listId !== action.payload);
    },
    renameList: (state, action) => {
      state.list[action.payload[0]].name = action.payload[1];
    },
    addTask: (state, action) => {
      state.list[action.payload.listIndex].taskArray.unshift(
        action.payload.task
      );
    },
    removeTask: (state, action) => {
      state.list[action.payload[1]].taskArray = state.list[
        action.payload[1]
      ].taskArray.filter((item) => item.taskId !== action.payload[0]);
    },
    taskComplete: (state, action) => {
      state.list[action.payload[1]].taskArray = state.list[
        action.payload[1]
      ].taskArray.map((item) => {
        if (item.taskId === action.payload[0]) {
          return { ...item, finished: !item.finished };
        }
        return item;
      });
    },
  },
});

export const {
  addTask,
  removeTask,
  taskComplete,
  addList,
  removeList,
  renameList,
} = todoSlice.actions;
export const todoLists = (state) => state.todoList.list;

export default todoSlice.reducer;
