import React, { useEffect, useState } from 'react';

import InputCheckBox from '@/components/common/Inputs/InputCheckBox/InputCheckBox';
import { getApplications, allowApplications } from '@/api/hires';

interface CheckboxOptions {
  [key: string]: boolean;
}

interface element {
  currentPostId: number;
  applicationCheckList: CheckboxOptions;
}
const ApplicationElement = ({ currentPostId, applicationCheckList }: element) => {
  const [hiresApplications, setHiresApplications] = useState<CheckboxOptions>(applicationCheckList);

  const handleOnChangeApplications = (e: React.ChangeEvent<HTMLElement>) => {
    const target: string = (e.target as HTMLInputElement).value;
    const newApplications: CheckboxOptions = { ...hiresApplications };
    newApplications[target] = !newApplications[target];

    setHiresApplications({ ...newApplications });
  };

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
  };

  return (
    <>
      <InputCheckBox
        labelName="용병 신청자"
        options={hiresApplications}
        onChange={handleOnChangeApplications}
        icon="far fa-check-square"
      />
      <button type="button" onClick={handleClickAllowApplications}>
        용병 수락
      </button>
    </>
  );
};

export default ApplicationElement;
