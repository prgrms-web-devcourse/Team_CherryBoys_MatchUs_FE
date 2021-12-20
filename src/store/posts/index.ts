/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

import hireItems from '@/fixtures/hireItems';
import matchItems from '@/fixtures/matchItems';
import { conditions, getHiresInfo } from '@/api/hires';

export interface TeamInfo {
  teamId: number;
  grade: string;
}

export interface HiresResponseType {
  ageGroup: string;
  city: string;
  date: string;
  detail: string;
  endTime: string;
  groundName: string;
  hirePlayerNumber: number;
  position: string;
  postId: number;
  matchId?: number;
  region: string;
  startTime: string;
  teamId: number;
  teamLogo: string;
  teamMannerTemperature: number;
  teamName: string;
}

export interface PostWrapper {
  isMatch: boolean;
  selectedTeam: TeamInfo;
  data: HiresResponseType[];
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

export const fetchAllPost = createAsyncThunk(
  'posts/fetchAllPost',
  async (condition: conditions) => {
    /**
     * Todo: API 완성시 추가
     * const { data } = await axios.get(URL);
     * return data;
     */
    const response = getHiresInfo(condition);

    return response;
  }
);

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
      state.data = [];
    },
    [fetchAllPost.fulfilled.type]: (state: PostsState, action: PayloadAction<PostItem[]>) => {
      state.data = action.payload;
    },
    [fetchAllMatch.pending.type]: (state: PostsState) => {
      state.data = [];
    },
    [fetchAllMatch.fulfilled.type]: (state: PostsState, action: PayloadAction<PostItem[]>) => {
      state.data = action.payload;
    },
  },
});
