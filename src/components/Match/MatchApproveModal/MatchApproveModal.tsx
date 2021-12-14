import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MatchApproveModal.module.scss';
import { TeamCard } from '@/components';
import { RootState } from '@/store';
import { fetchWaitingTeams, match } from '@/store/match/match';
import useMount from '@/hooks/useMount';
import { WaitingTeam } from '@/types/match';

const {
  modalBackground,
  modalContainer,
  showModal,
  modalName,
  teamCardContainer,
  selectedTeamCard,
  buttonBox,
  submitButton,
} = styles;

interface ModalState {
  showMatchApproveModal: boolean;
}

const MatchApproveModal = ({ showMatchApproveModal }: ModalState) => {
  const { waitingTeams } = useSelector((store: RootState) => store.match.data);
  const [selectedTeam, setSelectedTeam] = useState<WaitingTeam>({
    teamWaitingId: 0,
    teamId: 0,
    teamLogo: '',
    teamName: '',
    teamMannerTemperature: 0,
    teamUsers: [{ userId: -1, userName: '' }],
  });
  const { matchId } = useSelector((store: RootState) => store.match.data);

  const dispatch = useDispatch();
  useMount(() => {
    dispatch(fetchWaitingTeams(matchId));
  });

  const handleCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as Element).classList.contains('modalBackground')) {
      dispatch(match.actions.toggleModal({ modalName: 'matchApprove' }));
    }
  };

  const onSubmit = () => {
    if (!selectedTeam) {
      window.alert('팀을 선택해주세요');
      return;
    }

    // TODO: 매칭수락 API 요청
    console.log(`teamId:${selectedTeam.teamWaitingId}`, selectedTeam);
    // dispatch(match.actions.toggleModal({ modalName: 'matchApprove' }));
  };

  const handleOnChangeTeamCard = (e: React.ChangeEvent<HTMLElement>) => {
    setSelectedTeam(waitingTeams[parseInt((e.target as HTMLInputElement).value, 10)]);
  };

  return (
    <div
      className={classNames('modalBackground', modalBackground, {
        [showModal]: showMatchApproveModal,
      })}
      onClick={handleCloseModal}
      role="presentation"
    >
      <div className={classNames(modalContainer)}>
        <div className={classNames(modalName)}>
          <h3>매칭팀 수락</h3>
        </div>
        {waitingTeams.map((team, index) => (
          <div key={`teamCard${team.teamId}`} className={classNames(teamCardContainer)}>
            <label
              className={classNames({
                [selectedTeamCard]: selectedTeam && selectedTeam.teamId === team.teamId,
              })}
              htmlFor={`teamCard${team.teamId}`}
            >
              <TeamCard key={`teamInfo${team.teamId}`} team={team} />
              <input
                type="radio"
                id={`teamCard${team.teamId}`}
                name="selectTeamCard"
                value={index}
                onChange={handleOnChangeTeamCard}
              />
            </label>
          </div>
        ))}
        <div className={classNames(buttonBox)}>
          <button className={classNames(submitButton)} type="button" onClick={onSubmit}>
            선택
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchApproveModal;
