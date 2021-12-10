import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import style from './teamDetail.module.scss';
import api from '@/api/core';
import { throwErrorMessage } from '@/utils';

const { teamBaseInfo, logImage, teamCoreInfo, teamPlayersInfo, teamMathchesInfo } = style;

const TeamDetail = () => {
  const teamId = 'temp';
  const [teamInfo, setTeamInfo] = useState({
    teamId: 0,
    teamName: '',
    bio: '',
    sportsName: '',
    tagNames: [],
    matchCount: 0,
    manner_temperature: 0,
    captainId: 0,
    captainName: '',
    ageGroup: '',
    teamCreatedAt: '',
    team_users: [{ userId: 0, userName: '', grade: '' }],
    matchesSummary: [
      {
        matchId: 0,
        matchDate: '',
        registerTeamName: '',
        registerTeamLogo: '',
        applyTeamName: '',
        applyTeamLogo: '',
      },
    ],
  });

  const {
    teamName,
    bio,
    sportsName,
    tagNames,
    matchCount,
    manner_temperature,
    captainId,
    captainName,
    ageGroup,
    teamCreatedAt,
    team_users,
    matchesSummary,
  } = teamInfo;

  useEffect(() => {
    // TODO: 전역에서 TeamId 받는 로직 추가 필요.
    const getTeamInfo = async (id: string) => {
      const { data } = await api
        .get({
          url: `/team/${id}`,
        })
        .catch(throwErrorMessage);

      setTeamInfo(data);
    };

    getTeamInfo(teamId);
  }, []);

  return (
    <div>
      <article className={classNames(teamBaseInfo)}>
        <img className={classNames(logImage)} alt="팀 로고 이미지" />
        <p key={`team-${teamId}`}>{teamName}</p>
        <div>팀 세부설명{bio}</div>
        {tagNames.map((tagName) => (
          <span key={`tagName-${tagName}`}>{tagName}</span>
        ))}
      </article>

      <article className={classNames(teamCoreInfo)}>
        <section>총 경기 수{matchCount}</section>
        <section>매너온도 {manner_temperature}</section>
        <section key={`captain-${captainId}`}>{`운영진 ${captainName}`}</section>
        <section>주요 종목 {sportsName}</section>
        <section>연령대 {ageGroup}</section>
        <section>생성일자 {teamCreatedAt}</section>
      </article>

      <article className={classNames(teamPlayersInfo)}>
        {team_users.map((user) => (
          <span key={`user-${user.userId}`}>{user.userName}</span>
        ))}
      </article>

      <article className={classNames(teamMathchesInfo)}>
        {matchesSummary.map((match) => (
          <section key={`match-${match.matchId}`}>
            <img src={match.registerTeamLogo} alt="등록 팀 로고" />
            <img src={match.applyTeamLogo} alt="신청 팀 로고" />
          </section>
        ))}
      </article>
    </div>
  );
};

export default TeamDetail;
