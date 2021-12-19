/* eslint-disable import/no-named-as-default */
import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
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
import { CustomLabel, CustomModalDialog } from '@/components';
import style from './signup.module.scss';

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
  const [isModalDialogOpen, setIsModalDialogOpen] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const { userName, nickname, email, password, confirmedPassword, gender, ageGroup, sports } =
    signupForm;

  const history = useHistory();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name } = e.target;
    const value = e.target.value.trim();
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
      setIsSignupSuccess(true);
      setIsModalDialogOpen(true);
      return;
    }
    setIsModalDialogOpen(false);
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
      nickname: !isduplicated,
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
      email: !isduplicated,
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

  const handleClickModal = () => {
    if (isSignupSuccess) {
      history.push('/login');
    }
  };

  const {
    flex,
    duplicate_check__btn,
    valid_msg,
    container,
    form__label,
    form__input,
    flex_container,
    edit_info__btn,
    inValid_form,
    valid_form,
    modalMainTitle,
    modalSubTitle,
  } = style;

  return (
    <div className={classNames(container)}>
      {isModalDialogOpen && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => setIsModalDialogOpen(false)}
          handleApprove={handleClickModal}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            {isSignupSuccess ? '회원 가입 완료!' : '에러가 발생했어요!'}
          </span>
          <span className={classNames('whiteSpace', modalSubTitle)}>
            {isSignupSuccess ? '로그인 하러 가볼까요?' : '잠시 후에 다시 시도해주세요!'}
          </span>
        </CustomModalDialog>
      )}
      <div className={classNames(flex_container)}>
        <form onSubmit={handleSubmit}>
          <CustomLabel htmlFor="userName" className={classNames(form__label)}>
            사용자명
          </CustomLabel>
          <div>
            <ValidInput
              id="userName"
              name="userName"
              className={classNames(form__input, !isValidForm.userName ? inValid_form : valid_form)}
              onChange={handleOnChange}
              value={userName}
              type="input"
            />
          </div>
          <div>
            <span className={classNames(valid_msg)}>{validMsg.userName}</span>
          </div>
          <CustomLabel htmlFor="nickname" className={classNames(form__label)}>
            닉네임
          </CustomLabel>
          <div className={classNames(flex)}>
            <ValidInput
              id="nickname"
              name="nickname"
              className={classNames(form__input, !isValidForm.nickname ? inValid_form : valid_form)}
              onChange={handleOnChange}
              value={nickname}
              type="input"
            />
            <button
              type="button"
              onClick={handleClickNicknameDuplicate}
              className={classNames(duplicate_check__btn)}
            >
              중복확인
            </button>
          </div>
          <div>
            <span className={classNames(valid_msg)}>{validMsg.nickname}</span>
          </div>
          <CustomLabel htmlFor="email" className={classNames(form__label)}>
            이메일
          </CustomLabel>
          <div className={classNames(flex)}>
            <ValidInput
              id="email"
              className={classNames(form__input, !isValidForm.email ? inValid_form : valid_form)}
              name="email"
              onChange={handleOnChange}
              value={email}
              type="input"
            />
            <button
              type="button"
              onClick={handleClickCheckDuplicatedEmail}
              className={classNames(duplicate_check__btn)}
            >
              중복확인
            </button>
          </div>
          <div>
            <span className={classNames(valid_msg)}>{validMsg.email}</span>
          </div>
          <CustomLabel htmlFor="password" className={classNames(form__label)}>
            비밀번호
          </CustomLabel>
          <div>
            <ValidInput
              id="password"
              name="password"
              className={classNames(form__input, !isValidForm.password ? inValid_form : valid_form)}
              onChange={handleOnChange}
              value={password}
              type="input"
            />
          </div>
          <div>
            <span className={classNames(valid_msg)}>{validMsg.password}</span>
          </div>
          <CustomLabel htmlFor="confirmedPassword" className={classNames(form__label)}>
            비밀번호 확인
          </CustomLabel>
          <div>
            <ValidInput
              id="confirmedPassword"
              className={classNames(
                form__input,
                !isValidForm.confirmedPassword ? inValid_form : valid_form
              )}
              name="confirmedPassword"
              onChange={handleOnChange}
              value={confirmedPassword}
              type="input"
            />
          </div>
          <div>
            <span className={classNames(valid_msg)}>{validMsg.confirmedPassword}</span>
          </div>
          <CustomLabel htmlFor="gender" className={classNames(form__label)}>
            성별
          </CustomLabel>
          <div>
            <ValidInput
              id="gender"
              name="gender"
              onChange={handleOnChange}
              value={gender}
              className={classNames(form__input, !isValidForm.gender ? inValid_form : valid_form)}
              type="select"
              selectOptions={GENDER}
            />
          </div>
          <div>
            <span className={classNames(valid_msg)}>{validMsg.gender}</span>
          </div>
          <CustomLabel htmlFor="ageGroup" className={classNames(form__label)}>
            연령대
          </CustomLabel>
          <div>
            <ValidInput
              id="ageGroup"
              className={classNames(form__input, !isValidForm.ageGroup ? inValid_form : valid_form)}
              name="ageGroup"
              onChange={handleOnChange}
              value={ageGroup}
              type="select"
              selectOptions={AGE}
            />
          </div>
          <div>
            <span className={classNames(valid_msg)}>{validMsg.ageGroup}</span>
          </div>
          <CustomLabel htmlFor="sports" className={classNames(form__label)}>
            종목
          </CustomLabel>
          <div>
            <ValidInput
              id="sports"
              name="sports"
              className={classNames(form__input, !isValidForm.sports ? inValid_form : valid_form)}
              onChange={handleOnChange}
              value={sports}
              type="select"
              selectOptions={SPORTS}
            />
          </div>
          <div>
            <span className={classNames(valid_msg)}>{validMsg.sports}</span>
          </div>
          <button type="submit" className={classNames(edit_info__btn)}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
