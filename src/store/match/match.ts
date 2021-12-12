/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  TeamWithUser,
  userTeamDummy,
  TeamSimple,
  WaitingTeam,
  WaitingTeams,
  WaitingTeamsDummy,
} from '@/dummyMatch';

export const fetchTeamWithUser = createAsyncThunk(
  'match/fetchTeamWithUser',
  async (token: number) => {
    return userTeamDummy;
  }
);

export const fetchWaitingTeams = createAsyncThunk(
  'match/fetchWaitingTeams',
  async (matchId: number) => {
    return WaitingTeamsDummy;
  }
);

interface MatchState {
  data: {
    userTeams: TeamSimple[];
    waitingTeams: WaitingTeam[];
    modal: {
      [matchApply: string]: boolean;
      matchApprove: boolean;
      matchReview: boolean;
    };
    matchId: number;
  };
}

export const match = createSlice({
  name: 'match',
  initialState: {
    data: {
      userTeams: [],
      waitingTeams: [],
      modal: {
        matchApply: false,
        matchApprove: false,
        matchReview: false,
      },
      matchId: -1,
    },
  } as MatchState,
  reducers: {
    toggleModal: (state, { payload }: PayloadAction<{ modalName: string }>) => {
      state.data.modal[payload.modalName] = !state.data.modal[payload.modalName];
    },
    setMatchId: (state, { payload }: PayloadAction<{ matchId: number }>) => {
      state.data.matchId = payload.matchId;
    },
  },
  extraReducers: {
    [fetchTeamWithUser.fulfilled.type]: (
      state: MatchState,
      action: PayloadAction<TeamWithUser>
    ) => {
      state.data.userTeams = [];
      state.data.userTeams.push(...action.payload.data.teams);
    },
    [fetchWaitingTeams.fulfilled.type]: (
      state: MatchState,
      action: PayloadAction<WaitingTeams>
    ) => {
      state.data.waitingTeams = [];
      state.data.waitingTeams.push(...action.payload.data.waitingTeams);
    },
  },
});
