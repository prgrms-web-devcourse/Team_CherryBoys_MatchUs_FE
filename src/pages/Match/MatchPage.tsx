/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { RootState } from '@/store';
import { fetchMatchById } from '@/store/posts/posts';
import {
  MatchInfo,
  TeamCard,
  MatchDetail,
  MatchButton,
  MatchApplyModal,
  MatchApproveModal,
  MatchReviewModal,
} from '@/components';
import useMount from '@/hooks/useMount';
import styles from './Match.module.scss';

const { awayTeam, versus } = styles;

const Match = () => {
  const dispatch = useDispatch();
  const matchId = parseInt(useParams<{ matchId: string }>().matchId, 10);

  useMount(() => {
    dispatch(fetchMatchById(matchId));
  });

  const { match } = useSelector((store: RootState) => store.posts.data);
  const { modal } = useSelector((store: RootState) => store.match).data;

  return (
    <div>
      {match.map((matchInfo) => (
        <Fragment key={`match${matchInfo.matchId}`}>
          <MatchInfo key={`matchInfo${matchInfo.matchId}`} match={matchInfo} />
          {matchInfo.homeTeam && (
            <TeamCard key={`teamInfo${matchInfo.homeTeam}`} team={matchInfo.homeTeam} />
          )}
          {!matchInfo.awayTeam && (
            <MatchDetail key={`matchDetail${matchInfo.matchId}`} match={matchInfo} />
          )}
          {matchInfo.awayTeam && (
            <div className={classNames(awayTeam)}>
              <div className={classNames(versus)}>VS</div>
              <TeamCard key={`teamInfo${matchInfo.awayTeam}`} team={matchInfo.awayTeam} />
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

      <MatchReviewModal showMatchReviewModal={modal.matchReview} />
    </div>
  );
};

export default Match;
