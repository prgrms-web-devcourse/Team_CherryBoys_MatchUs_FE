import React from 'react';
import classNames from 'classnames';

import { useHistory } from 'react-router-dom';
import { PostItem } from '..';
import style from '@/components/Match/MatchPosts/MatchPosts.module.scss';
import { PostWrapper } from '@/store/posts';

const {
  postsContainer,
  postTitleBox,
  postTitle,
  buttonBox,
  filterPostButton,
  postItems,
  addPostButton,
} = style;

const Posts = ({ isMatch, selectedTeam, data }: PostWrapper) => {
  const { grade } = selectedTeam;
  const hasAuthority = grade.includes('CAPTAIN');
  const history = useHistory();

  const handleClickAddPosting = () => {
    history.push(`/hires/post/new`);
  };

  return (
    <>
      <div className={classNames(postsContainer)}>
        <div className={classNames(postTitleBox)}>
          <div className={classNames(postTitle)}>
            {isMatch ? <span className="match">모집중인 매치</span> : <span>모집중인 용병</span>}
          </div>
          <div className={classNames(buttonBox)}>
            <button type="button" className={classNames(filterPostButton)}>
              <i className="fas fa-filter" />
            </button>
          </div>
        </div>
        <ul className={classNames(postItems)}>
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
          <button
            type="button"
            onClick={handleClickAddPosting}
            className={classNames(addPostButton)}
          >
            <i className="fas fa-plus" />
          </button>
        )}
      </div>
    </>
  );
};

export default Posts;
