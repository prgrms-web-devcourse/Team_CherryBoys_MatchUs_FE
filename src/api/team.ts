import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';

type MemberElementType = {
  userId: number;
  userName: string;
  grade: string;
};

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

export const deleteTeamMembers = (teamId: number, memberInfo: MemberElementType[]) =>
  api
    .delete({
      url: `teams/${teamId}`,
      data: { memberInfo },
    })
    .catch(throwErrorMessage);
