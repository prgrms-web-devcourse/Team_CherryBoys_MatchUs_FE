// 팀 이름 REGEX
export const TEAM_REGEX = {
  IS_VALID_NAME: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/,
  HAS_SPACE_BAR: /\s/g,
  MIN_LEN: 1,
  MAX_LEN: 10,
  BIO_MAX_LEN: 200,
};

export const TEAM_VALID_ERROR_MSG = {
  IS_VALID_NAME: '팀 명은 한글, 영어, 숫자만 가능합니다',
  IS_VALID_LEN: '팀 명은 1자 이상 10자 이하로 작성해주세요.',
  HAS_SPACE: '팀 명에는 공백이 들어갈 수 없습니다.',
  IS_VALID_BIO_LEN: '세부 설명은 200자 이하로 작성해야합니다.',
  IS_TEAM_SPORT: '팀 종목을 선택해 주세요.',
  IS_TEAM_AGE_GROUP: '팀 연령대를 선택해 주세요.',
  HAS_TEAM_LOGO_IMAGE: '사진을 첨부해 주세요',
};

export const validateTeamName = (teamName: string) => TEAM_REGEX.IS_VALID_NAME.test(teamName);

export const validateTeamNameHasSpace = (teamName: string) =>
  TEAM_REGEX.HAS_SPACE_BAR.test(teamName);

export const validateTeamNameLength = (teamName: string) =>
  TEAM_REGEX.MIN_LEN <= teamName.length && teamName.length <= TEAM_REGEX.MAX_LEN;

export const validateTeamBioLength = (teamBio: string) => teamBio.length < TEAM_REGEX.BIO_MAX_LEN;
