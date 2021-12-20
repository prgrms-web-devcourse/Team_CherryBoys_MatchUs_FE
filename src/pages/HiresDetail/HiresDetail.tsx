import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';

import style from './hiresDetail.module.scss';
import { getHiresDetail, deleteHiresPosting, applyHires, cancelHireRequest } from '@/api/hires';
import { InputDetail } from '@/components';
import { hireItemType } from '@/types';
import { RootState } from '@/store';

const {
  card__teamInfos,
  card__leaderInfo,
  card__tags,
  card__gameInfos__gameSchedule,
  card__gameInfos__gameSchedule__upper,
} = style;

const HiresDetail = () => {
  const history = useHistory();
  const [hireItem, setHireItem] = useState<hireItemType>();
  const { postId } = useParams<{ postId: string }>();
  const currentPostId = parseInt(postId, 10);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [isCaptain, setIsCaptain] = useState(false);

  useEffect(() => {
    const getHiresDetailInfo = async () => {
      const res = await getHiresDetail(currentPostId);
      setHireItem(res);
      // eslint-disable-next-line no-restricted-syntax
      for (const gradeInfo of userInfo.userGradeResponse) {
        const { grade, teamId } = gradeInfo;
        if (teamId === res.teamId && (grade === 'CAPTAIN' || grade === 'SUBCAPTAIN')) {
          setIsCaptain(true);
        }
      }
    };

    getHiresDetailInfo();
  }, [currentPostId, userInfo, isCaptain]);

  useEffect(() => {
    console.error(isCaptain);
  }, []);
  const handleClickRemove = async () => {
    const res = await deleteHiresPosting(currentPostId);
    history.push(`/hires`);
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
  };

  const handleClickCancelHires = async () => {
    const id = 7;
    const res = await cancelHireRequest(7);
    console.log(res);
  };

  const handleClickShowApplications = () => {
    history.push(`/hires/accept/${currentPostId}`);
  };

  // Todo(홍중) : 용병 취소 추후 완성(2021-12-21)
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
          {isCaptain ? (
            <button type="button" onClick={handleClickShowApplications}>
              신청 용병 확인
            </button>
          ) : (
            <button type="button" onClick={handleClickApplyHires}>
              용병 신청
            </button>
          )}
          {/* <button type="button" onClick={handleClickCancelHires}>
            용병 취소
          </button> */}
        </>
      )}
    </>
  );
};

export default HiresDetail;
