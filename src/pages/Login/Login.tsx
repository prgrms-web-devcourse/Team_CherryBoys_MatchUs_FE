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

const Login = () => {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const [isModalDialogOpen, setIsModalDialogOpen] = useState(false);
  const [loginForm, setLoginForm] = useState<loginFormType>({
    email: '',
    password: '',
  });
  const { email, password } = loginForm;
  const { modalSubTitle, modalMainTitle } = style;
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
    history.push('/main');
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(loginForm))
      .unwrap()
      .then(() => history.push('/main'))
      .catch(() => setIsModalDialogOpen(true));
  };

  return (
    <>
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
      <form onSubmit={handleSubmit}>
        <CustomLabel htmlFor="email">아이디</CustomLabel>
        <CustomInput type="text" name="email" id="email" value={email} onChange={handleChange} />
        <CustomLabel htmlFor="password">패스워드</CustomLabel>
        <CustomInput
          name="password"
          id="password"
          value={password}
          type="password"
          onChange={handleChange}
        />
        <button type="submit">로그인</button>
      </form>
      <button type="button" onClick={() => history.push('signup')}>
        회원가입
      </button>
    </>
  );
};

export default Login;
