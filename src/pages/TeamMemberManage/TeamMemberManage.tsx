import classNames from 'classnames';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Header, MemberList } from '@/components';
import style from './teamMemberManage.module.scss';
import api from '@/api/core';

interface MemberElementType {
  userId: number;
  userName: string;
  grade: string;
}

const { playerManange } = style;

const dummyData = [
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
    grade: '부주장',
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
];

// 어떤 타입인지는 이름을 명시적으로 바꿔줘야할듯?
const TeamMemberManage = () => {
  const [peopleType, setPeopleType] = useState('member');
  const [isEnterEditPage, setIsEnterEditPage] = useState(true);
  const [hasAuthorization, setHasAuthorization] = useState(true);
  const [memberInfo, setMemberInfo] = useState<MemberElementType[]>(dummyData);
  const [teamId, setTeamId] = useState(window.location.pathname.split('/')[2]);
  const isAddTeamMember = hasAuthorization && isEnterEditPage === false;

  const handleChangeEditButtonStatus = () => {
    setIsEnterEditPage(!isEnterEditPage);
  };

  const handleChangeMemberGrade = (e: any) => {
    const { value } = e.target;
    const [userId, grade] = value.split('-');

    const newMemberInfo = memberInfo.map((member) => {
      if (member.userId === parseInt(userId, 10)) {
        // eslint-disable-next-line no-param-reassign
        member.grade = grade;
      }
      return member;
    });

    setMemberInfo(newMemberInfo);
  };

  useEffect(() => {
    const newTeamId = window.location.pathname.split('/')[2];
    const newPeopleType = window.location.pathname.split('/')[3];

    if (newTeamId) {
      setTeamId(newTeamId);
    }

    if (newPeopleType) {
      setPeopleType(newPeopleType);
    }

    // TODO: 로그인 페이지 머지된 이후에, 리덕스에서 정보를 받아올 예정.
    // if (userGrade[`${teamName}`] === '팀장') {
    //   setHasAuthorization(true);
    // }

    // TODO: API 연결 시, 주석 제거 예정
    // const getPeopleInfo = async () => {
    //   const { data } = await api.get({
    //     url: `/teams/${teamId}/${peopleType}`,
    //   });

    //   setMemberInfo(data);
    // };

    // getPeopleInfo();
  }, [teamId, peopleType]);

  return (
    <>
      <Header />
      <div className={classNames(playerManange)}>
        <button type="button" onClick={handleChangeMemberGrade}>
          테스트
        </button>
        <MemberList
          isEditing={isEnterEditPage}
          isMember={peopleType === 'member'}
          memberInfo={memberInfo}
          hasAuthorization={hasAuthorization}
          handleChangeMemberGrade={handleChangeMemberGrade}
          handleChangeEditButtonStatus={handleChangeEditButtonStatus}
        />
        {isAddTeamMember && <button type="button">팀원 초대</button>}
      </div>
    </>
  );
};

export default TeamMemberManage;
