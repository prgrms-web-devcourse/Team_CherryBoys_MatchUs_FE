import React from 'react';
import classNames from 'classnames';
import { SPORTS_CATEGORY, AGE_GROUP } from '@/consts';
import { CustomButton, CustomInput, CustomLabel } from '@/components';

const handleEditTeamInfo = (e: React.FormEvent<HTMLFormElement>) => {
  // TODO: API 구현 완료 시, 본 handler를 통해서 통신 할 예정
  e.preventDefault();
};

const TeamInfoEdit = () => {
  return (
    <>
      <header />
      <form onSubmit={handleEditTeamInfo}>
        <h1 className={classNames('s_a11yHidden')}>팀 수정 페이지</h1>
        <p>멋진 팀을 만들어 볼까요?</p>
        <div>
          <CustomLabel htmlFor="teamBio">팀 설명</CustomLabel>
          <CustomInput id="teamBio" type="text" placeholder="세부 설명을 작성해 주세요" />
        </div>
        <div>
          <CustomLabel htmlFor="teamSportCategory">종목</CustomLabel>
          <select id="teamSportCategory">
            {SPORTS_CATEGORY.map((category) => (
              <option id={`team-${category.id}`} key={`team-${category.id}`}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <CustomLabel htmlFor="teamAgeGroup">종목</CustomLabel>
          <select id="teamAgeGroup">
            {AGE_GROUP.map((group) => (
              <option id={`${group}s`} key={`team-${group}`}>
                {group}대
              </option>
            ))}
          </select>
        </div>
        <CustomButton buttonType="submit">팀 정보 수정</CustomButton>
      </form>
    </>
  );
};

export default TeamInfoEdit;
