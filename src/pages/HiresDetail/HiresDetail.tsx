import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import style from './hiresDetail.module.scss';
import { getHiresDetail, deleteHiresPosting } from '@/api/hires';
import { InputDetail } from '@/components';

const imageURL =
  'https://unsplash.com/photos/Cjfl8r_eYxY/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjM4Njc4Mjg5&force=true&w=80';

const DETAIL_PLACEHOLDER = '약속 잘지키고 유쾌하신분과 즐겁게 경기하고 싶습니다';

const hireItem = {
  postId: 1,
  teamLogo: imageURL,
  date: '2021-12-25',
  startTime: '14:00',
  city: '서울특별시',
  region: '광진구',
  groundName: '어린이대공원풋살장',
  position: '윙백',
  ageGroup: '20s',
  teamMannerTemperature: 36.5,
  hiredPlayerNumber: 1,
  hirePlayerNumber: 3,
  teamName: '쭝쭝',
  teamManagerName: '쭝',
  detail: '잘하는분 환영',
};

const {
  card__teamInfos,
  card__leaderInfo,
  card__tags,
  card__gameInfos__gameSchedule,
  card__gameInfos__gameSchedule__upper,
} = style;

const HiresDetail = () => {
  const [detail, setDetail] = useState<string>(DETAIL_PLACEHOLDER);

  const {
    date,
    startTime,
    hirePlayerNumber,
    hiredPlayerNumber,
    city,
    region,
    groundName,
    position,
    ageGroup,
    teamMannerTemperature,
    teamLogo,
    teamName,
    teamManagerName,
  } = hireItem;

  const { postId } = useParams<{ postId: string }>();
  const currentPostId = parseInt(postId, 10);

  useEffect(() => {
    const getHiresDetailInfo = async () => {
      const res = await getHiresDetail(currentPostId);
    };

    getHiresDetailInfo();
  }, [currentPostId]);

  const handleClickRemove = async () => {
    const res = await deleteHiresPosting(currentPostId);
  };

  const handleChangeDetail = (input: React.SetStateAction<string>) => {
    setDetail(input);
  };

  return (
    <>
      <button type="button" onClick={handleClickRemove}>
        삭제
      </button>
      <button type="button">수정</button>
      <article>
        <section>
          <div className={classNames(card__gameInfos__gameSchedule)}>
            <section className={classNames(card__gameInfos__gameSchedule__upper)}>
              <div>{`${date} ${startTime}`}</div>
              <div>{`${hiredPlayerNumber} / ${hirePlayerNumber}명`}</div>
            </section>
            <div>{`${city} ${region} ${groundName}`}</div>
          </div>
        </section>
        <section className={classNames(card__tags)}>
          <span>{position}</span>
          <span>{`${ageGroup.slice(0, ageGroup.length - 1)}대`}</span>
          <span>{`${teamMannerTemperature}도`}</span>
        </section>
      </article>
      <div>팀 정보</div>
      <article className={classNames(card__teamInfos)}>
        <img src={teamLogo} alt="team logo" />
        <div>
          <div>{teamName}</div>
          <section className={classNames(card__leaderInfo)}>
            <span>{teamManagerName}</span>
            <button type="button">채팅</button>
          </section>
        </div>
      </article>

      <InputDetail
        labelName="상세정보"
        placeholder={DETAIL_PLACEHOLDER}
        onChange={handleChangeDetail}
      />
      <button type="button">신청 용병 확인</button>
    </>
  );
};

export default HiresDetail;
