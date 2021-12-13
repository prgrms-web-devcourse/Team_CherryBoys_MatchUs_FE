/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
import { matches as matchesDummy, matchDummy, matchDummy2 } from '@/dummyMatch';

export const fetchAllMatch = createAsyncThunk('matches/fetchAllMatches', async () => {
  /**
   * Todo: API 완성시 추가
   * const { data } = await axios.get(URL);
   * return data;
   */

  return matchesDummy;
});

export const fetchMatchById = createAsyncThunk('matches/fetchMatchById', async (id: number) => {
  if (id === 2) return matchDummy2.data;
  return matchDummy.data;
});

export const deleteMatchById = createAsyncThunk(
  `matches/deleteMatchById`,
  async (matchId: number) => {
    return { matchId };
  }
);

interface TeamUser {
  userId: number;
  userName: string;
}

export interface Team {
  captainId?: number;
  captainName?: string;
  teamId: number;
  teamLogo: string;
  teamName: string;
  teamMannerTemperature: number;
  matchMembers?: TeamUser[];
  teamUsers?: TeamUser[];
}

export interface PostWrapper {
  isMatch: boolean;
}

export interface Post {
  item: PostItem;
}

export interface PostItem {
  matchId?: number;
  postId?: number;
  city: string;
  region: string;
  ground: string;
  date: string;
  startTime: string;
  endTime?: string;
  cost?: number;
  position?: string;
  ageGroup: string;
  teamLogo: string;
  teamName: string;
  teamMannerTemperature: string;
  teamId?: number;
  homeTeam?: Team;
  awayTeam?: Team;
  detail?: string;
  teamUsers?: TeamUser[];
  sports?: string;
  status?: string;
  registerTeamResponse?: Team;
  applyTeamResponse?: Team;
}

export interface PostsState {
  data: {
    matches: PostItem[];
    match: PostItem[];
  };
}

export const posts = createSlice({
  name: 'posts',
  initialState: {
    data: {
      matches: [],
      match: [],
      teamWithUser: [],
    },
  } as PostsState,
  reducers: {},
  extraReducers: {
    [fetchAllMatch.pending.type]: (state: PostsState) => {
      // eslint-disable-next-line no-param-reassign
      state.data.matches = [];
    },
    [fetchAllMatch.fulfilled.type]: (state: PostsState, action: PayloadAction<PostsState>) => {
      // eslint-disable-next-line no-param-reassign
      state.data.matches.push(...action.payload.data.matches);
    },
    [fetchMatchById.fulfilled.type]: (state: PostsState, action: PayloadAction<PostItem>) => {
      if (!state.data.match[0] || state.data.match[0].matchId !== action.payload.matchId) {
        state.data.match = [];
        state.data.match.push(action.payload);
      }
    },
    [deleteMatchById.fulfilled.type]: (state: PostsState) => {
      state.data.match = [];
    },
  },
});
