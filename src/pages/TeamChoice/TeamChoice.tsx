import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/store';
import style from './teamChoice.module.scss';
import { TeamInfo } from '@/types';
import { getTeamInfo } from '@/api';
import TeamInfoCard from './TeamInfoCard';
import { TEAM_CREATE_PAGE } from '@/consts/routes';

const {
  highlight,
  titleContainer,
  cardsContainer,
  addTeamButton,
  hasNoTeamContainer,
  mainTitle,
  subTitle,
  noTeamAddButton,
} = style;

const TeamChoice = () => {
  const history = useHistory();
  const [myTeams, setMyTeams] = useState<TeamInfo[]>([]);
  const result = useSelector((store: RootState) => store.user.userInfo);

  const handleMoveToTeamCreatePage = () => {
    history.push(TEAM_CREATE_PAGE);
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
          <div className={classNames(titleContainer)}>
            <p className={classNames(mainTitle)}>
              <span className={classNames('whiteSpace')}>자신이 속한</span>
              <span className={classNames('whiteSpace')}>
                <span className={classNames(highlight)}>팀</span>을 한 눈에 👀
              </span>
            </p>
          </div>
          <div className={classNames(cardsContainer)}>
            {myTeams.map(({ logo, teamId, teamName, teamCreatedAt, tags, mannerTemperature }) => {
              return (
                <TeamInfoCard
                  key={`teamCard-${teamId}`}
                  teamId={teamId}
                  teamLogo={logo}
                  teamName={teamName}
                  teamCreatedAt={teamCreatedAt}
                  tags={tags}
                  mannerTemperature={mannerTemperature}
                />
              );
            })}
          </div>
          <button
            type="button"
            className={classNames(addTeamButton)}
            onClick={handleMoveToTeamCreatePage}
          >
            +
          </button>
        </>
      ) : (
        <div className={classNames(hasNoTeamContainer)}>
          <article>
            <div>
              <span className={classNames(mainTitle, 'whiteSpace')}>소속된 팀이 없어요 ❌</span>
              <span className={classNames(subTitle, 'whiteSpace')}>
                새로운 <span className={classNames(highlight)}>팀</span>을 만들고
              </span>
              <span className={classNames(subTitle, 'whiteSpace')}>
                다 함께 땀을 흘려볼까요? 🏃🏻
              </span>
            </div>
            <button
              type="button"
              className={classNames(noTeamAddButton)}
              onClick={handleMoveToTeamCreatePage}
            >
              +
            </button>
          </article>
        </div>
      )}
    </div>
  );
};

export default TeamChoice;
