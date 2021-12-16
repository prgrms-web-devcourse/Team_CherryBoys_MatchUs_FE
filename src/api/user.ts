import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';

export const getUserMatchHistory = (userId: number | undefined) =>
  api
    .get({
      url: `users/${userId}/matches`,
    })
    .catch(throwErrorMessage);
