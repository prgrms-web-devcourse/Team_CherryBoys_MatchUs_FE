import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/store';
import style from './main.module.scss';

const Main = () => {
  const history = useHistory();
  // 로그인이 됬을 때와 그렇지 않았을 때의 뷰의 차이를 둬야한다.
  const isLogged = useSelector((store: RootState) => store.auth.isLogged);
  // 어떤 스포츠를 선호하는지 정보를 알아야한다.
  const result = useSelector((store: RootState) => store.auth.userInfo);

  useEffect(() => {}, []);

  return (
    <div>
      <p>
        <span className={classNames('whiteSpace')}>
          환영합니다 {result?.nickname ? result?.nickname : '플레이어'} 님
        </span>
        <span className={classNames('whiteSpace')}>
          오늘도 즐겁게 {result?.sports ? result?.sports : '축구'}를 ⚽️
        </span>
      </p>

      <section>
        <button type="button" onClick={() => history.push('/matches')}>
          <span className={classNames('whiteSpace')}>매칭 찾기</span>
          <span>우리 팀과 겨룰 팀을 찾아보아요 🧩</span>
        </button>
        <button type="button" onClick={() => history.push('/matches/new')}>
          <span className={classNames('whiteSpace')}>매칭 모집</span>
          <span>함께 경기할 팀을 직접 모집해볼까요? 🤗</span>
        </button>

        <button type="button" onClick={() => history.push('/hires')}>
          <span className={classNames('whiteSpace')}>용병 찾기</span>
          <span>함께 경기하고 싶은 팀을 찾아보아요! 🚀</span>
        </button>
        <button type="button" onClick={() => history.push('/hires/post/new')}>
          <span className={classNames('whiteSpace')}>용병 모집</span>
          <span>숨은 보물들을 찾으러 가볼까요? 💎</span>
        </button>
      </section>

      <div>
        모집 중인 경기
        <section>임의의 팀 정보를 통해 정보를 렌더하자.</section>
      </div>

      <div>
        용병 모집
        <section>임의의 팀 정보를 통해 정보를 렌더하자.</section>
      </div>
    </div>
  );
};

export default Main;
