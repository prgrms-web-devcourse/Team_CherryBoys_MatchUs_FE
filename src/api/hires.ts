import api from '@/api/core';
import { throwErrorMessage } from '@/utils';

interface hiresPosting {
  ageGroup: string;
  cityId: number;
  date: string;
  detail: string;
  endTime: string;
  groundId: number;
  hirePlayerNumber: number;
  position: string;
  regionId: number;
  startTime: string;
  teamId: number;
}

interface editedHiresPosting {
  postId: number;
  data: hiresPosting;
}

interface applicationElement {
  applicationId: number;
  userId: number;
  userNickName: string;
}

interface allApplications {
  applications: Array<applicationElement>;
}

interface allowedApplications {
  postId: number;
  data: allApplications;
}

const defaultSize = 6;
export const getHiresInfo = () =>
  api
    .get({
      url: `/hires`,
      params: { size: defaultSize },
    })
    .catch(throwErrorMessage);

export const createHiresPosting = (data: hiresPosting) => {
  return api
    .post({
      url: '/hires',
      data,
    })
    .catch(throwErrorMessage);
};

export const getHiresDetail = (postId: number) =>
  api
    .get({
      url: `/hires/${postId}`,
      params: { postId },
    })
    .catch(throwErrorMessage);

export const editHiresPosting = ({ postId, data }: editedHiresPosting) => {
  return api.put({
    url: `/hires/${postId}`,
    data,
  });
};

export const deleteHiresPosting = (postId: number) =>
  api
    .delete({
      url: `hires/${postId}`,
    })
    .catch(throwErrorMessage);

export const getApplications = (postId: number) =>
  api
    .get({
      url: `/hires/${postId}/applications`,
      params: { postId },
    })
    .catch(throwErrorMessage);

export const allowApplications = ({ postId, data }: allowedApplications) => {
  return api
    .post({
      url: `/hires/${postId}/applications`,
      data,
    })
    .catch(throwErrorMessage);
};
