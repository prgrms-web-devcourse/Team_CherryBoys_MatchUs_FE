export const SPORTS_CATEGORY = [
  { id: 'FOOTBALL', name: '축구' },
  { id: 'FUTSAL', name: '풋살' },
];

export const AGE_GROUP = ['20', '30', '40', '50', '60', '70'];

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
