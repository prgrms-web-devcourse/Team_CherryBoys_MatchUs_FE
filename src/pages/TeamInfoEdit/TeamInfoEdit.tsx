import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { SPORTS_CATEGORY, AGE_GROUP } from '@/consts';
import { CustomButton, CustomInput, CustomLabel } from '@/components';
import useForm from '@/hooks/useForm';
import { validateTeamBioLength, TEAM_VALID_ERROR_MSG } from '@/utils/validation/validation';

const TeamInfoEdit = () => {
  const initialValues = {
    image: {
      url: '',
      file: '',
    },
    teamBio: '',
    teamSport: '',
    teamAgeGroup: '',
  };

  const { values, setValues, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit: () => {},
    validate: ({ teamBio, teamSport, teamAgeGroup }) => {
      const newErros = {} as any;

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

  const isDisabled = !!Object.keys(errors).length;

  return (
    <>
      <header />
      <form onSubmit={handleSubmit}>
        <h1 className={classNames('s_a11yHidden')}>팀 수정 페이지</h1>
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
          <CustomLabel htmlFor="teamBio">팀 설명</CustomLabel>
          <CustomInput
            id="teamBio"
            type="text"
            placeholder="세부 설명을 작성해 주세요"
            onChange={handleChange}
          />
        </div>
        {isDisabled ? <p>{errors.teamBio}</p> : ''}
        <div>
          <CustomLabel htmlFor="teamSportCategory">종목</CustomLabel>
          <select id="teamSportCategory" onChange={handleChange}>
            <option>종목</option>
            {SPORTS_CATEGORY.map((category) => (
              <option id={`team-${category.id}`} key={`team-${category.id}`}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {isDisabled ? <p>{errors.teamSport}</p> : ''}
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
        {isDisabled ? <p>{errors.teamAgeGroup}</p> : ''}
        <CustomButton buttonType="submit" isDisabled={isLoading}>
          팀 정보 수정
        </CustomButton>
      </form>
    </>
  );
};

export default TeamInfoEdit;
