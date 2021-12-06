import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';

const Header = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const {
    header,
    leftButtonBox,
    rightButtonBox,
    goBackButton,
    goLoginPageButton,
    goSettingPageButton,
  } = styles;

  return (
    <div className={classNames(header)}>
      <div className={classNames(leftButtonBox)}>
        <button type="button" onClick={handleGoBack} className={classNames(goBackButton)}>
          <i className="far fa-chevronLeft" />
        </button>
      </div>
      <div className={classNames(rightButtonBox)}>
        <button type="button" className={classNames(goLoginPageButton)}>
          {/* 로그인 상태 생기면 토글로 로그인/로그아웃 구분 */}
          <Link to="/login">로그인</Link>
        </button>
        <button type="button" className={classNames(goSettingPageButton)}>
          <Link to="/setting">
            <i className="fas fa-cog" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
