import { configureStore } from '@reduxjs/toolkit';
//import mainReducer from '@/reducers/mainReducer';
import modalReducer from '@/redux/reducers/modalReducer';
import dataReducer from '@/redux/reducers/dataReducer';

// Store is created to manage the state of Packy
export const store = configureStore({
  reducer: { modalReducer, dataReducer },
});

console.log(store.getState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
