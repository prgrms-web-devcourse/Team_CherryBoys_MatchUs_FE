import api from '@/api/core';
import { throwErrorMessage } from '@/utils';

export interface hiresPosting {
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
  postId: number | undefined;
  data: hiresPosting;
}

interface applicationElement {
  applicationId: number;
  userId: number;
  userNickName: string;
}

interface allApplications {
  applications: applicationElement[];
}

interface allowedApplications {
  postId: number;
  data: allApplications;
}

export interface conditions {
  ageGroup?: string;
  cityId?: number;
  date?: string;
  groundId?: number;
  lastId?: number;
  positon?: string;
  regionId?: number;
  size: number; // Todo(김홍중) : 현재 필수지만 백엔드에서 optional로 만들게되면 optional로 수정 (2021-12-16)
  sports?: string;
}

export const getHiresInfo = (params: conditions) =>
  api
    .get({
      url: `/hires`,
      params,
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
      url: `/hires/${postId}`,
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

export const cancelHireRequest = (applicationId: number) =>
  api
    .delete({
      url: `/hire-applications/${applicationId}`,
    })
    .catch(throwErrorMessage);

export const applyHires = (postId: number) => {
  return api
    .post({
      url: `/hire-applications`,
      data: { postId },
    })
    .catch(throwErrorMessage);
};
