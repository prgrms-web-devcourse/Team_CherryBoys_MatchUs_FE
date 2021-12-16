import React from 'react';
import { createHiresPosting } from '@/api/hires';

const HiresCreate = () => {
  const handleClickCreatePosting = async () => {
    const data = {
      ageGroup: '20대',
      cityId: 1,
      date: '2021-12-15',
      detail: '상세내용입니다~',
      endTime: '19:30:00',
      groundId: 1,
      hirePlayerNumber: 3,
      position: '윙백',
      regionId: 1,
      startTime: '17:30:00',
      teamId: 1,
    };
    const res = await createHiresPosting(data);
  };

  return (
    <>
      <button type="button" onClick={handleClickCreatePosting}>
        생성
      </button>
    </>
  );
};

export default HiresCreate;
