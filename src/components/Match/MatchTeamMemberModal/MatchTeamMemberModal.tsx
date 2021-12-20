import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './MatchTeamMemberModal.module.scss';
import { InputCheckBox, CustomModalDialog } from '@/components';
import { match } from '@/store/match/match';
import { SPORTS_PLAYER } from '@/consts';
import { fetchTotalMembers, modifyTeamMember } from '@/api';
import { TeamMemberInfo, TeamMemberEdit } from '@/types';

const {
  modalBackground,
  modalContainer,
  showModal,
  modalName,
  buttonBox,
  submitButton,
  modalMainTitle,
} = styles;

interface CheckboxOptions {
  [key: string]: boolean;
}

interface ModalState {
  showMatchTeamMemberModal: boolean;
  sports: string;
  teamInfo: {
    teamName: string;
    teamId: number;
  };
  matchId: number;
}

const MatchTeamMemberModal = ({
  showMatchTeamMemberModal,
  sports,
  teamInfo,
  matchId,
}: ModalState) => {
  const { teamId, teamName } = teamInfo;
  const history = useHistory();
  const dispatch = useDispatch();
  const [requestData, setRequestData] = useState<TeamMemberEdit>({
    matchId: 0,
    players: [],
    teamId: 0,
  });
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    '예상치 못한 에러가 발생했습니다! 다시 시도해주세요'
  );

  const handleCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as Element).classList.contains('modalBackground')) {
      dispatch(match.actions.toggleModal({ modalName: 'matchTeamMember' }));
    }
  };

  const userLimit = sports ? SPORTS_PLAYER[sports] : 0;
  const [teamMembers, setTeamMembers] = useState<CheckboxOptions>({});
  const [teamAllMembers, setTeamAllMembers] = useState<TeamMemberInfo[]>([]);

  const setMembers = useCallback(async () => {
    const { members } = await fetchTotalMembers(teamId);
    setTeamAllMembers(members);

    const teamUsersOptions: CheckboxOptions = {};
    members.forEach((user: TeamMemberInfo) => {
      teamUsersOptions[user.userName] = false;
    });

    setTeamMembers(teamUsersOptions);
  }, [teamId]);

  const handleOnChangeTeamMembers = (e: React.ChangeEvent<HTMLElement>) => {
    const target: string = (e.target as HTMLInputElement).value;
    const newTeamMembers: CheckboxOptions = { ...teamMembers };
    newTeamMembers[target] = !newTeamMembers[target];
    setTeamMembers({ ...newTeamMembers });
  };

  useEffect(() => {
    setMembers();
  }, [setMembers]);

  const handleValidation = async () => {
    const selectedTeamWithUsers = {
      teamId: teamInfo.teamId,
      players: teamAllMembers
        .filter((user) => user.userName && teamMembers[user.userName])
        .map((user) => user.userId),
    };

    if (selectedTeamWithUsers.players.length < userLimit) {
      setErrorMessage('경기에 필요한 멤버가 부족합니다!');
      setIsModal3Open(true);
      return;
    }

    setRequestData({
      matchId,
      ...selectedTeamWithUsers,
    });

    setIsModal1Open(true);
  };

  const handleSubmit = async () => {
    const result = await modifyTeamMember(requestData);
    if (result) {
      setIsModal2Open(true);
    } else {
      setErrorMessage(
        '멤버 교체에 실패했습니다. 일시적인 네트워크 오류일 수 있으니, 다시 한 번 시도해주세요.'
      );
      setIsModal3Open(true);
    }
  };

  return (
    <div
      className={classNames('modalBackground', modalBackground, {
        [showModal]: showMatchTeamMemberModal,
      })}
      onClick={handleCloseModal}
      role="presentation"
    >
      <div className={classNames(modalContainer)}>
        <div className={classNames(modalName)}>
          <h3>{`멤버 교체(${teamName})`}</h3>
        </div>
        {Object.keys(teamMembers).length > 0 && (
          <InputCheckBox
            labelName={`${teamInfo.teamName}(${
              Object.values(teamMembers).filter((member) => member).length
            }/${userLimit})`}
            options={teamMembers}
            onChange={handleOnChangeTeamMembers}
            icon="far fa-check-square"
          />
        )}
        <div className={classNames(buttonBox)}>
          <button className={classNames(submitButton)} type="button" onClick={handleValidation}>
            교체
          </button>
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
          <span className={classNames('whiteSpace', modalMainTitle)}>멤버를 교체하시겠습니까?</span>
        </CustomModalDialog>
      )}
      {isModal2Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => {
            setIsModal2Open(false);
            dispatch(match.actions.toggleModal({ modalName: 'matchTeamMember' }));
            history.go(0);
          }}
          handleApprove={() => {
            setIsModal2Open(false);
            dispatch(match.actions.toggleModal({ modalName: 'matchTeamMember' }));
            history.go(0);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            성공적으로 멤버를 교체했습니다!
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

export default MatchTeamMemberModal;
