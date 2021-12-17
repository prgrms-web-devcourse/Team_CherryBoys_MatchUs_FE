import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from './userSlice';
import { match } from './match/match';
import { posts } from './posts';

export const store = configureStore({
  reducer: {
    posts: posts.reducer,
    match: match.reducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
