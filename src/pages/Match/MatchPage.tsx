/* eslint-disable react/jsx-fragments */
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { RootState } from '@/store';
import {
  MatchInfo,
  TeamCard,
  MatchDetail,
  MatchButton,
  MatchApplyModal,
  MatchApproveModal,
  MatchReviewModal,
  MatchTeamMemberModal,
} from '@/components';
import styles from './Match.module.scss';
import { fetchMatchById, fetchAuthorizedTeams } from '@/api';
import { Match as MatchType, TeamSimple } from '@/types';
import { getItemFromStorage } from '@/utils/storage';
import { match as matchStore } from '@/store/match/match';

const { awayTeam, versus } = styles;

const Match = () => {
  const matchId = parseInt(useParams<{ postId: string }>().postId, 10);
  const token = getItemFromStorage('accessToken');
  const dispatch = useDispatch();

  const { modal, userTeams } = useSelector((store: RootState) => store.match.data);
  const [match, setMatch] = useState<MatchType[]>([]);
  const [matchTeams, setMatchTeams] = useState<number[]>([]);
  const [userTeamInfo, setUserTeamInfo] = useState<TeamSimple[]>(userTeams);
  const reviewInfo = match[0]?.applyTeamInfo && {
    matchId: match[0].matchId,
    registerTeamId: match[0].registerTeamInfo.teamId,
    applyTeamId: match[0].applyTeamInfo.teamId,
    userTeamInfo,
  };

  const getMatchTeams = () => {
    if (match[0] && match[0].applyTeamInfo) {
      const matchTeamsId = [];
      matchTeamsId.push(match[0].registerTeamInfo.teamId, match[0].applyTeamInfo.teamId);
      setMatchTeams(matchTeamsId);
    }
  };

  const getMatchInfo = useCallback(async () => {
    const matchInfoById = await fetchMatchById(matchId);
    setMatch([matchInfoById]);
  }, [matchId]);

  const getAuhorizedTeams = useCallback(async () => {
    if (token) {
      const { teamSimpleInfos } = await fetchAuthorizedTeams();
      setUserTeamInfo(teamSimpleInfos);
      dispatch(matchStore.actions.setUserTeams({ userTeams: teamSimpleInfos }));
    }
  }, []);

  useEffect(() => {
    if (match.length < 1) {
      getMatchInfo();
    }
    getMatchTeams();
    if (userTeamInfo.length < 1) {
      getAuhorizedTeams();
    }
  }, [match, userTeamInfo]);

  const registerTeamInfo = match[0] && {
    teamName: match[0].registerTeamInfo.teamName,
    teamId: match[0].registerTeamInfo.teamId,
  };

  return (
    <div>
      {match.length > 0 &&
        match.map((matchInfo) => (
          <Fragment key={`match${matchInfo.matchId}`}>
            <MatchInfo match={matchInfo} />
            {matchInfo.registerTeamInfo && (
              <TeamCard team={matchInfo.registerTeamInfo} status={matchInfo.status} />
            )}
            {matchInfo.status === 'WAITING' && (
              <MatchDetail
                matchId={matchInfo.matchId}
                matchDetail={matchInfo.detail}
                editable={
                  userTeamInfo.filter((team) => team.teamId === matchInfo.registerTeamInfo.teamId)
                    .length > 0
                }
              />
            )}
            {matchInfo.applyTeamInfo && (
              <div className={classNames(awayTeam)}>
                <div className={classNames(versus)}>VS</div>
                <TeamCard team={matchInfo.applyTeamInfo} status={matchInfo.status} />
              </div>
            )}
          </Fragment>
        ))}
      {match.length > 0 && (
        <MatchButton matchInfo={match[0]} enable={{ apply: true, approve: true, review: false }} />
      )}
      {match.length > 0 && modal.matchApply && (
        <MatchApplyModal showMatchApplyModal={modal.matchApply} sports={match[0].sportName} />
      )}
      {match.length > 0 && modal.matchApprove && (
        <MatchApproveModal showMatchApproveModal={modal.matchApprove} />
      )}
      {match.length > 0 && modal.matchTeamMember && (
        <MatchTeamMemberModal
          showMatchTeamMemberModal={modal.matchTeamMember}
          sports={match[0].sportName}
          teamInfo={registerTeamInfo}
          matchId={match[0].matchId}
        />
      )}
      {matchTeams.length > 1 && reviewInfo && modal.matchReview && (
        <MatchReviewModal showMatchReviewModal={modal.matchReview} reviewInfo={reviewInfo} />
      )}
    </div>
  );
};

export default Match;
