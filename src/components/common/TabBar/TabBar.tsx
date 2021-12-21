import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './TabBar.module.scss';

const { tabBar, now } = styles;

const TabBar = () => {
  const navList = ['matches', 'hires', 'team', 'user'];
  const thisPage = window.location.pathname.split('/')[1];
  const [nowPage, setNowPage] = useState(navList.includes(thisPage) ? thisPage : 'home');

  return (
    <div className={classNames(tabBar)}>
      <nav
        role="presentation"
        onClick={() => setNowPage('home')}
        className={classNames({ [now]: nowPage === 'home' })}
      >
        <Link to="/">
          <i className="fas fa-home" />
        </Link>
      </nav>
      <nav
        role="presentation"
        onClick={() => setNowPage('matches')}
        className={classNames({ [now]: nowPage === 'matches' })}
      >
        <Link to="/matches">
          <i className="far fa-futbol" />
        </Link>
      </nav>
      <nav
        role="presentation"
        onClick={() => setNowPage('hires')}
        className={classNames({ [now]: nowPage === 'hires' })}
      >
        <Link to="/hires">
          <i className="far fa-handshake" />
        </Link>
      </nav>
      <nav
        role="presentation"
        onClick={() => setNowPage('team')}
        className={classNames({ [now]: nowPage === 'team' })}
      >
        <Link to="/team/select">
          <i className="fas fa-users" />
        </Link>
      </nav>
      <nav
        role="presentation"
        onClick={() => setNowPage('user')}
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
