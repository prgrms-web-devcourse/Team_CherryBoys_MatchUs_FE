import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { RootState } from '@/store';
import { getUserInfo, getUserMatchHistory } from '@/api/user';
import { AttitueTag, MatchListElement } from '@/components';
import { MatchElement, TagType } from '@/types';
import style from './userDetail.module.scss';
import baseTeamLogo from '@/assets/images/baseTeamLogo.png';
import { USER_MATCHING_LIST_PAGE } from '@/consts/routes';

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
  tags: TagType[];
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
  logoImage,
  seeMore,
} = style;

const UserDetail = () => {
  const [userMatchHistory, setUserMatchHistory] = useState<MatchElement[]>([]);
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
    tags: [],
  });

  const limitedUserMatchHistory = userMatchHistory.slice(0, 3);

  const { nickname, bio, id: userId } = useSelector((store: RootState) => store.user.userInfo);

  useEffect(() => {
    const updateUserInfo = async () => {
      const apiResult = await getUserInfo(userId);

      setUserInfo(apiResult);
    };

    const updateUserMatchHistory = async () => {
      const { userMatches } = await getUserMatchHistory(userId);

      setUserMatchHistory(userMatches);
    };

    updateUserInfo();
    updateUserMatchHistory();
  }, [userId]);

  const { tags, matchCount, mannerTemperature, myTeams } = userInfo;

  return (
    <div className={classNames(pageContainer)}>
      <section className={classNames(sectionContainer)}>
        <div className={classNames(userInfoElementsContainer)}>
          <div>
            <article className={playTotalInfo}>
              <div className={classNames(userBaseInfo)}>
                <div>
                  <span className={classNames(userNickname)}>
                    <span className={classNames(highlight)}>{nickname}</span>님
                  </span>
                  {/* TODO: 아이콘 라이브러리 통일 후 변경 예정 */}
                  <button type="button">수정</button>
                </div>
                <span className={classNames(bioSpace)}>{bio}</span>
              </div>
              <div className={classNames(sportsPart)}>⚽️</div>
            </article>

            <div className={classNames('whiteSpace')}>
              {tags.map(({ tagId, tagType, tagName }) => (
                <>
                  <AttitueTag tagId={tagId} tagName={tagName} tagType={tagType} />
                </>
              ))}
            </div>
            <p>
              총 <span className={classNames(matchHighlight)}>{matchCount}</span>경기 동안
              <span
                className={classNames(mannerMiddle, {
                  [mannerLow]: mannerTemperature < 20,
                  [mannerHigh]: mannerTemperature > 40,
                })}
              >
                {mannerTemperature}
              </span>
              의 매너온도를 가지고 있어요!
            </p>
          </div>
        </div>
      </section>

      <span className={classNames(containerTitle)}>소속 팀</span>
      <section className={classNames(sectionContainer)}>
        <div className={classNames(elementRowContainer)}>
          {myTeams.map(({ teamId, teamLogo }) => (
            <img
              className={classNames(logoImage)}
              key={`team-${teamId}`}
              src={teamLogo === '' || teamLogo === '팀로고' ? baseTeamLogo : teamLogo}
              alt="팀 로고"
            />
          ))}
        </div>
      </section>

      <div>
        <span className={classNames(containerTitle)}>최근 경기</span>
        <Link className={classNames(seeMore)} to={USER_MATCHING_LIST_PAGE}>
          더보기
        </Link>
      </div>
      <div className={classNames(matchesContainer)}>
        {limitedUserMatchHistory.map(
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
