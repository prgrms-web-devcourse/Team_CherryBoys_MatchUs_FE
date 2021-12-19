/* eslint-disable react/jsx-fragments */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/store';
import { match } from '@/store/match/match';
import { MatchPostCard, MatchListFilterModal } from '@/components';
import style from './MatchPosts.module.scss';
import { fetchAllMatch } from '@/api';
import { MatchCard } from '@/types';

const {
  postsContainer,
  postTitleBox,
  postTitle,
  buttonBox,
  filterPostButton,
  postItems,
  addPostButton,
} = style;

const MatchPosts = () => {
  const { modal, matchListFilter } = useSelector((state: RootState) => state.match.data);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [matches, setMatches] = useState<MatchCard[]>([]);
  const isCaptain = userInfo.userGradeResponse.filter((gradeInfo) =>
    ['CAPTAIN', 'SUBCAPTAIN'].includes(gradeInfo.grade)
  )[0];

  const getMatchList = useCallback(async () => {
    const { matchList } = await fetchAllMatch(matchListFilter);
    setMatches(matchList);
  }, [matchListFilter]);

  useEffect(() => {
    getMatchList();
  }, [matchListFilter]);

  const handelCheckUserAuthority = () => {
    if (!isCaptain) {
      window.alert('부주장 이상의 권한이 있어야 글을 작성할 수 있습니다');
      return;
    }
    history.push('/matches/new');
  };

  const handleToggleListFilterModal = () => {
    dispatch(match.actions.toggleModal({ modalName: 'matchListFilter' }));
  };

  const handleRemoveAllFilter = () => {
    dispatch(match.actions.setMatchListFilter({ matchListFilter: { size: 10 } }));
  };

  return (
    <div className={classNames(postsContainer)}>
      <div className={classNames(postTitleBox)}>
        <span className={classNames(postTitle)}>모집중인 매치</span>
        <div className={classNames(buttonBox)}>
          <button
            className={classNames(filterPostButton)}
            onClick={handleRemoveAllFilter}
            type="button"
          >
            <i className="fas fa-redo" />
          </button>
          <button
            className={classNames(filterPostButton)}
            onClick={handleToggleListFilterModal}
            type="button"
          >
            <i className="fas fa-filter" />
          </button>
        </div>
      </div>
      <ul className={classNames(postItems)}>
        {matches.map((matchInfo, index) => (
          <MatchPostCard matchInfo={matchInfo} key={`matchPost${index}`} />
        ))}
      </ul>
      <button
        className={classNames(addPostButton)}
        onClick={() => handelCheckUserAuthority()}
        type="button"
      >
        <i className="fas fa-plus" />
      </button>
      <MatchListFilterModal showMatchListFilterModal={modal.matchListFilter} />
    </div>
  );
};

export default MatchPosts;
