import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';
import {
  MatchCard,
  Match,
  TeamWithUser,
  TeamSimple,
  WaitingTeam,
  TeamMemberEdit,
  MatchListFilter,
  MatchPostEdit,
  MatchReviewInfo,
} from '@/types';
import { userTeamDummy, teamMembersDummy } from '@/dummyMatch';

export const fetchAllMatch = async (filter: MatchListFilter) => {
  const data = await api
    .get({
      url: '/matches',
      params: filter,
    })
    .catch(throwErrorMessage);
  return data.matchList;
};

export const fetchMatchById = async (matchId: number) => {
  const data = await api
    .get({
      url: `/matches/${matchId}`,
    })
    .catch(throwErrorMessage);
  return data;
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

export const deleteMatchById = async (matchId: number) => {
  return { matchId };
};

export const fetchAuthorizedTeams = async (token: string) => {
  const data = await api
    .get({
      url: '/users/me/teams',
      data: token,
    })
    .catch(throwErrorMessage);
  return data.teamSimpleInfos;
};

export const fetchTotalMembers = async (teamId: number) => {
  const data = await api
    .get({
      url: `/teams/${teamId}/total-members`,
    })
    .catch(throwErrorMessage);
  return data.members;
};

// TODO: 매칭신청
export const applyMatch = async () => {};

export const fetchWaitingTeams = async (matchId: number) => {
  const data = await api
    .get({
      url: `/matches/${matchId}/waitings`,
    })
    .catch(throwErrorMessage);

  return data.matchWaitingListRespons;
};

export const approveMatch = async (teamWaitingId: number) => {
  await api
    .post({
      url: `/match-waitings/${teamWaitingId}`,
    })
    .catch(throwErrorMessage);
};

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
