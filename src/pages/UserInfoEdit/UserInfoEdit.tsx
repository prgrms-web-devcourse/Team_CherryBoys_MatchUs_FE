/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import { CustomLabel } from '@/components';

export const UserInfoEdit = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const nicknameState = useSelector((state: RootState) => state.user.userInfo.nickname);
  const bioState = useSelector((state: RootState) => state.user.userInfo.bio);
  const ageGroupState = useSelector((state: RootState) => state.user.userInfo.ageGroup);
  const sportsState = useSelector((state: RootState) => state.user.userInfo.sports);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);

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
        dispatch(editEditabelUserState(userEditForm));
        history.push('/main');
      });
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
    <form onSubmit={handleSubmit}>
      <CustomLabel htmlFor="nickname">닉네임</CustomLabel>
      <div>
        <ValidInput
          id="nickname"
          name="nickname"
          onChange={handleOnChange}
          value={nickname.value}
          type="input"
          validMsg={nickname.validMsg}
        />
        <button type="button" onClick={handleClickNicknameDuplicate}>
          중복확인
        </button>
      </div>
      <CustomLabel htmlFor="bio">자기 소개</CustomLabel>
      <div>
        <ValidInput
          id="bio"
          name="bio"
          onChange={handleOnChange}
          value={bio.value}
          type="input"
          validMsg={bio.validMsg}
        />
      </div>
      <small>
        {bio.value ? bio.value.length : 0}/{BIO_MAX_LEN}
      </small>
      <div>
        <small>{!bio.isValid && <small>{bio.validMsg}</small>}</small>
      </div>

      <CustomLabel htmlFor="ageGroup">연령대</CustomLabel>
      <div>
        <ValidInput
          id="ageGroup"
          name="ageGroup"
          onChange={handleOnChange}
          value={ageGroup.value}
          type="select"
          validMsg={ageGroup.validMsg}
          selectOptions={AGE}
        />
      </div>
      <CustomLabel htmlFor="sports">종목</CustomLabel>
      <div>
        <ValidInput
          id="sports"
          name="sports"
          onChange={handleOnChange}
          value={sports.value}
          type="select"
          validMsg={sports.validMsg}
          selectOptions={SPORTS}
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
};
