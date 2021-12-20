import React, { useEffect, useState } from 'react';
import { HiresResponseType } from '@/store/posts';
import { Posts } from '@/components';
import { getHiresInfo } from '@/api/hires';
// Todo(홍중) : 임시 데이터, 팀 정보 관리하는곳에서 가져오기(12/13)
const selectedTeam = { teamId: 3, grade: 'CAPTAIN' };

const Hires = () => {
  const [data, setData] = useState<Array<HiresResponseType>>([]);

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
