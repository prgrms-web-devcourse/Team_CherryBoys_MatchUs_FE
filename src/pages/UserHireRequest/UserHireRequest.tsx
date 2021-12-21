import * as React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import style from './userHireRequest.module.scss';
import { CustomModalDialog } from '@/components';
import { RootState, useAppDispatch } from '@/store';
import { getHireRequest, hireRequestCancel } from '@/store/userSlice';

export interface hireRequestType {
  applicationId: number;
  hirePostId: number;
  teamId: number;
  teamName: string;
}

const UserHireRequest = () => {
  const [selectedApplicationId, setSelectedApplicationId] = useState<number>(0);
  const [isConfirmDialogOpen, setIsConfrimDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isCancelFaildDialogOpen, setIsCancelFaildDialogOpen] = useState(false);
  const [clickedTeamName, setClickedTeamName] = useState<string>('');
  const [hireListState, setHireListState] = useState<hireRequestType[]>([]);
  const hireList: hireRequestType[] = useSelector((state: RootState) => state.user.hireRequestList);
  const dispatch = useAppDispatch();
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
  } = style;

  useEffect(() => {
    dispatch(getHireRequest());
  }, [dispatch]);

  useEffect(() => {
    setHireListState([...hireList]);
  }, [hireList]);

  const cancelHireRequest = () => {
    setIsConfrimDialogOpen(false);

    dispatch(hireRequestCancel(selectedApplicationId))
      .unwrap()
      .then(() => {
        setIsCancelDialogOpen(true);

        const newHireRequestList = hireListState.filter(
          (list) => list.applicationId !== selectedApplicationId
        );

        setHireListState(newHireRequestList);
      })
      .catch(() => setIsCancelFaildDialogOpen(true));
  };

  const handleClickHireCancel = (teamName: string, applicationId: number) => {
    setClickedTeamName(teamName);
    setSelectedApplicationId(applicationId);
    setIsConfrimDialogOpen(true);
  };

  return (
    <div className={classNames(wrapper)}>
      {isConfirmDialogOpen && (
        <CustomModalDialog
          modalType="confirm"
          handleApprove={cancelHireRequest}
          handleCancel={() => setIsConfrimDialogOpen(false)}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            <span className={classNames(team_name)}>{clickedTeamName}</span>의 용병 신청을
            취소하시겠어요?
          </span>
          <span className={classNames('whiteSpace', modalSubTitle, alert_msg)}>
            취소하면 되돌릴 수 없습니다.
          </span>
        </CustomModalDialog>
      )}
      {isCancelDialogOpen && (
        <CustomModalDialog buttonLabel="확인" handleApprove={() => setIsCancelDialogOpen(false)}>
          <span className={classNames('whiteSpace', modalMainTitle)}>신청 취소 완료!</span>
          <span className={classNames('whiteSpace', modalSubTitle)}>용병 신청을 취소했습니다.</span>
        </CustomModalDialog>
      )}
      {isCancelFaildDialogOpen && (
        <CustomModalDialog
          buttonLabel="확인"
          handleApprove={() => setIsCancelFaildDialogOpen(false)}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>에러가 발생했어요.</span>
          <span className={classNames('whiteSpace', modalSubTitle)}>
            잠시 후에 다시 시도해주세요.
          </span>
        </CustomModalDialog>
      )}

      <div className={classNames(container)}>
        <h1 className={classNames(title)}>용병 신청 취소 페이지</h1>
        {hireListState.map(({ applicationId, teamId, teamName }) => {
          return (
            <div key={teamId} className={classNames(hire, flex_container)}>
              <span className={classNames(text)}>{teamName}</span>
              <button
                type="button"
                onClick={() => handleClickHireCancel(teamName, applicationId)}
                className={classNames(cancel_btn)}
              >
                취소
              </button>
            </div>
          );
        })}
        {hireListState.length < 1 && (
          <div className={classNames(hire, flex_container)}>
            <span className={classNames(text)}>신청한 용병글이 없습니다</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHireRequest;
