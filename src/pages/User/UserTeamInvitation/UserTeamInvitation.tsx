import * as React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import style from './userTeamInvitation.module.scss';
import { CustomModalDialog } from '@/components';
import { RootState, useAppDispatch } from '@/store';
import {
  acceptTeamInvitationAction,
  getTeamInvitation,
  rejectTeamInvitationAction,
} from '@/store/userSlice';

export interface hireRequestType {
  teamInvitationId: number;
  teamId: number;
  teamName: string;
}

export const UserTeamInvitation = () => {
  const [selectedTeamInvitationId, setSelectedTeamInvitationId] = useState<number>(0);
  const [isConfirmDialogOpen, setIsConfrimDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isFaildDialogOpen, setIsFaildDialogOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isOverMaxTeamCountDialogOpen, setIsOverMaxTeamCountDialogOpen] = useState(false);
  const [clickedTeamName, setClickedTeamName] = useState<string>('');
  const [invitationListState, setInvitationListState] = useState<hireRequestType[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const invitationList = useSelector((state: RootState) => state.user.teamInvitaionList);
  const myTeam = useSelector((state: RootState) => state.user.userInfo.userGradeResponse);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeamInvitation());
  }, [dispatch]);

  useEffect(() => {
    setInvitationListState([...invitationList]);
  }, [invitationList]);

  const setTeamInvitationState = () => {
    const newState = invitationListState.filter(
      (list) => list.teamInvitationId !== selectedTeamInvitationId
    );
    setInvitationListState([...newState]);
  };

  // 팀 신청 취소 로직
  const cancelHireRequest = () => {
    setIsConfrimDialogOpen(false);

    dispatch(rejectTeamInvitationAction(selectedTeamInvitationId))
      .unwrap()
      .then(() => {
        setTeamInvitationState();
        setIsCancelDialogOpen(true);
      })
      .catch(() => {
        setIsFaildDialogOpen(true);
      });
  };

  // 팀 정보 상태 업데이트
  const setClickedTeamInfo = (teamName: string, teamInvitationId: number) => {
    setClickedTeamName(teamName);
    setSelectedTeamInvitationId(teamInvitationId);
  };

  // 수락 클릭시
  const aceeptInvitation = (teamName: string, teamInvitationId: number) => {
    setClickedTeamInfo(teamName, teamInvitationId);

    if (myTeam && myTeam.length === 3) {
      setIsOverMaxTeamCountDialogOpen(true);
      return;
    }

    dispatch(acceptTeamInvitationAction(teamInvitationId))
      .unwrap()
      .then(() => {
        setTeamInvitationState();
        setIsAcceptDialogOpen(true);
      })
      .catch((data) => {
        setErrorMsg(data.message);
        setIsFaildDialogOpen(true);
      });
  };

  // 취소 클릭시
  const handleClickRejectTeamInvitation = (teamName: string, teamInvitationId: number) => {
    setClickedTeamInfo(teamName, teamInvitationId);
    setIsConfrimDialogOpen(true);
  };

  const {
    flex_container,
    hire,
    wrapper,
    title,
    container,
    modalMainTitle,
    modalSubTitle,
    team_name,
    alert_msg,
    text,
    cancel_btn,
    accept_btn,
  } = style;
  return (
    <div className={classNames(wrapper)}>
      {isConfirmDialogOpen && (
        <CustomModalDialog
          modalType="confirm"
          handleApprove={cancelHireRequest}
          handleCancel={() => setIsConfrimDialogOpen(false)}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            <span className={classNames(team_name)}>{clickedTeamName}</span>의 팀 초대를
            거절하시겠어요?
          </span>
          <span className={classNames('whiteSpace', modalSubTitle, alert_msg)}>
            거절하면 되돌릴 수 없습니다.
          </span>
        </CustomModalDialog>
      )}
      {isCancelDialogOpen && (
        <CustomModalDialog buttonLabel="확인" handleApprove={() => setIsCancelDialogOpen(false)}>
          <span className={classNames('whiteSpace', modalMainTitle)}>취소 완료!</span>
          <span className={classNames('whiteSpace', modalSubTitle)}>팀 요청을 거절했습니다.</span>
        </CustomModalDialog>
      )}
      {isAcceptDialogOpen && (
        <CustomModalDialog buttonLabel="확인" handleApprove={() => setIsAcceptDialogOpen(false)}>
          <span className={classNames('whiteSpace', modalMainTitle)}>수락 완료!</span>
          <span className={classNames('whiteSpace', modalSubTitle)}>팀에 가입 됬습니다!</span>
        </CustomModalDialog>
      )}
      {isFaildDialogOpen && (
        <CustomModalDialog buttonLabel="확인" handleApprove={() => setIsFaildDialogOpen(false)}>
          <span className={classNames('whiteSpace', modalMainTitle)}>에러가 발생했어요.</span>
          <span className={classNames('whiteSpace', modalSubTitle)}>{errorMsg}</span>
        </CustomModalDialog>
      )}
      {isOverMaxTeamCountDialogOpen && (
        <CustomModalDialog
          buttonLabel="확인"
          handleApprove={() => setIsOverMaxTeamCountDialogOpen(false)}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>팀이 너무 많아요!</span>
          <span className={classNames('whiteSpace', modalSubTitle)}>
            팀은 최대 3팀만 가입 가능합니다.
          </span>
        </CustomModalDialog>
      )}

      <div className={classNames(container)}>
        <h1 className={classNames(title)}>팀 초대 페이지</h1>
        {invitationListState.map(({ teamInvitationId, teamId, teamName }) => {
          return (
            <div key={teamId} className={classNames(hire, flex_container)}>
              <span className={classNames(text)}>{teamName}</span>
              <div>
                <button
                  type="button"
                  onClick={() => aceeptInvitation(teamName, teamInvitationId)}
                  className={classNames(accept_btn)}
                >
                  수락
                </button>
                <button
                  type="button"
                  onClick={() => handleClickRejectTeamInvitation(teamName, teamInvitationId)}
                  className={classNames(cancel_btn)}
                >
                  취소
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserTeamInvitation;
