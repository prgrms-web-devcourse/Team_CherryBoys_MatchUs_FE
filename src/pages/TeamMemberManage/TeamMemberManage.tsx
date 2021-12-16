import classNames from 'classnames';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Header, MemberList } from '@/components';
import style from './teamMemberManage.module.scss';
import { deleteTeamMembers, getTeamMemberInfo } from '@/api';

interface MemberElementType {
  userId: number;
  userName: string;
  grade: string;
}

const { playerManange } = style;

const TeamMemberManage = () => {
  const teamId = parseInt(useParams<{ teamId: string }>().teamId, 10);
  const { memberType } = useParams<{ memberType: string }>();
  const [deletedMembers, setDeletedMembers] = useState<Array<number>>([]);
  const [isEnterEditPage, setIsEnterEditPage] = useState<boolean>(false);
  // const authorization = userGrade[teamId] === 'captain' || userGrade[teamId] === 'subCaptain';
  const [hasAuthorization, setHasAuthorization] = useState<boolean>(false); // TODO : authorization으로 대체 예정
  const [memberInfo, setMemberInfo] = useState<MemberElementType[]>([]);
  const isAddTeamMember = hasAuthorization && isEnterEditPage === false;

  const handleChangeEditButtonStatus = () => {
    setIsEnterEditPage(!isEnterEditPage);
  };

  const handleChangeMemberGrade = (e: React.ChangeEvent<HTMLElement>) => {
    const { value } = e.target as HTMLInputElement;
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

  const handleAddDeletedMembers = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.target as HTMLInputElement;
    const [prefix, userId] = id.split('-');

    const numberUserId = parseInt(userId, 10);

    if (numberUserId) {
      setDeletedMembers((prev) => [...prev, numberUserId]);
    }
  };

  const handleSubmitDeletedMember = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const notDeletedMemberInfo = memberInfo.filter((member) => {
      if (deletedMembers.includes(member.userId)) {
        return false;
      }
      return true;
    });

    // TODO: 백엔드와 연동 시, 추가 예정.
    // deleteTeamMembers(teamId, notDeletedMemberInfo);
  };

  useEffect(() => {
    // TODO: 로그인 페이지 머지된 이후에, 리덕스에서 정보를 받아올 예정.
    // if (userGrade[`${teamName}`] === '팀장') {
    //   setHasAuthorization(true);
    // }

    // TODO: API 연결 시, 주석 제거 예정
    const upMemberInfo = async () => {
      const { members } = await getTeamMemberInfo(teamId, memberType);
      setMemberInfo(members);
    };
    upMemberInfo();
  }, [teamId, memberType]);

  return (
    <>
      <Header />
      <div className={classNames(playerManange)}>
        <MemberList
          isEditing={isEnterEditPage}
          isMember={memberType === 'members'}
          memberInfo={memberInfo}
          hasAuthorization={hasAuthorization}
          handleAddDeletedMembers={handleAddDeletedMembers}
          handleChangeMemberGrade={handleChangeMemberGrade}
          handleChangeEditButtonStatus={handleChangeEditButtonStatus}
          handleSubmitDeletedMember={handleSubmitDeletedMember}
        />
        {isAddTeamMember && <button type="button">팀원 초대</button>}
      </div>
    </>
  );
};

export default TeamMemberManage;
