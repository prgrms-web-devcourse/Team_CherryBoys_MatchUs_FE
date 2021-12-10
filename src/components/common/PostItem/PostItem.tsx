/* eslint-disable react/jsx-fragments */
import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import style from './postItem.module.scss';
import { Post } from '@/store/posts/posts';

const { postCard, postBox, postTeamLogo, postInfos, postTags } = style;

const PostItem = ({ item }: Post) => {
  const history = useHistory();

  const {
    matchId,
    postId,
    teamLogo,
    date,
    startTime,
    city,
    region,
    groundName,
    position,
    cost,
    ageGroup,
    teamMannerTemperature,
  } = item;

  const isMatching = Object.prototype.hasOwnProperty.call(item, 'matchId');

  return (
    <li
      key={isMatching ? matchId : postId}
      onClick={() => history.push(`/matches/post/${matchId}`)}
      role="presentation"
      className={classNames(postCard)}
    >
      <article className={classNames(postBox)}>
        <section className={classNames(postTeamLogo)}>
          <img src={teamLogo} alt={`team logo ${isMatching ? matchId : postId}`} />
        </section>
        <section className={classNames(postInfos)}>
          <div>{`${date} ${startTime}`}</div>
          <div>{`${city} ${region} ${groundName}`}</div>
          <div className={classNames(postTags)}>
            <span>{isMatching ? `${cost}원` : position}</span>
            <span>{`${ageGroup.slice(0, ageGroup.length - 1)}대`}</span>
            <span>{teamMannerTemperature}</span>
          </div>
        </section>
      </article>
    </li>
  );
};

export default PostItem;