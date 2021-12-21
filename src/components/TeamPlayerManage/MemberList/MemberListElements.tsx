/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import classNames from 'classnames';
import style from './memberList.module.scss';

interface MemberElementType {
  memberId?: number;
  memberName?: string;
  grade?: string;
  isEditing: boolean;
  memberType: string;
  handleAddDeletedMembers?: React.MouseEventHandler<HTMLDivElement>;
  handleChangeMemberGrade?: React.ChangeEventHandler<HTMLSelectElement>;
}

const gradeCollection: Record<string, string> = {
  subCaptain: '일반',
  generalMember: '부주장',
};

const { memberInfoContainer, gradeContainer } = style;

export const MemberListElement = ({
  memberId,
  memberName,
  memberType,
  isEditing,
  grade,
  handleAddDeletedMembers,
  handleChangeMemberGrade,
}: MemberElementType) => {
  return isEditing ? (
    <>
      <div
        id={`${memberId}`}
        onClick={handleAddDeletedMembers}
        className={classNames(memberInfoContainer)}
      >
        {memberType === 'captain' ? (
          <div id={`${memberType}-${memberId}`} className={classNames(memberInfoContainer)}>
            {memberName}
          </div>
        ) : (
          <div>
            <input id={`memberName-${memberId}`} type="checkbox" />
            <label htmlFor={`memberName-${memberId}`}>{memberName}</label>
          </div>
        )}
        {memberType === 'hiredMember' || memberType === 'captain' ? (
          <div className={classNames(gradeContainer)}>{grade}</div>
        ) : (
          <select onChange={handleChangeMemberGrade}>
            <option value={`${memberId}-${grade}`}>{grade}</option>
            <option value={`${memberId}-${gradeCollection[memberType]}`}>
              {gradeCollection[memberType]}
            </option>
          </select>
        )}
      </div>
    </>
  ) : (
    <>
      <div id={`${memberType}-${memberId}`} className={classNames(memberInfoContainer)}>
        <span>{memberName}</span>
        <div className={classNames(gradeContainer)}>{grade}</div>
      </div>
    </>
  );
};
