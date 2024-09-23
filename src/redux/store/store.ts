import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
//import mainReducer from '@/reducers/mainReducer';
import storage from 'redux-persist/lib/storage';

import dataReducer from '@/redux/reducers/dataReducer';
import outputReducer from '../reducers/outputReducer';
import gridModalReducer from '../reducers/gridModalReducer';
import gridButtonReducer from '../reducers/gridButtonReducer';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

//configured persistobject
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

//created persistedDataReducer which uses persistReducer function to incorporate persistobject to dataReducer
const persistedDataReducer = persistReducer(persistConfig, dataReducer);

// Store is created to manage the state of Packy
export const store = configureStore({
  reducer: {
    gridModalReducer,
    dataReducer: persistedDataReducer,
    outputReducer,
    gridButtonReducer,
  }, //middleware is configurated to the redux store to ignore certain actions when performing
  //serializable checks
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

console.log(store.getState());

//constructed and exported persistor which uses persistStore method to create persistor from store
export const persistor = persistStore(store);
console.log(persistor.getState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
