import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './MatchReviewModal.module.scss';
import { InputCheckBox } from '@/components';
import { match } from '@/store/match/match';
import { postMatchReview, fetchTagInfo } from '@/api';
import { TagInfo, TagCheckList } from '@/types';
import { RootState } from '@/store';

const { modalBackground, modalContainer, showModal, modalName, buttonBox, submitButton } = styles;

interface ModalState {
  showMatchReviewModal: boolean;
  teamInfo: {
    matchId: number;
    teams: number[];
    userTeams: number[];
  };
}

const selectTagsLimit = 3;

const MatchReviewModal = ({ showMatchReviewModal, teamInfo }: ModalState) => {
  const matchId = parseInt(useParams<{ postId: string }>().postId, 10);
  const dispatch = useDispatch();

  const handleCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as Element).classList.contains('modalBackground')) {
      dispatch(match.actions.toggleModal({ modalName: 'matchReview' }));
    }
  };
  console.log(teamInfo);
  const { tags } = useSelector((store: RootState) => store.match.data);
  const { userInfo } = useSelector((store: RootState) => store.user);

  const [tagInfo, setTagInfo] = useState<TagInfo[]>(tags);
  const [selectedTags, setSelectedTags] = useState<TagCheckList>({
    GOOD: {},
    BAD: {},
    NONE: {},
  });

  const getTagInfo = useCallback(async () => {
    const tagData = await fetchTagInfo();
    setTagInfo(tagData);
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

  const onSubmit = () => {
    const totalSelectedTags = tagInfo.reduce((tagArr: number[], tag: TagInfo) => {
      if (selectedTags[tag.tagType][tag.tagName]) tagArr.push(tag.tagId);
      return tagArr;
    }, []);

    const reviewerIndex = teamInfo.teams.findIndex((team) => teamInfo.userTeams.includes(team));
    const reviewedIndex = teamInfo.teams.length - reviewerIndex;
    const requestInfo = {
      matchId: teamInfo.matchId,
      reviewedTeamId: teamInfo.teams[reviewerIndex],
      reviewerTeamId: teamInfo.teams[reviewedIndex],
      reviewerTeamType: reviewerIndex > 0 ? 'apply' : 'register',
      tags: totalSelectedTags,
    };

    postMatchReview(requestInfo);
  };
  // console.log('tagInfo', tagInfo);
  // console.log('selectedTag', selectedTags);
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
          <button className={classNames(submitButton)} type="button" onClick={onSubmit}>
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchReviewModal;
