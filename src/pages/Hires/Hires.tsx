/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllPost, HiresResponseType } from '@/store/posts';
import { Posts } from '@/components';
import { getHiresInfo } from '@/api/hires';
import { RootState } from '@/store';
// Todo(홍중) : 임시 데이터, 팀 정보 관리하는곳에서 가져오기(12/13)
const selectedTeam = { teamId: 3, grade: 'CAPTAIN' };

const Hires = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Array<HiresResponseType>>([]);
  const [isCaptain, setIsCaptain] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.user);

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
  }, [userInfo, isCaptain]);
  return <Posts isMatch={false} selectedTeam={selectedTeam} data={data} isCaptain={isCaptain} />;
};

export default Hires;
