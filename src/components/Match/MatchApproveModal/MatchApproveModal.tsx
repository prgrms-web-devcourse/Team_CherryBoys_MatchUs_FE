import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styles from './MatchApproveModal.module.scss';
import { TeamCard, CustomModalDialog } from '@/components';
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
  modalMainTitle,
} = styles;

interface ModalState {
  showMatchApproveModal: boolean;
}

const MatchApproveModal = ({ showMatchApproveModal }: ModalState) => {
  const history = useHistory();
  const [requestData, setRequestData] = useState(0);
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    '예상치 못한 에러가 발생했습니다! 다시 시도해주세요'
  );
  const [waitingTeams, setWaitingTeams] = useState<WaitingTeam[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<WaitingTeam>({
    teamInfo: {
      captainId: 0,
      captainNickname: '',
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
    const { matchWaitingListRespons } = await fetchWaitingTeams(matchId);
    const newWaitingTeams = matchWaitingListRespons.map((team: WaitingTeam, index: number) => ({
      ...team,
      teamIdkey: `teamCard${team.teamInfo.teamId}-${index}`,
    }));
    setWaitingTeams(newWaitingTeams);
  }, [matchId]);
  useEffect(() => {
    getWaitingTeams();
  }, []);

  const handleCloseModal = (e: React.MouseEvent<HTMLElement>, closeButton: boolean) => {
    if ((e.target as Element).classList.contains('modalBackground') || closeButton) {
      dispatch(match.actions.toggleModal({ modalName: 'matchApprove' }));
    }
  };

  const handleValidation = async () => {
    if (selectedTeam.teamWaitingId < 1) {
      setErrorMessage('상대팀을 선택해주세요');
      setIsModal3Open(true);
      return;
    }

    setIsModal1Open(true);
  };

  const handleSubmit = async () => {
    const result = await approveMatch(selectedTeam.teamWaitingId);
    if (result) {
      setIsModal2Open(true);
    } else {
      setErrorMessage(
        '매칭 수락에 실패했습니다. 일시적인 네트워크 오류일 수 있으니, 다시 한 번 시도해주세요.'
      );
      setIsModal3Open(true);
    }
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
          <div
            key={`teamCard${team.teamInfo.teamId}-${index}`}
            className={classNames(teamCardContainer)}
          >
            <label
              className={classNames({
                [selectedTeamCard]:
                  selectedTeam && selectedTeam.teamWaitingId === team.teamWaitingId,
              })}
              htmlFor={`teamCard${team.teamInfo.teamId}-${index}`}
            >
              <TeamCard key={`teamInfo${team.teamInfo.teamId}`} team={team.teamInfo} />
              <input
                type="radio"
                id={`teamCard${team.teamInfo.teamId}-${index}`}
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
            <button className={classNames(submitButton)} type="button" onClick={handleValidation}>
              선택
            </button>
          )}
        </div>
      </div>
      {isModal1Open && (
        <CustomModalDialog
          modalType="confirm"
          buttonLabel="확인"
          handleCancel={() => setIsModal1Open(false)}
          handleApprove={() => {
            setIsModal1Open(false);
            handleSubmit();
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            매칭 신청을 받아들이시겠습니까?
          </span>
        </CustomModalDialog>
      )}
      {isModal2Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => {
            setIsModal2Open(false);
            dispatch(match.actions.toggleModal({ modalName: 'matchApprove' }));
            history.go(0);
          }}
          handleApprove={() => {
            setIsModal2Open(false);
            dispatch(match.actions.toggleModal({ modalName: 'matchApprove' }));
            history.go(0);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            성공적으로 매칭이 성사되었습니다!
          </span>
        </CustomModalDialog>
      )}
      {isModal3Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => setIsModal3Open(false)}
          handleApprove={() => {
            setIsModal3Open(false);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>{errorMessage}</span>
        </CustomModalDialog>
      )}
    </div>
  );
};

export default MatchApproveModal;
