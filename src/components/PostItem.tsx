import React from 'react';
import classNames from 'classnames';
import style from './postItem.module.scss';

import { Post } from '@/store/posts';

const { card, card__gameInfos, card__tags, card__gameInfos__gameSchedule } = style;

const PostItem = ({ item }: Post) => {
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
    <>
      <li key={isMatching ? matchId : postId}>
        <article className={classNames(card)}>
          <section className={classNames(card__gameInfos)}>
            <img src={teamLogo} alt={`team logo ${isMatching ? matchId : postId}`} />
            <div className={classNames(card__gameInfos__gameSchedule)}>
              <div>{`${date} ${startTime}`}</div>
              <div>{`${city} ${region} ${groundName}`}</div>
            </div>
          </section>
          <section className={classNames(card__tags)}>
            <span>{isMatching ? `${cost}원` : position}</span>
            <span>{`${ageGroup.slice(0, ageGroup.length - 1)}대`}</span>
            <span>{teamMannerTemperature}</span>
          </section>
        </article>
      </li>
    </>
  );
};

export default PostItem;
