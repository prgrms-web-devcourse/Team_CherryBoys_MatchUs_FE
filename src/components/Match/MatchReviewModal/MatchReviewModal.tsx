import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './MatchReviewModal.module.scss';
import { InputCheckBox, CustomModalDialog } from '@/components';
import { match } from '@/store/match/match';
import { postMatchReview, fetchTagInfo } from '@/api';
import { MatchReviewInfo, TagInfo, TagCheckList, TeamSimple } from '@/types';
import { RootState } from '@/store';

const {
  modalBackground,
  modalContainer,
  showModal,
  modalName,
  buttonBox,
  submitButton,
  modalMainTitle,
} = styles;

interface ModalState {
  showMatchReviewModal: boolean;
  reviewInfo: {
    matchId: number;
    registerTeamId: number;
    applyTeamId: number;
    userTeamInfo: TeamSimple[];
  };
}

const selectTagsLimit = 3;

const MatchReviewModal = ({ showMatchReviewModal, reviewInfo }: ModalState) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as Element).classList.contains('modalBackground')) {
      dispatch(match.actions.toggleModal({ modalName: 'matchReview' }));
    }
  };
  const [requestData, setRequestData] = useState<MatchReviewInfo>({
    matchId: 0,
    tags: [],
    reviewerTeamId: 0,
    reviewerTeamType: '',
    reviewedTeamId: 0,
  });
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    '예상치 못한 에러가 발생했습니다! 다시 시도해주세요'
  );

  const { tags } = useSelector((store: RootState) => store.match.data);

  const [tagInfo, setTagInfo] = useState<TagInfo[]>(tags);
  const [selectedTags, setSelectedTags] = useState<TagCheckList>({
    GOOD: {},
    BAD: {},
    NONE: {},
  });

  const getTagInfo = useCallback(async () => {
    const tagData = await fetchTagInfo();
    setTagInfo(tagData.tags);
  }, []);

  const sortTagByType = useCallback(() => {
    const newSelectedTags: TagCheckList = {
      GOOD: {},
      BAD: {},
      NONE: {},
    };
    tagInfo.forEach((tag) => {
      newSelectedTags[tag.tagType][tag.tagName] = false;
    });
    setSelectedTags(newSelectedTags);
  }, [tagInfo]);

  useEffect(() => {
    if (tagInfo.length < 1) {
      getTagInfo();
    }
    sortTagByType();
  }, [tagInfo]);

  const handleOnChangeSelectedTags = (e: React.ChangeEvent<HTMLElement>, tagCategory: string) => {
    const targetTag: string = (e.target as HTMLInputElement).value;
    const newSelectedTags: TagCheckList = {
      NONE: { ...selectedTags.NONE },
      GOOD: { ...selectedTags.GOOD },
      BAD: { ...selectedTags.BAD },
    };
    newSelectedTags[tagCategory][targetTag] = !newSelectedTags[tagCategory][targetTag];
    const selectedTagNumber = Object.values(newSelectedTags[tagCategory]).filter(
      (value) => value
    ).length;
    if (selectedTagNumber > 3) {
      setErrorMessage('태그는 3개까지만 선택 가능합니다');
      setIsModal3Open(true);
      return;
    }

    setSelectedTags(newSelectedTags);
  };

  const handleSetReviewInfo = async () => {
    const totalSelectedTags = tagInfo.reduce((tagArr: number[], tag: TagInfo) => {
      if (selectedTags[tag.tagType][tag.tagName]) tagArr.push(tag.tagId);
      return tagArr;
    }, []);

    const isRegisterReviewer = reviewInfo.userTeamInfo.reduce((acc, team: TeamSimple) => {
      if (team.teamId === reviewInfo.registerTeamId) acc = team.teamId;
      return acc;
    }, 0);
    const reviewerTeamId =
      isRegisterReviewer ||
      reviewInfo.userTeamInfo.reduce((acc, team: TeamSimple) => {
        if (team.teamId === reviewInfo.applyTeamId) acc = team.teamId;
        return acc;
      }, 0);
    const reviewedTeamId =
      reviewInfo.registerTeamId !== reviewerTeamId
        ? reviewInfo.registerTeamId
        : reviewInfo.applyTeamId;

    setRequestData({
      matchId: reviewInfo.matchId,
      reviewedTeamId,
      reviewerTeamId,
      reviewerTeamType: isRegisterReviewer ? '등록팀' : '신청팀',
      tags: totalSelectedTags,
    });

    setIsModal1Open(true);
  };

  const handleSubmit = async () => {
    const result = await postMatchReview(requestData);
    if (result) {
      setIsModal2Open(true);
    } else {
      setErrorMessage(
        '매칭 평가에 실패했습니다. 일시적인 네트워크 오류일 수 있으니, 다시 한 번 시도해주세요.'
      );
      setIsModal3Open(true);
    }
  };

  return (
    <div
      className={classNames('modalBackground', modalBackground, {
        [showModal]: showMatchReviewModal,
      })}
      onClick={handleCloseModal}
      role="presentation"
    >
      <div className={classNames(modalContainer)}>
        <div className={classNames(modalName)}>
          <h3>매칭 평가</h3>
        </div>
        <InputCheckBox
          labelName={`SKILL (${
            Object.values(selectedTags.NONE).filter((tag) => tag).length
          }/${selectTagsLimit})`}
          options={selectedTags.NONE}
          onChange={(e) => handleOnChangeSelectedTags(e, 'NONE')}
          styleProps={{
            checkBoxWidth: 'fit-content',
            checkBoxBorder: '0.2rem solid #c4c4c4',
            checkBoxMargin: '0.4rem',
            checkBoxBorderRadius: '20rem',
            unCheckedBoxWidth: 'fit-content',
            checkedBoxInputBackgroundColor: '#56ad79',
            checkedBoxFontColor: '#fff',
          }}
        />
        <InputCheckBox
          labelName={`GOOD (${
            Object.values(selectedTags.GOOD).filter((tag) => tag).length
          }/${selectTagsLimit})`}
          options={selectedTags.GOOD}
          onChange={(e) => handleOnChangeSelectedTags(e, 'GOOD')}
          styleProps={{
            checkBoxWidth: 'fit-content',
            checkBoxBorder: '0.2rem solid #c4c4c4',
            checkBoxMargin: '0.4rem',
            checkBoxBorderRadius: '20rem',
            unCheckedBoxWidth: 'fit-content',
            checkedBoxInputBackgroundColor: '#56ad79',
            checkedBoxFontColor: '#fff',
          }}
        />
        <InputCheckBox
          labelName={`BAD (${
            Object.values(selectedTags.BAD).filter((tag) => tag).length
          }/${selectTagsLimit})`}
          options={selectedTags.BAD}
          onChange={(e) => handleOnChangeSelectedTags(e, 'BAD')}
          styleProps={{
            checkBoxWidth: 'fit-content',
            checkBoxBorder: '0.2rem solid #c4c4c4',
            checkBoxMargin: '0.4rem',
            checkBoxBorderRadius: '20rem',
            unCheckedBoxWidth: 'fit-content',
            checkedBoxInputBackgroundColor: '#56ad79',
            checkedBoxFontColor: '#fff',
          }}
        />
        <div className={classNames(buttonBox)}>
          <button className={classNames(submitButton)} type="button" onClick={handleSetReviewInfo}>
            제출
          </button>
        </div>
      </div>
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
          <span className={classNames('whiteSpace', modalMainTitle)}>
            평가 내용을 제출하시겠습니까?
          </span>
        </CustomModalDialog>
      )}
      {isModal2Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => {
            setIsModal2Open(false);
            dispatch(match.actions.toggleModal({ modalName: 'matchReview' }));
            history.go(0);
          }}
          handleApprove={() => {
            setIsModal2Open(false);
            dispatch(match.actions.toggleModal({ modalName: 'matchReview' }));
            history.go(0);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            성공적으로 평가 내용을 제출하였습니다!
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

export default MatchReviewModal;
