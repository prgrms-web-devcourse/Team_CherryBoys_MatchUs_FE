import React from 'react';
import Lottie from 'react-lottie';
import classNames from 'classnames';
import soccerLoading from '@/assets/lottie/soccer-loading.json';
import style from './lottie.module.scss';

const { lottieContainer } = style;

const lottieOptions = {
  animationData: soccerLoading,
};

const LoaderSoccerBall = () => {
  return (
    <div className={classNames(lottieContainer)}>
      <Lottie options={lottieOptions} />
    </div>
  );
};

export default LoaderSoccerBall;
