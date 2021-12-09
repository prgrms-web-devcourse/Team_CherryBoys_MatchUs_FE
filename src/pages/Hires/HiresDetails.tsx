import React from 'react';
import classNames from 'classnames';
import style from './hiresDetails.module.scss';
import MatchDetail from '@/components/Match/MatchDetail/MatchDetail';

export interface item {
  postId: number;
  teamLogo: string;
  date: string;
  startTime: string;
  city: string;
  region: string;
  groundName: string;
  position: string;
  ageGroup: string;
  teamMannerTemperature: string;
  hiredPlayerNumber: number;
  hirePlayerNumber: number;
  teamName: string;
  teamManagerName: string;
  detail: string;
}

export interface itemWrapper {
  hireItem: item;
}

const {
  card__teamInfos,
  card__leaderInfo,
  card__tags,
  card__gameInfos__gameSchedule,
  card__gameInfos__gameSchedule__upper,
} = style;

const HiresDetails = ({ hireItem }: itemWrapper) => {
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
          <span>{teamMannerTemperature}</span>
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

export default HiresDetails;
