import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './MatchDetail.module.scss';
import { Match } from '@/dummyMatch';

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

export interface tempMatch {
  matchId: number;
  detail: string;
}
export interface tempProps {
  match: tempMatch;
}

const MatchDetail = ({ match }: tempProps) => {
  return (
    <div className={classNames(matchDetail)}>
      <div className={classNames(matchDetail_menu)}>
        <h3 className={classNames(menuName)}>상세정보</h3>
        <div className={classNames(buttonBox)}>
          <button className={classNames(editButton)} type="button">
            <Link to={`/matching/edit/${match.matchId}`}>
              <i className="fas fa-pen" />
            </Link>
          </button>
          <button className={classNames(removeButton)} type="button">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className={classNames(matchDetail_content)}>{match.detail}</div>
    </div>
  );
};

export default MatchDetail;
