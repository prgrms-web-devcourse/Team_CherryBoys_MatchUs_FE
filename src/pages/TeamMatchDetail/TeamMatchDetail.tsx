import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { Tabs } from '@karrotframe/tabs';
import { useHistory, useParams } from 'react-router-dom';
import style from './teamMatchDetail.module.scss';
import { Header, MatchListElement } from '@/components';
import '@karrotframe/tabs/index.css';
import { getMatchHistory } from '@/api';
import { MatchElement } from '@/types';
import { MATCHES_POST_PAGE } from '@/consts/routes';

const {
  matchComponentContainer,
  mainTitle,
  highlight,
  titleContainer,
  matchContainer,
  hasNoMatchContainer,
  noTeamMainTitle,
  noTeamSubTitle,
  noTeamAddButton,
} = style;

const TeamMatchDetail = () => {
  const history = useHistory();
  const teamId = parseInt(useParams<{ teamId: string }>().teamId, 10);
  const [activeTabKey, setActiveTabKey] = useState<string>('beforeMatch');
  const [teamMatchHistory, setTeamMatchHistory] = useState<MatchElement[]>([]);

  const watingMatch = teamMatchHistory.filter((match) => match.status === 'WAITING');
  const completedMatch = teamMatchHistory.filter((match) => match.status === 'COMPLETION');
  const reviewdMatch = teamMatchHistory.filter((match) => match.status === 'REVIEWED');

  const hasWatingMatchState = watingMatch.length !== 0;
  const hasCompletedMatchState = completedMatch.length !== 0;
  const hasReviewdMatchState = reviewdMatch.length !== 0;

  const updateTeamMatchHistory = useCallback(async () => {
    const { teamMatches } = await getMatchHistory(teamId);

    if (teamMatches) {
      setTeamMatchHistory(teamMatches);
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
                  <div
                    className={classNames(matchContainer, {
                      [matchContainer]: hasWatingMatchState,
                    })}
                  >
                    {hasWatingMatchState ? (
                      watingMatch.map(
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
                              key={`beforeMatch-${matchId}`}
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
                      )
                    ) : (
                      <div className={classNames(hasNoMatchContainer)}>
                        <article>
                          <div>
                            <span className={classNames(noTeamMainTitle, 'whiteSpace')}>
                              경기일정이 없습니다. ❌
                            </span>

                            <span className={classNames(noTeamSubTitle, 'whiteSpace')}>
                              경기 모집 글을 올리러 가볼까요?
                            </span>
                          </div>
                          <button
                            type="button"
                            className={classNames(noTeamAddButton)}
                            onClick={() => history.push(MATCHES_POST_PAGE)}
                          >
                            +
                          </button>
                        </article>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                key: 'BeforeReview',
                buttonLabel: '평가 전',
                render: () => (
                  <div className={classNames(matchContainer)}>
                    {hasCompletedMatchState ? (
                      completedMatch.map(
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
                            key={`beforeReview-${matchId}`}
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
                      <div className={classNames(hasNoMatchContainer)}>
                        <span className={classNames(noTeamMainTitle, 'whiteSpace')}>
                          모든 평가가 완료되었습니다🥳
                        </span>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                key: 'AfterReview',
                buttonLabel: '평가 후',
                render: () => (
                  <div className={classNames(matchContainer)}>
                    {hasReviewdMatchState ? (
                      reviewdMatch.map(
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
                              key={`afterReview-${matchId}`}
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
                      )
                    ) : (
                      <div className={classNames(hasNoMatchContainer)}>
                        <span className={classNames(noTeamMainTitle, 'whiteSpace')}>
                          평가 완료된 경기가 없습니다 👻
                        </span>
                      </div>
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

export default TeamMatchDetail;
