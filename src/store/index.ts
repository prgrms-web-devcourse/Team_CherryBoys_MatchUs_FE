import { configureStore } from '@reduxjs/toolkit';
import { match } from './match/match';

export const store = configureStore({
  reducer: {
    match: match.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
