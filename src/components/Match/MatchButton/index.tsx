import React from 'react';
import classNames from 'classnames';
import styles from './MatchButton.module.scss';

interface Props {
  enable: { apply: boolean; approve: boolean };
}
// 사용자 정보랑 게시글 정보랑 비교해서 지원,수락여부 확인 필요
const MatchButton = ({ enable }: Props) => {
  return (
    <div className={classNames(styles.matchButtonBox)}>
      <button
        className={classNames(styles.matchButton, styles.approveButton, {
          [styles.show]: enable.approve,
        })}
        type="button"
      >
        매칭 수락
      </button>
      <button
        className={classNames(styles.matchButton, styles.applyButton, {
          [styles.show]: enable.apply,
        })}
        type="button"
      >
        매칭 신청
      </button>
    </div>
  );
};

export default MatchButton;
