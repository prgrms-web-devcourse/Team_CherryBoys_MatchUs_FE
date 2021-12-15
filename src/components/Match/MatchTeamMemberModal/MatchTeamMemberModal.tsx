import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MatchTeamMemberModal.module.scss';
import { Input, InputCheckBox } from '@/components';
import { RootState } from '@/store';
import { fetchTeamWithUser, match } from '@/store/match/match';
import useMount from '@/hooks/useMount';
import { SPORTS_PLAYER } from '@/consts';

const { modalBackground, modalContainer, showModal, modalName, buttonBox, submitButton } = styles;

interface CheckboxOptions {
  [key: string]: boolean;
}

interface ModalState {
  showMatchTeamMemberModal: boolean;
  sports: string;
  teams: {
    teamType: string;
    teamId: number;
    teamName: string;
  }[];
}

const MatchTeamMemberModal = ({ showMatchTeamMemberModal, sports, teams }: ModalState) => {
  const { matchId } = useSelector((store: RootState) => store.match.data);
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
  const { userTeams } = useSelector((store: RootState) => store.match.data);

  const placeholder = teams[0].teamName;
  const userLimit = sports ? SPORTS_PLAYER[sports] : 0;
  const teamNames = teams.map((team) => team.teamName);
  const [selectedTeam, setSelectedTeam] = useState(placeholder);
  const [teamMembers, setTeamMembers] = useState<CheckboxOptions>({});

  const setSelectedTeamUsers = useCallback(() => {
    const selectedTeamInfo = userTeams.filter((team) => team.teamName === selectedTeam)[0];
    const selectedTeamUsers = selectedTeamInfo ? selectedTeamInfo.teamUsers : [];
    const teamUsersOptions: CheckboxOptions = {};
    selectedTeamUsers.forEach((user) => {
      if (user.userName) teamUsersOptions[user.userName] = false;
    });
    return teamUsersOptions;
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
    const newTeamUsers = setSelectedTeamUsers();
    setTeamMembers({ ...newTeamUsers });
  }, [setTeamMembers, setSelectedTeamUsers]);

  const onSubmit = () => {
    const selectedTeamInfo = userTeams.filter((team) => team.teamName === selectedTeam)[0];
    const selectedTeamType = teams.filter((team) => team.teamName === selectedTeam)[0].teamType;
    const selectedTeamUsers = selectedTeamInfo ? selectedTeamInfo.teamUsers : [];

    const selectedTeamWithUsers = {
      teamId: userTeams.filter((team) => team.teamName === selectedTeam)[0].teamId,
      teamMembers: selectedTeamUsers
        .filter((user) => user.userName && teamMembers[user.userName])
        .map((user) => user.userId),
    };
    if (selectedTeamWithUsers.teamMembers.length !== userLimit) {
      window.alert('인원미달');
      return;
    }

    const requestBody = {
      matchId,
      teamType: selectedTeamType,
      ...selectedTeamWithUsers,
    };

    // TODO: 매칭 신청 API 요청
    console.log(matchId, requestBody);
    // dispatch(match.actions.toggleModal({ modalName: 'matchApply' }));
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
        <Input
          inputId="input2"
          labelName="선택 팀"
          type="dropbox"
          options={teamNames}
          onChange={handleOnChangeTeams}
          disable={teams.length < 2}
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
            변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchTeamMemberModal;
