export const matches = {
  data: {
    matches: [
      {
        matchId: 1,
        city: '서울특별시',
        region: '광진구',
        ground: '어린이대공원풋살장',
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
        ground: '어린이대공원풋살장',
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
  startTime: string;
  endTime: string;
  status: string;
  cost: number;
  ageGroup: string;
  sports: string;
  detail: string;
  registerTeamResponse: Team;
  applyTeamResponse?: Team;
}

export interface MatchDetail {
  data: Match;
}

export const matchDummy: MatchDetail = {
  data: {
    matchId: 1,
    city: '서울특별시',
    region: '광진구',
    ground: '어린이대공원풋살장',
    date: '2021-12-25',
    startTime: '10:30',
    endTime: '12:30',
    cost: 30000,
    ageGroup: '20s',
    sports: '풋살',
    detail: '어르신들환영',
    status: '매칭전',
    registerTeamResponse: {
      captainId: 1,
      captainName: '꺼북이',
      teamId: 1,
      teamLogo: 's3://aasdfasd',
      teamName: '데브코스',
      teamMannerTemperature: 36.1,
      matchMembers: [
        {
          userId: 1,
          userName: '쭝',
        },
        {
          userId: 2,
          userName: '시즈',
        },
        {
          userId: 3,
          userName: '싸뮤엘',
        },
        {
          userId: 4,
          userName: '용스톤',
        },
        {
          userId: 5,
          userName: '체리',
        },
        {
          userId: 6,
          userName: '호세',
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
    ground: '어린이대공원풋살장',
    date: '2021-12-25',
    startTime: '10:30',
    endTime: '12:30',
    cost: 30000,
    ageGroup: '20s',
    sports: '풋살',
    detail: '어르신들환영',
    status: '매칭전',
    registerTeamResponse: {
      captainId: 1,
      captainName: '꺼북이',
      teamId: 1,
      teamLogo: 's3://aasdfasd',
      teamName: '데브코스',
      teamMannerTemperature: 36.1,
      matchMembers: [
        {
          userId: 1,
          userName: '쭝',
        },
        {
          userId: 2,
          userName: '시즈',
        },
        {
          userId: 3,
          userName: '싸뮤엘',
        },
        {
          userId: 4,
          userName: '용스톤',
        },
        {
          userId: 5,
          userName: '체리',
        },
        {
          userId: 6,
          userName: '호세',
        },
      ],
    },
    applyTeamResponse: {
      captainId: 5,
      captainName: '꼬부기',
      teamId: 2,
      teamLogo: 's3://aassbb',
      teamName: '머쓱',
      teamMannerTemperature: 40.2,
      matchMembers: [
        {
          userId: 11,
          userName: '쫑쫑',
        },
        {
          userId: 12,
          userName: '즈시',
        },
        {
          userId: 13,
          userName: '엘쌰무',
        },
        {
          userId: 14,
          userName: '톤스용',
        },
        {
          userId: 15,
          userName: '리체',
        },
        {
          userId: 16,
          userName: '세호',
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
            userId: 1,
            userName: '쭝',
          },
          {
            userId: 2,
            userName: '호세',
          },
        ],
      },
      {
        teamId: 2,
        teamName: '머쓱',
        teamUsers: [
          {
            userId: 11,
            userName: '쭝쭝',
          },
          {
            userId: 12,
            userName: '세호',
          },
        ],
      },
      {
        teamId: 3,
        teamName: '포켓몬마스터',
        teamUsers: [
          {
            userId: 123,
            userName: '피카추',
          },
          {
            userId: 124,
            userName: '라이추',
          },
          {
            userId: 125,
            userName: '파이리',
          },
          {
            userId: 126,
            userName: '꼬부기',
          },
          {
            userId: 127,
            userName: '버터플',
          },
          {
            userId: 128,
            userName: '야도란',
          },
          {
            userId: 129,
            userName: '피존투',
          },
          {
            userId: 130,
            userName: '또가스',
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
            userId: 1,
            userName: '쭝',
          },
          {
            userId: 2,
            userName: '시즈',
          },
          {
            userId: 3,
            userName: '싸뮤엘',
          },
          {
            userId: 4,
            userName: '용스톤',
          },
          {
            userId: 5,
            userName: '체리',
          },
          {
            userId: 6,
            userName: '호세',
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
            userId: 10,
            userName: '쭝쭝',
          },
          {
            userId: 11,
            userName: '즈시',
          },
          {
            userId: 12,
            userName: '엘뮤싸',
          },
          {
            userId: 13,
            userName: '톤스용',
          },
          {
            userId: 14,
            userName: '리체',
          },
          {
            userId: 15,
            userName: '세호',
          },
        ],
      },
    ],
  },
};
