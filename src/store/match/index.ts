import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
import {
  MatchTypes,
  MatchDetail,
  match as matchDummy,
} from '@/dummyMatch';


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
    [fetchMatchById.fulfilled.type]: (state: MatchTypes, action: PayloadAction<MatchDetail>) => {
      state.data.match.push(action.payload.data);
    },
    [deleteMatchById.fulfilled.type]: (state: MatchTypes) => {
      state.data.match = [];
    },
  },
});
