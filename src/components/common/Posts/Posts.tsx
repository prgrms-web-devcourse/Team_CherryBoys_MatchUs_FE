/* eslint-disable react/jsx-fragments */
import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/store';
import style from './posts.module.scss';
import { PostItem } from '@/components';
import { PostWrapper } from '@/store/posts/posts';

const { postsContainer, postTitleBox, postTitle, filterPostButton, postItems, addPostButton } =
  style;

const Posts = ({ isMatch }: PostWrapper) => {
  const { data } = useSelector((state: RootState) => state.posts);
  const history = useHistory();

  // 사용자의 권한을 체크하는 로직 추가 필요
  const handelCheckUserAuthority = (grade: string) => {
    if (!['주장', '부주장'].includes(grade)) {
      return;
    }
    history.push(`/${isMatch ? 'matches' : 'hires'}/post/new`);
  };

  return (
    <div className={classNames(postsContainer)}>
      <div className={classNames(postTitleBox)}>
        <span className={classNames(postTitle)}>{`모집중인 ${isMatch ? '매치' : '용병'}`}</span>
        <button className={classNames(filterPostButton)} type="button">
          <i className="fas fa-filter" />
        </button>
      </div>
      <ul className={classNames(postItems)}>
        {data.matches.map((item, index) => (
          <PostItem item={item} key={`matchPost${index}`} />
        ))}
      </ul>
      <button
        className={classNames(addPostButton)}
        onClick={() => handelCheckUserAuthority('주장')}
        type="button"
      >
        <i className="fas fa-plus" />
      </button>
    </div>
  );
};

export default Posts;
