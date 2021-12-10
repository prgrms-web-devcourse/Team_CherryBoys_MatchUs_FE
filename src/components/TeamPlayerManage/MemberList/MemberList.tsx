import React from 'react';
import classNames from 'classnames';
import style from './memberList.module.scss';
import {
  CaptainListElement,
  GeneralMemberListElement,
  HiredMemberListElement,
  SubCaptainListElement,
} from './MemberListElements';

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
  handleChangeMemberGrade: React.ChangeEventHandler<HTMLSelectElement>;
  handleChangeEditButtonStatus: React.MouseEventHandler<HTMLButtonElement>;
}

const { categoryTitle, playerDetailInfo } = style;

const MemberList = ({
  isMember,
  memberInfo,
  hasAuthorization,
  isEditing,
  handleChangeMemberGrade,
  handleChangeEditButtonStatus,
}: Props) => {
  const captain = memberInfo.find((player: MemberElementType) => player.grade === '주장');
  const subCaptains = memberInfo.filter((player: MemberElementType) => player.grade === '부주장');
  const generalMemberList = memberInfo.filter(
    (player: MemberElementType) => player.grade === '회원'
  );
  const hiredMemberList = memberInfo.filter((player: MemberElementType) => player.grade === '용병');

  return (
    <>
      <article className={classNames(playerDetailInfo)}>
        {/* article Header */}
        <div>
          <p className={classNames(categoryTitle)}>{isMember ? '팀원' : '용병'} 정보</p>
          {hasAuthorization && (
            <button type="button" onClick={handleChangeEditButtonStatus}>
              {isEditing ? '완료' : '수정'}
            </button>
          )}
        </div>
        <ul>
          {isMember && (
            <>
              <CaptainListElement
                memberId={captain?.userId}
                memberName={captain?.userName}
                grade={captain?.grade}
              />
            </>
          )}
          {isMember && (
            <>
              {subCaptains.map((subCaptain: MemberElementType) => (
                <SubCaptainListElement
                  key={`subCaptain-${subCaptain.userId}`}
                  isEditing={isEditing}
                  memberId={subCaptain.userId}
                  memberName={subCaptain.userName}
                  grade={subCaptain.grade}
                  handleChangeMemberGrade={handleChangeMemberGrade}
                />
              ))}
            </>
          )}
          {isMember ? (
            <>
              {generalMemberList.map((generalMember: MemberElementType) => (
                <GeneralMemberListElement
                  key={`generalMember-${generalMember.userId}`}
                  isEditing={isEditing}
                  memberId={generalMember.userId}
                  memberName={generalMember.userName}
                  grade={generalMember.grade}
                  handleChangeMemberGrade={handleChangeMemberGrade}
                />
              ))}
            </>
          ) : (
            <>
              {hiredMemberList.map((hiredMember: MemberElementType) => (
                <HiredMemberListElement
                  key={`hiredMember-${hiredMember.userId}`}
                  isEditing={isEditing}
                  memberId={hiredMember.userId}
                  memberName={hiredMember.userName}
                  grade={hiredMember.grade}
                  handleChangeMemberGrade={handleChangeMemberGrade}
                />
              ))}
            </>
          )}
        </ul>
      </article>
      {isEditing && (
        <>
          {/* TODO: onClick도 상위에서 내려주는 방식으로 추가 예정 */}
          <button type="button">방출</button>
          <button type="button">위임</button>
        </>
      )}
    </>
  );
};

export default MemberList;
