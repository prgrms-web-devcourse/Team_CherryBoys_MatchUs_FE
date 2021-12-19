import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllPost, HiresResponseType } from '@/store/posts';
import { Posts } from '@/components';
import { getHiresInfo } from '@/api/hires';
// Todo(홍중) : 임시 데이터, 팀 정보 관리하는곳에서 가져오기(12/13)
const selectedTeam = { teamId: 3, grade: 'GENERAL' };

const Hires = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Array<HiresResponseType>>([]);

  useEffect(() => {
    dispatch(fetchAllPost());
  }, [dispatch]);

  useEffect(() => {
    const getCurrentHiresInfo = async () => {
      const defaultSize = 6;
      const params = {
        size: defaultSize,
      };

      const { hirePosts } = await getHiresInfo(params);
      setData(hirePosts);
    };

    getCurrentHiresInfo();
  }, []);
  return <Posts isMatch={false} selectedTeam={selectedTeam} data={data} />;
};

export default Hires;
