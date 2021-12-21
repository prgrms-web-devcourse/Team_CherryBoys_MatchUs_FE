/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { AGE, SPORTS } from '@/consts/user';
import ValidInput from '../Signup/ValidInput';
import {
  BIO_MAX_LEN,
  validateUser,
  USER_VALIDATION_SUCCESS_MSG,
  USER_VALIDATION_ERR_MSG,
} from '@/utils/validation/userValidation';
import { requestCheckDuplicatedNickname } from '@/api/user';
import { userInfoType } from '@/types/users';
import { RootState, useAppDispatch } from '@/store';
import { editEditabelUserState, editUser } from '@/store/userSlice';
import { CustomLabel, CustomModalDialog } from '@/components';
import style from './userInfoEdit.module.scss';

const UserInfoEdit = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const nicknameState = useSelector((state: RootState) => state.user.userInfo.nickname);
  const bioState = useSelector((state: RootState) => state.user.userInfo.bio);
  const ageGroupState = useSelector((state: RootState) => state.user.userInfo.ageGroup);
  const sportsState = useSelector((state: RootState) => state.user.userInfo.sports);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const [isModalDialogOpen, setIsModalDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<userInfoType>({
    nickname: {
      value: '',
      isValid: true,
      validMsg: '',
      isDuplicated: isNicknameDuplicated,
    },
    bio: {
      value: bioState,
      isValid: true,
      validMsg: '',
    },
    ageGroup: {
      value: ageGroupState,
      isValid: true,
      validMsg: '',
    },
    sports: {
      value: sportsState,
      isValid: true,
      validMsg: '',
    },
  });
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const {
    form_container,
    inValid_form,
    valid_msg,
    title,
    modalMainTitle,
    modalSubTitle,
    container,
    form__label,
    form__input,
    user_bio,
    edit_info__btn,
    duplicate_check__btn,
    flex_container,
  } = style;
  const { nickname, bio, ageGroup, sports } = userInfo;

  useEffect(() => {
    setUserInfo({
      nickname: {
        ...nickname,
        value: nicknameState,
      },
      bio: {
        ...bio,
        value: bioState || '',
      },
      ageGroup: {
        ...ageGroup,
        value: ageGroupState,
      },
      sports: {
        ...sports,
        value: sportsState,
      },
    });
  }, [nicknameState]);

  const checkValidation = () => {
    return !Object.values(userInfo).find((info) => info.isValid === false);
  };

  const editUserInfo = () => {
    const userEditForm = {
      nickname: nickname.value,
      bio: bio.value,
      ageGroup: ageGroup.value,
      sportName: sports.value,
    };

    dispatch(editUser(userEditForm))
      .unwrap()
      .then(() => {
        setIsEditSuccess(true);
        setIsModalDialogOpen(true);
        dispatch(editEditabelUserState(userEditForm));
      })
      .catch(() => setIsEditSuccess(false));
  };
  const handleClickModal = () => {
    setIsModalDialogOpen(false);

    if (isEditSuccess) {
      history.push('/');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkValidation()) {
      return;
    }

    editUserInfo();
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const validMsg = validateUser[name](value);
    const isValid = !validMsg;

    if (name === 'nickname') {
      setIsNicknameDuplicated(false);
    }

    setUserInfo({
      ...userInfo,
      [name]: {
        value,
        isValid,
        validMsg,
      },
    });
  };

  const handleClickNicknameDuplicate = async () => {
    if (!nickname.isValid) {
      return;
    }

    const { duplicated } = await requestCheckDuplicatedNickname(nickname.value);

    const validMsg = !duplicated
      ? USER_VALIDATION_SUCCESS_MSG.NICKNAME_SUCCESS_MSG
      : USER_VALIDATION_ERR_MSG.DUPLICATE_NICKNAME;

    setUserInfo({
      ...userInfo,
      nickname: {
        ...nickname,
        isValid: !duplicated,
        validMsg,
      },
    });
  };

  return (
    <div className={classNames(container)}>
      <h1 className={classNames(title)}>내 정보 수정</h1>
      {isModalDialogOpen && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => setIsModalDialogOpen(false)}
          handleApprove={handleClickModal}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            {isEditSuccess ? '정보 수정 완료!' : '에러가 발생했어요!'}
          </span>
          <span className={classNames('whiteSpace', modalSubTitle)}>
            {isEditSuccess
              ? '회원 정보가 정상적으로 수정되었습니다!'
              : '잠시 후에 다시 시도해주세요!'}
          </span>
        </CustomModalDialog>
      )}
      <form className={classNames(form_container)} onSubmit={handleSubmit}>
        <CustomLabel htmlFor="nickname" className={classNames('whiteSpace', form__label)}>
          닉네임
        </CustomLabel>
        <div className={classNames(flex_container)}>
          <ValidInput
            id="nickname"
            name="nickname"
            onChange={handleOnChange}
            value={nickname.value}
            type="input"
            className={classNames(
              'whiteSpace',
              form__input,
              !userInfo.nickname.isValid && inValid_form
            )}
          />
          <button
            type="button"
            onClick={handleClickNicknameDuplicate}
            className={classNames(duplicate_check__btn)}
          >
            중복확인
          </button>
        </div>
        <div>
          {nickname.validMsg && <span className={classNames(valid_msg)}>{nickname.validMsg}</span>}
        </div>
        <CustomLabel htmlFor="bio" className={classNames('whiteSpace', form__label)}>
          자기 소개
        </CustomLabel>
        <div className={classNames(user_bio)}>
          <ValidInput
            id="bio"
            name="bio"
            onChange={handleOnChange}
            value={bio.value}
            type="input"
            className={classNames('whiteSpace', form__input, !userInfo.bio.isValid && inValid_form)}
          />
        </div>
        <div>{bio.validMsg && <span className={classNames(valid_msg)}>{bio.validMsg}</span>}</div>
        <span className={classNames(valid_msg)}>
          {bio.value ? bio.value.length : 0}/{BIO_MAX_LEN}
        </span>

        <CustomLabel htmlFor="ageGroup" className={classNames('whiteSpace', form__label)}>
          연령대
        </CustomLabel>
        <div>
          <ValidInput
            id="ageGroup"
            name="ageGroup"
            onChange={handleOnChange}
            value={ageGroup.value}
            type="select"
            selectOptions={AGE}
            className={classNames(
              'whiteSpace',
              form__input,
              !userInfo.ageGroup.isValid && inValid_form
            )}
          />
        </div>
        <div>
          {ageGroup.validMsg && <span className={classNames(valid_msg)}>{ageGroup.validMsg}</span>}
        </div>
        <CustomLabel htmlFor="sports" className={classNames('whiteSpace', form__label)}>
          종목
        </CustomLabel>
        <div>
          <ValidInput
            id="sports"
            name="sports"
            onChange={handleOnChange}
            value={sports.value}
            type="select"
            selectOptions={SPORTS}
            className={classNames(
              'whiteSpace',
              form__input,
              !userInfo.sports.isValid && inValid_form
            )}
          />
        </div>
        <div>
          {sports.validMsg && <span className={classNames(valid_msg)}>{sports.validMsg}</span>}
        </div>
        <button type="submit" className={classNames(edit_info__btn)}>
          정보 수정
        </button>
      </form>
    </div>
  );
};

export default UserInfoEdit;
