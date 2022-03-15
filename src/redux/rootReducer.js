import widgetListReducer from './features/widgetList/widgetListSlice';
import widgetReducer from './features/widget/widgetSlice';
import todoReducer from './features/todo/todoSlice';

const rootReducer = {
  widgetList: widgetListReducer,
  widgetData: widgetReducer,
  todoList: todoReducer,
};

export default rootReducer;
