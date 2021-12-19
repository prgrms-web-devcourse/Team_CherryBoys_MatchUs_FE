import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';

import style from './hiresDetail.module.scss';
import { getHiresDetail, deleteHiresPosting } from '@/api/hires';
import { InputDetail } from '@/components';
import { hireItemType } from '../HiresEdit/HiresEdit';

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

  useEffect(() => {
    const getHiresDetailInfo = async () => {
      const res = await getHiresDetail(currentPostId);
      setHireItem(res);
    };

    getHiresDetailInfo();
  }, [currentPostId]);

  const handleClickRemove = async () => {
    const res = await deleteHiresPosting(currentPostId);
  };

  // Todo(홍중) : 팀원이 onChange함수를 필수로 하는것이 이해되는데 input말고 다른 형태로 세부설명을 다시 구현할지 고민하기(2021-12-19)
  const handleChangeDetail = (input: React.SetStateAction<string>) => {};

  const handleClickEdit = () => {
    history.push({
      pathname: `/hires/edit/${postId}`,
      state: { hireItem },
    });
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
                <button type="button">채팅</button>
              </section>
            </div>
          </article>

          <InputDetail
            labelName="상세정보"
            placeholder={hireItem.detail}
            onChange={handleChangeDetail}
          />
          <button type="button">신청 용병 확인</button>
        </>
      )}
    </>
  );
};

export default HiresDetail;
