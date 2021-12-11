/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
// import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import ValidInput from './ValidInput';
import { SIGNUP_VALIDATION_SUCCESS_MSG, validateSignup } from '@/utils/validation/signupValidation';
import { SIGNUP_VALIDATION_ERR_MSG } from '../../utils/validation/signupValidation';

export interface signupFormType {
  userName: string;
  nickname: string;
  email: string;
  password: string;
  confirmedPassword: string;
  gender: string;
  age: string;
  sports: string;
  [key: string]: string;
}

export interface isValidFormType {
  userName: boolean;
  nickname: boolean;
  email: boolean;
  password: boolean;
  confirmedPassword: boolean;
  gender: boolean;
  age: boolean;
  sports: boolean;
  [key: string]: boolean;
}

export interface validMsgType {
  userName: string;
  nickname: string;
  email: string;
  password: string;
  confirmedPassword: string;
  gender: string;
  age: string;
  sports: string;
  [key: string]: string;
}

const Signup = () => {
  const GENDER = ['성별', '남자', '여자'];
  const AGE = [
    '연령대',
    '10s',
    '20s',
    '30s',
    '40s',
    '50s',
    '60s',
    '70s',
    '80s',
    '90s',
    '100s',
    '110s',
  ];
  const SPORTS = ['주종목', 'SOCCER', 'FUTSAL'];

  const [signupForm, setSignupForm] = useState<signupFormType>({
    userName: '',
    nickname: '',
    email: '',
    password: '',
    confirmedPassword: '',
    gender: '',
    age: '',
    sports: '',
  });

  const [isValidForm, setIsValidForm] = useState<isValidFormType>({
    userName: false,
    nickname: false,
    email: false,
    password: false,
    confirmedPassword: false,
    gender: false,
    age: false,
    sports: false,
  });

  const [validMsg, setValidMsg] = useState<validMsgType>({
    userName: '',
    nickname: '',
    email: '',
    password: '',
    confirmedPassword: '',
    gender: '',
    age: '',
    sports: '',
  });

  const { userName, nickname, email, password, confirmedPassword, gender, age, sports } =
    signupForm;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const errMsg =
      name !== 'confirmedPassword'
        ? validateSignup[name](value)
        : validateSignup[name](value, password);

    setValidMsg({
      ...validMsg,
      [name]: errMsg,
    });

    setIsValidForm({
      ...isValidForm,
      [name]: !errMsg,
    });

    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  const signup = () => {
    // TODO: API 연동해서 사용하기
    console.log(signupForm, isValidForm);
  };

  const checkDuplicatedNickname = () => {
    // TODO: 닉네임 중복확인 API 호출
    const isDuplicated = true;
    const msg = isDuplicated
      ? SIGNUP_VALIDATION_SUCCESS_MSG.NICKNAME_SUCCESS_MSG
      : SIGNUP_VALIDATION_ERR_MSG.DUPLICATE_NICKNAME;

    setValidMsg({
      ...validMsg,
      nickname: msg,
    });

    setIsValidForm({
      ...isValidForm,
      nickname: isDuplicated,
    });
  };

  const checkDuplicatedEmail = () => {
    // TODO: 이메일 중복확인 API 호출
    const isDuplicated = true;
    const msg = isDuplicated
      ? SIGNUP_VALIDATION_SUCCESS_MSG.EMAIL_SUCCESS_MSG
      : SIGNUP_VALIDATION_ERR_MSG.DUPLICATE_EMIAL;

    setValidMsg({
      ...validMsg,
      email: msg,
    });

    setIsValidForm({
      ...isValidForm,
      email: isDuplicated,
    });
  };

  const IsSignupValid = () => {
    return !Object.values(isValidForm).includes(false);
  };

  const changeUnvalidateMsg = () => {
    const newValidMsgState: validMsgType = { ...validMsg };

    Object.keys(isValidForm).forEach((key) => {
      newValidMsgState[key] = !isValidForm[key]
        ? '필수로 입력해야 하는 항목입니다.'
        : validMsg[key];
    });

    setValidMsg(newValidMsgState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!IsSignupValid()) {
      changeUnvalidateMsg();
      return;
    }

    signup();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>사용자명</label>
      <div>
        <ValidInput
          name="userName"
          onChange={onChange}
          value={userName}
          type="input"
          validMsg={validMsg.userName}
        />
      </div>

      <label>닉네임</label>
      <div>
        <ValidInput
          name="nickname"
          onChange={onChange}
          value={nickname}
          type="input"
          validMsg={validMsg.nickname}
        />
        <button type="button" onClick={checkDuplicatedNickname}>
          중복확인
        </button>
      </div>
      <label>이메일</label>
      <div>
        <ValidInput
          name="email"
          onChange={onChange}
          value={email}
          type="input"
          validMsg={validMsg.email}
        />
        <button type="button" onClick={checkDuplicatedEmail}>
          중복확인
        </button>
      </div>
      <label>비밀번호</label>
      <div>
        <ValidInput
          name="password"
          onChange={onChange}
          value={password}
          type="input"
          validMsg={validMsg.password}
        />
      </div>
      <label>비밀번호 확인</label>
      <div>
        <ValidInput
          name="confirmedPassword"
          onChange={onChange}
          value={confirmedPassword}
          type="input"
          validMsg={validMsg.confirmedPassword}
        />
      </div>
      <label>성별</label>
      <div>
        <ValidInput
          name="gender"
          onChange={onChange}
          value={gender}
          type="select"
          validMsg={validMsg.gender}
          selectOptions={GENDER}
        />
      </div>
      <label>연령대</label>
      <div>
        <ValidInput
          name="age"
          onChange={onChange}
          value={age}
          type="select"
          validMsg={validMsg.age}
          selectOptions={AGE}
        />
      </div>
      <label>종목</label>
      <div>
        <ValidInput
          name="sports"
          onChange={onChange}
          value={sports}
          type="select"
          validMsg={validMsg.sports}
          selectOptions={SPORTS}
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Signup;
