export interface MatchCard {
  matchId: number;
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
  endTime: {
    hour: number;
    minute: number;
    second: number;
    nano?: number;
  };
  cost: number;
  ageGroup: string;
  teamId: number;
  teamLogo: string;
  teamName: string;
  mannerTemperature: number;
  sports: string;
}

export interface TeamUser {
  userId: number;
  userName: string;
}

export interface Team {
  captainId?: number;
  captainNickname?: string;
  teamId: number;
  teamLogo: string;
  teamName: string;
  teamMannerTemperature: number;
  matchMembers?: TeamUser[];
  teamUsers?: TeamUser[];
}

export interface Match {
  matchId: number;
  city: string;
  region: string;
  ground: string;
  date: string;
  startTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  endTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  status: string;
  cost: number;
  ageGroup: string;
  sportName: string;
  detail: string;
  registerTeamInfo: {
    captainId: number;
    captainNickname: string;
    teamId: number;
    teamLogo: string;
    teamName: string;
    mannerTemperature: number;
    matchMembers: TeamUser[];
  };
  applyTeamInfo?: {
    captainId: number;
    captainNickname: string;
    teamId: number;
    teamLogo: string;
    teamName: string;
    mannerTemperature: number;
    matchMembers: TeamUser[];
  };
}

export interface MatchDetail {
  data: Match;
}

export interface TeamSimple {
  teamId: number;
  teamName: string;
}

export interface TeamWithUser {
  data: {
    teams: TeamSimple[];
  };
}

export interface MatchTeamInfo {
  ageGroup: string;
  bio: string;
  captainId: number;
  logo: string;
  captainNickname: string;
  mannerTemperature: number;
  matchCount: number;
  sportsName: string;
  tags: {
    tagId: number;
    tagName: string;
    tagType: string;
  }[];
  teamCreatedAt: string;
  teamId: number;
  teamName: string;
}

export interface WaitingTeam {
  teamInfo: {
    captainId: number;
    captainNickname: string;
    mannerTemperature: number;
    matchMembers: TeamUser[];
    teamId: number;
    teamLogo: string;
    teamName: string;
  };
  teamWaitingId: number;
}

export interface WaitingTeams {
  data: {
    waitingTeams: WaitingTeam[];
  };
}

export interface MatchListFilter {
  ageGroup?: string;
  cityId?: number;
  date?: string;
  groundId?: number;
  lastId?: number;
  regionId?: number;
  size: number;
  sports?: string;
}

export interface Locations {
  [key: string]: {
    cityId?: number;
    cityName?: string;
    regionId?: number;
    regionName?: string;
    groundId?: number;
    groundName?: string;
  }[];
}

export interface MatchPostNew {
  registerTeamId: number;
  sports: string;
  ageGroup: string;
  city: number;
  region: number;
  ground: number;
  cost: number;
  detail: string;
  date: string;
  startTime: string;
  endTime: string;
  players: number[];
}

export interface MatchPostEdit {
  matchId: number;
  sports: string;
  ageGroup: string;
  city: number;
  region: number;
  ground: number;
  cost: number;
  detail: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface TeamMemberEdit {
  matchId: number;
  teamId: number;
  players: number[];
}

export interface TeamMemberInfo {
  grade: string;
  userId: number;
  userName: string;
}

export interface MatchReviewInfo {
  matchId?: number;
  tags: number[];
  reviewerTeamId: number;
  reviewerTeamType: string;
  reviewedTeamId: number;
}

export interface MatchDeleteInfo {
  token: string;
  matchId: number;
}

export interface MatchApplyInfo {
  matchId: number;
  players: number[];
  teamId: number;
}

export interface TagInfo {
  tagId: number;
  tagName: string;
  tagType: string;
}
export interface CheckboxOptions {
  [key: string]: boolean;
}

export interface TagCheckList {
  [GOOD: string]: CheckboxOptions;
  BAD: CheckboxOptions;
  NONE: CheckboxOptions;
}
