/* eslint-disable react/jsx-fragments */
import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import style from './MatchPostCard.module.scss';
import { MatchCard } from '@/types/match';

const { postCard, postBox, postTeamLogo, postInfos, postTags } = style;

interface Props {
  matchInfo: MatchCard;
}

const MatchPostCard = ({ matchInfo }: Props) => {
  const history = useHistory();

  const {
    matchId,
    city,
    region,
    ground,
    date,
    startTime,
    cost,
    ageGroup,
    teamLogo,
    teamMannerTemperature,
  } = matchInfo;

  return (
    <li
      onClick={() => history.push(`/matches/post/${matchId}`)}
      role="presentation"
      className={classNames(postCard)}
    >
      <article className={classNames(postBox)}>
        <section className={classNames(postTeamLogo)}>
          <img src={teamLogo} alt="team logo" />
        </section>
        <section className={classNames(postInfos)}>
          <div>{`${date} ${startTime}`}</div>
          <div>{`${city} ${region} ${ground}`}</div>
          <div className={classNames(postTags)}>
            <span>{`${cost}원`}</span>
            <span>{ageGroup}</span>
            <span>{teamMannerTemperature}</span>
          </div>
        </section>
      </article>
    </li>
  );
};

export default MatchPostCard;
