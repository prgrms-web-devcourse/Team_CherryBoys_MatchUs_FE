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
  const { registerTeamInfo, applyTeamInfo, status, date, endTime } = matchInfo;
  const { userTeams } = useSelector((store: RootState) => store.match.data);

  const matchDate = new Date(`${date} ${endTime}`);
  const today = new Date();
  const teamIds = applyTeamInfo
    ? [applyTeamInfo.teamId, registerTeamInfo.teamId]
    : [registerTeamInfo.teamId];
  const matchEnables = {
    apply:
      status === 'WAITING' &&
      userTeams.filter((team) => team.teamId === registerTeamInfo.teamId).length < 1,
    approve:
      status === 'WAITING' &&
      userTeams.filter((team) => team.teamId === registerTeamInfo.teamId).length > 0,
    review:
      applyTeamInfo &&
      matchDate <= today &&
      status === 'COMPLETION' &&
      userTeams.filter((team) => teamIds.includes(team.teamId)).length > 0,
  };

  const onToggle = (modal: string) => {
    dispatch(match.actions.toggleModal({ modalName: modal }));
  };

  return (
    <div className={classNames(matchButtonBox)}>
      {matchEnables.approve && (
        <button
          className={classNames(matchButton, approveButton, {
            [show]: matchEnables.approve,
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
            [show]: matchEnables.apply,
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
            [show]: matchEnables.review,
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
