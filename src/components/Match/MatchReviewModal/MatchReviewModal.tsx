import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './MatchReviewModal.module.scss';
import { InputCheckBox } from '@/components';
import { match } from '@/store/match/match';
import { TAG_OPTIONS, TagOptions } from '@/consts';
import { postMatchReview } from '@/api';
import { Match } from '@/types';

const { modalBackground, modalContainer, showModal, modalName, buttonBox, submitButton } = styles;

interface ModalState {
  showMatchReviewModal: boolean;
  matchInfo: Match;
}

const selectTagsLimit = 3;

const MatchReviewModal = ({ showMatchReviewModal, matchInfo }: ModalState) => {
  const matchId = parseInt(useParams<{ postId: string }>().postId, 10);
  const dispatch = useDispatch();

  const handleCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as Element).classList.contains('modalBackground')) {
      dispatch(match.actions.toggleModal({ modalName: 'matchReview' }));
    }
  };

  const [selectedTags, setSelectedTags] = useState(TAG_OPTIONS);

  const handleOnChangeSelectedTags = (e: React.ChangeEvent<HTMLElement>, tagCategory: string) => {
    const targetTag: string = (e.target as HTMLInputElement).value;
    const newSelectedTags: TagOptions = {
      skill: { ...selectedTags.skill },
      good: { ...selectedTags.good },
      bad: { ...selectedTags.bad },
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
    const skillTags = Object.entries(selectedTags.skill);
    const selectedSkillTags = skillTags.reduce((selected: string[], tag) => {
      if (tag[1]) selected.push(tag[0]);
      return selected;
    }, []);
    const goodTags = Object.entries(selectedTags.good);
    const selectedGoodTags = goodTags.reduce((selected: string[], tag) => {
      if (tag[1]) selected.push(tag[0]);
      return selected;
    }, []);
    const badTags = Object.entries(selectedTags.bad);
    const selectedBadTags = badTags.reduce((selected: string[], tag) => {
      if (tag[1]) selected.push(tag[0]);
      return selected;
    }, []);
    const totalSelectedTags = [...selectedSkillTags, ...selectedGoodTags, ...selectedBadTags];

    // TODO: 매칭 평가 API 요청, 태그ID, 회원정보 대조해서 리뷰어/대상 체크
    console.log({
      matchId,
      tags: totalSelectedTags,
    });
    // postMatchReview();
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
            Object.values(selectedTags.skill).filter((tag) => tag).length
          }/${selectTagsLimit})`}
          options={selectedTags.skill}
          onChange={(e) => handleOnChangeSelectedTags(e, 'skill')}
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
            Object.values(selectedTags.good).filter((tag) => tag).length
          }/${selectTagsLimit})`}
          options={selectedTags.good}
          onChange={(e) => handleOnChangeSelectedTags(e, 'good')}
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
            Object.values(selectedTags.bad).filter((tag) => tag).length
          }/${selectTagsLimit})`}
          options={selectedTags.bad}
          onChange={(e) => handleOnChangeSelectedTags(e, 'bad')}
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
