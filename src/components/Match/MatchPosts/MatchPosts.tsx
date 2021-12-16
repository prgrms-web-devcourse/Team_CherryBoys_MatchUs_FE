/* eslint-disable react/jsx-fragments */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/store';
import { match } from '@/store/match/match';
import { MatchPostCard, MatchListFilterModal } from '@/components';
import style from './MatchPosts.module.scss';

const { postsContainer, postTitleBox, postTitle, filterPostButton, postItems, addPostButton } =
  style;

const MatchPosts = () => {
  const { matchList, modal } = useSelector((state: RootState) => state.match.data);
  const history = useHistory();
  const dispatch = useDispatch();

  // TODO:사용자의 권한을 체크하는 로직 추가 필요
  const handelCheckUserAuthority = (grade: string) => {
    if (!['주장', '부주장'].includes(grade)) {
      return;
    }
    history.push('/matches/new');
  };

  const handleToggleListFilterModal = () => {
    dispatch(match.actions.toggleModal({ modalName: 'matchListFilter' }));
  };

  return (
    <div className={classNames(postsContainer)}>
      <div className={classNames(postTitleBox)}>
        <span className={classNames(postTitle)}>모집중인 매치</span>
        <button
          className={classNames(filterPostButton)}
          onClick={handleToggleListFilterModal}
          type="button"
        >
          <i className="fas fa-filter" />
        </button>
      </div>
      <ul className={classNames(postItems)}>
        {matchList.map((matchInfo, index) => (
          <MatchPostCard matchInfo={matchInfo} key={`matchPost${index}`} />
        ))}
      </ul>
      <button
        className={classNames(addPostButton)}
        onClick={() => handelCheckUserAuthority('주장')}
        type="button"
      >
        <i className="fas fa-plus" />
      </button>
      <MatchListFilterModal showMatchListFilterModal={modal.matchListFilter} />
    </div>
  );
};

export default MatchPosts;
