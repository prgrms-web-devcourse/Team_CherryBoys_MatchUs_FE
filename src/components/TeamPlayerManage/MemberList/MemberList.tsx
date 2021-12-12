import React from 'react';
import classNames from 'classnames';
import style from './memberList.module.scss';
import { MemberListElement } from './MemberListElements';

// TODO: 타입을 어떻게 정리할지에 대해서 이야기 나눈 뒤, 분리 예정.
interface MemberElementType {
  userId: number;
  userName: string;
  grade: string;
}

interface Props {
  isMember: boolean;
  memberInfo: MemberElementType[];
  hasAuthorization: boolean;
  isEditing: boolean;
  handleAddDeletedMembers?: React.MouseEventHandler<HTMLDivElement>;
  handleChangeMemberGrade: React.ChangeEventHandler<HTMLSelectElement>;
  handleSubmitDeletedMember: React.FormEventHandler<HTMLFormElement>;
  handleChangeEditButtonStatus: React.MouseEventHandler<HTMLButtonElement>;
}

const { categoryTitle, playerDetailInfo } = style;

const MemberList = ({
  isMember,
  memberInfo,
  hasAuthorization,
  isEditing,
  handleAddDeletedMembers,
  handleChangeMemberGrade,
  handleSubmitDeletedMember,
  handleChangeEditButtonStatus,
}: Props) => {
  const captain = memberInfo.find((member: MemberElementType) => member.grade === '주장');
  const subCaptains = memberInfo.filter((member: MemberElementType) => member.grade === '부주장');
  const generalMemberList = memberInfo.filter(
    (member: MemberElementType) => member.grade === '회원'
  );
  const hiredMemberList = memberInfo.filter((member: MemberElementType) => member.grade === '용병');

  return (
    <>
      <form className={classNames(playerDetailInfo)} onSubmit={handleSubmitDeletedMember}>
        {/* article Header */}
        <div>
          <p className={classNames(categoryTitle)}>{isMember ? '팀원' : '용병'} 정보</p>
          {hasAuthorization && (
            <button type="button" onClick={handleChangeEditButtonStatus}>
              {isEditing ? '완료' : '수정'}
            </button>
          )}
        </div>
        <div>
          {isMember && (
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
          {isMember && (
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
          {isMember ? (
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
          ) : (
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
      </form>
      {isEditing && (
        <>
          {/* TODO: onClick도 상위에서 내려주는 방식으로 추가 예정 */}
          <button type="button">방출</button>
          {isMember && <button type="button">위임</button>}
        </>
      )}
    </>
  );
};

export default MemberList;
