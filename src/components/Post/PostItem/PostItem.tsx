/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
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

  /**
   * Todo(홍중) :
   * 모달 컴포넌트 merge되면 카드뷰 형태로 만들기
   * 모달 컴포넌트 mrege되면 필터 완성하기
   * (2021-12-14)
   */

  const history = useHistory();

  const handleClickPostItme = () => {
    history.push(`/hires/${postId}`);
  };

  return (
    <>
      <li onClick={handleClickPostItme}>
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
