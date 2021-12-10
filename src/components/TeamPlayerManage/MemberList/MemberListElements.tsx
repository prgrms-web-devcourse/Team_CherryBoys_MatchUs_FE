import React from 'react';

interface MemberElementType {
  memberId: number | undefined;
  memberName: string | undefined;
  grade: string | undefined;
  isEditing: boolean;
  memberType: string;
  handleChangeMemberGrade?: React.ChangeEventHandler<HTMLSelectElement>;
}

const gradeCollection: Record<string, string> = {
  subCaptain: '회원',
  generalMember: '부주장',
};

export const MemberListElement = ({
  memberType = 'generalMember',
  isEditing,
  memberId,
  memberName,
  grade,
  handleChangeMemberGrade,
}: MemberElementType) => {
  return isEditing ? (
    <>
      <li key={`${memberType}-${memberId}`}>
        {memberName}
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
      </li>
    </>
  ) : (
    <>
      <li key={`generalMember-${memberId}`}>
        {memberName}
        {grade}
      </li>
    </>
  );
};
