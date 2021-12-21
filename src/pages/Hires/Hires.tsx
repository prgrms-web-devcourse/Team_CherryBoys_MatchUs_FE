/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { HiresResponseType } from '@/store/posts';
import { Posts } from '@/components';
import { getHiresInfo } from '@/api/hires';
import { RootState } from '@/store';
// Todo(홍중) : 임시 데이터, 팀 정보 관리하는곳에서 가져오기(12/13)
const selectedTeam = { teamId: 3, grade: 'CAPTAIN' };

const Hires = () => {
  const [data, setData] = useState<Array<HiresResponseType>>([]);
  const [isCaptain, setIsCaptain] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { modal, hiresFilter } = useSelector((state: RootState) => state.posts.data);

  useEffect(() => {
    const getCurrentHiresInfo = async () => {
      const { hirePosts } = await getHiresInfo(hiresFilter);
      setData(hirePosts);

      for (const post of hirePosts) {
        for (const gradeInfo of userInfo.userGradeResponse) {
          const { grade, teamId } = gradeInfo;
          if (teamId === post.teamId && (grade === 'CAPTAIN' || grade === 'SUBCAPTAIN')) {
            setIsCaptain(true);
            return;
          }
        }
      }
    };

    getCurrentHiresInfo();
  }, [userInfo, isCaptain, hiresFilter]);

  return (
    <Posts
      isMatch={false}
      selectedTeam={selectedTeam}
      data={data}
      isCaptain={isCaptain}
      modal={modal}
    />
  );
};

export default Hires;
