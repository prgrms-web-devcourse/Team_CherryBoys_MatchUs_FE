import React from 'react';
import { useSelector } from 'react-redux';
import { MatchCard } from '@/components';
import { RootState } from '@/store';

const MatchList = () => {
  const { data } = useSelector((store: RootState) => store.matches);

  return (
    <div>
      <ul>
        {data.matches.map((match) => (
          <MatchCard key={match.matchId} match={match} />
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
