import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import timerReducer from '../features/timer/timerSlice';
import taskReducer from '../features/task/taskSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    timer: timerReducer,
    tasks: taskReducer,
  },
});
