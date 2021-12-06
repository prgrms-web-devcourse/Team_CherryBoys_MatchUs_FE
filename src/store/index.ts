import { configureStore } from '@reduxjs/toolkit';
import { matches } from './match';

export const store = configureStore({
  reducer: {
    matches: matches.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
