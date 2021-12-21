/* eslint-disable react/jsx-fragments */
import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import style from './MatchPostCard.module.scss';
import { MatchCard } from '@/types';
import baseTeamLogo from '@/assets/images/baseTeamLogo.png';

const { postCard, postBox, postTeamLogo, postInfos, postTags } = style;

interface Props {
  matchInfo: MatchCard;
}

const regex = /^[ㄱ-ㅎ|가-힣|0-9]+$/;

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
    mannerTemperature,
    sports,
  } = matchInfo;

  return (
    <li
      onClick={() => history.push(`/matches/post/${matchId}`)}
      role="presentation"
      className={classNames(postCard)}
    >
      <article className={classNames(postBox)}>
        <section className={classNames(postTeamLogo)}>
          <img
            src={
              regex.test(teamLogo) || teamLogo === '' || teamLogo === null ? baseTeamLogo : teamLogo
            }
            alt="team logo"
          />
        </section>
        <section className={classNames(postInfos)}>
          <div>
            <span>{JSON.stringify(date).slice(3, 11)}</span>
            <span>{JSON.stringify(startTime).slice(1, 6)}</span>
          </div>
          <div>
            <span>{`${city} ${region}`}</span>
            <p>{ground}</p>
          </div>
          <div className={classNames(postTags)}>
            <span>{sports}</span>
            <span>{ageGroup}</span>
            <span>{`${mannerTemperature}℃`}</span>
          </div>
        </section>
      </article>
    </li>
  );
};

export default MatchPostCard;
