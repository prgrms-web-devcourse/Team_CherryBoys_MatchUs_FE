import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import InputCheckBox from '@/components/common/Inputs/InputCheckBox/InputCheckBox';
import { getApplications, allowApplications } from '@/api/hires';
import styles from './ApplicationElement.module.scss';

const { applicationContainer, buttonBox, submitButton } = styles;

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

  // Todo(홍중) : label누르면 드랍박스로 focus되도록 수정예정(2021-12-19)
  return (
    <div className={classNames(applicationContainer)}>
      <InputCheckBox
        labelName="신청한 용병 목록"
        options={hiresApplications}
        onChange={handleOnChangeApplications}
        icon="far fa-check-square"
      />
      <div className={classNames(buttonBox)}>
        <button
          className={classNames(submitButton)}
          type="button"
          onClick={handleClickAllowApplications}
        >
          용병 수락
        </button>
      </div>
    </div>
  );
};

export default ApplicationElement;
