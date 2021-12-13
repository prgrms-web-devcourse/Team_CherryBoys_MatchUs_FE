import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { RootState } from '@/store/index';
import PostItem from './PostItem';
import style from './posts.module.scss';
import { PostWrapper } from '@/store/posts';

const { post__title } = style;

const Posts = ({ isMatch, selectedTeam }: PostWrapper) => {
  const { data } = useSelector((state: RootState) => state.posts);
  const { grade } = selectedTeam;
  console.log(grade);
  const hasAuthority = grade.includes('CAPTAIN');
  console.log(hasAuthority);

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
      {hasAuthority && <button type="button">추가</button>}
    </>
  );
};

export default Posts;
