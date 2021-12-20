import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { RootState, useAppDispatch } from '@/store';
import style from './main.module.scss';
import { getMatchList } from '@/store/match/match';
import { fetchAllPost, HiresResponseType } from '@/store/posts';
import { hiresPosting } from '@/api/hires';
import { MatchCard } from '@/types';

const {
  container,
  flex_space_between,
  text_title,
  text_user,
  text_left,
  mt18,
  menu_card,
  w45,
  bgc_white,
  mtb50,
} = style;

const Main = () => {
  const history = useHistory();
  const nickname = useSelector((store: RootState) => store.user.userInfo.nickname);
  const sport = useSelector((store: RootState) => store.user.userInfo.sports);
  const [matchList, setMatchList] = useState([]);
  const [hireList, setHireList] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMatchList({ size: 3 }))
      .unwrap()
      .then((data) => {
        setMatchList(data.matchList);
      })
      .catch();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllPost({ size: 3 }))
      .unwrap()
      .then((data) => {
        setHireList(data.hirePosts);
      })
      .catch();
  }, [dispatch]);

  return (
    <div className={classNames(container)}>
      <p>
        <span className={classNames('whiteSpace', text_title)}>
          환영합니다 <span className={classNames(text_user)}>{nickname || '플레이어'}</span> 님
        </span>
        <span className={classNames('whiteSpace', text_title)}>
          오늘도 즐겁게 {sport || '축구'}를 ⚽️
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

        <div>
          <div>
            <span>모집 중인 경기</span>
            <button type="button">더보기</button>
          </div>
          <section>
            {matchList &&
              matchList.map((match: MatchCard) => {
                return <div key={match.matchId}>{match.teamName}</div>;
              })}
          </section>
        </div>

        <div>
          <div>
            <span>용병 모집</span>
            <button type="button">더보기</button>
          </div>
          <section>
            {hireList &&
              hireList.map((hire: HiresResponseType) => {
                return <div key={hire.postId}>{hire.detail}</div>;
              })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Main;
