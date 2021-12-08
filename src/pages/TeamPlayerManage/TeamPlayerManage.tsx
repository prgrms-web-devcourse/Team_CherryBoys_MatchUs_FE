import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Header } from '@/components';
import style from './teamPlayerManage.module.scss';

// TODO: API 연결 이후에 삭제 예정( 2021.12.09 AM 01:51 )
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

const { playerManange, categoryTitle, playerDetailInfo } = style;

const TeamPlayerManage = () => {
  const { member } = dummyData;
  const [memberInfo, setMemberInfo] = useState({});
  const [hasAuthorized, setHasAuthorized] = useState(true);
  const [isEnterEditPage, setisEnterEditPage] = useState(true);

  // TOOD: 컴포넌트 분리 시, 하위 컴포넌트로 이동 예정
  const captain = member.find((player: MemberElementType) => player.grade === '주장');
  const subCaptain = member.find((player: MemberElementType) => player.grade === '부주장');
  const normalMember = member.filter((player: MemberElementType) => player.grade === '회원');
  const mercenary = member.filter((player: MemberElementType) => player.grade === '용병');

  const handleEditTeamPlayerInfo = () => {
    setisEnterEditPage(true);
  };

  // TODO: useEffect를 통해 데이터를 get 해올 예정
  useEffect(() => {
    // 최초에 화면 진입 시, 권한을 확인하는 로직
    // if (userGrade[`${teamName}`] === '팀장') {
    //   setHasAuthorized(true);
    // }
    // 팀원 정보를 받아오면, 그 값을 state로 넘겨준다.
  }, []);

  return (
    <>
      <Header />
      <div className={classNames(playerManange)}>
        <article className={classNames(playerDetailInfo)}>
          {/* article Header */}
          <div>
            <p className={classNames(categoryTitle)}>팀원 정보</p>
            {hasAuthorized &&
              (isEnterEditPage ? (
                <button type="button" onClick={handleEditTeamPlayerInfo}>
                  완료
                </button>
              ) : (
                <button type="button" onClick={handleEditTeamPlayerInfo}>
                  수정하기
                </button>
              ))}
          </div>
          {/* team player || 용병 데이터 */}
          <ul>
            {isEnterEditPage ? (
              <>
                <li>
                  {captain?.userName} {captain?.grade}
                </li>
                <li>
                  {subCaptain?.userName}
                  <select>
                    <option>{subCaptain?.grade}</option>
                    <option>회원</option>
                  </select>
                </li>
                {normalMember.map((player: MemberElementType) => (
                  <li>
                    {player?.userName}
                    <select>
                      <option>{player?.grade}</option>
                      <option>부팀장</option>
                    </select>
                  </li>
                ))}
              </>
            ) : (
              <>
                <li>
                  {captain?.userName} {captain?.grade}
                </li>
                <li>
                  {subCaptain?.userName} {subCaptain?.grade}
                </li>
                {normalMember.map((player: MemberElementType) => (
                  <li>
                    {player?.userName}
                    {player?.grade}
                  </li>
                ))}
              </>
            )}
          </ul>
        </article>
        {/* button div */}
        {isEnterEditPage && (
          <div>
            {/* TODO:  onClick도 상위에서 내려주는 방식으로 추가 예정 */}
            <button type="button">방출</button>
            <button type="button">위임</button>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamPlayerManage;
