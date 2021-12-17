export interface MemberElement {
  userId: number;
  userName: string;
  grade: string;
}

export interface MatchElement {
  matchId: number;
  matchDate: string;
  registerTeamName: string;
  registerTeamLogo: string;
  applyTeamName: string;
  applyTeamLogo: string;
  status: string;
}

export interface MemberElementType {
  userId: number;
  userName: string;
  grade: string;
}

export interface TeamInfo {
  ageGroup: string;
  bio: string;
  captainId: number;
  captainName: string;
  mannerTemperature: number;
  matchCount: number;
  sportsName: string;
  tagNames: string[];
  teamCreatedAt: string;
  teamId: number;
  teamName: string;
}
