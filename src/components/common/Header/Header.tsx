import React from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';

const {
  header,
  leftButtonBox,
  rightButtonBox,
  goBackButton,
  goLoginPageButton,
  goSettingPageButton,
} = styles;

const Header = () => {
  const history = useHistory();

  const handleHistory = (destination: string) => {
    if (destination === 'back') {
      history.goBack();
    } else {
      history.push(`/${destination}`);
    }
  };

  return (
    <div className={classNames(header)}>
      <div className={classNames(leftButtonBox)}>
        <button
          type="button"
          onClick={() => handleHistory('back')}
          className={classNames(goBackButton)}
        >
          <i className="fas fa-chevron-left" />
        </button>
      </div>
      <div className={classNames(rightButtonBox)}>
        <button
          type="button"
          className={classNames(goLoginPageButton)}
          onClick={() => handleHistory('login')}
        >
          {/* 로그인 상태 생기면 토글로 로그인/로그아웃 구분 */}
          로그인
        </button>
        <button
          type="button"
          className={classNames(goSettingPageButton)}
          onClick={() => handleHistory('setting')}
        >
          <i className="fas fa-cog" />
        </button>
      </div>
    </div>
  );
};

export default Header;
