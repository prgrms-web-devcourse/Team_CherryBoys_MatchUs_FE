import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';
import { MemberElement } from '@/types';

interface TeamInfoProps {
  image: Record<string, string>;
  teamName: string;
  teamBio: string;
  teamSport: string;
  teamAgeGroup: string;
}

export const createTeam = ({
  image,
  teamName,
  teamBio,
  teamSport,
  teamAgeGroup,
}: TeamInfoProps) => {
  const postFormImage = new FormData();
  postFormImage.append('logo', image.file);
  postFormImage.append('teamName', teamName);
  postFormImage.append('bio', teamBio);
  postFormImage.append('sports', teamSport);
  postFormImage.append('ageGroup', teamAgeGroup);

  return api
    .post({
      url: '/teams',
      data: postFormImage,
    })
    .catch(throwErrorMessage);
};

export const checkTeamNameDuplication = (teamName: string) =>
  api
    .get({
      url: `/teams/name-check`,
      data: teamName,
    })
    .catch(throwErrorMessage);

export const deleteTeam = (teamId: number) =>
  api
    .delete({
      url: `/teams/${teamId}`,
    })
    .catch(throwErrorMessage);

export const withdrawTeam = (teamId: number) =>
  api
    .delete({
      url: `/teams/${teamId}/me`,
    })
    .catch(throwErrorMessage);

export const deleteTeamMembers = (teamId: number, memberInfo: MemberElement[]) =>
  api
    .delete({
      url: `teams/${teamId}`,
      data: { memberInfo },
    })
    .catch(throwErrorMessage);

export const getTeamInfo = (teamId: number) =>
  api
    .get({
      url: `/teams/${teamId}`,
    })
    .catch(throwErrorMessage);

export const getMemberInfo = (teamId: number) =>
  api
    .get({
      url: `/teams/${teamId}/members`,
    })
    .catch(throwErrorMessage);

export const getMatchHistory = (teamId: number) =>
  api
    .get({
      url: `teams/${teamId}/matches`,
    })
    .catch(throwErrorMessage);
