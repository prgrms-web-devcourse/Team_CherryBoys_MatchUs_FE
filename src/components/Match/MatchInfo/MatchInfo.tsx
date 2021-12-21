import React from 'react';
import classNames from 'classnames';
import { Match } from '@/types';
import styles from './MatchInfo.module.scss';

interface Props {
  match: Match;
}

interface MatchStatus {
  [key: string]: string;
}

const { matchInfoCard, matchInfoRow, importantInfo, normalInfo, matchInfo, matchInfo_content } =
  styles;

const MatchInfo = ({ match }: Props) => {
  const matchDate = new Date(`${match.date} ${match.endTime}`);
  const today = new Date();

  const matchStatus: MatchStatus = {
    WAITING: '매칭 모집중',
    COMPLETION: matchDate > today ? '매칭 성사!' : '평가 대기중',
    REVIEWED: '매칭 평가 완료',
  };

  return (
    <div className={classNames(matchInfoCard)}>
      <div className={classNames(matchInfoRow)}>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{`${match.date} ${JSON.stringify(
            match.startTime
          ).slice(1, 6)}`}</div>
        </div>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{match.sportName}</div>
        </div>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{matchStatus[match.status]}</div>
        </div>
      </div>
      <div className={classNames(matchInfoRow, importantInfo)}>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>
            {`${match.city} ${match.region} ${match.ground}`}
          </div>
        </div>
      </div>
      <div className={classNames(matchInfoRow, normalInfo)}>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{match.ageGroup}</div>
        </div>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{`${match.cost}원`}</div>
        </div>
      </div>
    </div>
  );
};

export default MatchInfo;
