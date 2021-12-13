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

interface EditTeamInfoProps {
  image: Record<string, string>;
  teamBio: string;
  teamAgeGroup: string;
  teamId: number;
}

export const createTeam = ({
  image,
  teamName,
  teamBio,
  teamSport,
  teamAgeGroup,
}: TeamInfoProps) => {
  const postFormData = new FormData();
  postFormData.append('logo', image.file);
  postFormData.append('teamName', teamName);
  postFormData.append('bio', teamBio);
  postFormData.append('sports', teamSport);
  postFormData.append('ageGroup', teamAgeGroup);

  return api
    .post({
      url: '/teams',
      data: postFormData,
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

export const editTeamInfo = ({ image, teamBio, teamAgeGroup, teamId }: EditTeamInfoProps) => {
  const postFormData = new FormData();
  postFormData.append('logo', image.file);
  postFormData.append('bio', teamBio);
  postFormData.append('ageGroup', teamAgeGroup);

  return api.put({
    url: `/teams/${teamId}`,
    data: postFormData,
  });
};

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
