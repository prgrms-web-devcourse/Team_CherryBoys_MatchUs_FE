/* eslint-disable react/jsx-fragments */
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

const { awayTeam, versus } = styles;

const Match = () => {
  const matchId = parseInt(useParams<{ postId: string }>().postId, 10);
  const token = getItemFromStorage('accessToken');

  const { modal } = useSelector((store: RootState) => store.match.data);
  const { userInfo } = useSelector((store: RootState) => store.user);
  const [match, setMatch] = useState<MatchType[]>([]);
  const [matchTeams, setMatchTeams] = useState<number[]>([]);
  const [userTeams, setUserTeams] = useState<number[]>([]);
  const reviewTeam = {
    matchId: match[0]?.matchId || 0,
    teams: matchTeams,
    userTeams,
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
      const authorizedTeams = await fetchAuthorizedTeams(token);
      const authorizedTeamsId = authorizedTeams.map((team: TeamSimple) => team.teamId);
      setUserTeams(authorizedTeamsId);
    }
  }, []);

  useEffect(() => {
    if (match.length < 1) {
      getMatchInfo();
    }
    getMatchTeams();
    getAuhorizedTeams();
  }, [match]);
  console.log(userTeams);
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
            {matchInfo.registerTeamInfo && <TeamCard team={matchInfo.registerTeamInfo} />}
            {!matchInfo.applyTeamInfo && <MatchDetail match={matchInfo} />}
            {matchInfo.applyTeamInfo && (
              <div className={classNames(awayTeam)}>
                <div className={classNames(versus)}>VS</div>
                <TeamCard team={matchInfo.applyTeamInfo} />
              </div>
            )}
          </Fragment>
        ))}
      <MatchButton enable={{ apply: true, approve: true, review: false }} />
      {match.length > 0 && userTeams.length > 0 && (
        <MatchApplyModal showMatchApplyModal={modal.matchApply} sports={match[0].sports} />
      )}
      {match.length > 0 && userTeams.includes(registerTeamInfo.teamId) && (
        <MatchApproveModal showMatchApproveModal={modal.matchApprove} />
      )}
      {match.length > 0 && userTeams.includes(registerTeamInfo.teamId) && (
        <MatchTeamMemberModal
          showMatchTeamMemberModal={modal.matchTeamMember}
          sports={match[0].sports}
          teamInfo={registerTeamInfo}
          matchId={match[0].matchId}
        />
      )}
      {matchTeams.length > 1 && (
        <MatchReviewModal showMatchReviewModal={modal.matchReview} teamInfo={reviewTeam} />
      )}
    </div>
  );
};

export default Match;
