import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getApplications, allowApplications } from '@/api/hires';

const HiresAccept = () => {
  const { postId } = useParams<{ postId: string }>();
  const currentPostId = parseInt(postId, 10);

  useEffect(() => {
    const getCurrentHiresInfo = async () => {
      const res = await getApplications(currentPostId);
      console.log(res);
    };

    getCurrentHiresInfo();
  }, [currentPostId]);

  const handleClickAllowApplications = async () => {
    const data = {
      applications: [
        {
          applicationId: 2,
          userId: 2,
          userNickName: '머쓱머쓱1',
        },
        {
          applicationId: 3,
          userId: 3,
          userNickName: '머쓱머쓱2',
        },
      ],
    };

    const res = await allowApplications({ postId: currentPostId, data });
    console.log(res);
  };

  return (
    <button type="button" onClick={handleClickAllowApplications}>
      용병 수락
    </button>
  );
};

export default HiresAccept;
