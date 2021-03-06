/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import classNames from 'classnames';
import style from './memberList.module.scss';
import { MemberListElement } from './MemberListElements';
import { MemberElementType } from '@/types';

interface Props {
  isMember: boolean;
  memberInfo: MemberElementType[];
  hasAuthorization: boolean;
  isEditing: boolean;
  hasCategoryTitle?: boolean;
  memberIndexLimit?: number;
  hiredIndexLimit?: number;
  handleAddDeletedMembers?: React.MouseEventHandler<HTMLDivElement>;
  handleChangeMemberGrade?: React.ChangeEventHandler<HTMLSelectElement>;
  handleSubmitDeletedMember?: React.FormEventHandler<HTMLFormElement>;
  handleChangeEditButtonStatus?: React.MouseEventHandler<HTMLButtonElement>;
}

const { buttonContainer, playerDetailInfo, membersContainer } = style;

const MemberList = ({
  isMember,
  memberInfo,
  hasAuthorization,
  isEditing,
  hasCategoryTitle,
  memberIndexLimit = 0,
  hiredIndexLimit = 0,
  handleAddDeletedMembers,
  handleChangeMemberGrade,
  handleSubmitDeletedMember,
  handleChangeEditButtonStatus,
}: Props) => {
  const captain = memberInfo.find((member: MemberElementType) => member.grade === '주장');
  const subCaptains = memberInfo.filter((member: MemberElementType) => member.grade === '부주장');
  const generalMemberList = memberInfo.filter(
    (member: MemberElementType) => member.grade === '일반'
  );
  const hiredMemberList = memberInfo.filter((member: MemberElementType) => member.grade === '용병');

  const memberIndex = memberIndexLimit === 0 ? generalMemberList.length : memberIndexLimit;
  const hiredIndex = hiredIndexLimit === 0 ? hiredMemberList.length : hiredIndexLimit;

  return (
    <>
      <form className={classNames(playerDetailInfo)} onSubmit={handleSubmitDeletedMember}>
        {/* article Header */}
        <div className={classNames(buttonContainer)}>
          {hasAuthorization && (
            <button type="button" onClick={handleChangeEditButtonStatus}>
              {isEditing ? '완료' : '수정'}
            </button>
          )}
        </div>
        <div className={membersContainer}>
          {isMember && captain && (
            <MemberListElement
              memberId={captain?.userId}
              memberName={captain?.userName}
              memberType="captain"
              key={`captain-${captain?.userId}`}
              isEditing={isEditing}
              grade={captain?.grade}
              handleChangeMemberGrade={handleChangeMemberGrade}
              handleAddDeletedMembers={handleAddDeletedMembers}
            />
          )}
          {isMember && subCaptains && (
            <>
              {subCaptains.map((subCaptain: MemberElementType, index) => (
                <MemberListElement
                  key={`subCaptain-${subCaptain.userId}-${index}`}
                  memberId={subCaptain.userId}
                  memberName={subCaptain.userName}
                  memberType="subCaptain"
                  isEditing={isEditing}
                  grade={subCaptain.grade}
                  handleChangeMemberGrade={handleChangeMemberGrade}
                  handleAddDeletedMembers={handleAddDeletedMembers}
                />
              ))}
            </>
          )}
          {isMember
            ? generalMemberList.length !== 0 && (
                <>
                  {generalMemberList.map((generalMember: MemberElementType, index) => {
                    if (index < memberIndex) {
                      return (
                        <MemberListElement
                          key={`generalMember-${generalMember.userId}-${index}`}
                          memberId={generalMember.userId}
                          memberName={generalMember.userName}
                          memberType="generalMember"
                          isEditing={isEditing}
                          grade={generalMember.grade}
                          handleChangeMemberGrade={handleChangeMemberGrade}
                          handleAddDeletedMembers={handleAddDeletedMembers}
                        />
                      );
                    }
                  })}
                </>
              )
            : hiredMemberList.length !== 0 && (
                <>
                  {hiredMemberList.map((hiredMember: MemberElementType, index) => {
                    if (index < hiredIndex) {
                      return (
                        <MemberListElement
                          key={`hiredMember-${hiredMember.userId}-${index}`}
                          memberId={hiredMember.userId}
                          memberName={hiredMember.userName}
                          memberType="hiredMember"
                          isEditing={isEditing}
                          grade={hiredMember.grade}
                          handleChangeMemberGrade={handleChangeMemberGrade}
                          handleAddDeletedMembers={handleAddDeletedMembers}
                        />
                      );
                    }
                  })}
                </>
              )}
        </div>
        <div className={classNames(buttonContainer)}>
          {isEditing && (
            <>
              <button type="submit">방출</button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default MemberList;
