import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import style from './notFound.module.scss';
import errorIcon from '@/assets/images/errorIcon.png';

const { componentContainer, buttonContainer, highlight, mainTitle, subTitle, radiusButton } = style;

const NotFound = () => {
  const history = useHistory();

  return (
    <div className={classNames(componentContainer)}>
      <div>
        <img src={errorIcon} alt="에러 아이콘" />
      </div>
      <span className={classNames(mainTitle)}>
        <span className={classNames(highlight)}>오류</span>가 발생했어요
      </span>
      <div className={classNames(subTitle)}>
        <span className={classNames('whiteSpace')}>예상치 못한 오류가 발생했어요. </span>
        <span className={classNames('whiteSpace')}>
          일시적인 현상이나 네트워크 문제일 수 있으니
        </span>
        <span className={classNames('whiteSpace')}>다시 시도해주세요</span>
      </div>

      <div className={classNames(buttonContainer)}>
        <button
          type="button"
          className={classNames(radiusButton)}
          onClick={() => history.push('/')}
        >
          새로고침
        </button>
      </div>
    </div>
  );
};

export default NotFound;
