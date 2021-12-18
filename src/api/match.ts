import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';
import {
  MatchDeleteInfo,
  TeamMemberEdit,
  MatchListFilter,
  MatchPostNew,
  MatchPostEdit,
  MatchReviewInfo,
  MatchApplyInfo,
} from '@/types';

export const fetchAllMatch = async (filter: MatchListFilter) => {
  const { matchList } = await api
    .get({
      url: '/matches',
      params: filter,
    })
    .catch(throwErrorMessage);
  return matchList;
};

export const fetchMatchById = async (matchId: number) => {
  const matchInfo = await api
    .get({
      url: `/matches/${matchId}`,
    })
    .catch(throwErrorMessage);
  return matchInfo;
};

export const createMatch = async (createMatchInfo: MatchPostNew) => {
  await api
    .post({
      url: '/matches',
      data: createMatchInfo,
    })
    .catch(throwErrorMessage);
};

export const modifyMatch = async (editedMatchInfo: MatchPostEdit) => {
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

  await api
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

export const deleteMatchById = async (matchDeleteInfo: MatchDeleteInfo) => {
  const { matchId, token } = matchDeleteInfo;
  await api
    .delete({
      url: `/matches/${matchId}`,
      params: token,
    })
    .catch(throwErrorMessage);
};

export const applyMatch = async (matchApplyInfo: MatchApplyInfo) => {
  const { matchId, players, teamId } = matchApplyInfo;
  await api
    .post({
      url: `/matchs/${matchId}/waitings`,
      data: { players, teamId },
    })
    .catch(throwErrorMessage);
};

export const fetchWaitingTeams = async (matchId: number) => {
  const { matchWaitingListRespons } = await api
    .get({
      url: `/matches/${matchId}/waitings`,
    })
    .catch(throwErrorMessage);

  return matchWaitingListRespons;
};

export const approveMatch = async (teamWaitingId: number) => {
  await api
    .post({
      url: `/match-waitings/${teamWaitingId}`,
    })
    .catch(throwErrorMessage);
};

export const getTags = async () => {
  const { tags } = await api
    .get({
      url: '/tags',
    })
    .catch(throwErrorMessage);

  return tags;
};

export const postMatchReview = async (matchReviewInfo: MatchReviewInfo) => {
  const { matchId, tags, reviewerTeamId, reviewerTeamType, reviewedTeamId } = matchReviewInfo;
  console.log(matchReviewInfo);
  // await api
  //   .post({
  //     url: `/matches/${matchId}/review`,
  //     data: { tags, reviewerTeamId, reviewerTeamType, reviewedTeamId },
  //   })
  //   .catch(throwErrorMessage);
};

export const modifyTeamMember = async (editedTeamMemberInfo: TeamMemberEdit) => {
  const { matchId, players, teamId } = editedTeamMemberInfo;

  await api
    .put({
      url: `/matches/${matchId}/members`,
      data: { teamId, players },
    })
    .catch(throwErrorMessage);
};

export const fetchAuthorizedTeams = async (token: string) => {
  const { teamSimpleInfos } = await api
    .get({
      url: '/users/me/teams',
      data: token,
    })
    .catch(throwErrorMessage);
  return teamSimpleInfos;
};

export const fetchTotalMembers = async (teamId: number) => {
  const { members } = await api
    .get({
      url: `/teams/${teamId}/total-members`,
    })
    .catch(throwErrorMessage);
  return members;
};

export const fetchLocation = async () => {
  const data = await api
    .get({
      url: '/locations',
    })
    .catch(throwErrorMessage);
  return data;
};

export const fetchTagInfo = async () => {
  const { tags } = await api
    .get({
      url: '/tags',
    })
    .catch(throwErrorMessage);
  return tags;
};
