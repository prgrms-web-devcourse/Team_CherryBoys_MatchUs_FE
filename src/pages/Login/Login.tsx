/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { loginFormType } from '@/types/users';
import { login } from '@/store/userSlice';
import { RootState, useAppDispatch } from '@/store';

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
      <label htmlFor="email">아이디</label>
      <input name="email" id="email" value={email} onChange={handleChange} />
      <label htmlFor="password">패스워드</label>
      <input
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
