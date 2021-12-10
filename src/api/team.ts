import { throwErrorMessage } from '../utils/api';
import api from '@/api/core';

export const deleteTeam = (teamId: number | undefined) =>
  api
    .delete({
      url: `/teams/${teamId}`,
    })
    .catch(throwErrorMessage);

export const withdrawTeam = (teamId: number | undefined) =>
  api
    .delete({
      url: `/teams/${teamId}/me`,
    })
    .catch(throwErrorMessage);
