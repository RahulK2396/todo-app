import { configureStore } from '@reduxjs/toolkit';
import widgetReducer from './component/widgetSlice';

const store = configureStore({
  reducer: {
    widgets: widgetReducer
  }
});

export default store;
