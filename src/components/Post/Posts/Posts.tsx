import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PostItem } from '..';
import style from '@/components/Match/MatchPosts/MatchPosts.module.scss';
import { PostWrapper, posts } from '@/store/posts';
import { CustomModalDialog } from '@/components';
import { HiresFilter } from '@/pages';

const {
  postsContainer,
  postTitleBox,
  postTitle,
  buttonBox,
  filterPostButton,
  postItems,
  addPostButton,
} = style;

const Posts = ({ isMatch, selectedTeam, data, isCaptain, modal }: PostWrapper) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    '예상치 못한 에러가 발생했습니다! 다시 시도해주세요'
  );
  const dispatch = useDispatch();

  const { grade } = selectedTeam;
  const hasAuthority = grade.includes('CAPTAIN');
  const history = useHistory();

  const handleClickAddPosting = () => {
    if (isCaptain) {
      history.push(`/hires/post/new`);
    } else {
      alert('부주장 이상만 생성 가능합니다');
    }
  };

  const handleClickFilter = () => {
    history.push(`/hires/filter`);
  };

  const handleToggleFilterModal = () => {
    dispatch(posts.actions.toggleModal({ modalName: 'hiresFilter' }));
  };

  // useEffect(() => {
  //   console.log(modal.hiresFilter);
  // }, [modal]);

  return (
    <>
      <div className={classNames(postsContainer)}>
        <div className={classNames(postTitleBox)}>
          <div className={classNames(postTitle)}>
            {isMatch ? <span className="match">모집중인 매치</span> : <span>모집중인 용병</span>}
          </div>
          <div className={classNames(buttonBox)}>
            <button
              // onClick={handleClickFilter}
              onClick={handleToggleFilterModal}
              type="button"
              className={classNames(filterPostButton)}
            >
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
      <HiresFilter showFilterModal={modal.hiresFilter} />
      {isModalOpen && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => setIsModalOpen(false)}
          handleApprove={() => {
            setIsModalOpen(false);
          }}
        >
          {/* <span>{errorMessage}</span> */}
        </CustomModalDialog>
      )}
    </>
  );
};

export default Posts;
