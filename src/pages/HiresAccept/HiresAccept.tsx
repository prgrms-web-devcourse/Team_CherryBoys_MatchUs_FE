import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getApplications } from '@/api/hires';
import { ApplicationElement } from '@/components/Applications';

interface CheckboxOptions {
  [key: string]: boolean;
}

interface application {
  applicationId: number;
  userId: number;
  userNickName: string;
}

const HiresAccept = () => {
  const { postId } = useParams<{ postId: string }>();
  const currentPostId = parseInt(postId, 10);

  const [originApplications, setOriginApplications] = useState<Array<application>>([]);
  const [applicationCheckList, setApplicationCheckList] = useState<CheckboxOptions>({});

  useEffect(() => {
    const getCurrentHiresInfo = async () => {
      const { applications } = await getApplications(currentPostId);
      // console.log(res);
      setOriginApplications([...applications]);
    };

    getCurrentHiresInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPostId]);

  useEffect(() => {
    if (originApplications) {
      const newApplication: CheckboxOptions = {};
      originApplications.forEach(({ applicationId, userId, userNickName }) => {
        newApplication[userNickName] = false;
      });
      setApplicationCheckList(newApplication);
    }
  }, [originApplications]);

  return (
    <>
      {Object.keys(applicationCheckList).length > 0 && (
        <ApplicationElement
          currentPostId={currentPostId}
          applicationCheckList={applicationCheckList}
        />
      )}
    </>
  );
};

export default HiresAccept;
