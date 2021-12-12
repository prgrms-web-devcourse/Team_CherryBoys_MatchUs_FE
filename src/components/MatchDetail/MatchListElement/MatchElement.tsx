import React from 'react';

interface MatchInfoProps {
  matchId: number;
  matchDate: string;
  registerTeamName: string;
  registerTeamLogo: string;
  applyTeamName: string;
  applyTeamLogo: string;
  status: string;
}

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
      <div>{matchDate}</div>
      <div>
        <img src={registerTeamLogo} alt="등록 팀 로고 이미지" />
        <p>{registerTeamName}</p>
      </div>
      <span>vs</span>
      <div>
        <img src={applyTeamLogo} alt="등록 팀 로고 이미지" />
        <p>{applyTeamName}</p>
      </div>
    </>
  );
};

export default MatchListElement;
