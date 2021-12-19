import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './MatchApplyModal.module.scss';
import { Input, InputCheckBox } from '@/components';
import { match } from '@/store/match/match';
import { SPORTS_PLAYER } from '@/consts';
import { fetchTotalMembers, applyMatch } from '@/api';
import { TeamMemberInfo } from '@/types';
import { RootState } from '@/store';

const { modalBackground, modalContainer, showModal, modalName, buttonBox, submitButton } = styles;

interface CheckboxOptions {
  [key: string]: boolean;
}

interface ModalState {
  showMatchApplyModal: boolean;
  sports?: string;
}

const MatchApplyModal = ({ showMatchApplyModal, sports }: ModalState) => {
  const matchId = parseInt(useParams<{ postId: string }>().postId, 10);
  const dispatch = useDispatch();

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
        if (user.userNickname) teamUsersOptions[user.userNickname] = false;
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

  const onSubmit = () => {
    if (!selectedTeam || selectedTeam === placeholder) {
      window.alert('올바른 팀을 선택해주세요');
      return;
    }

    const selectedTeamWithUsers = {
      teamId: userTeams.filter((userTeam) => userTeam.teamName === selectedTeam)[0].teamId,
      players: teamMembersInfo
        .filter((user) => user.userNickname && teamMembers[user.userNickname])
        .map((user) => user.userId),
    };
    if (selectedTeamWithUsers.players.length < userLimit) {
      window.alert('인원미달');
      return;
    }

    const requestData = { matchId, ...selectedTeamWithUsers };

    applyMatch(requestData);
    dispatch(match.actions.toggleModal({ modalName: 'matchApply' }));
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
          <button className={classNames(submitButton)} type="button" onClick={onSubmit}>
            신청
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchApplyModal;
