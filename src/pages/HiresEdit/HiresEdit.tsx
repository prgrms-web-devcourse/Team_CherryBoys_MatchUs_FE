import React from 'react';
import { useParams } from 'react-router-dom';
import { editHiresPosting, getHiresDetail } from '@/api/hires';

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

  return (
    <>
      <button type="button" onClick={handleClickEditPosting}>
        수정
      </button>
    </>
  );
};

export default HiresEdit;
