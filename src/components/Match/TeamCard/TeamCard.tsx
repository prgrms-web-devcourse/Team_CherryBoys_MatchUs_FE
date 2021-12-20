import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './TeamCard.module.scss';
import { match } from '@/store/match/match';
import { RootState } from '@/store';
import baseTeamLogo from '@/assets/images/baseTeamLogo.png';

interface Props {
  team: {
    captainId: number;
    captainNickname: string;
    teamId: number;
    teamLogo: string;
    teamName: string;
    mannerTemperature?: number;
    teamMannerTemperature?: number;
    matchMembers?: {
      userId: number;
      userName?: string;
      userNickname?: string;
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
  captainNickname,
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

const regex = /^[ㄱ-ㅎ|가-힣|0-9]+$/;

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
            <img
              src={
                regex.test(team.teamLogo) || team.teamLogo === '' || team.teamLogo === null
                  ? baseTeamLogo
                  : team.teamLogo
              }
              alt="team_logo"
            />
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
          <div className={classNames(captainNickname)}>{team.captainNickname}</div>
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
            key={`teamUser${user.userId}-${index}`}
          >
            {user.userNickname || user.userName}
          </div>
        ))}
        <div>
          {teamMembers.length > showPlayersLimit && (
            <button
              type="button"
              onClick={handleShowTeamUser}
              className={classNames(showTeamUserButton)}
            >
              {!showTeamUser ? (
                <i className="fas fa-chevron-down" />
              ) : (
                <i className="fas fa-chevron-up" />
              )}
            </button>
          )}
          {status === 'WAITING' && isEditable && (
            <button
              type="button"
              onClick={handleShowTeamMemberModal}
              className={classNames(showTeamMemberModalButton)}
            >
              <i className="fas fa-exchange-alt" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
