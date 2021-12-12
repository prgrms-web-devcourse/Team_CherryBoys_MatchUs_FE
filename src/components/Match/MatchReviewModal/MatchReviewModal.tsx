import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MatchReviewModal.module.scss';
import { InputCheckBox } from '@/components';
import { match } from '@/store/match/match';
import { RootState } from '@/store';
import { TAG_OPTIONS, TagOptions } from '@/consts';

const { modalBackground, modalContainer, showModal, modalName, buttonBox, submitButton } = styles;

interface ModalState {
  showMatchReviewModal: boolean;
}

const selectTagsLimit = 3;

const MatchReviewModal = ({ showMatchReviewModal }: ModalState) => {
  const { matchId } = useSelector((store: RootState) => store.match.data);
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
    const selectedSkillTags = Object.entries(selectedTags.skill).reduce((acc: string[], cur) => {
      if (cur[1]) acc.push(cur[0]);
      return acc;
    }, []);
    const selectedGoodTags = Object.entries(selectedTags.good).reduce((acc: string[], cur) => {
      if (cur[1]) acc.push(cur[0]);
      return acc;
    }, []);
    const selectedBadTags = Object.entries(selectedTags.bad).reduce((acc: string[], cur) => {
      if (cur[1]) acc.push(cur[0]);
      return acc;
    }, []);
    const totalSelectedTags = [...selectedSkillTags, ...selectedGoodTags, ...selectedBadTags];

    // Parameters
    // Path = matchId: Number, teamId: Number (상대팀: 추후 추가)
    // Body = Tags: Array
    console.log(matchId, totalSelectedTags);
    // dispatch(match.actions.toggleModal({ modalName: 'matchApply' }));
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
          labelName={`스킬 (${
            Object.values(selectedTags.skill).filter((tag) => tag).length
          }/${selectTagsLimit})`}
          options={selectedTags.skill}
          onChange={(e) => handleOnChangeSelectedTags(e, 'skill')}
          styleProps={{
            checkBoxWidth: 'fit-content',
            checkBoxBorder: '0.2rem solid #c4c4c4',
            checkBoxMargin: '0.4rem',
            checkBoxBorderRadius: '20rem',
          }}
        />
        <InputCheckBox
          labelName={`굿 (${
            Object.values(selectedTags.good).filter((tag) => tag).length
          }/${selectTagsLimit})`}
          options={selectedTags.good}
          onChange={(e) => handleOnChangeSelectedTags(e, 'good')}
          styleProps={{
            checkBoxWidth: 'fit-content',
            checkBoxBorder: '0.2rem solid #c4c4c4',
            checkBoxMargin: '0.4rem',
            checkBoxBorderRadius: '20rem',
          }}
        />
        <InputCheckBox
          labelName={`배드 (${
            Object.values(selectedTags.bad).filter((tag) => tag).length
          }/${selectTagsLimit})`}
          options={selectedTags.bad}
          onChange={(e) => handleOnChangeSelectedTags(e, 'bad')}
          styleProps={{
            checkBoxWidth: 'fit-content',
            checkBoxBorder: '0.2rem solid #c4c4c4',
            checkBoxMargin: '0.4rem',
            checkBoxBorderRadius: '20rem',
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
