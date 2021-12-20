import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/store';
import style from './main.module.scss';

const {
  card,
  container,
  flex,
  flex_space_between,
  text_title,
  text_user,
  text_subtitle,
  text_left,
  mt18,
  mt12,
  emergency,
  menu_card,
  w45,
  bgc_white,
  mtb50,
} = style;

const Main = () => {
  const history = useHistory();
  const result = useSelector((store: RootState) => store.user.userInfo);

  useEffect(() => {}, []);

  return (
    <div className={classNames(container)}>
      <p>
        <span className={classNames('whiteSpace', text_title)}>
          환영합니다{' '}
          <span className={classNames(text_user)}>
            {result?.nickname ? result?.nickname : '플레이어'}
          </span>{' '}
          님
        </span>
        <span className={classNames('whiteSpace', text_title)}>
          오늘도 즐겁게 {result?.sports ? result?.sports : '축구'}를 ⚽️
        </span>
      </p>
      <div>
        <section className={classNames(mtb50)}>
          <div className={classNames(flex_space_between, mt18)}>
            <div className={classNames(menu_card, w45, bgc_white)}>
              <button
                type="button"
                onClick={() => history.push('/matches')}
                className={classNames(text_left)}
              >
                <span className={classNames('whiteSpace', text_title)}>매칭 찾기</span>
                <span>우리 팀과 겨룰 팀을 찾아보아요 🧩</span>
              </button>
            </div>
            <div className={classNames(menu_card, w45, bgc_white)}>
              <button
                type="button"
                onClick={() => history.push('/matches/new')}
                className={classNames(text_left)}
              >
                <span className={classNames('whiteSpace', text_title)}>매칭 모집</span>
                <span>함께 경기할 팀을 직접 모집해볼까요? 🤗</span>
              </button>
            </div>
          </div>
          <div className={classNames(flex_space_between, mt18)}>
            <div className={classNames(menu_card, w45, bgc_white)}>
              <button
                type="button"
                onClick={() => history.push('/hires')}
                className={classNames(text_left)}
              >
                <span className={classNames('whiteSpace', text_title)}>용병 찾기</span>
                <span>함께 경기하고 싶은 팀을 찾아보아요! 🚀</span>
              </button>
            </div>
            <div className={classNames(menu_card, w45, bgc_white)}>
              <button
                type="button"
                onClick={() => history.push('/hires/post/new')}
                className={classNames(text_left)}
              >
                <span className={classNames('whiteSpace', text_title)}>용병 모집</span>
                <span>숨은 보물들을 찾으러 가볼까요? 💎</span>
              </button>
            </div>
          </div>
        </section>

        <div className={classNames(mt18)}>
          <div className={classNames(flex_space_between)}>
            <span className={classNames(text_title)}>모집 중인 경기</span>
            <button type="button">더보기</button>
          </div>
          <section className={classNames(card, mt12)}>
            임의의 팀 정보를 통해 정보를 렌더하자.
          </section>
        </div>

        <div className={classNames(mt18)}>
          <div className={classNames(flex_space_between)}>
            <span className={classNames(text_title, emergency)}>용병 모집</span>
            <button type="button">더보기</button>
          </div>
          <section className={classNames(card, mt12)}>
            임의의 팀 정보를 통해 정보를 렌더하자.
          </section>
        </div>
      </div>
    </div>
  );
};

export default Main;
