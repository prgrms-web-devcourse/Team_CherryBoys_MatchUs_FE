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
  api
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
  api
    .delete({
      url: `/matches/${matchId}`,
    })
    .catch(throwErrorMessage);
};

export const applyMatch = (matchApplyInfo: MatchApplyInfo) => {
  const { matchId, players, teamId } = matchApplyInfo;
  api
    .post({
      url: `/matchs/${matchId}/waitings`,
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
  api
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
  console.log(matchReviewInfo);
  const data = api
    .post({
      url: `/matches/${matchId}/review`,
      data: { tags, reviewerTeamId, reviewerTeamType, reviewedTeamId },
    })
    .catch(throwErrorMessage);
  console.log(data);
};

export const modifyTeamMember = (editedTeamMemberInfo: TeamMemberEdit) => {
  const { matchId, players, teamId } = editedTeamMemberInfo;
  console.log(editedTeamMemberInfo);
  api
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
