/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
import {
  matches as matchesDummy,
  match as matchDummy,
  TeamWithUser,
  teamWithUser as teamWithUserDummy,
} from '@/dummyMatch';

export const fetchAllMatch = createAsyncThunk('matches/fetchAllMatches', async () => {
  /**
   * Todo: API 완성시 추가
   * const { data } = await axios.get(URL);
   * return data;
   */

  return matchesDummy;
});

export const fetchMatchById = createAsyncThunk('matches/fetchMatchById', async (id: number) => {
  return matchDummy.data;
});

export const deleteMatchById = createAsyncThunk(
  `matches/deleteMatchById`,
  async (matchId: number) => {
    return { matchId };
  }
);

export const fetchTeamWithUser = createAsyncThunk(
  'matches/fetchTeamWithUser',
  async (token: number) => {
    return teamWithUserDummy;
  }
);

interface TeamUser {
  captainId?: number;
  captainName?: string;
  teamUserId?: number;
  teamUserName?: string;
}
export interface Team {
  teamId: number;
  teamLogo: string;
  teamName: string;
  teamMannerTemperature: number;
  teamUsers: TeamUser[];
}

export interface TeamSimple {
  teamId: number;
  teamName: string;
  teamUsers: TeamUser[];
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
  groundName: string;
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
}

export interface PostsState {
  data: {
    matches: PostItem[];
    match: PostItem[];
    teamWithUser: TeamSimple[];
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
      const index = state.data.match.findIndex((post) => post.matchId === action.payload.matchId);
      if (index === -1) {
        state.data.match.push(action.payload);
      } else {
        state.data.match[index] = action.payload;
      }
    },
    [deleteMatchById.fulfilled.type]: (state: PostsState) => {
      state.data.match = [];
    },
    [fetchTeamWithUser.fulfilled.type]: (
      state: PostsState,
      action: PayloadAction<TeamWithUser>
    ) => {
      state.data.teamWithUser = [];
      state.data.teamWithUser.push(...action.payload.data.teams);
    },
  },
});
