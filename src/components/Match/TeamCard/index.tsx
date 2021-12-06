import React from 'react';
import classNames from 'classnames';
import { Team } from '@/dummyMatch';
import styles from './TeamCard.module.scss';

interface Props {
  team: Team;
}

const TeamCard = ({ team }: Props) => {
  return (
    <div className={classNames(styles.TeamCard)}>
      <div className={classNames(styles.logo)}>
        <img src={team.teamLogo} alt="team_logo" />
      </div>
      <div className={classNames(styles.teamName)}>{team.teamName}</div>
      <div className={classNames(styles.captainInfo)}>
        <div className={classNames(styles.captainName)}>
          {team.teamUsers.filter((user) => user.captainId)[0].captainName}
        </div>
        <div className={classNames(styles.buttonBox)}>
          <button className={classNames(styles.goUserInfoButton)} type="button">
            <i className="fas fa-user" />
          </button>
          <button className={classNames(styles.chattingButton)} type="button">
            <i className="fas fa-comment" />
          </button>
        </div>
      </div>
      <div className={classNames(styles.tags)}>
        <div
          className={classNames(styles.teamMannerTemperature, styles.tag)}
        >{`${team.teamMannerTemperature}℃`}</div>
      </div>
    </div>
  );
};

export default TeamCard;
