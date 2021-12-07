import React from 'react';
import classNames from 'classnames';
import styles from './MatchButton.module.scss';

interface Props {
  enable: { apply: boolean; approve: boolean };
}

const { matchButtonBox, matchButton, approveButton, applyButton, show } = styles;

// 사용자 정보랑 게시글 정보랑 비교해서 지원,수락여부 확인 필요
const MatchButton = ({ enable }: Props) => {
  return (
    <div className={classNames(matchButtonBox)}>
      <button
        className={classNames(matchButton, approveButton, {
          [show]: enable.approve,
        })}
        type="button"
      >
        매칭 수락
      </button>
      <button
        className={classNames(matchButton, applyButton, {
          [show]: enable.apply,
        })}
        type="button"
      >
        매칭 신청
      </button>
    </div>
  );
};

export default MatchButton;
