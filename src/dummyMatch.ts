export interface TeamUser {
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
}

export interface Match {
  matchId: number;
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
  sports: string;
  status: string;
}

export interface Matches {
  data: {
    matches: Omit<Match, 'homeTeam'>[];
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
        sports: '축구',
        status: '매칭전',
      },
      {
        matchId: 2,
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
        sports: '축구',
        status: '매칭전',
      },
    ],
  },
};

export const matchDummy: MatchDetail = {
  data: {
    matchId: 1,
    city: '서울특별시',
    region: '광진구',
    groundName: '어린이대공원풋살장',
    date: '2021-12-25',
    startTime: '10:30',
    endTime: '12:30',
    cost: 30000,
    ageGroup: '20s',
    sports: '풋살',
    detail: '어르신들환영',
    status: '매칭전',
    homeTeam: {
      teamId: 1,
      teamLogo: 's3://aasdfasd',
      teamName: '데브코스',
      teamMannerTemperature: 36.1,
      teamUsers: [
        {
          teamUserId: 1,
          teamUserName: '쭝',
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
  },
};

export const matchDummy2: MatchDetail = {
  data: {
    matchId: 2,
    city: '서울특별시',
    region: '광진구',
    groundName: '어린이대공원풋살장',
    date: '2021-12-25',
    startTime: '10:30',
    endTime: '12:30',
    cost: 30000,
    ageGroup: '20s',
    sports: '풋살',
    detail: '어르신들환영',
    status: '매칭전',
    homeTeam: {
      teamId: 1,
      teamLogo: 's3://aasdfasd',
      teamName: '데브코스',
      teamMannerTemperature: 36.1,
      teamUsers: [
        {
          teamUserId: 1,
          teamUserName: '쭝',
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
          teamUserId: 11,
          teamUserName: '쫑쫑',
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

export const userTeamDummy: TeamWithUser = {
  data: {
    teams: [
      {
        teamId: 1,
        teamName: '데브코스',
        teamUsers: [
          {
            teamUserId: 1,
            teamUserName: '쭝',
          },
          {
            teamUserId: 2,
            teamUserName: '호세',
          },
        ],
      },
      {
        teamId: 2,
        teamName: '머쓱',
        teamUsers: [
          {
            teamUserId: 11,
            teamUserName: '쭝쭝',
          },
          {
            teamUserId: 12,
            teamUserName: '세호',
          },
        ],
      },
      {
        teamId: 3,
        teamName: '포켓몬마스터',
        teamUsers: [
          {
            teamUserId: 123,
            teamUserName: '피카추',
          },
          {
            teamUserId: 124,
            teamUserName: '라이추',
          },
          {
            teamUserId: 125,
            teamUserName: '파이리',
          },
          {
            teamUserId: 126,
            teamUserName: '꼬부기',
          },
          {
            teamUserId: 127,
            teamUserName: '버터플',
          },
          {
            teamUserId: 128,
            teamUserName: '야도란',
          },
          {
            teamUserId: 129,
            teamUserName: '피존투',
          },
          {
            teamUserId: 130,
            teamUserName: '또가스',
          },
        ],
      },
    ],
  },
};

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

export const WaitingTeamsDummy: WaitingTeams = {
  data: {
    waitingTeams: [
      {
        teamWaitingId: 3,
        teamId: 1,
        teamLogo: 's3://aasdfasd',
        teamName: 'DEVCOURSE',
        teamMannerTemperature: 36.1,
        teamUsers: [
          {
            teamUserId: 1,
            teamUserName: '쭝',
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
      {
        teamWaitingId: 1,
        teamId: 2,
        teamLogo: 's3://aabbccdd',
        teamName: 'MUSSG',
        teamMannerTemperature: 34.4,
        teamUsers: [
          {
            teamUserId: 10,
            teamUserName: '쭝쭝',
          },
          {
            teamUserId: 11,
            teamUserName: '즈시',
          },
          {
            teamUserId: 12,
            teamUserName: '엘뮤싸',
          },
          {
            teamUserId: 13,
            teamUserName: '톤스용',
          },
          {
            teamUserId: 14,
            teamUserName: '리체',
          },
          {
            teamUserId: 15,
            teamUserName: '세호',
          },
        ],
      },
    ],
  },
};

export interface User {
  name: string;
  nickName: string;
  bio: string;
  sportsName: string;
  gender: string;
  ageGroup: string;
  tagNames: string[];
  matchCount: number;
  mannerTemperature: number;
  myTeams: { teamId: number; TeamName: string; TeamLogo: string }[];
  matchsSummary: {
    matchId: number;
    matchDate: string;
    registerTeamName: string;
    registerTeamLogo: string;
    applyTeamName: string;
    applyTeamLogo: string;
  }[];
}

export interface UserData {
  data: User;
}

export const userDummy: UserData = {
  data: {
    name: '김홍중',
    nickName: '쯍',
    bio: '안녕~ 난 쯍이라고해',
    sportsName: 'FOOTBALL',
    gender: 'MALE',
    ageGroup: 'FORTIES',
    tagNames: ['시간을 잘지켜요', '잘해요', '발이빨라요'],
    matchCount: 20,
    mannerTemperature: 36.5,
    myTeams: [
      { teamId: 1, TeamName: 't1', TeamLogo: 'http://matchus.com/img/joLogo.img' },
      { teamId: 2, TeamName: 't2', TeamLogo: 'http://matchus.com/img/joLogo.img' },
    ],
    matchsSummary: [
      {
        matchId: 1,
        matchDate: '2021-12-01',
        registerTeamName: 't1',
        registerTeamLogo: 'http://matchus.com/img/joLogo.img',
        applyTeamName: 't2',
        applyTeamLogo: 'http://matchus.com/img/joLogo.img',
      },
      {
        matchId: 2,
        matchDate: '2021-12-03',
        registerTeamName: 't3',
        registerTeamLogo: 'http://matchus.com/img/joLogo.img',
        applyTeamName: 't5',
        applyTeamLogo: 'http://matchus.com/img/joLogo.img',
      },
    ],
  },
};

export const userDummy2: UserData = {
  data: {
    name: '고길동',
    nickName: '소드마스터',
    bio: '이 서늘하고 묵직한 감각',
    sportsName: 'FOOTBALL',
    gender: 'MALE',
    ageGroup: 'FORTIES',
    tagNames: ['시간을 잘지켜요', '잘해요', '발이빨라요'],
    matchCount: 100,
    mannerTemperature: 16.5,
    myTeams: [],
    matchsSummary: [
      {
        matchId: 10,
        matchDate: '2021-12-01',
        registerTeamName: 't1',
        registerTeamLogo: 'http://matchus.com/img/joLogo.img',
        applyTeamName: 't2',
        applyTeamLogo: 'http://matchus.com/img/joLogo.img',
      },
      {
        matchId: 20,
        matchDate: '2021-12-03',
        registerTeamName: 't3',
        registerTeamLogo: 'http://matchus.com/img/joLogo.img',
        applyTeamName: 't5',
        applyTeamLogo: 'http://matchus.com/img/joLogo.img',
      },
    ],
  },
};
