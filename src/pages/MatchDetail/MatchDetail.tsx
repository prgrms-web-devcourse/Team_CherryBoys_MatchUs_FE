import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Tabs } from '@karrotframe/tabs';
import style from './matchDetail.module.scss';
import { Header } from '@/components';
import '@karrotframe/tabs/index.css';
import { MatchListElement } from '@/components/MatchDetail';
import api from '@/api/core';

const { matchComponentContainer, mainTitle, highlight, titleContainer } = style;

const DUMMY_DATA = [
  {
    matchId: 1,
    matchDate: '2021-12-01',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'previousMatch',
  },
  {
    matchId: 2,
    matchDate: '2021-11-29',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'previousMatch',
  },
  {
    matchId: 3,
    matchDate: '2021-11-28',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'previousMatch',
  },
  {
    matchId: 4,
    matchDate: '2021-10-01',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'previousMatch',
  },
  {
    matchId: 5,
    matchDate: '2021-09-01',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'previousReview',
  },
  {
    matchId: 6,
    matchDate: '2021-08-29',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'previousReview',
  },
  {
    matchId: 7,
    matchDate: '2021-07-28',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'previousReview',
  },
  {
    matchId: 8,
    matchDate: '2021-11-01',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'endReview',
  },
  {
    matchId: 9,
    matchDate: '2021-06-27',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'endReview',
  },
  {
    matchId: 10,
    matchDate: '2021-06-29',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'endReview',
  },
  {
    matchId: 11,
    matchDate: '2021-05-05',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'endReview',
  },
  {
    matchId: 12,
    matchDate: '2021-08-27',
    registerTeamName: 't1',
    registerTeamLogo: 'http://matchus.com/img/joLogo.img',
    applyTeamName: 't2',
    applyTeamLogo: 'http://matchus.com/img/joLogo.img',
    status: 'endReview',
  },
];

const MatchDetail = () => {
  const [matchHistory, setMatchHistory] = useState();

  const previousMatch = DUMMY_DATA.filter((match) => {
    if (match.status === 'previousMatch') return true;
    return false;
  });

  const previousReview = DUMMY_DATA.filter((match) => {
    if (match.status === 'previousReview') return true;
    return false;
  });

  const endReview = DUMMY_DATA.filter((match) => {
    if (match.status === 'endReview') return true;
    return false;
  });

  const [activeTabKey, setActiveTabKey] = useState<string>('beforeMatch');

  useEffect(() => {
    const teamId = window.location.pathname.split('/')[2];

    const getTeamMatchHistory = async () => {
      const { data } = await api.get({
        url: `teams/${teamId}/matches`,
      });

      const { matchSucmmary } = data;
      setMatchHistory(matchSucmmary);
    };

    getTeamMatchHistory();
  }, [matchHistory, setMatchHistory]);

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
                    {previousMatch.map((match) => {
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
                    })}
                  </div>
                ),
              },
              {
                key: 'BeforeReview',
                buttonLabel: '평가 전',
                render: () => (
                  <div>
                    {previousReview.map((match) => {
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
                    })}
                  </div>
                ),
              },
              {
                key: 'AfterReview',
                buttonLabel: '평가 후',
                render: () => (
                  <div>
                    {endReview.map((match) => {
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
                    })}
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
