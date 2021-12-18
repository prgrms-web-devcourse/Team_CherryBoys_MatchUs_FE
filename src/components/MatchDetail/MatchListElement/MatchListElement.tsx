import React from 'react';
import classNames from 'classnames';
import style from './matchListElement.module.scss';

interface MatchInfoProps {
  matchId: number;
  matchDate: string;
  registerTeamName: string;
  registerTeamLogo: string;
  applyTeamName: string;
  applyTeamLogo: string;
  status: string;
}

const { matchDateSpan, matchContainer, teamInfoContainer, versus } = style;

const MatchListElement = ({
  matchId,
  matchDate,
  registerTeamLogo,
  registerTeamName,
  applyTeamLogo,
  applyTeamName,
  status,
}: MatchInfoProps) => {
  return (
    <>
      <span className={classNames(matchDateSpan)}>{matchDate}</span>
      <div className={classNames(matchContainer)}>
        <div className={classNames(teamInfoContainer)}>
          <img src={registerTeamLogo} alt="등록 팀 로고 이미지" />
          <p>{registerTeamName}</p>
        </div>
        <span className={classNames(versus)}>vs</span>
        <div>
          <img src={applyTeamLogo} alt="신청 팀 로고 이미지" />
          <p>{applyTeamName}</p>
        </div>
      </div>
    </>
  );
};

export default MatchListElement;
