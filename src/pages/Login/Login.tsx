/* eslint-disable import/no-extraneous-dependencies */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import classNames from 'classnames';
import { loginFormType } from '@/types/users';
import { login } from '@/store/userSlice';
import { RootState, useAppDispatch } from '@/store';
import { CustomLabel, CustomInput, CustomModalDialog } from '@/components';
import style from './login.module.scss';
import logo from '@/assets/images/logo.png';

const Login = () => {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const [isModalDialogOpen, setIsModalDialogOpen] = useState(false);
  const [loginForm, setLoginForm] = useState<loginFormType>({
    email: '',
    password: '',
  });
  const { email, password } = loginForm;
  const {
    modalSubTitle,
    modalMainTitle,
    container,
    inputContainer,
    form__label,
    form__login,
    signup,
    form__input,
    logo_box,
    logo_img,
  } = style;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  if (isLogged) {
    history.push('/');
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(loginForm))
      .unwrap()
      .then(() => history.push('/'))
      .catch(() => setIsModalDialogOpen(true));

    if (isLogged) {
      history.push('/');
    }
  };

  return (
    <div className={classNames(container)}>
      <h1 className={classNames('a11yHidden')}>회원 가입 페이지</h1>
      {isModalDialogOpen && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => setIsModalDialogOpen(false)}
          handleApprove={() => {
            setIsModalDialogOpen(false);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>로그인에 실패했어요</span>
          <span className={classNames('whiteSpace', modalSubTitle)}>
            <strong>아이디</strong>와 <strong>비밀번호</strong>를 확인해주세요!
          </span>
        </CustomModalDialog>
      )}
      <div className={classNames(logo_box)}>
        <img src={logo} alt="로고" className={classNames('whiteSpace', logo_img)} />
      </div>
      {/* 로그인 폼 */}
      <div className={classNames(inputContainer)}>
        <form onSubmit={handleSubmit}>
          <CustomLabel htmlFor="email" className={classNames('whiteSpace', form__label)}>
            아이디
          </CustomLabel>
          <CustomInput
            type="text"
            name="email"
            id="email"
            placeholder=""
            value={email}
            onChange={handleChange}
            className={classNames('whiteSpace', form__input)}
          />
          <CustomLabel htmlFor="password" className={classNames('whiteSpace', form__label)}>
            패스워드
          </CustomLabel>
          <CustomInput
            type="password"
            name="password"
            id="password"
            placeholder=""
            value={password}
            onChange={handleChange}
            className={classNames('whiteSpace', form__input)}
          />

          <button type="submit" className={classNames('whiteSpace', form__login)}>
            로그인
          </button>
          <button
            type="button"
            onClick={() => history.push('/signup')}
            className={classNames('whiteSpace', signup)}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
