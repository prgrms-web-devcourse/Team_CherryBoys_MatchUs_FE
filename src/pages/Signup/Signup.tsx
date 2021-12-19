/* eslint-disable import/no-named-as-default */
import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ValidInput from './ValidInput';
import {
  USER_VALIDATION_SUCCESS_MSG,
  validateUser,
  USER_VALIDATION_ERR_MSG,
} from '@/utils/validation/userValidation';
import {
  requestCheckDuplicatedEmail,
  requestCheckDuplicatedNickname,
  requestSignup,
} from '@/api/user';
import { isValidFormType, signupFormType, validMsgType } from '@/types/users';
import { AGE, GENDER, SPORTS } from '@/consts/user';
import { CustomLabel } from '@/components';

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
        ? validateUser[name](value)
        : validateUser[name](value, password);

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
      ? USER_VALIDATION_SUCCESS_MSG.NICKNAME_SUCCESS_MSG
      : USER_VALIDATION_ERR_MSG.DUPLICATE_NICKNAME;

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
      ? USER_VALIDATION_SUCCESS_MSG.EMAIL_SUCCESS_MSG
      : USER_VALIDATION_ERR_MSG.DUPLICATE_EMIAL;

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
      <CustomLabel htmlFor="userName">사용자명</CustomLabel>
      <div>
        <ValidInput
          id="userName"
          name="userName"
          onChange={handleOnChange}
          value={userName}
          type="input"
        />
      </div>

      <CustomLabel htmlFor="nickname">닉네임</CustomLabel>
      <div>
        <ValidInput
          id="nickname"
          name="nickname"
          onChange={handleOnChange}
          value={nickname}
          type="input"
        />
        <button type="button" onClick={handleClickNicknameDuplicate}>
          중복확인
        </button>
      </div>
      <CustomLabel htmlFor="email">이메일</CustomLabel>
      <div>
        <ValidInput id="email" name="email" onChange={handleOnChange} value={email} type="input" />
        <button type="button" onClick={handleClickCheckDuplicatedEmail}>
          중복확인
        </button>
      </div>
      <CustomLabel htmlFor="password">비밀번호</CustomLabel>
      <div>
        <ValidInput
          id="password"
          name="password"
          onChange={handleOnChange}
          value={password}
          type="input"
        />
      </div>
      <CustomLabel htmlFor="confirmedPassword">비밀번호 확인</CustomLabel>
      <div>
        <ValidInput
          id="confirmedPassword"
          name="confirmedPassword"
          onChange={handleOnChange}
          value={confirmedPassword}
          type="input"
        />
      </div>
      <CustomLabel htmlFor="gender">성별</CustomLabel>
      <div>
        <ValidInput
          id="gender"
          name="gender"
          onChange={handleOnChange}
          value={gender}
          type="select"
          selectOptions={GENDER}
        />
      </div>
      <CustomLabel htmlFor="ageGroup">연령대</CustomLabel>
      <div>
        <ValidInput
          id="ageGroup"
          name="ageGroup"
          onChange={handleOnChange}
          value={ageGroup}
          type="select"
          selectOptions={AGE}
        />
      </div>
      <CustomLabel htmlFor="sports">종목</CustomLabel>
      <div>
        <ValidInput
          id="sports"
          name="sports"
          onChange={handleOnChange}
          value={sports}
          type="select"
          selectOptions={SPORTS}
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Signup;
