import React from 'react';
import classNames from 'classnames';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './MatchDetail.module.scss';
import { deleteMatchById } from '@/api';
import { Match } from '@/types';

interface Props {
  match: Match;
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
  const history = useHistory();
  const matchId = parseInt(useParams<{ postId: string }>().postId, 10);

  const handleRemoveMatch = () => {
    if (window.confirm(`remove match${matchId}?`)) {
      deleteMatchById(matchId);
      history.push('/matches');
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
