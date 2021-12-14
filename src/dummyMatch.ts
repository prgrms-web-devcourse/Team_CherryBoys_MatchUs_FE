export const matchListDummy = {
  data: {
    matchList: [
      {
        matchId: 1,
        city: '서울특별시',
        region: '광진구',
        ground: '어린이대공원풋살장',
        date: '2021-12-25',
        startTime: {
          hour: 10,
          minute: 30,
          second: 0,
        },
        endTime: {
          hour: 12,
          minute: 30,
          second: 0,
        },
        cost: 30000,
        ageGroup: 'TEENAGER',
        teamId: 125,
        teamLogo: 's3://aasdfasd',
        teamName: '데브코스',
        teamMannerTemperature: 36.1,
        sports: '축구',
      },
      {
        matchId: 2,
        city: '서울특별시',
        region: '광진구',
        ground: '어린이대공원풋살장',
        date: '2021-12-25',
        startTime: {
          hour: 18,
          minute: 30,
          second: 0,
        },
        endTime: {
          hour: 20,
          minute: 30,
          second: 0,
        },
        cost: 30000,
        ageGroup: 'TWEINTIES',
        teamId: 225,
        teamLogo: 's3://aasdfasd',
        teamName: '데브코스',
        teamMannerTemperature: 56.1,
        sports: '축구',
      },
    ],
  },
};


export const matchDummy = {
  data: {
    matchId: 1,
    city: '서울특별시',
    region: '광진구',
    ground: '어린이대공원풋살장',
    date: '2021-12-25',
    startTime: {
      hour: 18,
      minute: 30,
      second: 0,
      nano:0
    },
    endTime: {
      hour: 20,
      minute: 30,
      second: 0,
      nano:0
    },
    cost: 30000,
    ageGroup: 'TEENAGER',
    sports: '풋살',
    detail: '어르신들환영',
    status: 'WAITING',
    registerTeamInfo: {
      captainId: 1,
      captainName: '꺼북이',
      teamId: 1,
      teamLogo: 's3://aasdfasd',
      teamName: '데브코스',
      mannerTemperature: 36.1,
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

export const matchDummy2 = {
  data: {
    matchId: 2,
    city: '서울특별시',
    region: '광진구',
    ground: '어린이대공원풋살장',
    date: '2021-12-25',
    startTime: {
      hour: 18,
      minute: 30,
      second: 0,
      nano:0
    },
    endTime: {
      hour: 20,
      minute: 30,
      second: 0,
      nano:0
    },
    cost: 30000,
    ageGroup: 'TEENAGER',
    sports: '풋살',
    detail: '어르신들환영',
    status: '매칭전',
    registerTeamInfo: {
      captainId: 1,
      captainName: '꺼북이',
      teamId: 1,
      teamLogo: 's3://aasdfasd',
      teamName: '데브코스',
      mannerTemperature: 36.1,
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
    applyTeamInfo: {
      captainId: 5,
      captainName: '꼬부기',
      teamId: 2,
      teamLogo: 's3://aassbb',
      teamName: '머쓱',
      mannerTemperature: 40.2,
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


export const userTeamDummy = {
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
            userName: '쭝쭝1',
          },
          {
            userId: 12,
            userName: '세호1',
          },
          {
            userId: 21,
            userName: '쭝쭝2',
          },
          {
            userId: 22,
            userName: '세호2',
          },
          {
            userId: 31,
            userName: '쭝쭝3',
          },
          {
            userId: 32,
            userName: '세호3',
          },
          {
            userId: 41,
            userName: '쭝쭝4',
          },
          {
            userId: 42,
            userName: '세호4',
          },
          {
            userId: 51,
            userName: '쭝쭝5',
          },
          {
            userId: 52,
            userName: '세호5',
          },
          {
            userId: 61,
            userName: '쭝쭝6',
          },
          {
            userId: 62,
            userName: '세호6',
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


export const WaitingTeamsDummy = {
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
