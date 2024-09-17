import { configureStore } from '@reduxjs/toolkit';
//import mainReducer from '@/reducers/mainReducer';

import dataReducer from '@/redux/reducers/dataReducer';
import gridModalReducer from '@/redux/reducers/gridModalReducer';

// Store is created to manage the state of Packy
export const store = configureStore({
  reducer: { gridModalReducer, dataReducer },
});

console.log(store.getState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
