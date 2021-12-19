export interface loginFormType {
  email: string;
  password: string;
}

export interface signupFormType {
  userName: string;
  nickname: string;
  email: string;
  password: string;
  confirmedPassword: string;
  gender: string;
  ageGroup: string;
  sports: string;
  [key: string]: string;
}

export interface requestSignupFormType {
  name: string;
  nickname: string;
  email: string;
  password: string;
  confirmedPassword: string;
  gender: string;
  ageGroup: string;
  sports: string;
}

export interface isValidFormType {
  userName: boolean;
  nickname: boolean;
  email: boolean;
  password: boolean;
  confirmedPassword: boolean;
  gender: boolean;
  ageGroup: boolean;
  sports: boolean;
  [key: string]: boolean;
}

export type validMsgType = signupFormType;

export interface userGradeType {
  teamId: number;
  grade: 'CAPTAIN' | 'SUBCAPTAIN' | 'GENERAL';
}

export interface userType {
  isLogged: boolean;
  accessToken: string | null;
  expireTime: number | null;
  userInfo: {
    ageGroup: string;
    bio: string;
    gender: string;
    id: null | number;
    name: string;
    nickname: string;
    roleGroup: string;
    sports: string;
    userGradeResponse: [] | userGradeType[];
  };
}

export interface userInfoValueType {
  value: string;
  isValid: boolean;
  validMsg: string;
}

export interface duplicatedType extends userInfoValueType {
  isDuplicated: boolean;
}

export interface userInfoType {
  nickname: duplicatedType;
  bio: userInfoValueType;
  ageGroup: userInfoValueType;
  sports: userInfoValueType;
}

export interface reqeustUserInfoType {
  nickname: string;
  bio: string;
  ageGroup: string;
  sportName: string;
}
