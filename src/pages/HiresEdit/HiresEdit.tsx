import React from 'react';
import { useParams } from 'react-router-dom';

import { editHiresPosting, getHiresDetail } from '@/api/hires';
import { HiresCreate } from '..';

const HiresEdit = () => {
  const { postId } = useParams<{ postId: string }>();
  const currentPostId = parseInt(postId, 10);

  const handleClickEditPosting = async () => {
    const data = {
      ageGroup: '30대',
      cityId: 1,
      date: '2021-12-15',
      detail: '수정내용입니다~',
      endTime: '19:30:00',
      groundId: 1,
      hirePlayerNumber: 3,
      position: '윙백',
      regionId: 1,
      startTime: '17:30:00',
      teamId: 1,
    };
    const editHires = async () => {
      const res = await editHiresPosting({ postId: currentPostId, data });
    };

    editHires();
  };

  const data = {
    prevHiredNumber: 3,
    prevDate: '2021-12-27',
    prevStartTime: '16:20:35',
    prevEndTime: '22:42:35',
    prevCity: '서울시',
    prevRegion: '강서구',
    prevGroundName: '제2 체육관',
    prevPosition: '윙포워드',
    prevAgeGroup: '20대',
    prevDetail: '즐겁게 하실 분!',
  };

  return (
    <>
      <HiresCreate
        prevHiredNumber={data.prevHiredNumber}
        prevDate={data.prevDate}
        prevStartTime={data.prevStartTime}
        prevEndTime={data.prevEndTime}
        prevCity={data.prevCity}
        prevRegion={data.prevRegion}
        prevGroundName={data.prevGroundName}
        prevPosition={data.prevPosition}
        prevAgeGroup={data.prevAgeGroup}
        prevDetail={data.prevDetail}
      />
      <button type="button" onClick={handleClickEditPosting}>
        수정
      </button>
    </>
  );
};

export default HiresEdit;
