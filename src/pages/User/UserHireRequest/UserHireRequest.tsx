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
            <span className={classNames(team_name)}>{clickedTeamName}</span>??? ?????? ?????????
            ??????????????????????
          </span>
          <span className={classNames('whiteSpace', modalSubTitle, alert_msg)}>
            ???????????? ????????? ??? ????????????.
          </span>
        </CustomModalDialog>
      )}
      {isCancelDialogOpen && (
        <CustomModalDialog buttonLabel="??????" handleApprove={() => setIsCancelDialogOpen(false)}>
          <span className={classNames('whiteSpace', modalMainTitle)}>?????? ?????? ??????!</span>
          <span className={classNames('whiteSpace', modalSubTitle)}>?????? ????????? ??????????????????.</span>
        </CustomModalDialog>
      )}
      {isCancelFaildDialogOpen && (
        <CustomModalDialog
          buttonLabel="??????"
          handleApprove={() => setIsCancelFaildDialogOpen(false)}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>????????? ???????????????.</span>
          <span className={classNames('whiteSpace', modalSubTitle)}>
            ?????? ?????? ?????? ??????????????????.
          </span>
        </CustomModalDialog>
      )}

      <div className={classNames(container)}>
        <h1 className={classNames(title)}>?????? ?????? ?????? ?????????</h1>
        {hireListState.map(({ applicationId, teamId, teamName }) => {
          return (
            <div key={teamId} className={classNames(hire, flex_container)}>
              <span className={classNames(text)}>{teamName}</span>
              <button
                type="button"
                onClick={() => handleClickHireCancel(teamName, applicationId)}
                className={classNames(cancel_btn)}
              >
                ??????
              </button>
            </div>
          );
        })}
        {hireListState.length < 1 && (
          <div className={classNames(hire, flex_container)}>
            <span className={classNames(text)}>????????? ???????????? ????????????</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHireRequest;
