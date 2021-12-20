import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import style from './matchListElement.module.scss';
import baseTeamLogo from '@/assets/images/baseTeamLogo.png';

interface MatchInfoProps {
  matchId: number;
  matchDate: string;
  registerTeamName: string;
  registerTeamLogo: string;
  applyTeamName: string;
  applyTeamLogo: string;
  status: string;
}

const { matchDateSpan, matchContainer, teamInfoContainer, versus, logoImage, matchButton } = style;

const MatchListElement = ({
  matchId,
  matchDate,
  registerTeamLogo,
  registerTeamName,
  applyTeamLogo,
  applyTeamName,
  status,
}: MatchInfoProps) => {
  const yearMonthDay = matchDate.split('-');
  const history = useHistory();

  return (
    <>
      <span className={classNames(matchDateSpan)}>
        {yearMonthDay[0]}년 {yearMonthDay[1]}월 {yearMonthDay[1]}일
      </span>
      <button
        type="button"
        className={classNames(matchButton)}
        onClick={() => history.push(`/matches/post/${matchId}`)}
      >
        <div className={classNames(matchContainer)}>
          <div className={classNames(teamInfoContainer)}>
            <img
              className={classNames(logoImage)}
              src={
                registerTeamLogo === '' || registerTeamLogo === '팀로고'
                  ? baseTeamLogo
                  : registerTeamLogo
              }
              alt="등록 팀 로고 이미지"
            />
            <span>{registerTeamName}</span>
          </div>
          <span className={classNames(versus)}>vs</span>
          <div className={classNames(teamInfoContainer)}>
            <img
              className={classNames(logoImage)}
              src={
                applyTeamLogo === '' || applyTeamLogo === '팀로고' ? baseTeamLogo : applyTeamLogo
              }
              alt="신청 팀 로고 이미지"
            />
            <span>{applyTeamName}</span>
          </div>
        </div>
      </button>
    </>
  );
};

export default MatchListElement;
