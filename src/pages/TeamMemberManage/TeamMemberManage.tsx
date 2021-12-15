import classNames from 'classnames';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { CustomModalDialog, Header, MemberList } from '@/components';
import style from './teamMemberManage.module.scss';
import { deleteTeamMembers, getTeamMemberInfo, postInviteTeamMember } from '@/api';

interface MemberElementType {
  userId: number;
  userName: string;
  grade: string;
}

const {
  playerManange,
  modalHighLight,
  modalInputContainer,
  inputSupportMessage,
  addTeamMemberButton,
} = style;

const TeamMemberManage = () => {
  const teamId = parseInt(useParams<{ teamId: string }>().teamId, 10);
  const { memberType } = useParams<{ memberType: string }>();
  const [modalInput, setModalInput] = useState('');
  const [isModalDialogOpen, setIsModalDialogOpen] = useState<boolean>(false);
  const [deletedMembers, setDeletedMembers] = useState<Array<number>>([]);
  const [isEnterEditPage, setIsEnterEditPage] = useState<boolean>(false);
  // const authorization = userGrade[teamId] === 'captain' || userGrade[teamId] === 'subCaptain';
  const [hasAuthorization, setHasAuthorization] = useState<boolean>(true); // TODO : authorization으로 대체 예정
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

  const handleChangeModalInput = (e: React.ChangeEvent<HTMLElement>) => {
    const { value } = e.target as HTMLInputElement;
    setModalInput(value);
  };

  // TODO: 이메일 Vaildation & 존재하지 않는 경우 에러처리가 필요하다.
  const handleSubmitUserEmailForInvite = async () => {
    try {
      const result = await postInviteTeamMember(teamId, modalInput);
      if (result.teamId) {
        // alert('초대 완료되었습니다.');
      }
    } catch (error) {
      // alert('존재하지 않는 유저입니다.');
    }
  };

  useEffect(() => {
    // TODO: 로그인 페이지 머지된 이후에, 리덕스에서 정보를 받아올 예정.
    // if (userGrade[`${teamName}`] === '팀장') {
    //   setHasAuthorization(true);
    // }

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
        {isModalDialogOpen && (
          <CustomModalDialog
            modalType="alert"
            buttonLabel="전송"
            handleCancel={() => setIsModalDialogOpen(false)}
            handleApprove={() => {
              handleSubmitUserEmailForInvite();
              setIsModalDialogOpen(false);
            }}
          >
            <span className={classNames(modalHighLight)}>플레이어 초대</span>
            <div className={classNames(modalInputContainer)}>
              <input type="input" placeholder="player@team.com" onChange={handleChangeModalInput} />
            </div>
            <span className={classNames(inputSupportMessage)}>
              함께 할 플레이어의 이메일을 입력해주세요
            </span>
          </CustomModalDialog>
        )}
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
        {isAddTeamMember && (
          <button
            type="button"
            className={classNames(addTeamMemberButton)}
            onClick={() => {
              setIsModalDialogOpen(true);
            }}
          >
            +
          </button>
        )}
      </div>
    </>
  );
};

export default TeamMemberManage;
