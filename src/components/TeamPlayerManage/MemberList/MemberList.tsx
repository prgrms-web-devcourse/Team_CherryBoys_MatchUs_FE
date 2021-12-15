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
  handleAddDeletedMembers?: React.MouseEventHandler<HTMLDivElement>;
  handleChangeMemberGrade?: React.ChangeEventHandler<HTMLSelectElement>;
  handleSubmitDeletedMember?: React.FormEventHandler<HTMLFormElement>;
  handleChangeEditButtonStatus?: React.MouseEventHandler<HTMLButtonElement>;
}

const { categoryTitle, playerDetailInfo } = style;

const MemberList = ({
  isMember,
  memberInfo,
  hasAuthorization,
  isEditing,
  hasCategoryTitle,
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

  return (
    <>
      <form className={classNames(playerDetailInfo)} onSubmit={handleSubmitDeletedMember}>
        {/* article Header */}
        <div>
          {hasCategoryTitle && (
            <p className={classNames(categoryTitle)}>{isMember ? '팀원' : '용병'} 정보</p>
          )}
          {hasAuthorization && (
            <button type="button" onClick={handleChangeEditButtonStatus}>
              {isEditing ? '완료' : '수정'}
            </button>
          )}
        </div>
        <div>
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
              {subCaptains.map((subCaptain: MemberElementType) => (
                <MemberListElement
                  memberId={subCaptain.userId}
                  memberName={subCaptain.userName}
                  memberType="subCaptain"
                  key={`subCaptain-${subCaptain.userId}`}
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
                  {generalMemberList.map((generalMember: MemberElementType) => (
                    <MemberListElement
                      memberId={generalMember.userId}
                      memberName={generalMember.userName}
                      memberType="generalMember"
                      key={`generalMember-${generalMember.userId}`}
                      isEditing={isEditing}
                      grade={generalMember.grade}
                      handleChangeMemberGrade={handleChangeMemberGrade}
                      handleAddDeletedMembers={handleAddDeletedMembers}
                    />
                  ))}
                </>
              )
            : hiredMemberList.length !== 0 && (
                <>
                  {hiredMemberList.map((hiredMember: MemberElementType) => (
                    <MemberListElement
                      memberId={hiredMember.userId}
                      memberName={hiredMember.userName}
                      memberType="hiredMember"
                      key={`hiredMember-${hiredMember.userId}`}
                      isEditing={isEditing}
                      grade={hiredMember.grade}
                      handleAddDeletedMembers={handleAddDeletedMembers}
                      handleChangeMemberGrade={handleChangeMemberGrade}
                    />
                  ))}
                </>
              )}
        </div>
        {isEditing && (
          <>
            {/* TODO: onClick도 상위에서 내려주는 방식으로 추가 예정 */}
            <button type="submit">방출</button>
          </>
        )}
      </form>
    </>
  );
};

export default MemberList;
