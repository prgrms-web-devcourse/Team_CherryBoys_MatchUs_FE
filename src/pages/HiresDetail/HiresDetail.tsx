import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';

import style from './hiresDetail.module.scss';
import { getHiresDetail, deleteHiresPosting, applyHires, cancelHireRequest } from '@/api/hires';
import { InputDetail, CustomModalDialog } from '@/components';
import { hireItemType } from '@/types';

const {
  card__teamInfos,
  card__leaderInfo,
  card__tags,
  card__gameInfos__gameSchedule,
  card__gameInfos__gameSchedule__upper,
  modalMainTitle,
} = style;

const HiresDetail = () => {
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    '예상치 못한 에러가 발생했습니다! 다시 시도해주세요'
  );
  const [isRemove, setIsRemove] = useState(false);

  const history = useHistory();
  const [hireItem, setHireItem] = useState<hireItemType>();

  const { postId } = useParams<{ postId: string }>();
  const currentPostId = parseInt(postId, 10);

  useEffect(() => {
    const getHiresDetailInfo = async () => {
      const res = await getHiresDetail(currentPostId);
      setHireItem(res);
    };

    getHiresDetailInfo();
  }, [currentPostId]);

  const handleClickRemove = async () => {
    setIsRemove(true);
    setIsModal1Open(true);
  };

  const handlePostRemove = async () => {
    const res = await deleteHiresPosting(currentPostId);
    if (res) {
      setIsModal2Open(true);
    } else {
      setErrorMessage(
        '게시글 삭제에 실패했습니다. 일시적인 네트워크 오류일 수 있으니, 다시 한 번 시도해주세요.'
      );
      setIsModal3Open(true);
    }
    setIsRemove(false);
  };

  // Todo(홍중) : 팀원이 onChange함수를 필수로 하는것이 이해되는데 input말고 다른 형태로 세부설명을 다시 구현할지 고민하기(2021-12-19)
  const handleChangeDetail = (input: React.SetStateAction<string>) => {};

  const handleClickEdit = () => {
    history.push({
      pathname: `/hires/edit/${postId}`,
      state: { hireItem },
    });
  };

  const handleClickApplyHires = async () => {
    const res = await applyHires(currentPostId);
    console.log(res);
    if (res) {
      setIsModal2Open(true);
    } else {
      setErrorMessage(
        '용병 신청에 실패했습니다. 일시적인 네트워크 오류일 수 있으니, 다시 한 번 시도해주세요.'
      );
      setIsModal3Open(true);
    }
  };

  const handleClickCancelHires = async () => {
    const res = await cancelHireRequest(7);
    console.log(res);
  };

  const handleClickShowApplications = () => {
    history.push(`/hires/accept/${currentPostId}`);
  };

  return (
    <>
      {hireItem && (
        <>
          <button type="button" onClick={handleClickRemove}>
            삭제
          </button>
          <button type="button" onClick={handleClickEdit}>
            수정
          </button>
          <article>
            <section>
              <div className={classNames(card__gameInfos__gameSchedule)}>
                <section className={classNames(card__gameInfos__gameSchedule__upper)}>
                  <div>{`${hireItem.date} ${hireItem.startTime}`}</div>
                  <div>{`${hireItem.hirePlayerNumber}명`}</div>
                </section>
                <div>{`${hireItem.city} ${hireItem.region} ${hireItem.groundName}`}</div>
              </div>
            </section>
            <section className={classNames(card__tags)}>
              <span>{hireItem.position}</span>
              <span>{`${hireItem.ageGroup?.slice(0, hireItem.ageGroup.length - 1)}대`}</span>
              <span>{`${hireItem.teamMannerTemperature}도`}</span>
            </section>
          </article>
          <div>팀 정보</div>
          <article className={classNames(card__teamInfos)}>
            <img src={hireItem.teamLogo} alt="team logo" />
            <div>
              <div>{hireItem.teamName}</div>
              <section className={classNames(card__leaderInfo)}>
                <span>{hireItem.teamManagerName}</span>
              </section>
            </div>
          </article>
          <InputDetail
            labelName="상세정보"
            placeholder={hireItem.detail}
            onChange={handleChangeDetail}
          />
          <button type="button" onClick={handleClickShowApplications}>
            신청 용병 확인
          </button>
          <button type="button" onClick={() => setIsModal1Open(true)}>
            용병 신청
          </button>
          <button type="button" onClick={handleClickCancelHires}>
            용병 취소
          </button>
        </>
      )}

      {isModal1Open && (
        <CustomModalDialog
          modalType="confirm"
          buttonLabel="확인"
          handleCancel={() => {
            setIsModal1Open(false);
            setIsRemove(false);
          }}
          handleApprove={() => {
            setIsModal1Open(false);
            if (isRemove) {
              handlePostRemove();
            } else {
              handleClickApplyHires();
            }
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            {isRemove ? '게시글을 삭제하시겠습니까?' : '용병 신청을 하시겠습니까?'}
          </span>
        </CustomModalDialog>
      )}
      {isModal2Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => {
            setIsModal2Open(false);
            if (isRemove) {
              history.push(`/hires`);
            } else {
              history.go(0);
            }
          }}
          handleApprove={() => {
            setIsModal2Open(false);
            if (isRemove) {
              history.push(`/hires`);
            } else {
              history.go(0);
            }
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            {isRemove
              ? '성공적으로 게시글을 삭제했습니다!'
              : '성공적으로 용병 신청을 완료했습니다!'}
          </span>
        </CustomModalDialog>
      )}
      {isModal3Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => setIsModal3Open(false)}
          handleApprove={() => {
            setIsModal3Open(false);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>{errorMessage}</span>
        </CustomModalDialog>
      )}
    </>
  );
};

export default HiresDetail;
