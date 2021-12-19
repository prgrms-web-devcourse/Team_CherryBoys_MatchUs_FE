import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './MatchDetail.module.scss';
import { deleteMatchById } from '@/api';
import { getItemFromStorage } from '@/utils/storage';

interface Props {
  matchId: number;
  matchDetail: string;
  editable: boolean;
}

const {
  matchDetailContainer,
  matchDetailMenu,
  menuName,
  buttonBox,
  editButton,
  removeButton,
  matchDetailContent,
} = styles;

const MatchDetail = ({ matchId, matchDetail, editable }: Props) => {
  const token = getItemFromStorage('accessToken');

  const handleRemoveMatch = () => {
    if (token && window.confirm(`작성글을 삭제하시겠습니까?`)) {
      deleteMatchById(matchId);
      window.location.replace('/matches');
    }
  };

  return (
    <div className={classNames(matchDetailContainer)}>
      <div className={classNames(matchDetailMenu)}>
        <h3 className={classNames(menuName)}>상세정보</h3>
        {editable && (
          <div className={classNames(buttonBox)}>
            <button className={classNames(editButton)} type="button">
              <Link to={`/matches/edit/${matchId}`}>
                <i className="fas fa-pen" />
              </Link>
            </button>
            <button className={classNames(removeButton)} type="button" onClick={handleRemoveMatch}>
              <i className="fas fa-times" />
            </button>
          </div>
        )}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: matchDetail }}
        className={classNames(matchDetailContent)}
      />
    </div>
  );
};

export default MatchDetail;
