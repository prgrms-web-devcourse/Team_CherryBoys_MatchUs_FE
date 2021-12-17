import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';

export const getUserInfo = (userId: number | undefined) =>
  api
    .get({
      url: `/users/${userId}`,
    })
    .catch(throwErrorMessage);

export const getUserMatchHistory = (userId: number | undefined) =>
  api.get({
    url: `users/${userId}/matches`,
  });
