import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MatchApplyModal.module.scss';
import { Input, InputCheckBox } from '@/components';
import { RootState } from '@/store';
import { fetchTeamWithUser, match } from '@/store/match/match';
import useMount from '@/hooks/useMount';

const { modalBackground, modalContainer, showModal, modalName, buttonBox, submitButton } = styles;

interface CheckboxOptions {
  [key: string]: boolean;
}

interface ModalState {
  showMatchApplyModal: boolean;
  sports?: string;
}

interface SportsPlayers {
  [key: string]: number;
}

const sportsPlayers: SportsPlayers = {
  축구: 11,
  풋살: 6,
};

const MatchApplyModal = ({ showMatchApplyModal, sports }: ModalState) => {
  const matchId = parseInt(window.location.pathname.split('/')[3], 10);
  const dispatch = useDispatch();
  useMount(() => {
    dispatch(fetchTeamWithUser(matchId));
  });

  const handleCloseModal = (e: any) => {
    if (e.target.classList.contains('modalBackground')) {
      dispatch(match.actions.toggleModal({ modalName: 'matchApply' }));
    }
  };

  const { userTeams } = useSelector((store: RootState) => store.match).data;

  const placeholder = '팀을 선택해주세요';
  const userLimit = sports ? sportsPlayers[sports] : 0;
  const teamNames = userTeams.map((team) => team.teamName);
  const [selectedTeam, setSelectedTeam] = useState(placeholder);
  const [teamMembers, setTeamMembers] = useState({});

  const setSelectedTeamUsers = useCallback(() => {
    const selectedTeamInfo = userTeams.filter((team) => team.teamName === selectedTeam)[0];
    const selectedTeamUsers = selectedTeamInfo ? selectedTeamInfo.teamUsers : [];
    const teamUsersOptions: CheckboxOptions = {};
    selectedTeamUsers.forEach((user) => {
      if (user.teamUserName) teamUsersOptions[user.teamUserName] = false;
    });
    return teamUsersOptions;
  }, [selectedTeam, userTeams]);

  const handleOnChangeTeams = (e: any) => {
    setSelectedTeam(e.target.value);
  };

  const handleOnChangeTeamMembers = (e: any) => {
    const target: string = e.target.value;
    const newTeamMembers: CheckboxOptions = { ...teamMembers };
    newTeamMembers[target] = !newTeamMembers[target];
    setTeamMembers({ ...newTeamMembers });
  };

  useEffect(() => {
    const newTeamUsers = setSelectedTeamUsers();
    setTeamMembers({ ...newTeamUsers });
  }, [setTeamMembers, setSelectedTeamUsers]);

  const onSubmit = () => {
    if (!selectedTeam || selectedTeam === placeholder) {
      window.alert('올바른 팀을 선택해주세요');
      return;
    }
    const selectedTeamWithUsers = {
      teamId: userTeams.filter((team) => team.teamName === selectedTeam)[0].teamId,
      players: Object.entries(teamMembers).reduce((acc: string[], cur) => {
        if (cur[1]) acc.push(cur[0]);
        return acc;
      }, []),
    };
    if (selectedTeamWithUsers.players.length !== userLimit) {
      window.alert('인원미달');
      return;
    }

    // Parameters
    // Path = matchId
    // Body = teamId: Number, players: Array
    console.log(matchId, selectedTeamWithUsers);
    // dispatch(match.actions.toggleModal({ modalName: 'matchApply' }));
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
