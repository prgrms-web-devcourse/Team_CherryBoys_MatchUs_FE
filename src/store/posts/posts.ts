/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
import { Match, matchListDummy, matchDummy, matchDummy2 } from '@/dummyMatch';

export const fetchAllMatch = createAsyncThunk('matches/fetchAllMatches', async () => {
  /**
   * Todo: API 완성시 추가
   * const { data } = await axios.get(URL);
   * return data;
   */

  return matchListDummy;
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
  startTime: {
    hour: number;
    minute: number;
    second: number;
    nano?: number;
  };
  endTime?: {
    hour: number;
    minute: number;
    second: number;
    nano?: number;
  };
  cost?: number;
  position?: string;
  ageGroup: string;
  teamLogo?: string;
  teamName?: string;
  teamMannerTemperature?: string;
  teamId?: number;
  homeTeam?: Team;
  awayTeam?: Team;
  detail?: string;
  teamUsers?: TeamUser[];
  sports?: string;
  status?: string;
  registerTeamInfo?: {
    captainId: number;
    captainName: string;
    teamId: number;
    teamLogo: string;
    teamName: string;
    mannerTemperature: number;
    matchMembers: TeamUser[];
  };
  applyTeamInfo?: {
    captainId: number;
    captainName: string;
    teamId: number;
    teamLogo: string;
    teamName: string;
    mannerTemperature: number;
    matchMembers: TeamUser[];
  };
}

export interface PostsState {
  data: {
    matchList: Match[];
    match: Match[];
  };
}

export const posts = createSlice({
  name: 'posts',
  initialState: {
    data: {
      matchList: [],
      match: [],
    },
  } as PostsState,
  reducers: {},
  extraReducers: {
    [fetchAllMatch.pending.type]: (state: PostsState) => {
      state.data.matchList = [];
    },
    [fetchAllMatch.fulfilled.type]: (state: PostsState, action: PayloadAction<PostsState>) => {
      state.data.matchList.push(...action.payload.data.matchList);
    },
    [fetchMatchById.fulfilled.type]: (state: PostsState, action: PayloadAction<Match>) => {
      console.log('ACT2', action.payload);
      state.data.match = [];
      state.data.match.push(action.payload);
    },
    [deleteMatchById.fulfilled.type]: (state: PostsState) => {
      state.data.match = [];
    },
  },
});
