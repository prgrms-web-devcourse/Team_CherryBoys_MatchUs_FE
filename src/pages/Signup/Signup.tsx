/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ValidInput from './ValidInput';
import {
  SIGNUP_VALIDATION_SUCCESS_MSG,
  validateSignup,
  SIGNUP_VALIDATION_ERR_MSG,
} from '@/utils/validation/signupValidation';
import {
  requestCheckDuplicatedEmail,
  requestCheckDuplicatedNickname,
  requestSignup,
} from '@/api/auth';
import { isValidFormType, signupFormType, validMsgType } from '@/types/auths';
import { AGE, GENDER, SPORTS } from '@/consts/signup';

const Signup = () => {
  const [signupForm, setSignupForm] = useState<signupFormType>({
    userName: '',
    nickname: '',
    email: '',
    password: '',
    confirmedPassword: '',
    gender: '',
    ageGroup: '',
    sports: '',
  });

  const [isValidForm, setIsValidForm] = useState<isValidFormType>({
    userName: false,
    nickname: false,
    email: false,
    password: false,
    confirmedPassword: false,
    gender: false,
    ageGroup: false,
    sports: false,
  });

  const [validMsg, setValidMsg] = useState<validMsgType>({
    userName: '',
    nickname: '',
    email: '',
    password: '',
    confirmedPassword: '',
    gender: '',
    ageGroup: '',
    sports: '',
  });

  const { userName, nickname, email, password, confirmedPassword, gender, ageGroup, sports } =
    signupForm;

  const history = useHistory();

  const handleOnChange = (
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

  const signup = async () => {
    const isSignup = await requestSignup({ ...signupForm, name: userName });

    if (isSignup) {
      history.push('/login');
    }

    // TODO: 모달 예외처리
  };

  // 닉네임 중복 확인
  const handleClickNicknameDuplicate = async () => {
    if (!isValidForm.nickname) {
      return;
    }
    
    const { isduplicated } = await requestCheckDuplicatedNickname(signupForm.nickname);

    const msg = !isduplicated
      ? SIGNUP_VALIDATION_SUCCESS_MSG.NICKNAME_SUCCESS_MSG
      : SIGNUP_VALIDATION_ERR_MSG.DUPLICATE_NICKNAME;

    setValidMsg({
      ...validMsg,
      nickname: msg,
    });

    setIsValidForm({
      ...isValidForm,
      nickname: isduplicated,
    });
  };

  const handleClickCheckDuplicatedEmail = async () => {
    if (!isValidForm.email) {
      return;
    }
    const { isduplicated } = await requestCheckDuplicatedEmail(signupForm.email);

    const msg = !isduplicated
      ? SIGNUP_VALIDATION_SUCCESS_MSG.EMAIL_SUCCESS_MSG
      : SIGNUP_VALIDATION_ERR_MSG.DUPLICATE_EMIAL;

    setValidMsg({
      ...validMsg,
      email: msg,
    });

    setIsValidForm({
      ...isValidForm,
      email: isduplicated,
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
          onChange={handleOnChange}
          value={userName}
          type="input"
          validMsg={validMsg.name}
        />
      </div>

      <label>닉네임</label>
      <div>
        <ValidInput
          name="nickname"
          onChange={handleOnChange}
          value={nickname}
          type="input"
          validMsg={validMsg.nickname}
        />
        <button type="button" onClick={handleClickNicknameDuplicate}>
          중복확인
        </button>
      </div>
      <label>이메일</label>
      <div>
        <ValidInput
          name="email"
          onChange={handleOnChange}
          value={email}
          type="input"
          validMsg={validMsg.email}
        />
        <button type="button" onClick={handleClickCheckDuplicatedEmail}>
          중복확인
        </button>
      </div>
      <label>비밀번호</label>
      <div>
        <ValidInput
          name="password"
          onChange={handleOnChange}
          value={password}
          type="input"
          validMsg={validMsg.password}
        />
      </div>
      <label>비밀번호 확인</label>
      <div>
        <ValidInput
          name="confirmedPassword"
          onChange={handleOnChange}
          value={confirmedPassword}
          type="input"
          validMsg={validMsg.confirmedPassword}
        />
      </div>
      <label>성별</label>
      <div>
        <ValidInput
          name="gender"
          onChange={handleOnChange}
          value={gender}
          type="select"
          validMsg={validMsg.gender}
          selectOptions={GENDER}
        />
      </div>
      <label>연령대</label>
      <div>
        <ValidInput
          name="ageGroup"
          onChange={handleOnChange}
          value={ageGroup}
          type="select"
          validMsg={validMsg.ageGroup}
          selectOptions={AGE}
        />
      </div>
      <label>종목</label>
      <div>
        <ValidInput
          name="sports"
          onChange={handleOnChange}
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
