import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './MatchApproveModal.module.scss';
import { TeamCard } from '@/components';
import { match } from '@/store/match/match';
import { WaitingTeam } from '@/types';
import { fetchWaitingTeams, approveMatch } from '@/api';

const {
  modalBackground,
  modalContainer,
  showModal,
  modalName,
  teamCardContainer,
  noWaitingTeam,
  selectedTeamCard,
  buttonBox,
  submitButton,
} = styles;

interface ModalState {
  showMatchApproveModal: boolean;
}

const MatchApproveModal = ({ showMatchApproveModal }: ModalState) => {
  const [waitingTeams, setWaitingTeams] = useState<WaitingTeam[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<WaitingTeam>({
    teamInfo: {
      captainId: 0,
      captainName: '',
      mannerTemperature: 0,
      matchMembers: [],
      teamId: 0,
      teamLogo: '',
      teamName: '',
    },
    teamWaitingId: 0,
  });
  const matchId = parseInt(useParams<{ postId: string }>().postId, 10);

  const dispatch = useDispatch();
  const getWaitingTeams = useCallback(async () => {
    const waitingTeamList = await fetchWaitingTeams(matchId);
    setWaitingTeams(waitingTeamList);
  }, [matchId]);
  useEffect(() => {
    getWaitingTeams();
  }, []);

  const handleCloseModal = (e: React.MouseEvent<HTMLElement>, closeButton: boolean) => {
    if ((e.target as Element).classList.contains('modalBackground') || closeButton) {
      dispatch(match.actions.toggleModal({ modalName: 'matchApprove' }));
    }
  };

  const handleSubmitTeam = () => {
    if (selectedTeam.teamWaitingId < 1) {
      window.alert('팀을 선택해주세요');
      return;
    }

    approveMatch(selectedTeam.teamWaitingId);
  };

  const handleOnChangeTeamCard = (e: React.ChangeEvent<HTMLElement>) => {
    setSelectedTeam(waitingTeams[parseInt((e.target as HTMLInputElement).value, 10)]);
  };

  return (
    <div
      className={classNames('modalBackground', modalBackground, {
        [showModal]: showMatchApproveModal,
      })}
      onClick={(e) => handleCloseModal(e, false)}
      role="presentation"
    >
      <div className={classNames(modalContainer)}>
        <div className={classNames(modalName)}>
          <h3>매칭팀 수락</h3>
        </div>
        {waitingTeams.map((team, index) => (
          <div key={`teamCard${team.teamInfo.teamId}`} className={classNames(teamCardContainer)}>
            <label
              className={classNames({
                [selectedTeamCard]:
                  selectedTeam && selectedTeam.teamInfo.teamId === team.teamInfo.teamId,
              })}
              htmlFor={`teamCard${team.teamInfo.teamId}`}
            >
              <TeamCard key={`teamInfo${team.teamInfo.teamId}`} team={team.teamInfo} />
              <input
                type="radio"
                id={`teamCard${team.teamInfo.teamId}`}
                name="selectTeamCard"
                value={index}
                onChange={handleOnChangeTeamCard}
              />
            </label>
          </div>
        ))}
        {waitingTeams.length < 1 && (
          <div className={classNames(teamCardContainer, noWaitingTeam)}>
            <div>매치에 신청한 팀이 없습니다</div>
          </div>
        )}
        <div className={classNames(buttonBox)}>
          {waitingTeams.length < 1 && (
            <button
              className={classNames(submitButton)}
              type="button"
              onClick={(e) => handleCloseModal(e, true)}
            >
              닫기
            </button>
          )}
          {waitingTeams.length > 0 && (
            <button className={classNames(submitButton)} type="button" onClick={handleSubmitTeam}>
              선택
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchApproveModal;
