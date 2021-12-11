import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Tabs } from '@karrotframe/tabs';
import style from './matchDetail.module.scss';
import { Header } from '@/components';
import '@karrotframe/tabs/index.css';

const { matchComponentContainer, mainTitle, highlight, titleContainer } = style;

const MatchDetail = () => {
  const [matchHistory, setMatchHistory] = useState('');
  const [activeTabKey, setActiveTabKey] = useState<string>('beforeMatch');

  useEffect(() => {}, []);

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
                render: () => <div>매칭 전</div>,
              },
              {
                key: 'beforeEvaluate',
                buttonLabel: '평가 전',
                render: () => <div>평가 전</div>,
              },
              {
                key: 'AfterEvaluate',
                buttonLabel: '평가 후',
                render: () => <div>평가 후</div>,
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
