import classNames from 'classnames';
import React from 'react';
import style from './loading.module.scss';
import LoaderSoccerBall from './LoaderSoccerBall';

const { loadingBackground, loadingIndicator } = style;

const SoccerBallLoading = () => {
  return (
    <div className={classNames(loadingBackground)}>
      <div className={classNames(loadingIndicator)}>
        <LoaderSoccerBall />
      </div>
    </div>
  );
};

export default SoccerBallLoading;
