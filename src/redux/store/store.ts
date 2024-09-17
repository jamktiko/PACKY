import { configureStore } from '@reduxjs/toolkit';
//import mainReducer from '@/reducers/mainReducer';
import modalReducer from '@/redux/reducers/modalReducer';
import dataReducer from '@/redux/reducers/dataReducer';
import outputReducer from '../reducers/outputReducer';

// Store is created to manage the state of Packy
export const store = configureStore({
  reducer: { modalReducer, dataReducer, outputReducer },
});

console.log(store.getState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
