import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getUserMatchHistory } from '@/api/user';
import { MatchElement } from '@/types';
import style from './userMatchDetail.module.scss';
import { MatchListElement } from '@/components';

const { matchComponentContainer, mainTitle, highlight, titleContainer, matchesContainer } = style;

const UserMatchDetail = () => {
  const [userMatchHistory, setUserMatchHistory] = useState<MatchElement[]>([]);
  const { nickname, id: userId } = useSelector((store: RootState) => store.user.userInfo);

  useEffect(() => {
    const updateUserMatchHistory = async () => {
      const { userMatches } = await getUserMatchHistory(userId);

      setUserMatchHistory(userMatches);
    };

    updateUserMatchHistory();
  }, [userId]);

  return (
    <>
      <div>
        <h1 className={classNames('a11yHidden')}>개인 매칭 상세보기 페이지</h1>
        <div className={classNames(matchComponentContainer)}>
          <div className={classNames(titleContainer)}>
            <p className={classNames(mainTitle)}>
              <span className={classNames('whiteSpace')}>{nickname}님의</span>
              <span>
                멋진 <span className={classNames(highlight)}>경기 이력</span>
              </span>
              <span className={classNames('whiteSpace')}>살펴볼까요? 🏃🏻 </span>
            </p>
          </div>
        </div>
        <div className={classNames(matchesContainer)}>
          {userMatchHistory.map(
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
    </>
  );
};

export default UserMatchDetail;
