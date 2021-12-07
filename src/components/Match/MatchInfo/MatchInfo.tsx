import React from 'react';
import classNames from 'classnames';
import { Match } from '@/dummyMatch';
import styles from './MatchInfo.module.scss';

interface Props {
  match: Match;
}

const { matchInfoCard, matchInfoRow, importantInfo, normalInfo, matchInfo, matchInfo_content } =
  styles;

const MatchInfo = ({ match }: Props) => {
  return (
    <div className={classNames(matchInfoCard)}>
      <div className={classNames(matchInfoRow)}>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{`${match.date} ${match.startTime}`}</div>
        </div>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{match.sports}</div>
        </div>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{match.status}</div>
        </div>
      </div>
      <div className={classNames(matchInfoRow, importantInfo)}>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>
            {`${match.city} ${match.region} ${match.groundName}`}
          </div>
        </div>
      </div>
      <div className={classNames(matchInfoRow, normalInfo)}>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{match.ageGroup}</div>
        </div>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{match.cost}</div>
        </div>
      </div>
    </div>
  );
};

export default MatchInfo;
