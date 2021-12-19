/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setItemFromStorage } from '@/utils/storage';
import {
  acceptTeamInvitation,
  getMyHireRequestInfo,
  getMyTeamInvitationInfo,
  requestLogin,
  requestReAuth,
  rejectTeamInvitaion,
} from '../api/user';
import { removeItemFromStorage, setItemFromStorage } from '@/utils/storage';
import { loginFormType, reqeustUserInfoType, userType } from '@/types/users';
import { requestEditUser } from '@/api/user';
import { cancelHireRequest } from '@/api/hires';

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
  hireRequestList: [],
  teamInvitaionList: [],
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

export const getHireRequest = createAsyncThunk('user/getHireRequest', async () => {
  const response = await getMyHireRequestInfo();

  return response;
});

export const hireRequestCancel = createAsyncThunk(
  'user/hireRequestCancel',
  async (applcationId: number) => {
    const response = await cancelHireRequest(applcationId);

    return response;
  }
);

export const getTeamInvitation = createAsyncThunk('user/getTeamInvitation', async () => {
  const response = await getMyTeamInvitationInfo();

  return response;
});

export const acceptTeamInvitationAction = createAsyncThunk(
  'user/acceptTeamInvitation',
  async (invitaionId: number) => {
    const response = await acceptTeamInvitation(invitaionId);

    return response;
  }
);

export const rejectTeamInvitationAction = createAsyncThunk(
  'user/acceptTeamInvitation',
  async (invitaionId: number) => {
    const response = await rejectTeamInvitaion(invitaionId);

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

      state.hireRequestList = [];
      state.teamInvitaionList = [];
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
    sethireRequestListState: (state, { payload }) => {
      const { newHireRequestList } = payload;
      state.hireRequestList = newHireRequestList;
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
    [initiateAuth.fulfilled.type]: (state, { payload }) => {
      const { userResponse } = payload;

      state.isLogged = true;
      state.userInfo = userResponse;
    },
    [getHireRequest.fulfilled.type]: (state, { payload }) => {
      const { hireRequestTeams } = payload;
      state.hireRequestList = hireRequestTeams;
    },
    [getTeamInvitation.fulfilled.type]: (state, { payload }) => {
      const { teamInvitationInfos } = payload;
      state.teamInvitaionList = teamInvitationInfos;
    },
  },
});

export const { logout, editEditabelUserState, sethireRequestListState } = userSlice.actions;
export default userSlice.reducer;
