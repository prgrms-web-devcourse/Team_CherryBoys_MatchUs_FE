import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './TabBar.module.scss';

const { tabBar, now } = styles;

const TabBar = () => {
  const [nowPage, setNowPage] = useState('home');

  const handleNowPage = useCallback((target: string) => {
    setNowPage(target);
  }, []);

  return (
    <div className={classNames(tabBar)}>
      <nav
        role="presentation"
        onClick={() => handleNowPage('home')}
        className={classNames({ [now]: nowPage === 'home' })}
      >
        <Link to="/">
          <i className="fas fa-home" />
        </Link>
      </nav>
      <nav
        role="presentation"
        onClick={() => handleNowPage('match')}
        className={classNames({ [now]: nowPage === 'match' })}
      >
        <Link to="/matches">
          <i className="far fa-futbol" />
        </Link>
      </nav>
      <nav
        role="presentation"
        onClick={() => handleNowPage('hire')}
        className={classNames({ [now]: nowPage === 'hire' })}
      >
        <Link to="/hires">
          <i className="far fa-handshake" />
        </Link>
      </nav>
      <nav
        role="presentation"
        onClick={() => handleNowPage('team')}
        className={classNames({ [now]: nowPage === 'team' })}
      >
        <Link to="/team/select">
          <i className="fas fa-users" />
        </Link>
      </nav>
      <nav
        role="presentation"
        onClick={() => handleNowPage('user')}
        className={classNames({ [now]: nowPage === 'user' })}
      >
        <Link to="/user">
          <i className="fas fa-user" />
        </Link>
      </nav>
    </div>
  );
};

export default TabBar;
