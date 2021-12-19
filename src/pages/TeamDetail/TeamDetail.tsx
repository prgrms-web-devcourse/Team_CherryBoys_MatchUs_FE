/* eslint-disable @typescript-eslint/no-unused-expressions */

import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from './teamDetail.module.scss';
import { deleteTeam, withdrawTeam, getTeamInfo, getTotalMemberInfo, getMatchHistory } from '@/api';
import { MemberElement, MatchElement, TeamInfo } from '@/types';
import { MemberList, MatchListElement, CustomModalDialog, AttitueTag } from '@/components';

const { teamBaseInfo, logImage, teamCoreInfo, teamMemberInfo, hiredMemberInfo, teamMathchesInfo } =
  style;
const TeamDetail = () => {
  const [modalMessage, setModalMessage] = useState('LEAVE');
  const [isModalDialogOpen, setIsModalDialogOpen] = useState(false);
  const teamId = parseInt(useParams<{ teamId: string }>().teamId, 10);
  // const authorization = userGrade[teamId] === 'captain' || userGrade[teamId] === 'subCaptain';
  const [hasAuthorization, setHasAuthorization] = useState<boolean>(true); // TODO : authorization으로 대체 예정
  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    ageGroup: '',
    bio: '',
    captainId: 0,
    logo: '',
    captainName: '',
    mannerTemperature: 0,
    matchCount: 0,
    sportsName: '',
    tags: [],
    teamCreatedAt: '',
    teamId: 0,
    teamName: '',
  });
  const [memberInfo, setMemberInfo] = useState<MemberElement[]>([]);
  const [matchHistory, setMatchHistory] = useState<MatchElement[]>([]);

  const MODAL_MAIN_TITLE: Record<string, string> = {
    LEAVE: '정말 탈퇴하시겠습니까?',
    DISBAND: '정말 해체하시겠습니까?',
  };

  const MODAL_SUB_TITLE: Record<string, string> = {
    LEAVE: '탈퇴하시면 현재 팀에서 더이상 경기를 할 수 없어요.',
    DISBAND: '팀을 해체하면 되돌릴 수 없어요 :(',
  };

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
    tags,
    matchCount,
    mannerTemperature,
    captainId,
    captainName,
    ageGroup,
    teamCreatedAt,
  } = teamInfo;

  const { modalMainTitle, modalSubTitle } = style;

  useEffect(() => {
    const updateTeamMatchHistory = async () => {
      const { teamMatches } = await getMatchHistory(teamId);

      if (teamMatches) {
        setMatchHistory(teamMatches);
      }
    };

    const updateMemberInfo = async () => {
      const { members } = await getTotalMemberInfo(teamId);

      if (members) {
        setMemberInfo(members);
      }
    };

    const updateTeamInfo = async () => {
      const result = await getTeamInfo(teamId);

      setTeamInfo(result);
    };

    updateTeamInfo();
    updateTeamMatchHistory();
    updateMemberInfo();
  }, [teamId]);

  return (
    <div>
      <h1 className={classNames('a11yHidden')}>팀 상세보기 페이지</h1>
      {isModalDialogOpen && (
        <CustomModalDialog
          modalType="confirm"
          buttonLabel="전송"
          handleCancel={() => setIsModalDialogOpen(false)}
          handleApprove={() => {
            modalMessage === 'LEAVE' ? withdrawTeam(teamId) : deleteTeam(teamId);
            setIsModalDialogOpen(false);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            {MODAL_MAIN_TITLE[modalMessage]}
          </span>
          <span className={classNames('whiteSpace', modalSubTitle)}>
            {MODAL_SUB_TITLE[modalMessage]}
          </span>
        </CustomModalDialog>
      )}
      {hasAuthorization && <Link to={`/team/${teamId}/edit`}>수정</Link>}
      <article className={classNames(teamBaseInfo)}>
        <img className={classNames(logImage)} alt="팀 로고 이미지" />
        <p key={`team-${teamId}`}>{teamName}</p>
        <div>팀 세부설명{bio}</div>
        {tags.map(({ tagId, tagName, tagType }) => (
          <>
            <AttitueTag tagId={tagId} tagName={tagName} tagType={tagType} />
          </>
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
              memberIndexLimit={3}
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
              hiredIndexLimit={3}
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
      <button
        type="button"
        onClick={() => {
          hasAuthorization ? setModalMessage('DISBAND') : setModalMessage('LEAVE');
          setIsModalDialogOpen(true);
        }}
      >
        {hasAuthorization ? '팀 해체' : '팀 탈퇴'}
      </button>
    </div>
  );
};

export default TeamDetail;
