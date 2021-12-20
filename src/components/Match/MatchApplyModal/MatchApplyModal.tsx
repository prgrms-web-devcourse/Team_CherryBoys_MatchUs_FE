import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styles from './MatchApplyModal.module.scss';
import { Input, InputCheckBox, CustomModalDialog } from '@/components';
import { match } from '@/store/match/match';
import { SPORTS_PLAYER } from '@/consts';
import { fetchTotalMembers, applyMatch } from '@/api';
import { TeamMemberInfo, MatchApplyInfo } from '@/types';
import { RootState } from '@/store';

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
  showMatchApplyModal: boolean;
  sports?: string;
}

const MatchApplyModal = ({ showMatchApplyModal, sports }: ModalState) => {
  const history = useHistory();
  const matchId = parseInt(useParams<{ postId: string }>().postId, 10);
  const dispatch = useDispatch();
  const [requestData, setRequestData] = useState<MatchApplyInfo>({
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
      dispatch(match.actions.toggleModal({ modalName: 'matchApply' }));
    }
  };
  const { userTeams } = useSelector((store: RootState) => store.match.data);

  const placeholder = '팀을 선택해주세요';
  const userLimit = sports ? SPORTS_PLAYER[sports] : 0;
  const teamNames = userTeams.map((team) => team.teamName);
  const [selectedTeam, setSelectedTeam] = useState(placeholder);
  const [teamMembersInfo, setTeamMembersInfo] = useState<TeamMemberInfo[]>([]);
  const [teamMembers, setTeamMembers] = useState<CheckboxOptions>({});

  const getSelectedTeamMembers = useCallback(async () => {
    const selectedTeamInfo = userTeams.filter((userTeam) => userTeam.teamName === selectedTeam)[0];
    if (selectedTeamInfo) {
      const selectedTeamId = selectedTeamInfo.teamId;
      const { members } = await fetchTotalMembers(selectedTeamId);
      setTeamMembersInfo(members);

      const teamUsersOptions: CheckboxOptions = {};
      members.forEach((user: TeamMemberInfo) => {
        if (user.userName) teamUsersOptions[user.userName] = false;
      });
      setTeamMembers(teamUsersOptions);
    }
  }, [selectedTeam, userTeams]);

  const handleOnChangeTeams = (e: React.ChangeEvent<HTMLElement>) => {
    setSelectedTeam((e.target as HTMLInputElement).value);
  };

  const handleOnChangeTeamMembers = (e: React.ChangeEvent<HTMLElement>) => {
    const target: string = (e.target as HTMLInputElement).value;
    const newTeamMembers: CheckboxOptions = { ...teamMembers };
    newTeamMembers[target] = !newTeamMembers[target];
    setTeamMembers({ ...newTeamMembers });
  };

  useEffect(() => {
    getSelectedTeamMembers();
  }, [getSelectedTeamMembers]);

  const handleValidation = () => {
    if (!selectedTeam || selectedTeam === placeholder) {
      setErrorMessage('팀을 선택해주세요!');
      setIsModal3Open(true);
      return;
    }

    const selectedTeamWithUsers = {
      teamId: userTeams.filter((userTeam) => userTeam.teamName === selectedTeam)[0].teamId,
      players: teamMembersInfo
        .filter((user) => user.userName && teamMembers[user.userName])
        .map((user) => user.userId),
    };
    if (selectedTeamWithUsers.players.length < userLimit) {
      setErrorMessage('경기에 필요한 멤버가 부족합니다!');
      setIsModal3Open(true);
      return;
    }

    setRequestData({ matchId, ...selectedTeamWithUsers });

    setIsModal1Open(true);
  };

  const handleSubmit = async () => {
    const result = await applyMatch(requestData);
    if (result) {
      setIsModal2Open(true);
    } else {
      setErrorMessage(
        '매칭 신청에 실패했습니다. 일시적인 네트워크 오류일 수 있으니, 다시 한 번 시도해주세요.'
      );
      setIsModal3Open(true);
    }
  };

  return (
    <div
      className={classNames('modalBackground', modalBackground, {
        [showModal]: showMatchApplyModal,
      })}
      onClick={handleCloseModal}
      role="presentation"
    >
      <div className={classNames(modalContainer)}>
        <div className={classNames(modalName)}>
          <h3>매칭 신청</h3>
        </div>
        <Input
          inputId="input2"
          labelName="팀 선택"
          type="dropbox"
          options={[placeholder, ...teamNames]}
          onChange={handleOnChangeTeams}
        />
        {Object.keys(teamMembers).length > 0 && (
          <InputCheckBox
            labelName={`${selectedTeam}(${
              Object.values(teamMembers).filter((member) => member).length
            }/${userLimit})`}
            options={teamMembers}
            onChange={handleOnChangeTeamMembers}
            icon="far fa-check-square"
          />
        )}
        <div className={classNames(buttonBox)}>
          <button className={classNames(submitButton)} type="button" onClick={handleValidation}>
            신청
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
          <span className={classNames('whiteSpace', modalMainTitle)}>매칭을 신청하시겠습니까?</span>
        </CustomModalDialog>
      )}
      {isModal2Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => {
            setIsModal2Open(false);
            dispatch(match.actions.toggleModal({ modalName: 'matchApply' }));
            history.go(0);
          }}
          handleApprove={() => {
            setIsModal2Open(false);
            dispatch(match.actions.toggleModal({ modalName: 'matchApply' }));
            history.go(0);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            성공적으로 매칭을 신청했습니다!
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

export default MatchApplyModal;
