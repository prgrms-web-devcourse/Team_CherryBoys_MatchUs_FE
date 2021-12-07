import React from 'react';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './MatchDetail.module.scss';
import { deleteMatchById, PostItem } from '@/store/posts/posts';

interface Props {
  match: PostItem;
}

const {
  matchDetail,
  matchDetail_menu,
  menuName,
  buttonBox,
  editButton,
  removeButton,
  matchDetail_content,
} = styles;

const MatchDetail = ({ match }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemoveMatch = () => {
    const matchId = parseInt(window.location.pathname.split('/')[2], 10);
    if (window.confirm(`remove match${matchId}?`)) {
      dispatch(deleteMatchById(matchId));
      console.log(`${matchId} is REMOVED!`);
      history.push('/matches/');
    }
  };

  return (
    <div className={classNames(matchDetail)}>
      <div className={classNames(matchDetail_menu)}>
        <h3 className={classNames(menuName)}>상세정보</h3>
        <div className={classNames(buttonBox)}>
          <button className={classNames(editButton)} type="button">
            <Link to={`/matches/edit/${match.matchId}`}>
              <i className="fas fa-pen" />
            </Link>
          </button>
          <button className={classNames(removeButton)} type="button" onClick={handleRemoveMatch}>
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className={classNames(matchDetail_content)}>{match.detail}</div>
    </div>
  );
};

export default MatchDetail;
