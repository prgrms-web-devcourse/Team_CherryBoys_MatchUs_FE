import { configureStore } from '@reduxjs/toolkit';
import { posts } from './posts';

export const store = configureStore({
  reducer: {
    posts: posts.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
