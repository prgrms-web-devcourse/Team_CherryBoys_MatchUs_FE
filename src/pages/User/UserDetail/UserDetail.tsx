import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '@/store';
import { getUserInfo, getUserMatchHistory } from '@/api/user';
import { AttitueTag, MatchListElement } from '@/components';
import { MatchElement, TagType } from '@/types';
import style from './userDetail.module.scss';
import baseTeamLogo from '@/assets/images/baseTeamLogo.png';
import {
  USER_MATCHING_LIST_PAGE,
  USER_TEAM_INVITAION_LIST_PAGE,
  USER_HIRE_REQUEST_LIST_PAGE,
  USER_EDIT_PAGE,
} from '@/consts/routes';

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
  tagContainer,
  titleContainer,
  historyButtonContainer,
  historyButton,
} = style;

const UserDetail = () => {
  const history = useHistory();
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
  const limitedTag = userInfo.tags.slice(0, 4);
  const { nickname, bio, id } = useSelector((store: RootState) => store.user.userInfo);
  const pathUserId = parseInt(window.location.pathname.split('/')[2], 10);

  const userId = pathUserId || id;

  useEffect(() => {
    const updateUserInfo = async () => {
      if (userId !== null) {
        const apiResult = await getUserInfo(userId);

        setUserInfo(apiResult);
      }
    };

    const updateUserMatchHistory = async () => {
      if (userId !== null) {
        const { userMatches } = await getUserMatchHistory(userId);

        setUserMatchHistory(userMatches);
      }
    };

    updateUserInfo();
    updateUserMatchHistory();
  }, [userId]);

  const { matchCount, mannerTemperature, myTeams } = userInfo;

  return (
    <div className={classNames(pageContainer)}>
      <section className={classNames(sectionContainer)}>
        <div className={classNames(userInfoElementsContainer)}>
          <div>
            <article className={playTotalInfo}>
              <div className={classNames(userBaseInfo)}>
                <div>
                  <span className={classNames(userNickname)}>
                    <span className={classNames(highlight)}>{userInfo.nickname || nickname}</span>???
                  </span>
                  {/* TODO: ????????? ??????????????? ?????? ??? ?????? ?????? */}
                  {userId === id && (
                    <div className={classNames(historyButtonContainer)}>
                      <button
                        type="button"
                        className={classNames(historyButton)}
                        onClick={() => history.push(USER_EDIT_PAGE)}
                      >
                        ??????
                      </button>
                      <button
                        type="button"
                        className={classNames(historyButton)}
                        onClick={() => history.push(USER_TEAM_INVITAION_LIST_PAGE)}
                      >
                        ??? ??????
                      </button>
                      <button
                        type="button"
                        className={classNames(historyButton)}
                        onClick={() => history.push(USER_HIRE_REQUEST_LIST_PAGE)}
                      >
                        ??????
                      </button>
                    </div>
                  )}
                </div>
                <span className={classNames(bioSpace)}>
                  {pathUserId === userId ? userInfo.bio : bio}
                </span>
              </div>
              <div className={classNames(sportsPart)}>??????</div>
            </article>

            <div className={classNames(tagContainer)}>
              {limitedTag.map(({ tagId, tagType, tagName }, index) => (
                <AttitueTag
                  key={`tag-${tagId}-${index}`}
                  tagId={tagId}
                  tagName={tagName}
                  tagType={tagType}
                />
              ))}
            </div>
            <p className={classNames(titleContainer)}>
              ??? <span className={classNames(matchHighlight)}>{matchCount}</span>?????? ??????
              <span
                className={classNames(mannerMiddle, {
                  [mannerLow]: mannerTemperature < 20,
                  [mannerHigh]: mannerTemperature > 40,
                })}
              >
                {mannerTemperature}
              </span>
              ??? ??????????????? ????????? ?????????!
            </p>
          </div>
        </div>
      </section>

      <span className={classNames(containerTitle)}>?????? ???</span>
      <section className={classNames(sectionContainer)}>
        <div className={classNames(elementRowContainer)}>
          {myTeams.map(({ teamId, teamLogo }, index) => (
            <Link to={`/team/${teamId}`} key={`team-${teamId}-${index}`}>
              <img
                className={classNames(logoImage)}
                src={teamLogo === '' || teamLogo === '?????????' ? baseTeamLogo : teamLogo}
                alt="??? ??????"
              />
            </Link>
          ))}
        </div>
      </section>

      <div>
        <span className={classNames(containerTitle)}>?????? ??????</span>
        <Link className={classNames(seeMore)} to={USER_MATCHING_LIST_PAGE}>
          ?????????
        </Link>
      </div>
      <div className={classNames(matchesContainer)}>
        {limitedUserMatchHistory.map(
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
              key={`userReview-${matchId}-${index}`}
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
