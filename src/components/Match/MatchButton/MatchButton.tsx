import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import styles from './MatchButton.module.scss';
import { match } from '@/store/match/match';

interface Props {
  enable: { apply: boolean; approve: boolean; review: boolean };
}

const { matchButtonBox, matchButton, approveButton, applyButton, show } = styles;

// 사용자 정보랑 게시글 정보랑 비교해서 지원,수락여부 확인 필요
const MatchButton = ({ enable }: Props) => {
  const dispatch = useDispatch();

  const onToggle = (modal: any) => {
    dispatch(match.actions.toggleModal({ modalName: modal }));
  };

  return (
    <div className={classNames(matchButtonBox)}>
      <button
        className={classNames(matchButton, approveButton, {
          [show]: enable.approve,
        })}
        type="button"
        onClick={() => onToggle('matchApprove')}
      >
        매칭 수락
      </button>
      <button
        className={classNames(matchButton, applyButton, {
          [show]: enable.apply,
        })}
        type="button"
        onClick={() => onToggle('matchApply')}
      >
        매칭 신청
      </button>
      <button
        className={classNames(matchButton, applyButton, {
          [show]: enable.apply,
        })}
        type="button"
        onClick={() => onToggle('matchReview')}
      >
        매칭 평가
      </button>
    </div>
  );
};

export default MatchButton;
