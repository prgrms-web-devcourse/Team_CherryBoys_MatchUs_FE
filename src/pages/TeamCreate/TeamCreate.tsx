import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { SPORTS_CATEGORY, AGE_GROUP } from '@/consts';
import { CustomButton, CustomInput, CustomLabel } from '@/components';
import useForm from '@/hooks/useForm';
import {
  TEAM_VALID_ERROR_MSG,
  validateTeamBioLength,
  validateTeamName,
  validateTeamNameLength,
  validateTeamNameHasSpace,
} from '@/utils/validation/validation';
import { createTeam, checkTeamNameDuplication } from '@/api';

const TeamCreate = () => {
  const history = useHistory();
  const [isDuplicatedTeamName, setIsDuplicatedTeamName] = useState<boolean>(true);

  const initialValues = {
    image: {
      url: '',
      file: '',
    },
    teamName: '',
    teamBio: '',
    teamSport: '',
    teamAgeGroup: '',
  };

  const { values, setValues, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit: async ({ image, teamName, teamBio, teamSport, teamAgeGroup }) => {
      const { teamId } = await createTeam({ image, teamName, teamBio, teamSport, teamAgeGroup });

      if (teamId) {
        history.push(`/teams/${teamId}`);
      }
    },
    validate: ({ teamName, teamBio, teamSport, teamAgeGroup }) => {
      const newErros = {} as any;

      if (!validateTeamName(teamName)) {
        newErros.teamName = TEAM_VALID_ERROR_MSG.IS_VALID_NAME;
      }

      if (!validateTeamNameLength(teamName)) {
        newErros.teamName = TEAM_VALID_ERROR_MSG.IS_VALID_LEN;
      }

      if (validateTeamNameHasSpace(teamName)) {
        newErros.teamName = TEAM_VALID_ERROR_MSG.HAS_SPACE;
      }

      if (!validateTeamBioLength(teamBio)) {
        newErros.teamBio = TEAM_VALID_ERROR_MSG.IS_VALID_BIO_LEN;
      }

      if (!teamSport) {
        newErros.teamSport = TEAM_VALID_ERROR_MSG.IS_TEAM_SPORT;
      }

      if (!teamAgeGroup) {
        newErros.teamAgeGroup = TEAM_VALID_ERROR_MSG.IS_TEAM_AGE_GROUP;
      }

      return newErros;
    },
  });

  const readImageFileAsUrl = ({ name, files }: { name: string; files: FileList }) => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = () => {
      setValues({
        ...values,
        [name]: {
          file: files[0],
          url: reader.result,
        },
      });
    };
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement> & { target: HTMLInputElement | FileList | any }
  ) => {
    const { name, files } = e.target;
    readImageFileAsUrl({ name, files });
  };

  const handleCheckTeamNameDuplication = async () => {
    const result = await checkTeamNameDuplication(values.teamName);

    if (result.success) {
      alert('사용 하셔도 좋습니다.');
      setIsDuplicatedTeamName(false);
    }
    alert('중복된 팀 이름이 존재합니다.');
    setIsDuplicatedTeamName(true);
  };

  const isDisabled = !!Object.keys(errors).length;

  return (
    <>
      <header />
      <form onSubmit={handleSubmit}>
        <h1 className={classNames('a11yHidden')}>팀 생성 페이지</h1>
        <p>멋진 팀을 만들어 볼까요?</p>
        <img src={values.image.url} alt="이미지" />
        <input
          id="upload"
          type="file"
          name="image"
          autoComplete="off"
          onChange={handleImageUpload}
          accept="image/*"
        />
        <div>
          <CustomLabel htmlFor="teamName">팀 이름</CustomLabel>
          <CustomInput
            id="teamName"
            type="text"
            placeholder="팀 이름을 작성해 주세요"
            onChange={handleChange}
          />
          {isDuplicatedTeamName ? (
            <button
              type="button"
              onClick={handleCheckTeamNameDuplication}
              disabled={!!errors.teamName}
            >
              중복 확인
            </button>
          ) : (
            <button type="button" disabled>
              완료 🎉
            </button>
          )}
        </div>
        {values.teamName && errors.teamName ? <p>{errors.teamName}</p> : ''}
        <div>
          <CustomLabel htmlFor="teamBio">팀 설명</CustomLabel>
          <CustomInput
            id="teamBio"
            type="text"
            placeholder="세부 설명을 작성해 주세요"
            onChange={handleChange}
          />
        </div>
        {errors.teamBio ? <p>{errors.teamBio}</p> : ''}
        <div>
          <CustomLabel htmlFor="teamSport">종목</CustomLabel>
          <select id="teamSport" onChange={handleChange}>
            <option>종목</option>
            {SPORTS_CATEGORY.map((category) => (
              <option id="teamCategory" key={`team-${category.id}`}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {values.teamSport && errors.teamSport ? <p>{errors.teamSport}</p> : ''}
        <div>
          <CustomLabel htmlFor="teamAgeGroup">연령대</CustomLabel>
          <select id="teamAgeGroup" onChange={handleChange}>
            <option>연령대</option>
            {AGE_GROUP.map((group) => (
              <option id={`${group}s`} key={`team-${group}`}>
                {group}대
              </option>
            ))}
          </select>
        </div>
        {values.teamAgeGroup && errors.teamAgeGroup ? <p>{errors.teamAgeGroup}</p> : ''}
        <CustomButton buttonType="submit" isDisabled={isDisabled}>
          생성
        </CustomButton>
      </form>
    </>
  );
};

export default TeamCreate;
