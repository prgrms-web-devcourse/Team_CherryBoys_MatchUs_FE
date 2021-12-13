import React, { useState } from 'react';
import classNames from 'classnames';
import { Team } from '@/dummyMatch';
import styles from './TeamCard.module.scss';

interface Props {
  team: Team;
}

const {
  TeamInfoCard,
  TeamInfo,
  logo,
  teamName,
  captainInfo,
  captainName,
  buttonBox,
  tags,
  tag,
  teamUsers,
  teamUser,
  teamUser_extra,
  showTeamUser_extra,
  showTeamUserButton,
} = styles;

const showPlayersLimit = 5;

const TeamCard = ({ team }: Props) => {
  const [showTeamUser, setShowTeamUser] = useState(false);
  const teamMembers = team.matchMembers || team.teamUsers || [];

  const handleShowTeamUser = () => {
    setShowTeamUser(!showTeamUser);
  };

  return (
    <div className={classNames(TeamInfoCard)}>
      <div className={classNames(TeamInfo)}>
        <div className={classNames(logo)}>
          <img src={team.teamLogo} alt="team_logo" />
        </div>
        <div className={classNames(teamName)}>{team.teamName}</div>
        <div className={classNames(captainInfo)}>
          <div className={classNames(captainName)}>
            {team.captainName || teamMembers[0]?.userName}
          </div>
          <div className={classNames(buttonBox)}>
            <button type="button">
              <i className="fas fa-user" />
            </button>
            <button type="button">
              <i className="fas fa-comment" />
            </button>
          </div>
        </div>
        <div className={classNames(tags)}>
          <div className={classNames(tag)}>{`${team.teamMannerTemperature}℃`}</div>
        </div>
      </div>
      <div className={classNames(teamUsers)}>
        {teamMembers?.map((user, index) => (
          <div
            className={classNames(teamUser, {
              [teamUser_extra]: index > showPlayersLimit - 1,
              [showTeamUser_extra]: index > showPlayersLimit - 1 && showTeamUser,
            })}
            key={`teamUser${index}`}
          >
            {user.userName}
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={handleShowTeamUser}
            className={classNames(showTeamUserButton)}
          >
            {!showTeamUser ? '더보기' : '숨기기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
