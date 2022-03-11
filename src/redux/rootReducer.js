import widgetListReducer from './features/widgetList/widgetListSlice';
import widgetReducer from './features/widget/widgetSlice';

const rootReducer = {
  widgetList: widgetListReducer,
  widgetData: widgetReducer,
};

export default rootReducer;
