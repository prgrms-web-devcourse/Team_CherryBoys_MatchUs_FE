/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MatchListFilter, Locations, TagInfo } from '@/types';

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
  };
}

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
        size: 10,
      },
      locations: {
        cities: [],
        regions: [],
        grounds: [],
      },
      tags: [],
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
  },
  extraReducers: {},
});
