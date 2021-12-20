/* eslint-disable no-restricted-syntax */
/* eslint-disable no-empty */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import classNames from 'classnames';
import { InputCheckBox, CustomModalDialog } from '@/components';
import { getApplications, allowApplications } from '@/api/hires';
import styles from './ApplicationElement.module.scss';
import { application } from '@/types';

const { applicationContainer, modalMainTitle } = styles;

interface CheckboxOptions {
  [key: string]: boolean;
}

interface request {
  applications: application[];
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
  const history = useHistory();
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    '예상치 못한 에러가 발생했습니다! 다시 시도해주세요'
  );
  const [request, setRequest] = useState<request>({
    applications: [],
  });

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

    setRequest({
      applications: allowdApplications,
    });

    setIsModal1Open(true);
  };

  const handleSubmit = async () => {
    const result = await allowApplications({ postId: currentPostId, data: request });
    if (result) {
      setIsModal2Open(true);
    } else {
      setErrorMessage(
        '용병 영입에 실패했습니다. 일시적인 네트워크 오류일 수 있으니, 다시 한 번 시도해주세요.'
      );
      setIsModal3Open(true);
    }
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
      <button type="button" onClick={handleClickAllowApplications}>
        용병 수락
      </button>
      {isModal1Open && (
        <CustomModalDialog
          modalType="confirm"
          buttonLabel="확인"
          handleCancel={() => setIsModal1Open(false)}
          handleApprove={() => {
            setIsModal1Open(false);
            handleSubmit();
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>용병을 영입하시겠습니까?</span>
        </CustomModalDialog>
      )}
      {isModal2Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => {
            setIsModal2Open(false);
            history.push(`/hires/${currentPostId}`);
          }}
          handleApprove={() => {
            setIsModal2Open(false);
            history.push(`/hires/${currentPostId}`);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            성공적으로 용병을 영입했습니다!
          </span>
        </CustomModalDialog>
      )}
      {isModal3Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => setIsModal3Open(false)}
          handleApprove={() => {
            setIsModal3Open(false);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>{errorMessage}</span>
        </CustomModalDialog>
      )}
    </div>
  );
};

export default ApplicationElement;
