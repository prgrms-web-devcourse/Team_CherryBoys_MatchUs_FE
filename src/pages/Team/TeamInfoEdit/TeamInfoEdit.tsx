import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import { SPORTS_CATEGORY, AGE_GROUP } from '@/consts';
import { CustomButton, CustomInput, CustomLabel } from '@/components';
import useForm from '@/hooks/useForm';
import { validateTeamBioLength, TEAM_VALID_ERROR_MSG } from '@/utils/validation/validation';
import { editTeamInfo } from '@/api';
import style from '../TeamCreate/teamCreate.module.scss';
import baseTeamLogo from '@/assets/images/baseTeamLogo.png';

const {
  titleContainer,
  highlight,
  mainTitle,
  inputsContainer,
  userInput,
  userBioinput,
  inputLabel,
  submitButton,
  logoImage,
  logoImageInput,
  logoImageContainer,
  errorMessage,
} = style;

const TeamInfoEdit = () => {
  const history = useHistory();
  const initialValues = {
    image: {
      url: '',
      file: '',
    },
    teamBio: '',
    teamSport: '',
    teamAgeGroup: '',
  };
  const teamId = parseInt(useParams<{ teamId: string }>().teamId, 10);

  const { values, setValues, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit: async ({ image, teamBio, teamAgeGroup }) => {
      const result = await editTeamInfo({ image, teamBio, teamAgeGroup, teamId });

      if (result.teamId) {
        history.push('/team/select');
      }
    },
    validate: ({ image, teamBio, teamAgeGroup }) => {
      const newErros = {} as any;

      if (!validateTeamBioLength(teamBio)) {
        newErros.teamBio = TEAM_VALID_ERROR_MSG.IS_VALID_BIO_LEN;
      }

      if (image.file === '') {
        newErros.image = TEAM_VALID_ERROR_MSG.HAS_TEAM_LOGO_IMAGE;
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

  const isDisabled = !!Object.keys(errors).length || isLoading;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className={classNames('a11yHidden')}>팀 수정 페이지</h1>
        <p className={classNames(titleContainer)}>
          <span className={classNames(mainTitle, 'whiteSpace')}>
            우리 <span className={classNames(highlight)}>팀</span>의
          </span>
          <span className={classNames(mainTitle, 'whiteSpace')}>간판을 바꿔봐요 👀</span>
        </p>

        <div className={classNames(inputsContainer)}>
          <div className={classNames(logoImageContainer)}>
            <img
              src={values.image.url ? values.image.url : baseTeamLogo}
              className={classNames(logoImage)}
              alt="이미지"
            />

            <input
              id="upload"
              type="file"
              name="image"
              autoComplete="off"
              onChange={handleImageUpload}
              accept="image/*"
              className={classNames(logoImageInput)}
            />
          </div>

          <div>
            <CustomLabel htmlFor="teamBio" className={classNames(inputLabel, 'whiteSpace')}>
              팀 설명
            </CustomLabel>
            <textarea
              id="teamBio"
              placeholder="세부 설명을 200자 이하로 작성해 주세요"
              onChange={handleChange}
              className={classNames(userBioinput)}
            />
          </div>
          {errors.teamBio ? <p className={classNames(errorMessage)}>{errors.teamBio}</p> : ''}

          <div>
            <CustomLabel htmlFor="teamAgeGroup" className={classNames(inputLabel, 'whiteSpace')}>
              연령대
            </CustomLabel>
            <select id="teamAgeGroup" onChange={handleChange} className={classNames(userInput)}>
              <option>연령대</option>
              {AGE_GROUP.map((group) => (
                <option id={`${group}s`} key={`team-${group}`}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={isDisabled} className={classNames(submitButton)}>
            변경
          </button>
        </div>
      </form>
    </>
  );
};

export default TeamInfoEdit;
