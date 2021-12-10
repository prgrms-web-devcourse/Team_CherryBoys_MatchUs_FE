import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import style from './teamDetail.module.scss';
import api from '@/api/core';
import { throwErrorMessage } from '@/utils';
import { deleteTeam, withdrawTeam } from '@/api';

const { teamBaseInfo, logImage, teamCoreInfo, teamMemberInfo, hiredMemberInfo, teamMathchesInfo } =
  style;

const TeamDetail = () => {
  // userGrade[teamId]
  const authorizaiton = false;
  const [teamId, setTeamId] = useState<number>();
  const [hasAuthorization, setHasAuthorization] = useState(authorizaiton);
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
    teamMembers: [{ userId: 0, userName: '', grade: '' }],
    hiredMembers: [{ userId: 0, userName: '', grade: '' }],
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
    teamMembers,
    hiredMembers,
    matchesSummary,
  } = teamInfo;

  const handleWithdrawTeam = () => {
    withdrawTeam(teamId);
  };

  const handleDeleteTeam = () => {
    deleteTeam(teamId);
  };

  useEffect(() => {
    const newTeamId = parseInt(window.location.pathname.split('/')[2], 10);

    if (newTeamId && newTeamId !== teamId) {
      setTeamId(newTeamId);
    }

    const getTeamInfo = async (id: number | undefined) => {
      if (id) {
        const { data } = await api
          .get({
            url: `/team/${id}`,
          })
          .catch(throwErrorMessage);

        setTeamInfo(data);
      }
    };

    getTeamInfo(teamId);
  }, [teamId]);

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

      <article className={classNames(teamMemberInfo)}>
        {teamMembers.map((member) => (
          <div key={`member-${member.userId}`}>{member.userName}</div>
        ))}
      </article>

      {/* TODO: 매칭 리스트 상세보기 할 때, 추상화된 컴포넌트 만들 예정 */}
      <article className={classNames(teamMathchesInfo)}>
        {matchesSummary.map((match) => (
          <section key={`match-${match.matchId}`}>
            <img src={match.registerTeamLogo} alt="등록 팀 로고" />
            <img src={match.applyTeamLogo} alt="신청 팀 로고" />
          </section>
        ))}
      </article>

      <button type="button" onClick={hasAuthorization ? handleDeleteTeam : handleWithdrawTeam}>
        {hasAuthorization ? '팀 해체' : '팀 탈퇴'}
      </button>
    </div>
  );
};

export default TeamDetail;
