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
import { fetchMatchById } from '@/api';
import { Match as MatchType } from '@/types';

const { awayTeam, versus } = styles;

const Match = () => {
  const matchId = parseInt(useParams<{ postId: string }>().postId, 10);

  const { modal } = useSelector((store: RootState) => store.match.data);
  const [match, setMatch] = useState<MatchType[]>([]);

  const getMatchInfo = useCallback(async () => {
    const matchInfoById = await fetchMatchById(matchId);
    setMatch([matchInfoById]);
  }, [matchId]);

  useEffect(() => {
    getMatchInfo();
  }, []);

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
      {match.length > 0 && (
        <MatchApplyModal showMatchApplyModal={modal.matchApply} sports={match[0].sports} />
      )}
      {match.length > 0 && <MatchApproveModal showMatchApproveModal={modal.matchApprove} />}
      {match.length > 0 && (
        <MatchTeamMemberModal
          showMatchTeamMemberModal={modal.matchTeamMember}
          sports={match[0].sports}
          teamInfo={registerTeamInfo}
          matchId={match[0].matchId}
        />
      )}
      {match.length > 0 && (
        <MatchReviewModal showMatchReviewModal={modal.matchReview} matchInfo={match[0]} />
      )}
    </div>
  );
};

export default Match;
