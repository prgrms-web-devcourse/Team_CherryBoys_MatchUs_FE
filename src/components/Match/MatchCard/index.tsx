import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Match } from '@/dummyMatch';

interface Props {
  match: Omit<Match, 'homeTeam'>;
}

const MatchCard = ({ match }: Props) => {
  return (
    <li>
      <h3>{`${match.city} ${match.region} ${match.groundName}`}</h3>
      <h3>{`${match.date} ${match.startTime}`}</h3>
      <div>
        <ul>
          <span>{match.cost}</span>
          <span>{match.ageGroup}</span>
        </ul>
      </div>
      <button type="button">
        <Link to={`/matches/${match.matchId}`}>JOIN</Link>
      </button>
    </li>
  );
};

export default MatchCard;
