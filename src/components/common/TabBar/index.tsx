import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './TabBar.module.scss';

const TabBar = () => {
  return (
    <div className={classNames(styles.tabBar)}>
      <nav>
        <Link to="/">
          <i className="fas fa-home" />
        </Link>
      </nav>
      <nav>
        <Link to="/matches">매칭</Link>
      </nav>
      <nav>
        <Link to="/hires">용병</Link>
      </nav>
      <nav>
        <Link to="/teams">팀</Link>
      </nav>
      <nav>
        <Link to="/users">
          <i className="fas fa-user" />
        </Link>
      </nav>
    </div>
  );
};

export default TabBar;
