import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './MatchDetail.module.scss';
import { deleteMatchById } from '@/api';
import { getItemFromStorage } from '@/utils/storage';
import { CustomModalDialog } from '@/components';

interface Props {
  matchId: number;
  matchDetail: string;
  editable: boolean;
}

const {
  matchDetailContainer,
  matchDetailMenu,
  menuName,
  buttonBox,
  editButton,
  removeButton,
  matchDetailContent,
  modalMainTitle,
} = styles;

const MatchDetail = ({ matchId, matchDetail, editable }: Props) => {
  const token = getItemFromStorage('accessToken');
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    '예상치 못한 에러가 발생했습니다! 다시 시도해주세요'
  );

  const handleRemoveMatch = () => {
    if (token && window.confirm(`작성글을 삭제하시겠습니까?`)) {
      deleteMatchById(matchId);
      window.location.replace('/matches');
    }
  };

  return (
    <div className={classNames(matchDetailContainer)}>
      <div className={classNames(matchDetailMenu)}>
        <h3 className={classNames(menuName)}>상세정보</h3>
        {editable && (
          <div className={classNames(buttonBox)}>
            <button className={classNames(editButton)} type="button">
              <Link to={`/matches/edit/${matchId}`}>
                <i className="fas fa-pen" />
              </Link>
            </button>
            <button
              className={classNames(removeButton)}
              type="button"
              onClick={() => setIsModal1Open(true)}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        )}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: matchDetail }}
        className={classNames(matchDetailContent)}
      />

      {isModal1Open && (
        <CustomModalDialog
          modalType="confirm"
          buttonLabel="확인"
          handleCancel={() => {
            setIsModal1Open(false);
          }}
          handleApprove={() => {
            setIsModal1Open(false);
            handleRemoveMatch();
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            게시글을 삭제하시겠습니까?
          </span>
        </CustomModalDialog>
      )}
      {isModal2Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => {
            setIsModal2Open(false);
            window.location.replace('/matches');
          }}
          handleApprove={() => {
            setIsModal2Open(false);
            window.location.replace('/matches');
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            성공적으로 게시글을 삭제했습니다!
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

export default MatchDetail;
