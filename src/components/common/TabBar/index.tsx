import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './TabBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons'

const TabBar = () => {
  return (
    <div className={classNames(styles.tabBar)}>
      <nav>
        <Link to={'/'}><FontAwesomeIcon icon={faHome} /></Link>
      </nav>
      <nav>
        <Link to={'/matches'}>매칭</Link>
      </nav>
      <nav>
        <Link to={'/hires'}>용병</Link>
      </nav>
      <nav>
        <Link to={'/teams'}>팀</Link>
      </nav>
      <nav>
        <Link to={'/users'}><FontAwesomeIcon icon={faUser} /></Link>
      </nav>
    </div>
  );
};

export default TabBar;
