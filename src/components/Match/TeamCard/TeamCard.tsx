import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import styles from './TeamCard.module.scss';
import { match } from '@/store/match/match';

interface Props {
  team: {
    captainId?: number;
    captainName?: string;
    teamId: number;
    teamLogo: string;
    teamName: string;
    mannerTemperature?: number;
    teamMannerTemperature?: number;
    matchMembers?: {
      userId: number;
      userName: string;
    }[];
    teamUsers?: {
      userId: number;
      userName: string;
    }[];
  };
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
  showTeamMemberModalButton,
} = styles;

const showPlayersLimit = 5;

const TeamCard = ({ team }: Props) => {
  const [showTeamUser, setShowTeamUser] = useState(false);
  const teamMembers = team.matchMembers || team.teamUsers || [];
  const dispatch = useDispatch();

  const handleShowTeamUser = () => {
    setShowTeamUser(!showTeamUser);
  };

  const handleShowTeamMemberModal = () => {
    dispatch(match.actions.toggleModal({ modalName: 'matchTeamMember' }));
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
          <div className={classNames(tag)}>{`${
            team.mannerTemperature || team.teamMannerTemperature
          }℃`}</div>
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
          <button
            type="button"
            onClick={handleShowTeamMemberModal}
            className={classNames(showTeamMemberModalButton)}
          >
            팀원 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
