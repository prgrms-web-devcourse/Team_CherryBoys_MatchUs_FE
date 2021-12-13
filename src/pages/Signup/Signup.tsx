/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ValidInput from './ValidInput';
import { SIGNUP_VALIDATION_SUCCESS_MSG, validateSignup } from '@/utils/validation/signupValidation';
import { SIGNUP_VALIDATION_ERR_MSG } from '../../utils/validation/signupValidation';
import {
  requestCheckDuplicatedEmail,
  requestCheckDuplicatedNickname,
  requestSignup,
} from '../../api/auth';
import { isValidFormType, signupFormType, validMsgType } from '@/types/auth';
import { AGE, GENDER, SPORTS } from '@/consts/signup';

const Signup = () => {
  const dispatch = useDispatch();

  // 회원가입에 필요한 상태
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

  // 폼 검증을 위한 상태
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

  // 검증 메세지를 위한 상태
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

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // 비밀번호 확인의 경우만 파라미터가 2개 들어가므로 체크
    const errMsg =
      name !== 'confirmedPassword'
        ? validateSignup[name](value)
        : validateSignup[name](value, password);

    // 모든 상태 변경
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
    // TODO: non-response API 이므로 status code check해서 isSignup에 전달
    // true일때만 API call 보내기
    const isSignup = await requestSignup({ ...signupForm, name: userName });
  };

  // 닉네임 중복 확인
  const checkDuplicatedNickname = async () => {
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

  // 이메일 중복 확인
  const checkDuplicatedEmail = async () => {
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

  // 전체 폼 검증. 하나라도 false일시 true가 나오므로 반전
  const IsSignupValid = () => {
    return !Object.values(isValidForm).includes(false);
  };

  // 필수 항목 미입력시 메시지 수정
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
          validMsg={validMsg.name}
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
          name="ageGroup"
          onChange={onChange}
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
