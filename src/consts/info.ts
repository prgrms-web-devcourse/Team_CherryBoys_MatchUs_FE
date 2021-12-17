export const SPORTS_CATEGORY = [
  { id: 'FOOTBALL', name: '축구' },
  { id: 'FUTSAL', name: '풋살' },
];

export const AGE_GROUP = ['10대', '20대', '30대', '40대', '50대', '60대'];

export const SPORTS = ['축구', '풋살'];

export interface SportsPlayers {
  [key: string]: number;
}

export const SPORTS_PLAYER: SportsPlayers = {
  축구: 1,
  풋살: 1,
};

export interface CheckboxOptions {
  [key: string]: boolean;
}

export interface TagOptions {
  [skill: string]: CheckboxOptions;
  good: CheckboxOptions;
  bad: CheckboxOptions;
}

export const TAG_OPTIONS: TagOptions = {
  skill: {
    '발이 빨라요': false,
    '두 개의 심장': false,
    패스마스터: false,
    '개인기가 화려해요': false,
  },
  good: { '매너가 좋아요': false, '뒤끝이 없어요': false, '시간약속을 잘 지켜요': false },
  bad: { 거칠어요: false, 히드라: false, 폭력적이에요: false, 지각쟁이: false },
};

interface Location {
  [key: string]: string[];
}

export const CITIES: Location = {
  서울특별시: ['강남구', '송파구', '금천구', '광진구'],
  경기도: ['남양주', '용인', '수원'],
  인천: ['남동구', '부평구'],
};

export const REGIONS: Location = {
  강남구: ['A체육관', 'B체육관', 'C체육관'],
  송파구: ['제 1 체육관', '제 2 체육관', '제 3 체육관'],
  금천구: ['갑 스타디움', '을 스타디움', '병 스타디움', '정 스타디움'],
  광진구: ['어린이대공원풋살장', '대공원 잔디구장', '그린볼 파크'],
  남양주: ['Ground F', 'Ground C'],
  용인: ['제일구장', '제이구장', '제삼구장'],
  수원: ['가필드', '나필드', '다필드'],
  남동구: ['A파크', 'B파크', 'C파크'],
  부평구: ['제 1 운동장', '제 2 운동장', '제 3 운동장'],
};

interface StringKey {
  [key: string]: number | string;
}

export const INPUT_DICITIONARY: StringKey = {
  sports: '종목',
  ageGroup: '연령대',
  city: '행정구역',
  region: '시/군/구',
  ground: '구장',
  cost: '참가비',
  detail: '상세정보',
};

// TODO: 백엔드가 보내준 확정 지역 정보. 위의 더미들은 점진적으로 삭제

export const LOCATIONS = {
  cities: [
    {
      cityId: 1,
      cityName: '서울특별시',
    },
    {
      cityId: 2,
      cityName: '경기도',
    },
  ],
  regions: [
    {
      cityId: 1,
      regionId: 1,
      regionName: '강남구',
    },
    {
      cityId: 1,
      regionId: 2,
      regionName: '영등포구',
    },
    {
      cityId: 2,
      regionId: 3,
      regionName: '남양주시',
    },
    {
      cityId: 2,
      regionId: 4,
      regionName: '성남시',
    },
  ],
  grounds: [
    {
      regionId: 1,
      groundId: 1,
      groundName: '대륭축구장',
    },
    {
      regionId: 1,
      groundId: 2,
      groundName: '대륭풋살장',
    },
    {
      regionId: 1,
      groundId: 3,
      groundName: '머쓱축구장',
    },
    {
      regionId: 1,
      groundId: 4,
      groundName: '머쓱풋살장',
    },
    {
      regionId: 2,
      groundId: 5,
      groundName: '쭝축구장',
    },
    {
      regionId: 2,
      groundId: 6,
      groundName: '쭝풋살장',
    },
    {
      regionId: 2,
      groundId: 7,
      groundName: '시즈축구장',
    },
    {
      regionId: 2,
      groundId: 8,
      groundName: '시즈풋살장',
    },
    {
      regionId: 3,
      groundId: 9,
      groundName: '체리축구장',
    },
    {
      regionId: 3,
      groundId: 10,
      groundName: '체리풋살장',
    },
    {
      regionId: 3,
      groundId: 11,
      groundName: '용스톤축구장',
    },
    {
      regionId: 3,
      groundId: 12,
      groundName: '용스톤풋살장',
    },
    {
      regionId: 4,
      groundId: 13,
      groundName: '호세축구장',
    },
    {
      regionId: 4,
      groundId: 14,
      groundName: '호세풋살장',
    },
    {
      regionId: 4,
      groundId: 15,
      groundName: '쌈축구장',
    },
    {
      regionId: 4,
      groundId: 16,
      groundName: '쌈풋살장',
    },
  ],
};
