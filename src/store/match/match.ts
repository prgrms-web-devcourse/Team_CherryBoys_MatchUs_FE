/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MatchListFilter } from '@/types';

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
  },
  extraReducers: {},
});
