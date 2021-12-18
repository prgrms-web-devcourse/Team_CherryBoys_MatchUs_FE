import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '@/store';
import { getUserInfo, getUserMatchHistory } from '@/api/user';
import { MatchListElement } from '@/components';
import { MatchElement } from '@/types';
import style from './userDetail.module.scss';

interface MyTeamElement {
  teamId: number;
  teamLogo: string;
  teamName: string;
}

interface UserInfo {
  ageGroup: string;
  bio: string;
  gender: string;
  mannerTemperature: number;
  matchCount: number;
  myTeams: MyTeamElement[];
  name: string;
  nickname: string;
  sportsName: string;
  tagNames: string[];
}

const {
  pageContainer,
  sectionContainer,
  elementRowContainer,
  playTotalInfo,
  userBaseInfo,
  userInfoElementsContainer,
  bioSpace,
  userNickname,
  sportsPart,
  matchesContainer,
  containerTitle,
  highlight,
  matchHighlight,
  mannerLow,
  mannerMiddle,
  mannerHigh,
} = style;

const UserDetail = () => {
  const [matchHistory, setMatchHistory] = useState<MatchElement[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    ageGroup: '',
    bio: '',
    gender: '',
    mannerTemperature: 0,
    matchCount: 0,
    myTeams: [],
    name: '',
    nickname: '',
    sportsName: '',
    tagNames: [],
  });

  const limitedMatchHistory = matchHistory.slice(0, 3);

  const { nickname, bio, id: userId } = useSelector((store: RootState) => store.user.userInfo);

  const updateUserInfo = useCallback(async () => {
    const apiResult = await getUserInfo(userId);

    setUserInfo(apiResult);
  }, [userId]);

  const updateUserMatchHistory = useCallback(async () => {
    const { userMatches } = await getUserMatchHistory(userId);

    setMatchHistory(userMatches);
  }, [userId]);

  useEffect(() => {
    updateUserInfo();
    updateUserMatchHistory();
  }, [updateUserInfo, updateUserMatchHistory]);

  return (
    <div className={classNames(pageContainer)}>
      <section className={classNames(sectionContainer)}>
        {/* 중앙으로 정렬 */}
        <div className={classNames(userInfoElementsContainer)}>
          <div>
            <article className={playTotalInfo}>
              <div className={classNames(userBaseInfo)}>
                <div>
                  <span className={classNames(userNickname)}>
                    <span className={classNames(highlight)}>{nickname}</span>님
                  </span>
                  <button type="button">수정</button>
                </div>
                <span className={classNames(bioSpace)}>{bio}</span>
              </div>
              <div className={classNames(sportsPart)}>⚽️</div>
            </article>

            <div className={classNames('whiteSpace')}>
              {userInfo.tagNames.map((tag) => (
                <span>{tag}</span>
              ))}
            </div>
            <p>
              총 <span className={classNames(matchHighlight)}>{userInfo.matchCount}</span>경기 동안
              <span
                className={classNames(mannerMiddle, {
                  [mannerLow]: userInfo.mannerTemperature < 20,
                  [mannerHigh]: userInfo.mannerTemperature > 40,
                })}
              >
                {userInfo.mannerTemperature}
              </span>
              의 매너온도를 가지고 있어요!
            </p>
          </div>
        </div>
      </section>

      <span className={classNames(containerTitle)}>소속 팀</span>
      <section className={classNames(sectionContainer)}>
        <div className={classNames(elementRowContainer)}>
          {userInfo.myTeams.map(({ teamId, teamLogo }) => (
            <img key={`team-${teamId}`} src={teamLogo} alt="팀 로고" />
          ))}
        </div>
      </section>

      <span className={classNames(containerTitle)}>최근 경기</span>
      <div className={classNames(matchesContainer)}>
        {limitedMatchHistory.map(
          ({
            matchId,
            matchDate,
            registerTeamLogo,
            registerTeamName,
            applyTeamLogo,
            applyTeamName,
            status,
          }) => (
            <MatchListElement
              key={`userReview-${matchId}`}
              matchId={matchId}
              matchDate={matchDate}
              registerTeamLogo={registerTeamLogo}
              registerTeamName={registerTeamName}
              applyTeamLogo={applyTeamLogo}
              applyTeamName={applyTeamName}
              status={status}
            />
          )
        )}
      </div>
    </div>
  );
};

export default UserDetail;
