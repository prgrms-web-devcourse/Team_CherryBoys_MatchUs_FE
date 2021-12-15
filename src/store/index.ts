import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { match } from './match/match';
import { posts } from './posts';

export const store = configureStore({
  reducer: {
    posts: posts.reducer,
    match: match.reducer,
    auth: authReducer,                    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
