import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';
import { loginFormType, requestSignupFormType } from '@/types/auth';

// TODO: status code 전달하기
export const requestSignup = (signupForm: requestSignupFormType) =>
  api
    .post({
      url: '/users',
      data: signupForm,
    })
    // 현재 미작동
    .then((response) => {
      return response.ok;
    })
    .catch(throwErrorMessage);

export const requestLogin = async (loginForm: loginFormType) =>
  api
    .post({
      url: '/users/login',
      data: loginForm,
    })
    .catch(throwErrorMessage);

export const requestCheckDuplicatedNickname = (nickname: string) =>
  api
    .get({
      url: `/users/nickname-check/${nickname}`,
    })
    .catch(throwErrorMessage);

export const requestCheckDuplicatedEmail = (email: string) =>
  api
    .get({
      url: `/users/email-check/${email}`,
    })
    .catch(throwErrorMessage);
