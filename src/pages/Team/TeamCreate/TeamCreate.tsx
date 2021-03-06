import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { SPORTS_CATEGORY, AGE_GROUP } from '@/consts';
import { CustomInput, CustomLabel } from '@/components';
import style from './teamCreate.module.scss';
import useForm from '@/hooks/useForm';
import {
  TEAM_VALID_ERROR_MSG,
  validateTeamBioLength,
  validateTeamName,
  validateTeamNameLength,
} from '@/utils/validation/validation';
import { createTeam, checkTeamNameDuplication } from '@/api';
import baseTeamLogo from '@/assets/images/baseTeamLogo.png';

const {
  pageContainer,
  titleContainer,
  highlight,
  mainTitle,
  inputsContainer,
  inputButtonContainer,
  userInput,
  userBioinput,
  inputLabel,
  userInputWithButton,
  checkButton,
  submitButton,
  logoImage,
  logoImageInput,
  logoImageContainer,
  errorMessage,
} = style;

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
        history.push(`/team/${teamId}`);
      }
    },
    validate: ({ image, teamName, teamBio, teamSport, teamAgeGroup }) => {
      const newErros = {} as any;

      if (!validateTeamName(teamName)) {
        newErros.teamName = TEAM_VALID_ERROR_MSG.IS_VALID_NAME;
      }

      if (!validateTeamNameLength(teamName)) {
        newErros.teamName = TEAM_VALID_ERROR_MSG.IS_VALID_LEN;
      }

      if (image.file === '') {
        newErros.image = TEAM_VALID_ERROR_MSG.HAS_TEAM_LOGO_IMAGE;
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
    const { teamName } = values;

    const { duplicated } = await checkTeamNameDuplication(teamName);

    if (!duplicated) {
      setIsDuplicatedTeamName(false);
    } else {
      setIsDuplicatedTeamName(true);
    }
  };

  const isTeamNameDisabled = errors.teamName !== undefined;
  const isDisabled = !!Object.keys(errors).length || isLoading;

  return (
    <div className={classNames(pageContainer)}>
      <h1 className={classNames('a11yHidden')}>??? ?????? ?????????</h1>
      <form onSubmit={handleSubmit}>
        <p className={classNames(titleContainer)}>
          <span className={classNames(mainTitle, 'whiteSpace')}>
            ?????? <span className={classNames(highlight)}>???</span>???
          </span>
          <span className={classNames(mainTitle, 'whiteSpace')}>??????????????????? ????</span>
        </p>

        <div className={classNames(logoImageContainer)}>
          <img
            src={values.image.url ? values.image.url : baseTeamLogo}
            className={classNames(logoImage)}
            alt="?????????"
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

        <div className={classNames(inputsContainer)}>
          <div>
            <CustomLabel htmlFor="teamName" className={classNames(inputLabel, 'whiteSpace')}>
              ??? ??????
            </CustomLabel>

            <div className={classNames(inputButtonContainer)}>
              <CustomInput
                id="teamName"
                type="text"
                placeholder="??? ????????? ????????? ?????????"
                onChange={handleChange}
                isDisabled={!isDuplicatedTeamName}
                className={classNames(userInputWithButton)}
              />

              <button
                type="button"
                onClick={handleCheckTeamNameDuplication}
                className={classNames(checkButton)}
                disabled={isTeamNameDisabled}
              >
                {isDuplicatedTeamName ? '??????' : '??????'}
              </button>
            </div>
          </div>
          {values.teamName && errors.teamName ? (
            <p className={classNames(errorMessage)}>{errors.teamName}</p>
          ) : (
            ''
          )}
          <div>
            <CustomLabel htmlFor="teamBio" className={classNames(inputLabel, 'whiteSpace')}>
              ??? ??????
            </CustomLabel>
            <textarea
              id="teamBio"
              placeholder="?????? ????????? 200??? ????????? ????????? ?????????"
              onChange={handleChange}
              className={classNames(userBioinput)}
            />
          </div>
          {errors.teamBio ? <p className={classNames(errorMessage)}>{errors.teamBio}</p> : ''}
          <div>
            <CustomLabel htmlFor="teamSport" className={classNames(inputLabel, 'whiteSpace')}>
              ??????
            </CustomLabel>

            <select id="teamSport" onChange={handleChange} className={classNames(userInput)}>
              <option>??????</option>
              {SPORTS_CATEGORY.map((category) => (
                <option id="teamCategory" key={`team-${category.id}`}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <CustomLabel htmlFor="teamAgeGroup" className={classNames(inputLabel, 'whiteSpace')}>
              ?????????
            </CustomLabel>
            <select id="teamAgeGroup" onChange={handleChange} className={classNames(userInput)}>
              <option>?????????</option>
              {AGE_GROUP.map((group) => (
                <option id={`${group}s`} key={`team-${group}`}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={isDisabled} className={classNames(submitButton)}>
            ??????
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamCreate;
