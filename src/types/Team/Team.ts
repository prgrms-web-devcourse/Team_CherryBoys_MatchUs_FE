export interface MemberElement {
  userId: number;
  userName: string;
  grade: string;
}

export interface MatchElement {
  matchId: number;
  matchDate: string;
  registerTeamId?: number;
  registerTeamName: string;
  registerTeamLogo: string;
  applyTeamId?: number;
  applyTeamName: string;
  applyTeamLogo: string;
  status: string;
}

export interface MemberElementType {
  userId: number;
  userName: string;
  grade: string;
}

export type TagType = {
  tagId: number;
  tagName: string;
  tagType: string;
};

export interface TeamInfo {
  ageGroup: string;
  bio: string;
  captainId: number;
  logo: string;
  captainName: string;
  mannerTemperature: number;
  matchCount: number;
  sportsName: string;
  tags: TagType[];
  teamCreatedAt: string;
  teamId: number;
  teamName: string;
}
