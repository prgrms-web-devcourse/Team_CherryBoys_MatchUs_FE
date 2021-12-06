/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { fetchMatchById } from '@/store/match';
import { MatchInfo, TeamCard, MatchDetail, MatchButton } from '@/components/Match';
import useMount from '@/hooks/useMount';

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
          <MatchDetail key={`matchDetail${matchInfo.matchId}`} match={matchInfo} />
        </Fragment>
      ))}
      <MatchButton enable={{ apply: true, approve: true }} />
    </div>
  );
};

export default Match;
