import { configureStore } from '@reduxjs/toolkit';
//import mainReducer from '@/reducers/mainReducer';
import modalReducer from '@/redux/reducers/modalReducer';

// Store is created to manage the state of Packy
export const store = configureStore({
  reducer: { modalReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
