import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getApplications } from '@/api/hires';
import { ApplicationElement } from '@/components';
import { application } from '@/types';

interface CheckboxOptions {
  [key: string]: boolean;
}

const HiresAccept = () => {
  const { postId } = useParams<{ postId: string }>();
  const currentPostId = parseInt(postId, 10);

  const [originApplications, setOriginApplications] = useState<Array<application>>([]);
  const [applicationCheckList, setApplicationCheckList] = useState<CheckboxOptions>({});

  useEffect(() => {
    const getCurrentHiresInfo = async () => {
      const { applications } = await getApplications(currentPostId);
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
      {Object.keys(applicationCheckList).length === 0 && <h3>신청한 용병이 없습니다</h3>}
      {Object.keys(applicationCheckList).length > 0 && (
        <ApplicationElement
          currentPostId={currentPostId}
          applicationCheckList={applicationCheckList}
          originApplications={originApplications}
        />
      )}
    </>
  );
};

export default HiresAccept;
