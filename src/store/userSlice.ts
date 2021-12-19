/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeItemFromStorage, setItemFromStorage } from '@/utils/storage';
import { requestLogin, requestReAuth } from '../api/user';
import { loginFormType, reqeustUserInfoType, userType } from '@/types/users';
import { requestEditUser } from '@/api/user';

const initialState: userType = {
  isLogged: false,
  accessToken: null,
  expireTime: null,
  userInfo: {
    ageGroup: '',
    bio: '',
    gender: '',
    id: null,
    name: '',
    nickname: '',
    roleGroup: '',
    sports: '',
    userGradeResponse: [],
  },
};

export const login = createAsyncThunk('user/login', async (loginForm: loginFormType) => {
  const response = await requestLogin(loginForm);

  return response;
});

export const initiateAuth = createAsyncThunk('user/reAuth', async () => {
  const response = await requestReAuth();

  return response;
});

export const editUser = createAsyncThunk(
  'user/editUser',
  async (userEditForm: reqeustUserInfoType) => {
    const response = await requestEditUser(userEditForm);

    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogged = false;
      state.userInfo = {
        ageGroup: '',
        bio: '',
        gender: '',
        id: null,
        name: '',
        nickname: '',
        roleGroup: '',
        sports: '',
        userGradeResponse: [],
      };

      removeItemFromStorage('accessToken');
      removeItemFromStorage('expireTime');
    },
    editEditabelUserState: (state, { payload }) => {
      const { nickname, bio, ageGroup, sportName } = payload;

      state.userInfo.nickname = nickname;
      state.userInfo.bio = bio;
      state.userInfo.ageGroup = ageGroup;
      state.userInfo.sports = sportName;
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state, { payload }) => {
      const { token, userResponse } = payload;
      const expireTime = new Date().getTime();

      state.isLogged = true;
      setItemFromStorage('accessToken', token);
      setItemFromStorage('expireTime', expireTime + 3000000);
      state.userInfo = userResponse;
    },
    [login.rejected.type]: () => {
      console.log('error!');
    },
    [initiateAuth.fulfilled.type]: (state, { payload }) => {
      const { userResponse } = payload;

      state.isLogged = true;
      state.userInfo = userResponse;
    },
    [editUser.fulfilled.type]: (state) => {},
  },
});

export const { logout, editEditabelUserState } = userSlice.actions;
export default userSlice.reducer;
