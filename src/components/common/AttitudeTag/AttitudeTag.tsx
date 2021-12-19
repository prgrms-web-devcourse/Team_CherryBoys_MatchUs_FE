import React from 'react';
import classNames from 'classnames';
import style from './attitudeTag.module.scss';

const { kindTag, badTag, excellentTag } = style;

interface TagProps {
  tagId: number;
  tagName: string;
  tagType: string;
}

// TODO: 백엔드 데이터 변경 후, 타입에 맞춰서 버튼 또는 div로 변경되도록 수정
const AttitueTag = ({ tagId, tagName, tagType }: TagProps) => {
  return (
    <div
      className={classNames(kindTag, {
        [badTag]: tagType === 'BAD',
        [excellentTag]: tagType === 'NONE',
      })}
    >
      {tagName}
    </div>
  );
};

export default AttitueTag;
