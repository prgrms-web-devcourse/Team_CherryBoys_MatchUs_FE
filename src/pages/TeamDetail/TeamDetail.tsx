/* eslint-disable no-restricted-globals */
import classNames from 'classnames';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from './teamDetail.module.scss';

import { deleteTeam, withdrawTeam, getTeamInfo, getTotalMemberInfo, getMatchHistory } from '@/api';
import { MemberElement, MatchElement } from '@/types';
import { MemberList, MatchListElement } from '@/components';

const { teamBaseInfo, logImage, teamCoreInfo, teamMemberInfo, hiredMemberInfo, teamMathchesInfo } =
  style;

const TeamDetail = () => {
  const teamId = parseInt(useParams<{ teamId: string }>().teamId, 10);
  // const authorization = userGrade[teamId] === 'captain' || userGrade[teamId] === 'subCaptain';
  const [hasAuthorization, setHasAuthorization] = useState<boolean>(true); // TODO : authorization으로 대체 예정
  const [teamInfo, setTeamInfo] = useState({
    teamId: 0,
    teamName: '',
    bio: '',
    sportsName: '',
    tagNames: [],
    matchCount: 0,
    mannerTemperature: 0,
    captainId: 0,
    captainName: '',
    ageGroup: '',
    teamCreatedAt: '',
  });
  const [memberInfo, setMemberInfo] = useState<MemberElement[]>([]);
  const [matchHistory, setMatchHistory] = useState<MatchElement[]>([]);

  const previousMatchHistory = matchHistory.filter((match) => {
    if (match.status === 'previousMatch') return true;
    return false;
  });

  const hasMember = memberInfo.length !== 0;
  const hasPreviousMatchHistory = previousMatchHistory.length !== 0;

  const {
    teamName,
    bio,
    sportsName,
    tagNames,
    matchCount,
    mannerTemperature,
    captainId,
    captainName,
    ageGroup,
    teamCreatedAt,
  } = teamInfo;

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

  const updateTeamInfo = useCallback(async () => {
    const result = await getTeamInfo(teamId);

    setTeamInfo(result);
  }, [teamId]);

  const updateMemberInfo = useCallback(async () => {
    const { members } = await getTotalMemberInfo(teamId);

    if (members) {
      setMemberInfo(members);
    }
  }, [teamId]);

  const updateTeamMatchHistory = useCallback(async () => {
    const { teamMatches } = await getMatchHistory(teamId);

    if (teamMatches) {
      setMatchHistory(teamMatches);
    }
  }, [teamId]);

  useEffect(() => {
    updateTeamInfo();
    updateTeamMatchHistory();
    updateMemberInfo();
  }, [updateTeamInfo, updateMemberInfo, updateTeamMatchHistory]);

  return (
    <div>
      <h1 className={classNames('a11yHidden')}>팀 상세보기 페이지</h1>
      {hasAuthorization && <Link to={`/team/${teamId}/edit`}>수정</Link>}
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
        <section>매너온도 {mannerTemperature}</section>
        <section id={`captain-${captainId}`}>{`운영진 ${captainName}`}</section>
        <section>주요 종목 {sportsName}</section>
        <section>연령대 {ageGroup}</section>
        <section>생성일자 {teamCreatedAt}</section>
      </article>

      <article className={classNames(teamMemberInfo)}>
        <div>
          팀원 목록
          <Link to={`/team/${teamId}/members`}>더보기</Link>
        </div>
        <div>
          {hasMember ? (
            <MemberList
              isMember
              memberInfo={memberInfo}
              hasAuthorization={false}
              isEditing={false}
              hasCategoryTitle={false}
            />
          ) : (
            <p>
              <span className={classNames('whiteSpace')}>팀원이이 없습니다.</span>
              <span className={classNames('whiteSpace')}>
                열정 가득한 팀원을 모집하러 가볼까요?
              </span>
              <Link to="/team/select">팀원 모집</Link>
            </p>
          )}
        </div>
      </article>

      <article className={classNames(hiredMemberInfo)}>
        <div>
          용병 목록
          <Link to={`/team/${teamId}/hired-members`}>더보기</Link>
        </div>
        <div>
          {hasMember ? (
            <MemberList
              isMember={false}
              memberInfo={memberInfo}
              hasAuthorization={false}
              isEditing={false}
              hasCategoryTitle={false}
            />
          ) : (
            <p>
              <span className={classNames('whiteSpace')}>용병이 없습니다.</span>
              <span className={classNames('whiteSpace')}>멋진 용병을 모집하러 가볼까요?</span>
              <Link to="/hires/post/new">용병 모집</Link>
            </p>
          )}
        </div>
      </article>

      {/* TODO: 매칭 리스트 상세보기 할 때, 추상화된 컴포넌트 만들 예정 */}
      <article className={classNames(teamMathchesInfo)}>
        <div>
          매칭 목록
          <Link to={`/team/${teamId}/match`}>더보기</Link>
        </div>
        {hasPreviousMatchHistory ? (
          previousMatchHistory.map((match) => {
            return (
              <MatchListElement
                key={`beforeMatch-${match.matchId}`}
                matchId={match.matchId}
                matchDate={match.matchDate}
                registerTeamLogo={match.registerTeamLogo}
                registerTeamName={match.registerTeamName}
                applyTeamLogo={match.applyTeamLogo}
                applyTeamName={match.applyTeamName}
                status={match.status}
              />
            );
          })
        ) : (
          <p>
            <span className={classNames('whiteSpace')}>경기일정이 없습니다.</span>
            <span className={classNames('whiteSpace')}>경기 모집 글을 올리러 가볼까요?</span>
            <Link to="/matches/new">경기 등록</Link>
          </p>
        )}
      </article>

      <button type="button" onClick={hasAuthorization ? handleDeleteTeam : handleWithdrawTeam}>
        {hasAuthorization ? '팀 해체' : '팀 탈퇴'}
      </button>
    </div>
  );
};

export default TeamDetail;
