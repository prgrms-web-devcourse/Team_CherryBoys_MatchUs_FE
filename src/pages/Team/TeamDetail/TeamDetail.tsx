/* eslint-disable @typescript-eslint/no-unused-expressions */
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './teamDetail.module.scss';
import { deleteTeam, withdrawTeam, getTeamInfo, getTotalMemberInfo, getMatchHistory } from '@/api';
import { MemberElement, MatchElement, TeamInfo } from '@/types';
import { MemberList, MatchListElement, CustomModalDialog, AttitueTag } from '@/components';
import baseTeamLogo from '@/assets/images/baseTeamLogo.png';
import { RootState } from '@/store';

const {
  entireContainer,
  teamBaseInfo,
  teamLogoBox,
  teamLogoImage,
  teamInfoContainer,
  bioSpace,
  teamNameSpan,
  tagsContainer,
  categoryTitle,
  teamCoreInfo,
  teamCoreElementContainer,
  teamCoreElementTitle,
  teamCoreElementContent,
  teamCoreSportType,
  teamMemberInfo,
  teamMemberTitle,
  seeMore,
  mannerLow,
  mannerMiddle,
  mannerHigh,
  countLow,
  countMiddle,
  countHigh,
  teamDataContainer,
  historyButtonContainer,
  teamMatchContainer,
  historyButton,
  modalMainTitle,
  modalSubTitle,
} = style;

const ageCollection: Record<string, string> = {
  TEENAGER: '10대',
  TWENTIES: '20대',
  THIRTIES: '30대',
  FORTIES: '40대',
  FIFTIES: '50대',
  SIXTIES: '60대',
  SEVENTIES: '70대',
};

const MODAL_MAIN_TITLE: Record<string, string> = {
  LEAVE: '정말 탈퇴하시겠습니까?',
  DISBAND: '정말 해체하시겠습니까?',
};

const MODAL_SUB_TITLE: Record<string, string> = {
  LEAVE: '탈퇴하시면 현재 팀에서 더이상 경기를 할 수 없어요.',
  DISBAND: '팀을 해체하면 되돌릴 수 없어요 :(',
};

const TeamDetail = () => {
  const history = useHistory();
  const teamId = parseInt(useParams<{ teamId: string }>().teamId, 10);

  const { userGradeResponse } = useSelector((store: RootState) => store.user.userInfo);

  const [modalMessageType, setModalMessageType] = useState('LEAVE');
  const [isModalDialogOpen, setIsModalDialogOpen] = useState(false);
  const [hasAuthorization, setHasAuthorization] = useState<boolean>(false);
  const [memberInfo, setMemberInfo] = useState<MemberElement[]>([]);
  const [matchHistory, setMatchHistory] = useState<MatchElement[]>([]);
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

  const {
    teamName,
    bio,
    tags,
    logo,
    matchCount,
    mannerTemperature,
    captainId,
    captainName,
    ageGroup,
    teamCreatedAt,
  } = teamInfo;

  const previousMatchHistory = matchHistory.filter((match) => match.status === 'COMPLETION');
  const hasMember = memberInfo.length !== 0;
  const hasHiredMember = memberInfo.filter((member) => member.grade === '용병').length !== 0;
  const hasPreviousMatchHistory = previousMatchHistory.length !== 0;
  const limitedTeamTags = tags.slice(0, 3);
  const yearMonthDay = teamCreatedAt.split('T');

  useEffect(() => {
    const authorization = userGradeResponse
      .map((team) => team.teamId === teamId && team.grade === 'CAPTAIN')
      .includes(true);

    setHasAuthorization(authorization);

    const updateTeamMatchHistory = async () => {
      if (teamId !== null) {
        const { teamMatches } = await getMatchHistory(teamId);

        if (teamMatches) {
          setMatchHistory(teamMatches);
        }
      }
    };

    const updateMemberInfo = async () => {
      if (teamId !== null) {
        const { members } = await getTotalMemberInfo(teamId);

        if (members) {
          setMemberInfo(members);
        }
      }
    };

    const updateTeamInfo = async () => {
      const result = await getTeamInfo(teamId);

      setTeamInfo(result);
    };

    updateTeamInfo();
    updateTeamMatchHistory();
    updateMemberInfo();
  }, [teamId, userGradeResponse]);

  return (
    <div className={classNames(entireContainer)}>
      <h1 className={classNames('a11yHidden')}>팀 상세보기 페이지</h1>

      {isModalDialogOpen && (
        <CustomModalDialog
          modalType="confirm"
          buttonLabel="전송"
          handleCancel={() => setIsModalDialogOpen(false)}
          handleApprove={() => {
            modalMessageType === 'LEAVE' ? withdrawTeam(teamId) : deleteTeam(teamId);
            setIsModalDialogOpen(false);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            {MODAL_MAIN_TITLE[modalMessageType]}
          </span>
          <span className={classNames('whiteSpace', modalSubTitle)}>
            {MODAL_SUB_TITLE[modalMessageType]}
          </span>
        </CustomModalDialog>
      )}

      <article className={classNames(teamBaseInfo)}>
        <div className={classNames(teamLogoBox)}>
          <img
            src={logo === '' || logo === null ? baseTeamLogo : logo}
            className={classNames(teamLogoImage)}
            alt="팀 로고 이미지"
          />
        </div>
        <div className={classNames(teamInfoContainer)}>
          <span className={classNames(teamNameSpan)} key={`team-${teamId}`}>
            {teamName}
          </span>
          <div className={classNames(historyButtonContainer)}>
            {hasAuthorization && (
              <button
                type="button"
                className={classNames(historyButton)}
                onClick={() => history.push(`/team/${teamId}/edit`)}
              >
                수정
              </button>
            )}
            <button
              type="button"
              className={classNames(historyButton)}
              onClick={() => {
                hasAuthorization ? setModalMessageType('DISBAND') : setModalMessageType('LEAVE');
                setIsModalDialogOpen(true);
              }}
            >
              {hasAuthorization ? '팀 해체' : '팀 탈퇴'}
            </button>
          </div>
          <div className={classNames(bioSpace)}>{bio}</div>
          <section className={classNames(tagsContainer)}>
            {limitedTeamTags.map(({ tagId, tagName, tagType }, index) => (
              <AttitueTag
                key={`tag-${tagId}-${index}`}
                tagId={tagId}
                tagName={tagName}
                tagType={tagType}
              />
            ))}
          </section>
        </div>
      </article>

      <span className={classNames(categoryTitle)}>주요정보</span>
      <article className={classNames(teamCoreInfo)}>
        <section className={classNames(teamCoreElementContainer)}>
          <span className={classNames(teamCoreElementTitle)}>총 경기 수</span>
          <span
            className={classNames(teamCoreElementContent, countMiddle, {
              [countLow]: matchCount <= 20,
              [countHigh]: matchCount > 40,
            })}
          >
            {matchCount}
          </span>
        </section>
        <section className={classNames(teamCoreElementContainer)}>
          <span className={classNames(teamCoreElementTitle)}>매너온도</span>
          <span
            className={classNames(teamCoreElementContent, mannerMiddle, {
              [mannerHigh]: mannerTemperature > 40,
              [mannerLow]: mannerTemperature < 10,
            })}
          >
            {mannerTemperature}
          </span>
        </section>
        <section id={`captain-${captainId}`} className={classNames(teamCoreElementContainer)}>
          <span className={classNames(teamCoreElementTitle)}>운영진</span>
          <span className={classNames(teamCoreElementContent)}>{captainName}</span>
        </section>
        <section className={classNames(teamCoreElementContainer)}>
          <span className={classNames(teamCoreElementTitle)}>주요 종목 </span>
          <span className={classNames(teamCoreSportType)}>⚽️</span>
        </section>
        <section className={classNames(teamCoreElementContainer)}>
          <span className={classNames(teamCoreElementTitle)}>연령대</span>
          <span
            className={classNames(teamCoreElementContent, countLow, {
              [countMiddle]: ageGroup === 'THIRTIES',
              [countMiddle]: ageGroup === 'FORTIES',
              [countMiddle]: ageGroup === 'FIFTIES',
              [countHigh]: ageGroup === 'SIXTIES',
              [countHigh]: ageGroup === 'SEVENTIES',
            })}
          >
            {ageCollection[ageGroup]}
          </span>
        </section>
        <section className={classNames(teamCoreElementContainer)}>
          <span className={classNames(teamCoreElementTitle)}>생성일자</span>
          <span className={classNames(teamCoreElementContent)}>{yearMonthDay[0]}</span>
        </section>
      </article>

      <article className={classNames(teamMemberInfo)}>
        <div className={classNames(teamMemberTitle)}>
          <span className={classNames(categoryTitle)}>팀원 목록</span>
          <Link className={classNames(seeMore)} to={`/team/${teamId}/members`}>
            더보기
          </Link>
        </div>
        <div className={classNames(teamDataContainer)}>
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
              <span className={classNames('whiteSpace')}>팀원이 없습니다.</span>
              <span className={classNames('whiteSpace')}>
                열정 가득한 팀원을 모집하러 가볼까요?
              </span>
              <Link to="/team/select">팀원 모집</Link>
            </p>
          )}
        </div>
      </article>
      <article className={classNames(teamMemberInfo)}>
        <div className={classNames(teamMemberTitle)}>
          <span className={classNames(categoryTitle)}>용병 목록</span>
          <Link className={classNames(seeMore)} to={`/team/${teamId}/hired-members`}>
            더보기
          </Link>
        </div>
        <div className={classNames(teamDataContainer)}>
          {hasHiredMember ? (
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

      <article className={classNames(teamMemberInfo)}>
        <div className={classNames(teamMemberTitle)}>
          <span className={classNames(categoryTitle)}>매칭 목록</span>
          <Link className={classNames(seeMore)} to={`/team/${teamId}/match`}>
            더보기
          </Link>
        </div>
        <div className={classNames(teamMatchContainer)}>
          {hasPreviousMatchHistory ? (
            previousMatchHistory.map(
              (
                {
                  matchId,
                  matchDate,
                  registerTeamLogo,
                  registerTeamName,
                  applyTeamLogo,
                  applyTeamName,
                  status,
                },
                index
              ) => (
                <MatchListElement
                  key={`beforeMatch-${matchId}-${index}`}
                  matchId={matchId}
                  matchDate={matchDate}
                  registerTeamLogo={registerTeamLogo}
                  registerTeamName={registerTeamName}
                  applyTeamLogo={applyTeamLogo}
                  applyTeamName={applyTeamName}
                  status={status}
                />
              )
            )
          ) : (
            <p>
              <span className={classNames('whiteSpace')}>경기일정이 없습니다.</span>
              <span className={classNames('whiteSpace')}>경기 모집 글을 올리러 가볼까요?</span>
              <Link to="/matches/new">경기 등록</Link>
            </p>
          )}
        </div>
      </article>
    </div>
  );
};

export default TeamDetail;
