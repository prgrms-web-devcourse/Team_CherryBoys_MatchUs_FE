import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './MatchReviewModal.module.scss';
import { InputCheckBox } from '@/components';
import { match } from '@/store/match/match';
import { postMatchReview, fetchTagInfo } from '@/api';
import { TagInfo, TagCheckList, TeamSimple } from '@/types';
import { RootState } from '@/store';

const { modalBackground, modalContainer, showModal, modalName, buttonBox, submitButton } = styles;

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
      window.alert('태그는 3개까지만 선택 가능합니다');
      return;
    }

    setSelectedTags(newSelectedTags);
  };

  const handleSubmitReview = async () => {
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
    const requestInfo = {
      matchId: reviewInfo.matchId,
      reviewedTeamId,
      reviewerTeamId,
      reviewerTeamType: isRegisterReviewer ? '등록팀' : '신청팀',
      tags: totalSelectedTags,
    };

    const result = await postMatchReview(requestInfo);
    if (result) {
      window.alert('평가가 성공적으로 반영되었습니다!');
      dispatch(match.actions.toggleModal({ modalName: 'matchReview' }));
      history.go(0);
    } else {
      window.alert('평가에 실패했습니다. 다시 시도해 주세요.');
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
          <button className={classNames(submitButton)} type="button" onClick={handleSubmitReview}>
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchReviewModal;
