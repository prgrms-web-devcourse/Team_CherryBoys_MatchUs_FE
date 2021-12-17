/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setItemFromStorage, getItemFromStorage } from '@/utils/storage';
import { requestLogin, requestReAuth } from '../api/auth';
import { loginFormType, userType } from '@/types/auths';

const initialState: userType = {
  isLogged: false,
  accessToken: null,
  expireTime: null,
  userInfo: null,
};

export const login = createAsyncThunk('auth/login', async (loginForm: loginFormType) => {
  const response = await requestLogin(loginForm);

  return response;
});

export const reAuth = createAsyncThunk('auth/reAuth', async () => {
  const response = await requestReAuth();

  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogged = false;
      state.accessToken = '';
      state.expireTime = null;
      state.userInfo = null;
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state, { payload }) => {
      const { token, userResponse } = payload;
      const expireTime = new Date().getTime();

      state.isLogged = true;
      state.accessToken = token;
      state.expireTime = expireTime + 3600000;
      setItemFromStorage('accessToken', token);
      setItemFromStorage('expireTime', expireTime);
      state.userInfo = userResponse;
    },
    [login.rejected.type]: () => {
      console.log('error!');
    },
    [reAuth.fulfilled.type]: (state, { payload }) => {
      const { userResponse } = payload;

      state.isLogged = true;
      state.accessToken = getItemFromStorage('accessToken');
      state.expireTime = getItemFromStorage('expireTime');
      state.userInfo = userResponse;
    },
  },
});

export default authSlice.reducer;
