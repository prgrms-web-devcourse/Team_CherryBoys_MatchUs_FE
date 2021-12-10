import classNames from 'classnames';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Header, MemberList } from '@/components';
import style from './teamMemberManage.module.scss';
import api from '@/api/core';
import { deleteTeamMembers } from '@/api';

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

const TeamMemberManage = () => {
  const [peopleType, setPeopleType] = useState('hired');
  const [deletedMembers, setDeletedMembers] = useState<Array<number>>([]);
  const [isEnterEditPage, setIsEnterEditPage] = useState(true);
  const [hasAuthorization, setHasAuthorization] = useState(true);
  const [memberInfo, setMemberInfo] = useState<MemberElementType[]>(dummyData);
  const [teamId, setTeamId] = useState(window.location.pathname.split('/')[2]);
  const isAddTeamMember = hasAuthorization && isEnterEditPage === false;

  const handleChangeEditButtonStatus = () => {
    setIsEnterEditPage(!isEnterEditPage);
  };

  const handleChangeMemberGrade = (e: any & { target: HTMLInputElement }) => {
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

  const handleAddDeletedMembers = (e: any) => {
    const { id } = e.target;
    const [prefix, userId] = id.split('-');

    const numberUserId = parseInt(userId, 10);

    if (numberUserId) {
      setDeletedMembers((prev) => [...prev, numberUserId]);
    }
  };

  const handleSubmitDeletedMember = (e: any) => {
    const notDeletedMemberInfo = memberInfo.filter((member) => {
      if (deletedMembers.includes(member.userId)) {
        return false;
      }
      return true;
    });
    console.log(notDeletedMemberInfo);

    deleteTeamMembers(1, notDeletedMemberInfo);
  };

  useEffect(() => {
    const newTeamId = window.location.pathname.split('/')[2];
    const newMemberType = window.location.pathname.split('/')[3];

    if (newTeamId) {
      setTeamId(newTeamId);
    }

    if (newMemberType) {
      setPeopleType(newMemberType);
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
  }, []);

  return (
    <>
      <Header />
      <div className={classNames(playerManange)}>
        <MemberList
          isEditing={isEnterEditPage}
          isMember={peopleType === 'member'}
          memberInfo={memberInfo}
          hasAuthorization={hasAuthorization}
          handleAddDeletedMembers={handleAddDeletedMembers}
          handleChangeMemberGrade={handleChangeMemberGrade}
          handleChangeEditButtonStatus={handleChangeEditButtonStatus}
        />
        {isAddTeamMember && <button type="button">팀원 초대</button>}
      </div>
    </>
  );
};

export default TeamMemberManage;
