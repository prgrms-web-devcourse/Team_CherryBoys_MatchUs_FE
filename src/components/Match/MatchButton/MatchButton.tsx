import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MatchButton.module.scss';
import { match } from '@/store/match/match';
import { Match } from '@/types';
import { RootState } from '@/store';

interface Props {
  matchInfo: Match;
  enable: { apply: boolean; approve: boolean; review: boolean };
}

const { matchButtonBox, matchButton, approveButton, applyButton, show } = styles;

const MatchButton = ({ matchInfo, enable }: Props) => {
  const dispatch = useDispatch();
  const { registerTeamInfo, applyTeamInfo, status } = matchInfo;
  const { userTeams } = useSelector((store: RootState) => store.match.data);

  const matchEnables = {
    apply:
      status === 'WAITING' &&
      userTeams.filter((team) => team.teamId !== matchInfo.registerTeamInfo.teamId).length > 0,
    approve:
      status === 'WAITING' &&
      userTeams.filter((team) => team.teamId === registerTeamInfo.teamId)[0],
    review:
      applyTeamInfo &&
      status === 'COMPLETION' &&
      (userTeams.filter((team) => team.teamId === applyTeamInfo.teamId)[0] ||
        userTeams.filter((team) => team.teamId === registerTeamInfo.teamId)[0]),
  };

  const onToggle = (modal: string) => {
    dispatch(match.actions.toggleModal({ modalName: modal }));
  };

  return (
    <div className={classNames(matchButtonBox)}>
      {matchEnables.approve && (
        <button
          className={classNames(matchButton, approveButton, {
            [show]: enable.approve,
          })}
          type="button"
          onClick={() => onToggle('matchApprove')}
        >
          매칭 수락
        </button>
      )}
      {matchEnables.apply && (
        <button
          className={classNames(matchButton, applyButton, {
            [show]: enable.apply,
          })}
          type="button"
          onClick={() => onToggle('matchApply')}
        >
          매칭 신청
        </button>
      )}
      {matchEnables.review && (
        <button
          className={classNames(matchButton, applyButton, {
            [show]: enable.apply,
          })}
          type="button"
          onClick={() => onToggle('matchReview')}
        >
          매칭 평가
        </button>
      )}
    </div>
  );
};

export default MatchButton;
