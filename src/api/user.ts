import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';
import { loginFormType, requestSignupFormType, reqeustUserInfoType } from '@/types/users';

export const requestSignup = (signupForm: requestSignupFormType) =>
  api
    .post({
      url: '/users',
      data: signupForm,
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
      url: `/users/nickname-check`,
      params: {
        nickname,
      },
    })
    .catch(throwErrorMessage);

export const requestCheckDuplicatedEmail = (email: string) =>
  api
    .get({
      url: `/users/email-check`,
      params: {
        email,
      },
    })
    .catch(throwErrorMessage);

export const requestReAuth = () =>
  api
    .get({
      url: '/users/reissue',
    })
    .catch(throwErrorMessage);

export const requestEditUser = (userEditForm: reqeustUserInfoType) =>
  api.put({
    url: '/users/me',
    data: userEditForm,
  });

export const getUserMatchHistory = (userId: number | undefined) =>
  api
    .get({
      url: `users/${userId}/matches`,
    })
    .catch(throwErrorMessage);

export const getUserInfo = (userId: number | undefined) =>
  api
    .get({
      url: `/users/${userId}`,
    })
    .catch(throwErrorMessage);
