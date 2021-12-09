import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Header, MemberList } from '@/components';
import style from './teamMemberManage.module.scss';
import api from '@/api/core';

interface MemberElementType {
  userId: number;
  userName: string;
  grade: string;
}

const { playerManange } = style;

// 어떤 타입인지는 이름을 명시적으로 바꿔줘야할듯?
const TeamMemberManage = () => {
  const [peopleType, setPeopleType] = useState('member');
  const [isEnterEditPage, setIsEnterEditPage] = useState(true);
  const [hasAuthorization, setHasAuthorization] = useState(true);
  const [memberInfo, setMemberInfo] = useState<MemberElementType[]>([]);
  const [teamId, setTeamId] = useState(window.location.pathname.split('/')[2]);
  const isAddTeamMember = hasAuthorization && isEnterEditPage === false;

  const handleChangeEditButtonStatus = () => {
    setIsEnterEditPage(!isEnterEditPage);
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
        <MemberList
          isEditing={isEnterEditPage}
          isMember={peopleType === 'member'}
          memberInfo={memberInfo}
          hasAuthorization={hasAuthorization}
          handleChangeEditButtonStatus={handleChangeEditButtonStatus}
        />
        {isAddTeamMember && <button type="button">팀원 초대</button>}
      </div>
    </>
  );
};

export default TeamMemberManage;
