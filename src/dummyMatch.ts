interface TeamUser {
  captainId?: number;
  captainName?: string;
  teamUserId?: number;
  teamUserName?: string;
}
export interface Team {
  teamId: number;
  teamLogo: string;
  teamName: string;
  teamMannerTemperature: number;
  teamUsers: TeamUser[];

  // tagNames: string[];
  // captainId: number;
  // captainName: string;
  // ageGroup: string;
}

export interface Match {
  matchId: number;
  position: string;
  city: string;
  region: string;
  groundName: string;
  date: string;
  startTime: string;
  endTime: string;
  cost: number;
  ageGroup: string;
  detail?: string;
  homeTeam: Team;
  awayTeam?: Team;
  teamId?: number;
  teamLogo?: string;
  teamName?: string;
  teamMannerTemperature?: number;
  teamUsers?: TeamUser[];
  // sports: string;
  // status: string;
  // isCancelled: boolean;
  // created_date: string;
  // modified_date: string;
}

export interface Matches {
  data: {
    matches: Omit<Match, 'homeTeam'>[];
  };
}

export interface MatchTypes {
  data: {
    matches: Omit<Match, 'homeTeam'>[];
    match: Match[];
  };
}

export interface MatchDetail {
  data: Match;
}

export const matches: Matches = {
  data: {
    matches: [
      {
        matchId: 1,
        position: '윙백',
        city: '서울특별시',
        region: '광진구',
        groundName: '어린이대공원풋살장',
        date: '2021-12-25',
        startTime: '10:30',
        endTime: '12:30',
        cost: 30000,
        ageGroup: '20s',
        teamLogo: 's3://aasdfasd',
        teamName: '데브코스',
        teamMannerTemperature: 36.1,
      },
      {
        matchId: 1,
        position: '윙백',
        city: '서울특별시',
        region: '광진구',
        groundName: '어린이대공원풋살장',
        date: '2021-12-25',
        startTime: '10:30',
        endTime: '12:30',
        cost: 30000,
        ageGroup: '20s',
        teamLogo: 's3://aasdfasd',
        teamName: '데브코스',
        teamMannerTemperature: 36.1,
      },
    ],
  },
};

export const match: MatchDetail = {
  data: {
    matchId: 1,
    position: '윙백',
    city: '서울특별시',
    region: '광진구',
    groundName: '어린이대공원풋살장',
    date: '2021-12-25',
    startTime: '10:30',
    endTime: '12:30',
    cost: 30000,
    ageGroup: '20s',
    detail: '어르신들환영',
    homeTeam: {
      teamId: 1,
      teamLogo: 's3://aasdfasd',
      teamName: '데브코스',
      teamMannerTemperature: 36.1,
      teamUsers: [
        {
          captainId: 1,
          captainName: '쭝',
        },
        {
          teamUserId: 2,
          teamUserName: '시즈',
        },
        {
          teamUserId: 3,
          teamUserName: '싸뮤엘',
        },
        {
          teamUserId: 4,
          teamUserName: '용스톤',
        },
        {
          teamUserId: 5,
          teamUserName: '체리',
        },
        {
          teamUserId: 6,
          teamUserName: '호세',
        },
      ],
    },
    awayTeam: {
      teamId: 2,
      teamLogo: 's3://aassbb',
      teamName: '머쓱',
      teamMannerTemperature: 40.2,
      teamUsers: [
        {
          captainId: 11,
          captainName: '쫑쫑',
        },
        {
          teamUserId: 12,
          teamUserName: '즈시',
        },
        {
          teamUserId: 13,
          teamUserName: '엘쌰무',
        },
        {
          teamUserId: 14,
          teamUserName: '톤스용',
        },
        {
          teamUserId: 15,
          teamUserName: '리체',
        },
        {
          teamUserId: 16,
          teamUserName: '세호',
        },
      ],
    },
  },
};
