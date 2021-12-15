/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { RootState } from '@/store';
import { match as matchReducer, fetchMatchById } from '@/store/match/match';
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
import useMount from '@/hooks/useMount';
import styles from './Match.module.scss';

const { awayTeam, versus } = styles;

const Match = () => {
  const dispatch = useDispatch();
  const matchId = parseInt(useParams<{ postId: string }>().postId, 10);

  const { match, modal } = useSelector((store: RootState) => store.match.data);

  const registerTeamInfo = match[0] && {
    teamName: match[0].registerTeamInfo.teamName,
    teamId: match[0].registerTeamInfo.teamId,
  };

  useMount(() => {
    dispatch(fetchMatchById(matchId));
    dispatch(matchReducer.actions.setMatchId({ matchId }));
  });

  return (
    <div>
      {match.map((matchInfo) => (
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
      {match[0] && modal.matchApply && (
        <MatchApplyModal showMatchApplyModal={modal.matchApply} sports={match[0].sports} />
      )}
      {match[0] && modal.matchApprove && (
        <MatchApproveModal showMatchApproveModal={modal.matchApprove} />
      )}
      {match[0] && modal.matchTeamMember && (
        <MatchTeamMemberModal
          showMatchTeamMemberModal={modal.matchTeamMember}
          sports={match[0].sports}
          teamInfo={registerTeamInfo}
        />
      )}
      <MatchReviewModal showMatchReviewModal={modal.matchReview} />
    </div>
  );
};

export default Match;
