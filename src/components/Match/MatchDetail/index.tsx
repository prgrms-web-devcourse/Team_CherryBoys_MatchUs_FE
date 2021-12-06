import React from 'react';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './MatchDetail.module.scss';
import { Match } from '@/dummyMatch';
import { deleteMatchById } from '@/store/match';

interface Props {
  match: Match;
}

const MatchDetail = ({ match }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemoveMatch = () => {
    const matchId = parseInt(window.location.pathname.split('/')[2], 10);
    if (window.confirm(`remove match${matchId}?`)) {
      dispatch(deleteMatchById(matchId));
      console.log(`${matchId} is REMOVED!`);
      history.push('/matches');
    }
  };

  return (
    <div className={classNames(styles.matchDetail)}>
      <div className={classNames(styles.matchDetail_menu)}>
        <h3 className={classNames(styles.name)}>상세정보</h3>
        <div className={classNames(styles.buttonBox)}>
          <button className={classNames(styles.modifyButton)} type="button">
            <Link to={`/matches/${match.matchId}/modify`}>
              <i className="fas fa-pen" />
            </Link>
          </button>
          <button
            className={classNames(styles.removeButton)}
            type="button"
            onClick={handleRemoveMatch}
          >
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className={classNames(styles.matchDetail_content)}>{match.detail}</div>
    </div>
  );
};

export default MatchDetail;
