import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Tabs } from '@karrotframe/tabs';
import style from './matchDetail.module.scss';
import { Header } from '@/components';
import '@karrotframe/tabs/index.css';

const { s_matchComponentContainer, s_mainTitle, s_highlight, titleContainer } = style;

const MatchDetail = () => {
  const [matchHistory, setMatchHistory] = useState('');
  const [activeTabKey, setActiveTabKey] = useState<string>('beforeMatch');

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <Header />
        <div className={classNames(s_matchComponentContainer)}>
          <div className={classNames(titleContainer)}>
            <p className={classNames(s_mainTitle)}>
              <span className={classNames('s_whiteSpace')}>우리 팀의</span>
              <span>
                멋진 <span className={classNames(s_highlight)}>경기 이력</span>
              </span>
              <span className={classNames('s_whiteSpace')}>살펴볼까요? 🏃🏻 </span>
            </p>
          </div>
          <Tabs
            activeTabKey={activeTabKey}
            tabs={[
              {
                key: 'beforeMatch',
                buttonLabel: '매칭 전',
                render: () => <div />,
              },
              {
                key: 'beforeEvaluate',
                buttonLabel: '평가 전',
                render: () => <div>bye</div>,
              },
              {
                key: 'AfterEvaluate',
                buttonLabel: '평가 후',
                render: () => <div>hello</div>,
              },
            ]}
            onTabChange={(key) => {
              setActiveTabKey(key);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MatchDetail;
