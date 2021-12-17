import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';
import {
  MatchDeleteInfo,
  TeamMemberEdit,
  MatchListFilter,
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

export const createMatch = async (createMatchInfo: Omit<MatchPostEdit, 'matchId'>) => {
  const { sports, ageGroup, city, region, ground, cost, detail, date, startTime, endTime } =
    createMatchInfo;
  const matchInfo = {
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
  };

  await api
    .post({
      url: '/matches',
      data: matchInfo,
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
  const matchInfo = {
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
  };

  await api
    .put({
      url: `/matches/${matchId}`,
      data: matchInfo,
    })
    .catch(throwErrorMessage);
};

export const deleteMatchById = async (matchDeleteInfo: MatchDeleteInfo) => {
  const { matchId, token } = matchDeleteInfo;
  await api
    .delete({
      url: `/matches/${matchId}`,
      data: token,
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

// TODO: 태그 아이디 상수화
export const postMatchReview = async (matchReviewInfo: MatchReviewInfo) => {
  const { matchId, tags, reviewerTeamId, reviewedTeamId } = matchReviewInfo;
  // await api
  //   .post({
  //     url: `/matches/${matchId}/review`,
  //     data: { tags, reviewerTeamId, reviewedTeamId },
  //   })
  //   .catch(throwErrorMessage);
};

export const modifyTeamMember = async (editedTeamMemberInfo: TeamMemberEdit) => {
  const { matchId, players, teamId } = editedTeamMemberInfo;
  const editedTeamMember = {
    teamId,
    players,
  };

  await api
    .put({
      url: `/matches/${matchId}/members`,
      data: editedTeamMember,
    })
    .catch(throwErrorMessage);
};
