import React from 'react';
import HiresDetails from './HiresDetails';

const imageURL =
  'https://unsplash.com/photos/Cjfl8r_eYxY/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjM4Njc4Mjg5&force=true&w=80';

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
  teamMannerTemperature: '36.5도',
  hiredPlayerNumber: 1,
  hirePlayerNumber: 3,
  teamName: '쭝쭝',
  teamManagerName: '쭝',
  detail: '잘하는분 환영',
};

const HiresDetailPage = () => {
  return <HiresDetails hireItem={hireItem} />;
};

export default HiresDetailPage;
