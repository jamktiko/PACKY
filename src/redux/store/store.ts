import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import gridStateReducer from '../reducers/gridStateReducer';
import dataReducer from '@/redux/reducers/dataReducer';
import outputReducer from '../reducers/outputReducer';
import gridModalReducer from '../reducers/gridModalReducer';
import libraryDataReducer from '../reducers/libraryDataReducer';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

//persisted session storage
const createSessionPersistConfig = (key: string) => ({
  key,
  storage: sessionStorage,
  storage: sessionStorage,
  version: 1,
});

//created persistedDataReducer which uses persistReducer function to incorporate persistobject to dataReducer
const persistedDataReducer = persistReducer(
  createSessionPersistConfig('features'),
  createSessionPersistConfig('features'),
  dataReducer
);

const persistedOutputReducer = persistReducer(
  createSessionPersistConfig('output'),
  createSessionPersistConfig('output'),
  outputReducer
);

const persistedGrid = persistReducer(
  createSessionPersistConfig('grid'),
  createSessionPersistConfig('grid'),
  gridStateReducer
);

const persistedLibrary = persistReducer(
  createSessionPersistConfig('library'),
  createSessionPersistConfig('library'),
  libraryDataReducer
);

// Store is created to manage the state of Packy
export const store = configureStore({
  reducer: {
    gridStateReducer: persistedGrid,
    gridModalReducer,
    dataReducer: persistedDataReducer,
    outputReducer: persistedOutputReducer,
    libraryDataReducer: persistedLibrary,
  }, //middleware is configurated to the redux store to ignore certain actions when performing
  //serializable checks
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, REHYDRATE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//constructed and exported persistor which uses persistStore method to create persistor from store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
