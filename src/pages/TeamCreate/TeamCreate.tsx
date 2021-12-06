import React from 'react';
import classNames from 'classnames';
import { CustomButton, CustomInput, CustomLabel } from '@/components/common';

const SPORTS_CATEGORY = [
  { id: 'FOOTBALL', name: '축구' },
  { id: 'FUTSAL', name: '풋살' },
];
const AGE_GROUP = ['20', '30', '40', '50', '60', '70'];

const handleSubmitTeamInfo = (e: React.FormEvent<HTMLFormElement>) => {
  // TODO: API 구현 완료 시, 본 handler를 통해서 통신 할 예정
  e.preventDefault();
};

const TeamCreate = () => {
  return (
    <>
      <header />
      <form onSubmit={handleSubmitTeamInfo}>
        <h1 className={classNames('s_a11yHidden')}>팀 생성 페이지</h1>
        <p>멋진 팀을 만들어 볼까요?</p>
        <div>
          <CustomLabel htmlFor="teamName">팀 이름</CustomLabel>
          <CustomInput id="teamName" type="text" placeholder="팀 이름을 작성해 주세요" />
        </div>
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
        <CustomButton buttonType="submit">생성</CustomButton>
      </form>
    </>
  );
};

export default TeamCreate;
