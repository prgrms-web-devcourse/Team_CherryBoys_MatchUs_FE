import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/store';
import style from './teamChoice.module.scss';
import { TeamInfo } from '@/types';
import { getTeamInfo } from '@/api';
import TeamInfoCard from './TeamInfoCard';

const { highlight, addTeamButton } = style;

const TeamChoice = () => {
  const history = useHistory();
  const [myTeams, setMyTeams] = useState<TeamInfo[]>([]);
  const result = useSelector((store: RootState) => store.user.userInfo);

  const handleMoveToTeamCreatePage = () => {
    history.push('/team/new');
  };

  useEffect(() => {
    const updateMyTeamsInfo = () => {
      result.userGradeResponse.map(async (myTeamInfo) => {
        const teamInfo = await getTeamInfo(myTeamInfo.teamId);
        setMyTeams((prev) => [...prev, teamInfo]);
      });
    };

    updateMyTeamsInfo();
  }, [result.userGradeResponse]);

  return (
    <div>
      {myTeams.length !== 0 ? (
        <>
          <span className={classNames('whiteSpace')}>자신이 속한</span>
          <span className={classNames('whiteSpace')}>
            <span className={classNames(highlight)}>팀</span>을 한 눈에 👀
          </span>
          {myTeams.map(({ logo, teamId, teamName, teamCreatedAt, tagNames, mannerTemperature }) => {
            return (
              <TeamInfoCard
                key={`teamCard-${teamId}`}
                teamId={teamId}
                teamLogo={logo}
                teamName={teamName}
                teamCreatedAt={teamCreatedAt}
                tagNames={tagNames}
                mannerTemperature={mannerTemperature}
              />
            );
          })}
          <button
            type="button"
            className={classNames(addTeamButton)}
            onClick={handleMoveToTeamCreatePage}
          >
            +
          </button>
        </>
      ) : (
        <>
          <span className={classNames('whiteSpace')}>소속된 팀이 없어요 ❌</span>
          <span className={classNames('whiteSpace')}>
            새로운 <span className={classNames(highlight)}>팀</span>을 만들고
          </span>
          <span className={classNames('whiteSpace')}>다 함께 땀을 흘려볼까요? 🏃🏻</span>
          <button
            type="button"
            className={classNames(addTeamButton)}
            onClick={handleMoveToTeamCreatePage}
          >
            +
          </button>
        </>
      )}
    </div>
  );
};

export default TeamChoice;
