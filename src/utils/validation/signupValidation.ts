export const SIGNUP_REGEX = {
  USERNAME: /^[가-힣ㄱ-ㅎ]{0,8}$/,
  NICKNAME: /^[a-zA-Z0-9가-힣ㄱ-ㅎ]{0,8}$/,
  EMAIL: /^\S+@\S+\.(\S{2,})+/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/,
};

export const PASSWORD_MIN_LEN = 10;
export const PASSWORD_MAX_LEN = 16;
export const NICKNAME_MAX_LEN = 8;

export const SIGNUP_VALIDATION_ERR_MSG = {
  INVALID_USERNAME: '이름은 8자이하의 한글만 가능합니다.',
  INVALID_NICKNAME_FORM: '닉네임에는 특수문자가 들어갈 수 없습니다.',
  INVALID_NICKNAME_LEN: `닉네임은 ${NICKNAME_MAX_LEN}자까지 만들 수 있습니다.`,
  INVALID_EMAIL: '이메일 형식이 올바르지 않습니다.',
  INVALID_PASSWORD_FORM: '패스워드는 특수문자, 대문자, 소문자를 포함해야 합니다.',
  INVALID_PASSWORD_LEN: `패스워드는 ${PASSWORD_MIN_LEN}자 이상 ${PASSWORD_MAX_LEN}자 이하이어야 합니다.`,
  INVALID_CONFIRMED_PASSWORD: '패스워드가 일치하지 않습니다.',
  INVALID_GENDER: '성별을 선택해주세요.',
  INVALID_AGE: '연령대를 선택해주세요.',
  INVALID_SPORTS: '주종목을 선택해주세요.',
  DUPLICATE_EMIAL: '이미 존재하는 이메일입니다.',
  DUPLICATE_NICKNAME: '이미 존재하는 닉네임입니다.',
};

export const SIGNUP_VALIDATION_SUCCESS_MSG = {
  EMAIL_SUCCESS_MSG: '사용 가능한 이메일입니다.',
  NICKNAME_SUCCESS_MSG: '사용 가능한 닉네임입니다.',
};

export const validateSignup: { [index: string]: (key: string, state?: string) => string } = {
  userName: (userName: string): string => {
    return !SIGNUP_REGEX.USERNAME.test(userName) ? SIGNUP_VALIDATION_ERR_MSG.INVALID_USERNAME : '';
  },
  nickname: (nickname: string): string => {
    const nicknameLength = nickname.length;

    if (nicknameLength > NICKNAME_MAX_LEN) {
      return SIGNUP_VALIDATION_ERR_MSG.INVALID_NICKNAME_LEN;
    }

    return !SIGNUP_REGEX.NICKNAME.test(nickname)
      ? SIGNUP_VALIDATION_ERR_MSG.INVALID_NICKNAME_FORM
      : '';
  },
  email: (email: string): string => {
    return !SIGNUP_REGEX.EMAIL.test(email) ? SIGNUP_VALIDATION_ERR_MSG.INVALID_EMAIL : '';
  },
  password: (password: string): string => {
    const passwordLength = password.length;

    if (passwordLength < 10 || passwordLength > 16) {
      return SIGNUP_VALIDATION_ERR_MSG.INVALID_PASSWORD_LEN;
    }

    return !SIGNUP_REGEX.PASSWORD.test(password)
      ? SIGNUP_VALIDATION_ERR_MSG.INVALID_PASSWORD_FORM
      : '';
  },
  confirmedPassword: (confirmedPassword: string, password?: string): string => {
    return password !== confirmedPassword
      ? SIGNUP_VALIDATION_ERR_MSG.INVALID_CONFIRMED_PASSWORD
      : '';
  },
  gender: (gender: string): string => {
    return gender === '성별' ? SIGNUP_VALIDATION_ERR_MSG.INVALID_GENDER : '';
  },
  age: (age: string): string => {
    return age === '연령대' ? SIGNUP_VALIDATION_ERR_MSG.INVALID_GENDER : '';
  },
  sports: (sports: string): string => {
    return sports === '주종목' ? SIGNUP_VALIDATION_ERR_MSG.INVALID_GENDER : '';
  },
};
