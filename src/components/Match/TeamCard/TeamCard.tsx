import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './TeamCard.module.scss';
import { match } from '@/store/match/match';
import { RootState } from '@/store';

interface Props {
  team: {
    captainId: number;
    captainName: string;
    teamId: number;
    teamLogo: string;
    teamName: string;
    mannerTemperature?: number;
    teamMannerTemperature?: number;
    matchMembers?: {
      userId: number;
      userNickname: string;
    }[];
  };
  status?: string;
}

const {
  TeamInfoCard,
  TeamInfo,
  logo,
  teamName,
  linkButton,
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

const TeamCard = ({ team, status }: Props) => {
  const [showTeamUser, setShowTeamUser] = useState(false);
  const teamMembers = team.matchMembers || [];
  const dispatch = useDispatch();
  const history = useHistory();

  const { userTeams } = useSelector((store: RootState) => store.match.data);
  const isEditable = userTeams.filter((teamInfo) => teamInfo.teamId === team.teamId)[0];

  const handleShowTeamUser = () => {
    setShowTeamUser(!showTeamUser);
  };

  const handleShowTeamMemberModal = () => {
    dispatch(match.actions.toggleModal({ modalName: 'matchTeamMember' }));
  };

  const handleGoPage = (url: string) => {
    history.push(url);
  };

  return (
    <div className={classNames(TeamInfoCard)}>
      <div className={classNames(TeamInfo)}>
        <div className={classNames(logo)}>
          <button
            type="button"
            className={classNames(linkButton)}
            onClick={() => handleGoPage(`/team/${team.teamId}`)}
          >
            <img src={team.teamLogo} alt="team_logo" />
          </button>
        </div>
        <div className={classNames(teamName)}>
          <button
            className={classNames(linkButton)}
            type="button"
            onClick={() => handleGoPage(`/team/${team.teamId}`)}
          >
            {team.teamName}
          </button>
        </div>
        <div className={classNames(captainInfo)}>
          <div className={classNames(captainName)}>{team.captainName}</div>
          <div className={classNames(buttonBox)}>
            <button type="button" onClick={() => handleGoPage(`/user/${team.captainId}`)}>
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
            {user.userNickname}
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
          {status === 'WAITING' && isEditable && (
            <button
              type="button"
              onClick={handleShowTeamMemberModal}
              className={classNames(showTeamMemberModalButton)}
            >
              교체
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
