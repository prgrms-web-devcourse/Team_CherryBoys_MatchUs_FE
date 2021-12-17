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
  // TODO: 체리와 로그인 연결한 후에 지울 데이터입니다.
  const [myTeams, setMyTeams] = useState<TeamInfo[]>([
    {
      ageGroup: '12',
      bio: '12',
      captainId: 1,
      captainName: '12',
      mannerTemperature: 36.5,
      matchCount: 0,
      sportsName: '12',
      tagNames: [],
      teamCreatedAt: '언제언제 만들어짐',
      teamId: 1,
      teamName: '김동현과김동현',
    },
  ]);
  const result = useSelector((store: RootState) => store.auth.userInfo);

  const handleMoveToTeamCreatePage = () => {
    history.push('/team/new');
  };

  useEffect(() => {
    const updateMyTeamsInfo = () => {
      result?.userGrade?.map(async (myTeamInfo) => {
        const teamInfo = await getTeamInfo(myTeamInfo.teamId);

        setMyTeams((prev) => [...prev, teamInfo]);
      });
    };

    updateMyTeamsInfo();
  });

  return (
    <div>
      {myTeams.length !== 0 ? (
        <>
          <span className={classNames('whiteSpace')}>자신이 속한</span>
          <span className={classNames('whiteSpace')}>
            <span className={classNames(highlight)}>팀</span>을 한 눈에 👀
          </span>
          {myTeams.map(({ teamId, teamName, teamCreatedAt, tagNames, mannerTemperature }) => {
            return (
              <TeamInfoCard
                teamId={teamId}
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
