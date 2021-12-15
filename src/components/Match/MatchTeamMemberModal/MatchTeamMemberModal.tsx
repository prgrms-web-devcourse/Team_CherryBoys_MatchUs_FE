import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './MatchTeamMemberModal.module.scss';
import { InputCheckBox } from '@/components';
import { RootState } from '@/store';
import { fetchTeamWithUser, match, modifyTeamMember } from '@/store/match/match';
import useMount from '@/hooks/useMount';
import { SPORTS_PLAYER } from '@/consts';
import { getMemberInfo } from '@/api';
import { TeamMemberInfo } from '@/types/match';

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
}

const MatchTeamMemberModal = ({ showMatchTeamMemberModal, sports, teamInfo }: ModalState) => {
  const { matchId } = useSelector((store: RootState) => store.match.data);
  const history = useHistory();
  const dispatch = useDispatch();
  useMount(() => {
    dispatch(fetchTeamWithUser(matchId));
  });

  const handleCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as Element).classList.contains('modalBackground')) {
      dispatch(match.actions.toggleModal({ modalName: 'matchTeamMember' }));
    }
  };

  // TODO: team 회원정보를 받아오는 API콜 추가필요
  const placeholder = teamInfo.teamName;
  const userLimit = sports ? SPORTS_PLAYER[sports] : 0;
  const [selectedTeam, setSelectedTeam] = useState(placeholder);
  const [teamMembers, setTeamMembers] = useState<CheckboxOptions>({});
  const [teamAllMembers, setTeamAllMembers] = useState<TeamMemberInfo[]>([]);

  const setmembers = useCallback(async () => {
    const { members } = await getMemberInfo(teamInfo.teamId);
    setTeamAllMembers(members);

    const teamUsersOptions: CheckboxOptions = {};
    members.forEach((user: TeamMemberInfo) => {
      if (user.userName) teamUsersOptions[user.userName] = false;
    });

    setTeamMembers(teamUsersOptions);
  }, [teamInfo]);

  const handleOnChangeTeamMembers = (e: React.ChangeEvent<HTMLElement>) => {
    const target: string = (e.target as HTMLInputElement).value;
    const newTeamMembers: CheckboxOptions = { ...teamMembers };
    newTeamMembers[target] = !newTeamMembers[target];
    setTeamMembers({ ...newTeamMembers });
  };

  useEffect(() => {
    setmembers();
  }, [setmembers]);

  const onSubmit = () => {
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

    // TODO: 매칭 신청 API 요청
    dispatch(modifyTeamMember(requestBody));
    dispatch(match.actions.toggleModal({ modalName: 'matchTeamMember' }));
    history.go(0);
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
          <h3>팀원 변경</h3>
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
          <button className={classNames(submitButton)} type="button" onClick={onSubmit}>
            변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchTeamMemberModal;
