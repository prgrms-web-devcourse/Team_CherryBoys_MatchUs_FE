/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MatchListFilter, Locations, TagInfo, TeamSimple } from '@/types';
import { fetchAllMatch } from '@/api';

interface MatchState {
  data: {
    modal: {
      [matchApply: string]: boolean;
      matchApprove: boolean;
      matchReview: boolean;
      matchListFilter: boolean;
      matchTeamMember: boolean;
    };
    matchListFilter: MatchListFilter;
    locations: Locations;
    tags: TagInfo[];
    userTeams: TeamSimple[];
  };
}

export const getMatchList = createAsyncThunk(
  'match/getMatchList',
  async (filter: MatchListFilter) => {
    const response = await fetchAllMatch(filter);

    return response;
  }
);

export const match = createSlice({
  name: 'match',
  initialState: {
    data: {
      modal: {
        matchApply: false,
        matchApprove: false,
        matchReview: false,
        matchListFilter: false,
        matchTeamMember: false,
      },
      matchListFilter: {
        size: 30,
      },
      locations: {
        cities: [],
        regions: [],
        grounds: [],
      },
      tags: [],
      userTeams: [],
    },
  } as MatchState,
  reducers: {
    toggleModal: (state, { payload }: PayloadAction<{ modalName: string }>) => {
      state.data.modal[payload.modalName] = !state.data.modal[payload.modalName];
    },
    setMatchListFilter: (
      state,
      { payload }: PayloadAction<{ matchListFilter: MatchListFilter }>
    ) => {
      state.data.matchListFilter = payload.matchListFilter;
    },
    setLocations: (state, { payload }: PayloadAction<{ locations: Locations }>) => {
      state.data.locations = payload.locations;
    },
    setTags: (state, { payload }: PayloadAction<{ tagData: TagInfo[] }>) => {
      state.data.tags = payload.tagData;
    },
    setUserTeams: (state, { payload }: PayloadAction<{ userTeams: TeamSimple[] }>) => {
      state.data.userTeams = payload.userTeams;
    },
  },
  extraReducers: {},
});
