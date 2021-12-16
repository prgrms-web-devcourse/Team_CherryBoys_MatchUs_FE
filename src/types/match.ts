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
  };
  endTime: {
    hour: number;
    minute: number;
    second: number;
  };
  cost: number;
  ageGroup: string;
  teamId: number;
  teamLogo: string;
  teamName: string;
  teamMannerTemperature: number;
  sports: string;
}

export interface TeamUser {
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
  sports: string;
  detail: string;
  registerTeamInfo: {
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

export interface MatchDetail {
  data: Match;
}

export interface TeamSimple {
  teamId: number;
  teamName: string;
  teamUsers: TeamUser[];
}

export interface TeamWithUser {
  data: {
    teams: TeamSimple[];
  };
}

export interface WaitingTeam {
  teamWaitingId: number;
  teamId: number;
  teamLogo: string;
  teamName: string;
  teamMannerTemperature: number;
  teamUsers: TeamUser[];
}

export interface WaitingTeams {
  data: {
    waitingTeams: WaitingTeam[];
  };
}