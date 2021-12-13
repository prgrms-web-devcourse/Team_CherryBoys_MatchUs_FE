import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

import hireItems from '@/fixtures/hireItems';
import matchItems from '@/fixtures/matchItems';

export interface TeamInfo {
  teamId: number;
  grade: string;
}

export interface PostWrapper {
  isMatch: boolean;
  selectedTeam: TeamInfo;
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
  cost?: number;
  position?: string;
  ageGroup: string;
  teamLogo: string;
  teamName: string;
  teamMannerTemperature: number;
}

export const fetchAllPost = createAsyncThunk('posts/fetchAllPost', async () => {
  /**
   * Todo: API 완성시 추가
   * const { data } = await axios.get(URL);
   * return data;
   */

  return hireItems;
});

export const fetchAllMatch = createAsyncThunk('matches/fetchAllMatches', async () => {
  /**
   * Todo: API 완성시 추가
   * const { data } = await axios.get(URL);
   * return data;
   */

  return matchItems;
});

export interface PostsState {
  data: PostItem[];
}

export const posts = createSlice({
  name: 'posts',
  initialState: {
    data: [],
  } as PostsState,
  reducers: {},
  extraReducers: {
    [fetchAllPost.pending.type]: (state: PostsState) => {
      // eslint-disable-next-line no-param-reassign
      state.data = [];
    },
    [fetchAllPost.fulfilled.type]: (state: PostsState, action: PayloadAction<PostItem[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.data = action.payload;
    },
    [fetchAllMatch.pending.type]: (state: PostsState) => {
      // eslint-disable-next-line no-param-reassign
      state.data = [];
    },
    [fetchAllMatch.fulfilled.type]: (state: PostsState, action: PayloadAction<PostItem[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.data = action.payload;
    },
  },
});
