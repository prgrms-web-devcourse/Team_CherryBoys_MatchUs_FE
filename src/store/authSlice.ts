/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setItemFromStorage } from '@/utils/storage';
import { requestLogin } from '../api/auth';
import { loginFormType, userType } from '@/types/auth';

const initialState: userType = {
  isLogged: false,
  accessToken: null,
  userInfo: null,
};

export const login = createAsyncThunk('auth/login', async (loginForm: loginFormType) => {
  const response = await requestLogin(loginForm);

  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogged = false;
      state.accessToken = '';
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state, { payload }) => {
      const { token, userResponse } = payload;
      state.isLogged = true;
      state.accessToken = token;
      setItemFromStorage('acessToken', token);
      state.userInfo = userResponse;
    },
  },
});

export default authSlice.reducer;
