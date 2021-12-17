import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getUserMatchHistory } from '@/api/user';
import { MatchElement } from '@/types';
import style from './userMatchDetail.module.scss';
import { MatchListElement } from '@/components';

const { matchComponentContainer, mainTitle, highlight, titleContainer } = style;

const UserMatchDetail = () => {
  const [userMatchHistory, setUserMatchHistory] = useState<MatchElement[]>([]);
  const result = useSelector((store: RootState) => store.auth.userInfo);

  const updateUserMatchHistory = useCallback(async () => {
    const newMatchHistory = await getUserMatchHistory(result?.id);

    setUserMatchHistory(newMatchHistory);
  }, [result?.id]);

  useEffect(() => {
    updateUserMatchHistory();
  }, [updateUserMatchHistory]);

  return (
    <>
      <div>
        <h1 className={classNames('a11yHidden')}>개인 매칭 상세보기 페이지</h1>
        <div className={classNames(matchComponentContainer)}>
          <div className={classNames(titleContainer)}>
            <p className={classNames(mainTitle)}>
              <span className={classNames('whiteSpace')}>{result?.nickname}님의</span>
              <span>
                멋진 <span className={classNames(highlight)}>경기 이력</span>
              </span>
              <span className={classNames('whiteSpace')}>살펴볼까요? 🏃🏻 </span>
            </p>
          </div>
        </div>
        <div>
          {userMatchHistory.map(
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
        </div>
      </div>
    </>
  );
};

export default UserMatchDetail;
