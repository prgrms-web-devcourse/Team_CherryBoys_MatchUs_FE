export const SPORTS_CATEGORY = [
  { id: 'FOOTBALL', name: '축구' },
  { id: 'FUTSAL', name: '풋살' },
];

export const AGE_GROUP = ['10', '20', '30', '40', '50', '60', '70'];

export const SPORTS = ['축구', '풋살'];

export interface SportsPlayers {
  [key: string]: number;
}

export const SPORTS_PLAYER: SportsPlayers = {
  축구: 11,
  풋살: 6,
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
