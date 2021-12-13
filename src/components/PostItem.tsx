import React from 'react';
import classNames from 'classnames';
import style from './postItem.module.scss';

import { Post } from '@/store/posts';

const { card, gameInfos, tags, gameSchedule } = style;

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
      <li>
        <article className={classNames(card)}>
          <section className={classNames(gameInfos)}>
            <img src={teamLogo} alt={`team logo ${isMatching ? matchId : postId}`} />
            <div className={classNames(gameSchedule)}>
              <div>{`${date} ${startTime}`}</div>
              <div>{`${city} ${region} ${groundName}`}</div>
            </div>
          </section>
          <section className={classNames(tags)}>
            <span>{isMatching ? `${cost}원` : position}</span>
            <span>{`${ageGroup.slice(0, ageGroup.length - 1)}대`}</span>
            <span>{`${teamMannerTemperature}도`}</span>
          </section>
        </article>
      </li>
    </>
  );
};

export default PostItem;
