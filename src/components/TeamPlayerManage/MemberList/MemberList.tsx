import React from 'react';
import classNames from 'classnames';
import style from './memberList.module.scss';
import {
  CaptainListElement,
  GeneralMemberListElement,
  HiredMemberListElement,
  SubCaptainListElement,
} from './MemberListElements';

const dummyData = {
  member: [
    {
      userId: 1,
      userName: '김1',
      grade: '회원',
    },
    {
      userId: 2,
      userName: '김2',
      grade: '용병',
    },
    {
      userId: 3,
      userName: '오3',
      grade: '용병',
    },
    {
      userId: 4,
      userName: '김4',
      grade: '부주장',
    },
    {
      userId: 5,
      userName: '김5',
      grade: '회원',
    },
    {
      userId: 6,
      userName: '오6',
      grade: '회원',
    },
    {
      userId: 7,
      userName: '김7',
      grade: '회원',
    },
    {
      userId: 8,
      userName: '김8',
      grade: '회원',
    },
    {
      userId: 9,
      userName: '오9',
      grade: '회원',
    },
    {
      userId: 10,
      userName: '김10',
      grade: '주장',
    },
    {
      userId: 11,
      userName: '김11',
      grade: '회원',
    },
    {
      userId: 12,
      userName: '오12',
      grade: '회원',
    },
    {
      userId: 13,
      userName: '김13',
      grade: '회원',
    },
    {
      userId: 14,
      userName: '오14',
      grade: '회원',
    },
    {
      userId: 15,
      userName: '김15',
      grade: '회원',
    },
    {
      userId: 16,
      userName: '김16',
      grade: '회원',
    },
    {
      userId: 17,
      userName: '오17',
      grade: '용병',
    },
    {
      userId: 18,
      userName: '김18',
      grade: '용병',
    },
  ],
};

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
  handleChangeEditButtonStatus: React.MouseEventHandler<HTMLButtonElement>;
}

const { categoryTitle, playerDetailInfo } = style;

const MemberList = ({
  isMember,
  memberInfo, // TODO: API 연동 완료 시, 멤버 정보가 memberInfo라는 props로 내려옴 ( 현재는 dummyData 사용 중)
  hasAuthorization,
  isEditing,
  handleChangeEditButtonStatus,
}: Props) => {
  const { member } = dummyData;
  const captain = member.find((player: MemberElementType) => player.grade === '주장');
  const subCaptain = member.find((player: MemberElementType) => player.grade === '부주장');
  const generalMemberList = member.filter((player: MemberElementType) => player.grade === '회원');
  const hiredMemberList = member.filter((player: MemberElementType) => player.grade === '용병');

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
                isEditing={isEditing}
                memberId={captain?.userId}
                memberName={captain?.userName}
                grade={captain?.grade}
              />
              <SubCaptainListElement
                isEditing={isEditing}
                memberId={subCaptain?.userId}
                memberName={subCaptain?.userName}
                grade={subCaptain?.grade}
              />
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
                />
              ))}
            </>
          ) : (
            <>
              {hiredMemberList.map((hiredMember: MemberElementType) => (
                <HiredMemberListElement
                  key={`hiredMember-${hiredMember.userId}`}
                  memberId={hiredMember.userId}
                  memberName={hiredMember.userName}
                  grade={hiredMember.grade}
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
