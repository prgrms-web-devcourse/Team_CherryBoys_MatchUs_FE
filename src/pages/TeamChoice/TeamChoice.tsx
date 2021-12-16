import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { RootState } from '@/store';
import style from './teamChoice.module.scss';
import { TeamInfo } from '@/types';
import { getTeamInfo } from '@/api';

const { highlight } = style;

const TeamChoice = () => {
  const [myTeams, setMyTeams] = useState<TeamInfo[]>([]);
  const result = useSelector((store: RootState) => store.auth.userInfo);

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
        </>
      ) : (
        <>
          <span className={classNames('whiteSpace')}>소속된 팀이 없어요 ❌</span>
          <span className={classNames('whiteSpace')}>
            새로운 <span className={classNames(highlight)}>팀</span>을 만들고
          </span>
          <span className={classNames('whiteSpace')}>다 함께 땀을 흘려볼까요? 🏃🏻</span>
          <div>
            <Link to="/team/new">+</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamChoice;
