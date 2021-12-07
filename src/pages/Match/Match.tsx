/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '@/store';
import { fetchMatchById } from '@/store/matches/matches';
import { MatchInfo, TeamCard, MatchDetail, MatchButton } from '@/components/Match';
import useMount from '@/hooks/useMount';
import styles from './Match.module.scss';

const { awayTeam, versus } = styles;

const Match = () => {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(fetchMatchById(1));
  });

  const { match } = useSelector((store: RootState) => store.matches).data;

  return (
    <div>
      {match.map((matchInfo) => (
        <Fragment key={`match${matchInfo.matchId}`}>
          <MatchInfo key={`matchInfo${matchInfo.matchId}`} match={matchInfo} />
          <TeamCard key={`teamInfo${matchInfo.homeTeam}`} team={matchInfo.homeTeam} />
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
      <MatchButton enable={{ apply: true, approve: true }} />
    </div>
  );
};

export default Match;
