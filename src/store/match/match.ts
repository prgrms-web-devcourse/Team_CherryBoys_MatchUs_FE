import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Match, matchListDummy, matchDummy, matchDummy2,
  TeamWithUser,
  userTeamDummy,
  TeamSimple,
  WaitingTeam,
  WaitingTeams,
  WaitingTeamsDummy,
} from '@/dummyMatch';

// Todo: API 완성시 추가
export const fetchAllMatch = createAsyncThunk('matches/fetchAllMatches', async () => {
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

export const fetchTeamWithUser = createAsyncThunk(
  'match/fetchTeamWithUser',
  async (token: number) => {
    return userTeamDummy;
  }
);

export const fetchWaitingTeams = createAsyncThunk(
  'match/fetchWaitingTeams',
  async (matchId: number) => {
    return WaitingTeamsDummy;
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

interface MatchState {
  data: {
    matchList: Match[];
    match: Match[];
    userTeams: TeamSimple[];
    waitingTeams: WaitingTeam[];
    modal: {
      [matchApply: string]: boolean;
      matchApprove: boolean;
      matchReview: boolean;
    };
    matchId: number;
  };
}

export const match = createSlice({
  name: 'match',
  initialState: {
    data: {
      matchList: [],
      match: [],
      userTeams: [],
      waitingTeams: [],
      modal: {
        matchApply: false,
        matchApprove: false,
        matchReview: false,
      },
      matchId: -1,
    },
  } as MatchState,
  reducers: {
    toggleModal: (state, { payload }: PayloadAction<{ modalName: string }>) => {
      state.data.modal[payload.modalName] = !state.data.modal[payload.modalName];
    },
    setMatchId: (state, { payload }: PayloadAction<{ matchId: number }>) => {
      state.data.matchId = payload.matchId;
    },
  },
  extraReducers: {
    [fetchAllMatch.pending.type]: (state: MatchState) => {
      state.data.matchList = [];
    },
    [fetchAllMatch.fulfilled.type]: (state: MatchState, action: PayloadAction<MatchState>) => {
      state.data.matchList.push(...action.payload.data.matchList);
    },
    [fetchMatchById.fulfilled.type]: (state: MatchState, action: PayloadAction<Match>) => {
      state.data.match = [];
      state.data.match.push(action.payload);
    },
    [deleteMatchById.fulfilled.type]: (state: MatchState) => {
      state.data.match = [];
    },
    [fetchTeamWithUser.fulfilled.type]: (
      state: MatchState,
      action: PayloadAction<TeamWithUser>
    ) => {
      state.data.userTeams = [];
      state.data.userTeams.push(...action.payload.data.teams);
    },
    [fetchWaitingTeams.fulfilled.type]: (
      state: MatchState,
      action: PayloadAction<WaitingTeams>
    ) => {
      state.data.waitingTeams = [];
      state.data.waitingTeams.push(...action.payload.data.waitingTeams);
    },
  },
});
