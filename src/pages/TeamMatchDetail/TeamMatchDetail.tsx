import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { Tabs } from '@karrotframe/tabs';
import { Link, useParams } from 'react-router-dom';
import style from './teamMatchDetail.module.scss';
import { Header, MatchListElement } from '@/components';
import '@karrotframe/tabs/index.css';
import { getMatchHistory } from '@/api';
import { MatchElement } from '@/types';

const { matchComponentContainer, mainTitle, highlight, titleContainer } = style;

const MatchDetail = () => {
  const teamId = parseInt(useParams<{ teamId: string }>().teamId, 10);
  const [matchHistory, setMatchHistory] = useState<MatchElement[]>([]);

  const previousMatch = matchHistory.filter((match) => match.status === 'previousMatch');
  const previousReview = matchHistory.filter((match) => match.status === 'previousReview');
  const endReview = matchHistory.filter((match) => match.status === 'endReview');

  const [activeTabKey, setActiveTabKey] = useState<string>('beforeMatch');

  const hasPreviousMatchState = previousMatch.length !== 0;
  const hasPreviousReviewState = previousReview.length !== 0;
  const hasEndReviewState = endReview.length !== 0;

  const updateTeamMatchHistory = useCallback(async () => {
    const { matchesSummary } = await getMatchHistory(teamId);

    // TODO: 객체 배열을 검사해서, 다른 경우에만 업데이트 하는 로직으로 개선*
    if (matchesSummary) {
      setMatchHistory(matchesSummary);
    }
  }, [teamId]);

  useEffect(() => {
    updateTeamMatchHistory();
  }, [updateTeamMatchHistory]);

  return (
    <>
      <div>
        <Header />
        <h1 className={classNames('a11yHidden')}>매칭 상세보기 페이지</h1>
        <div className={classNames(matchComponentContainer)}>
          <div className={classNames(titleContainer)}>
            <p className={classNames(mainTitle)}>
              <span className={classNames('whiteSpace')}>우리 팀의</span>
              <span>
                멋진 <span className={classNames(highlight)}>경기 이력</span>
              </span>
              <span className={classNames('whiteSpace')}>살펴볼까요? 🏃🏻 </span>
            </p>
          </div>
          <Tabs
            activeTabKey={activeTabKey}
            tabs={[
              {
                key: 'beforeMatch',
                buttonLabel: '매칭 전',
                render: () => (
                  <div>
                    {hasPreviousMatchState ? (
                      previousMatch.map((match) => {
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
                        <span className={classNames('whiteSpace')}>
                          경기 모집 글을 올리러 가볼까요?
                        </span>
                        <Link to="/matches/new">경기 등록</Link>
                      </p>
                    )}
                  </div>
                ),
              },
              {
                key: 'BeforeReview',
                buttonLabel: '평가 전',
                render: () => (
                  <div>
                    {hasPreviousReviewState ? (
                      previousReview.map((match) => {
                        return (
                          <MatchListElement
                            key={`beforeReview-${match.matchId}`}
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
                      <div>모든 평가가 완료되었습니다🥳</div>
                    )}
                  </div>
                ),
              },
              {
                key: 'AfterReview',
                buttonLabel: '평가 후',
                render: () => (
                  <div>
                    {hasEndReviewState ? (
                      endReview.map((match) => {
                        return (
                          <MatchListElement
                            key={`afterReview-${match.matchId}`}
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
                      <div>평가 완료된 경기가 없습니다 🥵</div>
                    )}
                  </div>
                ),
              },
            ]}
            onTabChange={(key: string) => {
              setActiveTabKey(key);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MatchDetail;
