import React from 'react';

interface MemberElementType {
  isEditing?: boolean | undefined;
  memberId: number | undefined;
  memberName: string | undefined;
  grade: string | undefined;
}

export const CaptainListElement = ({
  isEditing,
  memberId,
  memberName,
  grade,
}: MemberElementType) => (
  <li>
    {memberName} {grade}
  </li>
);

export const SubCaptainListElement = ({
  isEditing,
  memberId,
  memberName,
  grade,
}: MemberElementType) => {
  return isEditing ? (
    <>
      {memberName}
      <select>
        <option key={memberId}>{grade}</option>
        <option>회원</option>
      </select>
    </>
  ) : (
    <>
      {memberName}
      {grade}
    </>
  );
};

export const GeneralMemberListElement = ({
  isEditing,
  memberId,
  memberName,
  grade,
}: MemberElementType) => {
  return isEditing ? (
    <>
      <li key={`generalMember-${memberId}`}>
        {memberName}
        <select>
          <option>{grade}</option>
          <option>부팀장</option>
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
}: MemberElementType) => {
  return isEditing ? (
    <>
      <li key={`hiredMember-${memberId}`}>
        {memberName}
        <select>
          <option>{grade}</option>
          <option>회원</option>
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
