import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getUserInfo, getUserMatchHistory } from '@/api/user';
import { MatchListElement } from '@/components';
import { MatchElement } from '@/types';

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

const UserDetail = () => {
  const [matchHistory, setMatchHistory] = useState<MatchElement[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    ageGroup: '20대',
    bio: '카운팅 스타~ 밤 하늘의 퍼얼',
    gender: 'MALE',
    mannerTemperature: 36.5,
    matchCount: 20,
    myTeams: [],
    name: '김동현',
    nickname: '무리뉴',
    sportsName: '축구',
    tagNames: [],
  });

  const result = useSelector((store: RootState) => store.user.userInfo);

  const updateUserInfo = useCallback(async () => {
    const apiResult = await getUserInfo(result?.id);

    setUserInfo(apiResult);
  }, [result?.id]);

  const updateUserMatchHistory = useCallback(async () => {
    const newMatchHistory = await getUserMatchHistory(result?.id);

    setMatchHistory(newMatchHistory);
  }, [result?.id]);

  useEffect(() => {
    updateUserInfo();
    updateUserMatchHistory();
  }, [updateUserInfo, updateUserMatchHistory]);

  return (
    <>
      <div>
        <div>
          <span>{result?.nickname}님</span>
          <span>{result?.bio}</span>
          {/* <img>대강 축구공 이미지</img> */}
        </div>
        <div>
          <div>
            {userInfo.tagNames.map((tag) => {
              return <span>{tag}</span>;
            })}
          </div>
          <span>
            총 {userInfo.matchCount}경기 동안 {userInfo.mannerTemperature}의 매너온도를 가지고
            있어요!
          </span>
        </div>
      </div>
      소속팀
      <div>
        {userInfo.myTeams.map((team) => {
          return <img src={team.teamLogo} alt="팀 로고" />;
        })}
      </div>
      최근 경기
      {matchHistory.map(
        ({
          matchId,
          matchDate,
          registerTeamLogo,
          registerTeamName,
          applyTeamLogo,
          applyTeamName,
          status,
        }) => {
          return (
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
          );
        }
      )}
    </>
  );
};

export default UserDetail;
