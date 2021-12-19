export const USER_REGEX = {
  USERNAME: /^[가-힣ㄱ-ㅎ]{2,8}$/,
  NICKNAME: /^[a-zA-Z0-9가-힣ㄱ-ㅎ]{2,8}$/,
  EMAIL: /^\S+@\S+\.(\S{2,})+/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/,
};

export const PASSWORD_MIN_LEN = 10;
export const PASSWORD_MAX_LEN = 16;
export const NICKNAME_MAX_LEN = 8;
export const NICKNAME_MIN_LEN = 2;
export const BIO_MAX_LEN = 30;

export const USER_VALIDATION_ERR_MSG = {
  INVALID_USERNAME: '이름은 2자 이상 8자이하의 한글만 가능합니다.',
  INVALID_NICKNAME_FORM: '닉네임에는 특수문자가 들어갈 수 없습니다.',
  INVALID_NICKNAME_LEN: `닉네임은 2자 이상 ${NICKNAME_MAX_LEN}자 이하여야 합니다.`,
  INVALID_EMAIL: '이메일 형식이 올바르지 않습니다.',
  INVALID_PASSWORD_FORM: '패스워드는 특수문자, 대문자, 소문자를 포함해야 합니다.',
  INVALID_PASSWORD_LEN: `패스워드는 ${PASSWORD_MIN_LEN}자 이상 ${PASSWORD_MAX_LEN}자 이하이어야 합니다.`,
  INVALID_CONFIRMED_PASSWORD: '패스워드가 일치하지 않습니다.',
  INVALID_GENDER: '성별을 선택해주세요.',
  INVALID_AGEGROUP: '연령대를 선택해주세요.',
  INVALID_SPORTS: '주종목을 선택해주세요.',
  DUPLICATE_EMIAL: '이미 존재하는 이메일입니다.',
  DUPLICATE_NICKNAME: '이미 존재하는 닉네임입니다.',
  INVALID_BIO_MSG: `자기소개는 ${BIO_MAX_LEN} 글자를 넘길 수 없습니다.`,
};

export const USER_VALIDATION_SUCCESS_MSG = {
  EMAIL_SUCCESS_MSG: '사용 가능한 이메일입니다.',
  NICKNAME_SUCCESS_MSG: '사용 가능한 닉네임입니다.',
};

export const validateUser: { [index: string]: (key: string, state?: string) => string } = {
  userName: (userName: string): string => {
    return !USER_REGEX.USERNAME.test(userName) ? USER_VALIDATION_ERR_MSG.INVALID_USERNAME : '';
  },
  nickname: (nickname: string): string => {
    const nicknameLength = nickname.length;

    if (nicknameLength > NICKNAME_MAX_LEN || nicknameLength < NICKNAME_MIN_LEN) {
      return USER_VALIDATION_ERR_MSG.INVALID_NICKNAME_LEN;
    }

    return !USER_REGEX.NICKNAME.test(nickname) ? USER_VALIDATION_ERR_MSG.INVALID_NICKNAME_FORM : '';
  },
  bio: (bio: string): string => {
    return bio.length > BIO_MAX_LEN ? USER_VALIDATION_ERR_MSG.INVALID_BIO_MSG : '';
  },
  email: (email: string): string => {
    return !USER_REGEX.EMAIL.test(email) ? USER_VALIDATION_ERR_MSG.INVALID_EMAIL : '';
  },
  password: (password: string): string => {
    const passwordLength = password.length;

    if (passwordLength < 10 || passwordLength > 16) {
      return USER_VALIDATION_ERR_MSG.INVALID_PASSWORD_LEN;
    }

    return !USER_REGEX.PASSWORD.test(password) ? USER_VALIDATION_ERR_MSG.INVALID_PASSWORD_FORM : '';
  },
  confirmedPassword: (confirmedPassword: string, password?: string): string => {
    return password !== confirmedPassword ? USER_VALIDATION_ERR_MSG.INVALID_CONFIRMED_PASSWORD : '';
  },
  gender: (gender: string): string => {
    return gender === '성별' ? USER_VALIDATION_ERR_MSG.INVALID_GENDER : '';
  },
  ageGroup: (age: string): string => {
    return age === '연령대' ? USER_VALIDATION_ERR_MSG.INVALID_AGEGROUP : '';
  },
  sports: (sports: string): string => {
    return sports === '주종목' ? USER_VALIDATION_ERR_MSG.INVALID_SPORTS : '';
  },
};
