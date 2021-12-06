import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
import {
  Matches,
  matches as matchesDummy,
  MatchTypes,
  MatchDetail,
  match as matchDummy,
} from '@/dummyMatch';

export const fetchAllMatch = createAsyncThunk('matches/fetchAllMatch', async () => {
  return matchesDummy;
});

export const fetchMatchById = createAsyncThunk('matches/fetchMatchById', async (id: number) => {
  return matchDummy;
});

export const deleteMatchById = createAsyncThunk(
  `matches/deleteMatchById`,
  async (matchId: number) => {
    return { matchId };
  }
);

export const matches = createSlice({
  name: 'matches',
  initialState: {
    data: {
      matches: [],
      match: [],
    },
  } as MatchTypes,
  reducers: {},
  extraReducers: {
    [fetchAllMatch.pending.type]: (state: MatchTypes) => {
      state.data.matches = [];
    },
    [fetchAllMatch.fulfilled.type]: (state: MatchTypes, action: PayloadAction<Matches>) => {
      state.data.matches.push(...action.payload.data.matches);
    },
    [fetchMatchById.fulfilled.type]: (state: MatchTypes, action: PayloadAction<MatchDetail>) => {
      state.data.match.push(action.payload.data);
    },
    [deleteMatchById.fulfilled.type]: (state: MatchTypes) => {
      state.data.match = [];
    },
  },
});
