/* eslint-disable no-restricted-globals */
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from './teamDetail.module.scss';
import api from '@/api/core';
import { throwErrorMessage } from '@/utils';
import { deleteTeam, withdrawTeam } from '@/api';

const { teamBaseInfo, logImage, teamCoreInfo, teamMemberInfo, hiredMemberInfo, teamMathchesInfo } =
  style;

const TeamDetail = () => {
  const teamId = parseInt(useParams<{ teamId: string }>().teamId, 10);
  // const authorization = userGrade[teamId] === 'captain' || userGrade[teamId] === 'subCaptain';
  const [hasAuthorization, setHasAuthorization] = useState<boolean>();
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

  //
  const handleWithdrawTeam = () => {
    // TODO: Modal Component Merge되면 교체 예정.
    if (confirm('정말 삭제하시겠습니까?')) {
      withdrawTeam(teamId);
    }
  };

  const handleDeleteTeam = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteTeam(teamId);
    }
  };

  useEffect(() => {
    const getTeamInfo = async (id: number) => {
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
      {hasAuthorization && <Link to={`/team/${teamId}`}>수정</Link>}
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
        <section id={`captain-${captainId}`}>{`운영진 ${captainName}`}</section>
        <section>주요 종목 {sportsName}</section>
        <section>연령대 {ageGroup}</section>
        <section>생성일자 {teamCreatedAt}</section>
      </article>

      <article className={classNames(teamMemberInfo)}>
        <div>
          팀원 목록
          <Link to={`/team/${teamId}/member`}>더보기</Link>
        </div>
        <div>
          {teamMembers.map((member) => (
            <div key={`member-${member.userId}`}>{member.userName}</div>
          ))}
        </div>
      </article>

      <article className={classNames(hiredMemberInfo)}>
        <div>
          용병 목록
          <Link to={`/team/${teamId}/hired`}>더보기</Link>
        </div>
        <div>
          {hiredMembers.map((member) => (
            <div key={`member-${member.userId}`}>{member.userName}</div>
          ))}
        </div>
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
