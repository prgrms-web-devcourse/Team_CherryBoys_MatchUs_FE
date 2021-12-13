import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';

type MemberElementType = {
  userId: number;
  userName: string;
  grade: string;
};

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

export const deleteTeamMembers = (teamId: number, memberInfo: MemberElementType[]) =>
  api
    .delete({
      url: `teams/${teamId}`,
      data: { memberInfo },
    })
    .catch(throwErrorMessage);
