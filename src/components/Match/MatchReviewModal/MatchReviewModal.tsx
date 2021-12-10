import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './MatchReviewModal.module.scss';
import { InputCheckBox } from '@/components';
import { match } from '@/store/match/match';

const { modalBackground, modalContainer, showModal, modalName, buttonBox, submitButton } = styles;

interface CheckboxOptions {
  [key: string]: boolean;
}

interface TagOptions {
  [skill: string]: CheckboxOptions;
  good: CheckboxOptions;
  bad: CheckboxOptions;
}

const tagOptions: TagOptions = {
  skill: {
    '발이 빨라요': false,
    '두 개의 심장': false,
    패스마스터: false,
    '개인기가 화려해요': false,
  },
  good: { '매너가 좋아요': false, '뒤끝이 없어요': false, '시간약속을 잘 지켜요': false },
  bad: { 거칠어요: false, 히드라: false, 폭력적이에요: false, 지각쟁이: false },
};

interface ModalState {
  showMatchReviewModal: boolean;
}

const MatchReviewModal = ({ showMatchReviewModal }: ModalState) => {
  const dispatch = useDispatch();

  const handleCloseModal = (e: any) => {
    if (e.target.classList.contains('modalBackground')) {
      dispatch(match.actions.toggleModal({ modalName: 'matchReview' }));
    }
  };

  const [selectedTags, setSelectedTags] = useState(tagOptions);

  const handleOnChangeSelectedTags = (e: any, tagCategory: string) => {
    const targetTag: string = e.target.value;
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
    const matchId = parseInt(useParams<{ matchId: string }>().matchId, 10);

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
          labelName={`스킬 (${Object.values(selectedTags.skill).filter((tag) => tag).length}/3)`}
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
          labelName={`굿 (${Object.values(selectedTags.good).filter((tag) => tag).length}/3)`}
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
          labelName={`배드 (${Object.values(selectedTags.bad).filter((tag) => tag).length}/3)`}
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
