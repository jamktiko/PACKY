import { configureStore } from '@reduxjs/toolkit';

// Store is created to manage the state of Packy
export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
