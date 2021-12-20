/* eslint-disable no-restricted-syntax */
/* eslint-disable no-empty */
import React, { useState } from 'react';

import InputCheckBox from '@/components/common/Inputs/InputCheckBox/InputCheckBox';
import { getApplications, allowApplications } from '@/api/hires';
import { application } from '@/types';

interface CheckboxOptions {
  [key: string]: boolean;
}

interface element {
  currentPostId: number;
  applicationCheckList: CheckboxOptions;
  originApplications: application[];
}
const ApplicationElement = ({
  currentPostId,
  applicationCheckList,
  originApplications,
}: element) => {
  const [hiresApplications, setHiresApplications] = useState<CheckboxOptions>(applicationCheckList);

  const handleOnChangeApplications = (e: React.ChangeEvent<HTMLElement>) => {
    const target: string = (e.target as HTMLInputElement).value;
    const newApplications: CheckboxOptions = { ...hiresApplications };
    newApplications[target] = !newApplications[target];

    setHiresApplications({ ...newApplications });
  };

  const handleClickAllowApplications = async () => {
    const allowedName = [];

    for (const [key, value] of Object.entries(hiresApplications)) {
      if (value === true) {
        allowedName.push(key);
      }
    }

    const allowdApplications = [];
    for (const applications of originApplications) {
      const { applicationId, userId, userNickName } = applications;
      for (const targetApplication of allowedName) {
        if (userNickName === targetApplication) {
          allowdApplications.push(applications);
        }
      }
    }

    const request = {
      applications: allowdApplications,
    };
    await allowApplications({ postId: currentPostId, data: request });
  };

  // Todo(홍중) : label누르면 드랍박스로 focus되도록 수정예정(2021-12-19)
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
