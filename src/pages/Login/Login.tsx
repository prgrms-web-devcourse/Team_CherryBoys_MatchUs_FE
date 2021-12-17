/* eslint-disable import/no-extraneous-dependencies */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { loginFormType } from '@/types/users';
import { login } from '@/store/userSlice';
import { RootState, useAppDispatch } from '@/store';
import { CustomLabel, CustomInput } from '@/components';

const Login = () => {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const [loginForm, setLoginForm] = useState<loginFormType>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const { email, password } = loginForm;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(loginForm))
      .unwrap()
      .then(() => history.push('/main'));

    if (isLogged) {
      history.push('/main');
    }
  };

  return (
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
  );
};

export default Login;
