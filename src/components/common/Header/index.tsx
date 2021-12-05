import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCog } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';

const Header = () => {
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className={classNames(styles.header)}>
      <div>
        <button type="button" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <div className={classNames(styles.buttonBox)}>
        <button type="button" className={classNames(styles.loginButton)}>
          {/* 로그인 상태 생기면 토글로 로그인/로그아웃 구분 */}
          <Link to="/login">로그인</Link>
        </button>
        <button type="button">
          <Link to="/setting">
            <FontAwesomeIcon icon={faCog} />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
