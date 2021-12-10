import React from 'react';

interface CaptainElementType {
  memberId: number | undefined;
  memberName: string | undefined;
  grade: string | undefined;
}

interface MemberElementType extends CaptainElementType {
  isEditing: boolean;
  handleChangeMemberGrade?: React.ChangeEventHandler<HTMLSelectElement>;
}

export const CaptainListElement = ({ memberId, memberName, grade }: CaptainElementType) => (
  <li key={`captainId-${memberId}`}>
    {memberName} {grade}
  </li>
);

export const SubCaptainListElement = ({
  isEditing,
  memberId,
  memberName,
  grade,
  handleChangeMemberGrade,
}: MemberElementType) => {
  return isEditing ? (
    <>
      <li>
        {memberName}
        <select onChange={handleChangeMemberGrade}>
          <option value={`${memberId}-${grade}`}>{grade}</option>
          <option value={`${memberId}-회원`}>회원</option>
        </select>
      </li>
    </>
  ) : (
    <>
      <li>
        {memberName}
        {grade}
      </li>
    </>
  );
};

export const GeneralMemberListElement = ({
  isEditing,
  memberId,
  memberName,
  grade,
  handleChangeMemberGrade,
}: MemberElementType) => {
  return isEditing ? (
    <>
      <li key={`generalMember-${memberId}`}>
        {memberName}
        <select onChange={handleChangeMemberGrade}>
          <option value={`${memberId}-${grade}`}>{grade}</option>
          <option value={`${memberId}-부주장`}>부주장</option>
        </select>
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

export const HiredMemberListElement = ({
  isEditing,
  memberId,
  memberName,
  grade,
  handleChangeMemberGrade,
}: MemberElementType) => {
  return isEditing ? (
    <>
      <li key={`hiredMember-${memberId}`}>
        {memberName}
        <select onChange={handleChangeMemberGrade}>
          <option value={`${memberId}-${grade}`}>{grade}</option>
          <option value={`${memberId}-회원`}>회원</option>
        </select>
      </li>
    </>
  ) : (
    <>
      <li key={`hiredMember-${memberId}`}>
        {memberName}
        {grade}
      </li>
    </>
  );
};
