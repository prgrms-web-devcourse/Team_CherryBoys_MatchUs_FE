import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';

const Header = () => {
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className={classNames(styles.header)}>
      <div className={classNames(styles.leftButtonBox)}>
        <button type="button" onClick={handleGoBack} className={classNames(styles.goBackButton)}>
          <i className="far fa-chevronLeft" />
        </button>
      </div>
      <div className={classNames(styles.rightButtonBox)}>
        <button type="button" className={classNames(styles.goLoginPageButton)}>
          {/* 로그인 상태 생기면 토글로 로그인/로그아웃 구분 */}
          <Link to="/login">로그인</Link>
        </button>
        <button type="button" className={classNames(styles.goSettingPageButton)}>
          <Link to="/setting">
            <i className="fas fa-cog" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
