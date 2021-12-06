import React from 'react';
import classNames from 'classnames';
import { Match } from '@/dummyMatch';
import styles from './MatchInfo.module.scss';

interface Props {
  match: Match;
}

const MatchInfo = ({ match }: Props) => {
  return (
    <div className={classNames(styles.matchInfoCard)}>
      <div className={classNames(styles.matchInfoRow)}>
        <div className={classNames(styles.matchInfo, styles.notice)}>
          <div className={classNames(styles.matchInfo_name)}>D-day</div>
          <div className={classNames(styles.matchInfo_content)}>5</div>
        </div>
        <div className={classNames(styles.matchInfo, styles.notice)}>
          <div className={classNames(styles.matchInfo_name)}>상태</div>
          <div className={classNames(styles.matchInfo_content)}>모집중</div>
        </div>
      </div>
      <div className={classNames(styles.matchInfoRow)}>
        <div className={classNames(styles.matchInfo, styles.normal)}>
          <div className={classNames(styles.matchInfo_name)}>연령대</div>
          <div className={classNames(styles.matchInfo_content)}>{match.ageGroup}</div>
        </div>
        <div className={classNames(styles.matchInfo, styles.normal)}>
          <div className={classNames(styles.matchInfo_name)}>참가비</div>
          <div className={classNames(styles.matchInfo_content)}>{match.cost}</div>
        </div>
      </div>
      <div className={classNames(styles.matchInfoRow)}>
        <div className={classNames(styles.matchInfo, styles.important)}>
          <div className={classNames(styles.matchInfo_name)}>날짜</div>
          <div className={classNames(styles.matchInfo_content)}>
            {`${match.date} ${match.startTime}`}
          </div>
        </div>
        <div className={classNames(styles.matchInfo, styles.important)}>
          <div className={classNames(styles.matchInfo_name)}>장소</div>
          <div className={classNames(styles.matchInfo_content)}>
            {`${match.city} ${match.region} ${match.groundName}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchInfo;
