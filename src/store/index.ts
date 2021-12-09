import { configureStore } from '@reduxjs/toolkit';
import { posts } from './posts/posts';
import { match } from './match/match';

export const store = configureStore({
  reducer: {
    posts: posts.reducer,
    match: match.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
