import React from 'react';
import classNames from 'classnames';

import { useHistory } from 'react-router-dom';
import { PostItem } from '..';
import style from './posts.module.scss';
import { PostWrapper } from '@/store/posts';

const { postTitle } = style;

const Posts = ({ isMatch, selectedTeam, data }: PostWrapper) => {
  const { grade } = selectedTeam;
  const hasAuthority = grade.includes('CAPTAIN');
  const history = useHistory();

  const handleClickAddPosting = () => {
    history.push(`/hires/post/new`);
  };

  return (
    <>
      <div className={classNames(postTitle)}>
        {isMatch ? <span className="match">모집중인 매치</span> : <span>모집중인 용병</span>}
        <button type="button">필터</button>
      </div>
      <ul>
        {data.map((item) => (
          <PostItem
            key={
              Object.prototype.hasOwnProperty.call(item, 'matchId') ? item?.matchId : item?.postId
            }
            item={item}
          />
        ))}
      </ul>
      {hasAuthority && (
        <button type="button" onClick={handleClickAddPosting}>
          추가
        </button>
      )}
    </>
  );
};

export default Posts;
