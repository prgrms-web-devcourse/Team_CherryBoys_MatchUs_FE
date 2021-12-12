import React from 'react';
import classNames from 'classnames';

import MatchDetail from '@/components/Match/MatchDetail/MatchDetail';
import style from './hiresDetailPage.module.scss';

const imageURL =
  'https://unsplash.com/photos/Cjfl8r_eYxY/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjM4Njc4Mjg5&force=true&w=80';

const hireItem = {
  postId: 1,
  teamLogo: imageURL,
  date: '2021-12-25',
  startTime: '14:00',
  city: '서울특별시',
  region: '광진구',
  groundName: '어린이대공원풋살장',
  position: '윙백',
  ageGroup: '20s',
  teamMannerTemperature: 36.5,
  hiredPlayerNumber: 1,
  hirePlayerNumber: 3,
  teamName: '쭝쭝',
  teamManagerName: '쭝',
  detail: '잘하는분 환영',
};

const {
  card__teamInfos,
  card__leaderInfo,
  card__tags,
  card__gameInfos__gameSchedule,
  card__gameInfos__gameSchedule__upper,
} = style;

const HiresDetailPage = () => {
  const {
    date,
    startTime,
    hirePlayerNumber,
    hiredPlayerNumber,
    city,
    region,
    groundName,
    position,
    ageGroup,
    teamMannerTemperature,
    teamLogo,
    teamName,
    teamManagerName,
    detail,
  } = hireItem;

  return (
    <>
      <article>
        <section>
          <div className={classNames(card__gameInfos__gameSchedule)}>
            <section className={classNames(card__gameInfos__gameSchedule__upper)}>
              <div>{`${date} ${startTime}`}</div>
              <div>{`${hiredPlayerNumber} / ${hirePlayerNumber}명`}</div>
            </section>
            <div>{`${city} ${region} ${groundName}`}</div>
          </div>
        </section>
        <section className={classNames(card__tags)}>
          <span>{position}</span>
          <span>{`${ageGroup.slice(0, ageGroup.length - 1)}대`}</span>
          <span>{`${teamMannerTemperature}도`}</span>
        </section>
      </article>
      <div>팀 정보</div>
      <article className={classNames(card__teamInfos)}>
        <img src={teamLogo} alt="team logo" />
        <div>
          <div>{teamName}</div>
          <section className={classNames(card__leaderInfo)}>
            <span>{teamManagerName}</span>
            <button type="button">채팅</button>
          </section>
        </div>
      </article>

      <MatchDetail key={1} match={{ matchId: 1, detail }} />
      <button type="button">신청 용병 확인</button>
    </>
  );
};

export default HiresDetailPage;