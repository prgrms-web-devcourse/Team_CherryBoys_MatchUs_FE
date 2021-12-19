import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './MatchTeamMemberModal.module.scss';
import { InputCheckBox } from '@/components';
import { match } from '@/store/match/match';
import { SPORTS_PLAYER } from '@/consts';
import { fetchTotalMembers, modifyTeamMember } from '@/api';
import { TeamMemberInfo } from '@/types';

const { modalBackground, modalContainer, showModal, modalName, buttonBox, submitButton } = styles;

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

  const handleSubmit = async () => {
    const selectedTeamWithUsers = {
      teamId: teamInfo.teamId,
      players: teamAllMembers
        .filter((user) => user.userName && teamMembers[user.userName])
        .map((user) => user.userId),
    };

    if (selectedTeamWithUsers.players.length < userLimit) {
      window.alert('인원미달');
      return;
    }

    const requestBody = {
      matchId,
      ...selectedTeamWithUsers,
    };

    if (window.confirm('멤버를 교체하시겠습니까?')) {
      const result = await modifyTeamMember(requestBody);
      if (result) {
        window.alert('멤버가 교체되었습니다!');
        dispatch(match.actions.toggleModal({ modalName: 'matchTeamMember' }));
        history.go(0);
      } else {
        window.alert('멤버 교체에 실패했습니다. 다시 시도해 주세요.');
      }
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
          <button className={classNames(submitButton)} type="button" onClick={handleSubmit}>
            교체
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchTeamMemberModal;
