import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllPost } from '@/store/posts';
import { Posts } from '@/components';
import { getHiresInfo } from '@/api/hires';
// Todo(홍중) : 임시 데이터, 팀 정보 관리하는곳에서 가져오기(12/13)
const selectedTeam = { teamId: 3, grade: 'GENERAL' };

const Hires = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPost());
  }, [dispatch]);

  useEffect(() => {
    const getCurrentHiresInfo = async () => {
      const defaultSize = 6;
      const params = {
        size: defaultSize,
      };
      const res = await getHiresInfo(params);
      console.log(res);
    };

    getCurrentHiresInfo();
  }, []);
  return <Posts isMatch={false} selectedTeam={selectedTeam} />;
};

export default Hires;
