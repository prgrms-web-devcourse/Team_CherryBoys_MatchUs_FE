import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';
import {
  TeamMemberEdit,
  MatchListFilter,
  MatchPostNew,
  MatchPostEdit,
  MatchReviewInfo,
  MatchApplyInfo,
} from '@/types';

export const fetchAllMatch = (filter: MatchListFilter) => {
  return api
    .get({
      url: '/matches',
      params: filter,
    })
    .catch(throwErrorMessage);
};

export const fetchMatchById = (matchId: number) => {
  return api
    .get({
      url: `/matches/${matchId}`,
    })
    .catch(throwErrorMessage);
};

export const createMatch = (createMatchInfo: MatchPostNew) => {
  return api
    .post({
      url: '/matches',
      data: createMatchInfo,
    })
    .catch(throwErrorMessage);
};

export const modifyMatch = (editedMatchInfo: MatchPostEdit) => {
  const {
    matchId,
    sports,
    ageGroup,
    city,
    region,
    ground,
    cost,
    detail,
    date,
    startTime,
    endTime,
  } = editedMatchInfo;
  return api
    .put({
      url: `/matches/${matchId}`,
      data: {
        sports,
        ageGroup,
        city,
        region,
        ground,
        cost,
        detail,
        date,
        startTime,
        endTime,
      },
    })
    .catch(throwErrorMessage);
};

export const deleteMatchById = (matchId: number) => {
  return api
    .delete({
      url: `/matches/${matchId}`,
    })
    .catch(throwErrorMessage);
};

export const applyMatch = (matchApplyInfo: MatchApplyInfo) => {
  const { matchId, players, teamId } = matchApplyInfo;
  return api
    .post({
      url: `/matches/${matchId}/waitings`,
      data: { players, teamId },
    })
    .catch(throwErrorMessage);
};

export const fetchWaitingTeams = (matchId: number) => {
  return api
    .get({
      url: `/matches/${matchId}/waitings`,
    })
    .catch(throwErrorMessage);
};

export const approveMatch = (teamWaitingId: number) => {
  return api
    .post({
      url: `/match-waitings/${teamWaitingId}`,
    })
    .catch(throwErrorMessage);
};

export const getTags = () => {
  return api
    .get({
      url: '/tags',
    })
    .catch(throwErrorMessage);
};

export const postMatchReview = (matchReviewInfo: MatchReviewInfo) => {
  const { matchId, tags, reviewerTeamId, reviewerTeamType, reviewedTeamId } = matchReviewInfo;

  return api
    .post({
      url: `/matches/${matchId}/review`,
      data: { tagIds: tags, reviewerTeamId, reviewerTeamType, reviewedTeamId },
    })
    .catch(throwErrorMessage);
};

export const modifyTeamMember = (editedTeamMemberInfo: TeamMemberEdit) => {
  const { matchId, players, teamId } = editedTeamMemberInfo;

  return api
    .put({
      url: `/matches/${matchId}/members`,
      data: { teamId, players },
    })
    .catch(throwErrorMessage);
};

export const fetchAuthorizedTeams = () => {
  return api
    .get({
      url: '/users/me/teams',
    })
    .catch(throwErrorMessage);
};

export const fetchTotalMembers = (teamId: number) => {
  return api
    .get({
      url: `/teams/${teamId}/total-members`,
    })
    .catch(throwErrorMessage);
};

export const fetchLocation = () => {
  return api
    .get({
      url: '/locations',
    })
    .catch(throwErrorMessage);
};

export const fetchTagInfo = () => {
  return api
    .get({
      url: '/tags',
    })
    .catch(throwErrorMessage);
};
