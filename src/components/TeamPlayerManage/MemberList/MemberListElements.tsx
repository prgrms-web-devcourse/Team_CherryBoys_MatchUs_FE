/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

interface MemberElementType {
  memberId: number | undefined;
  memberName: string | undefined;
  grade: string | undefined;
  isEditing: boolean;
  memberType: string;
  handleAddDeletedMembers?: React.MouseEventHandler<HTMLDivElement>;
  handleChangeMemberGrade?: React.ChangeEventHandler<HTMLSelectElement>;
}

const gradeCollection: Record<string, string> = {
  subCaptain: '회원',
  generalMember: '부주장',
};

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
      <div id={`${memberId}`} onClick={handleAddDeletedMembers}>
        {memberType === 'captain' ? (
          <>{memberName}</>
        ) : (
          <>
            {' '}
            <input id={`memberName-${memberId}`} type="checkbox" />
            <label htmlFor={`memberName-${memberId}`}>{memberName}</label>
          </>
        )}
        {memberType === 'hiredMember' || memberType === 'captain' ? (
          <>{grade}</>
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
      <div id={`${memberType}-${memberId}`} onClick={handleAddDeletedMembers}>
        {memberName}
        {grade}
      </div>
    </>
  );
};
