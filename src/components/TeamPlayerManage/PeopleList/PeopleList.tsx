import React from 'react';
import classNames from 'classnames';
import style from './peopleList.module.scss';

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
  peopleInfo: MemberElementType[];
  hasAuthorization: boolean;
  isEditing: boolean;
  handleChangeEditButtonStatus: React.MouseEventHandler<HTMLButtonElement>;
}

const { categoryTitle, playerDetailInfo } = style;

const PeopleList = ({
  isMember,
  peopleInfo,
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
          {hasAuthorization &&
            (isEditing ? (
              <button type="button" onClick={handleChangeEditButtonStatus}>
                완료
              </button>
            ) : (
              <button type="button" onClick={handleChangeEditButtonStatus}>
                수정하기
              </button>
            ))}
        </div>
        <ul>
          {isEditing ? (
            <>
              {isMember && (
                <li>
                  {captain?.userName} {captain?.grade}
                </li>
              )}
              <li>
                {isMember && (
                  <>
                    {/* TODO: input을 합치면 체크박스를 사용할 예정 */}
                    {subCaptain?.userName}
                    <select key={`subCaptain-${subCaptain?.userId}`}>
                      <option>{subCaptain?.grade}</option>
                      <option>회원</option>
                    </select>
                  </>
                )}
              </li>
              {isMember ? (
                <>
                  {generalMemberList.map((generalMember: MemberElementType) => (
                    <li key={`generalMember-${generalMember.userId}`}>
                      {generalMember?.userName}
                      <select>
                        <option>{generalMember?.grade}</option>
                        <option>부팀장</option>
                      </select>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {hiredMemberList.map((hiredMember: MemberElementType) => (
                    <li key={`hiredMember-${hiredMember.userId}`}>
                      {hiredMember?.userName}
                      <select>
                        <option>{hiredMember?.grade}</option>
                        <option>회원</option>
                      </select>
                    </li>
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {isMember && (
                <li>
                  {captain?.userName} {captain?.grade}
                </li>
              )}
              <li>
                {isMember && (
                  <>
                    {subCaptain?.userName}
                    <option>{subCaptain?.grade}</option>
                  </>
                )}
              </li>
              {isMember ? (
                <>
                  {generalMemberList.map((generalMember: MemberElementType) => (
                    <li key={`generalMember-${generalMember.userId}`}>
                      {generalMember?.userName}
                      {generalMember?.grade}
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {hiredMemberList.map((hiredMember: MemberElementType) => (
                    <li key={`hiredMember-${hiredMember.userId}`}>
                      {hiredMember?.userName}
                      {hiredMember?.grade}
                    </li>
                  ))}
                </>
              )}
            </>
          )}
        </ul>
      </article>
      {isEditing && (
        <div>
          {/* TODO: onClick도 상위에서 내려주는 방식으로 추가 예정 */}
          <button type="button">방출</button>
          <button type="button">위임</button>
        </div>
      )}
    </>
  );
};

export default PeopleList;
