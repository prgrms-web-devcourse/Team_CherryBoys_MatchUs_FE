import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '@/store/index';
import style from './posts.module.scss';

import PostItem from './PostItem';
import { PostWrapper } from '@/store/posts';

const { post__title } = style;

const Posts = ({ isMatch }: PostWrapper) => {
  const { data } = useSelector((state: RootState) => state.posts);

  return (
    <>
      <div className={classNames(post__title)}>
        {isMatch ? <span className="match">모집중인 매치</span> : <span>모집중인 용병</span>}
        <button type="button">필터</button>
      </div>
      <ul>
        {data.map((item) => (
          <PostItem item={item} />
        ))}
      </ul>
      <button type="button">추가</button>
    </>
  );
};

export default Posts;
