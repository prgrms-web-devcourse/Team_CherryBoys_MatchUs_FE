/* eslint-disable import/no-named-as-default */
import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import KeyIcon from '@mui/icons-material/Key';
import {
  USER_VALIDATION_SUCCESS_MSG,
  USER_VALIDATION_ERR_MSG,
  validateUser,
} from '@/utils/validation/userValidation';
import {
  requestCheckDuplicatedEmail,
  requestCheckDuplicatedNickname,
  requestSignup,
} from '@/api/user';
import { signupFormType } from '@/types/users';
import { AGE, GENDER, SPORTS } from '@/consts/user';
import { CustomModalDialog } from '@/components';
import style from './signup.module.scss';
import useForm from '@/hooks/useForm';
import VaildationInputSet from '@/components/common/VaildationInputSet/VaildationInputSet';

const Signup = () => {
  const history = useHistory();
  const [isModalDialogOpen, setIsModalDialogOpen] = useState(false);
  // 회원가입 이후에 나오는 모달을 관리하기 위해서 사용되는 state
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm<signupFormType>({
    initialValues: {
      userName: '',
      nickname: '',
      email: '',
      password: '',
      confirmedPassword: '',
      gender: '',
      ageGroup: '',
      sports: '',
    },
    onSubmit: () => {},
    validate: ({
      userName,
      nickname,
      email,
      password,
      confirmedPassword,
      gender,
      ageGroup,
      sports,
    }: signupFormType) => {
      const newErrors = {} as any;

      newErrors.userName = validateUser.userName(userName);

      newErrors.nickname = validateUser.nickname(nickname);

      newErrors.email = validateUser.email(email);

      newErrors.password = validateUser.password(password);

      newErrors.confirmedPassword = validateUser.confirmedPassword(confirmedPassword, password);

      newErrors.gender = validateUser.gender(gender);

      newErrors.ageGroup = validateUser.ageGroup(ageGroup);

      newErrors.sports = validateUser.sports(sports);

      return newErrors;
    },
  });

  const { userName, nickname, email, password, confirmedPassword, gender, ageGroup, sports } =
    values;

  const signup = async () => {
    const isSignup = await requestSignup({ ...values, name: userName });

    if (isSignup) {
      setIsSignupSuccess(true);
      setIsModalDialogOpen(true);
      return;
    }
    setIsModalDialogOpen(false);
  };

  // TODO: 중복에 대한 처리를 어떻게 할지 고민을 해볼 것
  // 닉네임 중복 확인
  const handleClickNicknameDuplicate = async () => {
    if (!errors.nickname) {
      return;
    }

    const { duplicated } = await requestCheckDuplicatedNickname(values.nickname);
    const msg = !duplicated
      ? USER_VALIDATION_SUCCESS_MSG.NICKNAME_SUCCESS_MSG
      : USER_VALIDATION_ERR_MSG.DUPLICATE_NICKNAME;
  };

  // 이메일 중복 확인
  const handleClickCheckDuplicatedEmail = async () => {
    if (!errors.email) {
      return;
    }
    const { duplicated } = await requestCheckDuplicatedEmail(values.email);

    const msg = !duplicated
      ? USER_VALIDATION_SUCCESS_MSG.EMAIL_SUCCESS_MSG
      : USER_VALIDATION_ERR_MSG.DUPLICATE_EMIAL;
  };

  // 제출을 위한 handler => onSubmit으로 이전 계획
  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if (!IsSignupValid()) {
    //   changeUnvalidateMsg();
    //   return;
    // }

    signup();
  };

  // 모달에 나온 버튼을 클릭하면 이동하는 것으로 추측 => 네이밍을 변경
  const handleClickModal = () => {
    if (isSignupSuccess) {
      history.push('/login');
    }
  };

  const { container, flex_container, edit_info__btn, modalMainTitle, modalSubTitle } = style;

  console.log(errors);

  return (
    <div className={classNames(container)}>
      {isModalDialogOpen && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => setIsModalDialogOpen(false)}
          handleApprove={handleClickModal}
        >
          {/* TODO: 메세지를 상수로 변경  */}
          <span className={classNames('whiteSpace', modalMainTitle)}>
            {isSignupSuccess ? '회원 가입 완료!' : '에러가 발생했어요!'}
          </span>
          <span className={classNames('whiteSpace', modalSubTitle)}>
            {isSignupSuccess ? '로그인 하러 가볼까요?' : '잠시 후에 다시 시도해주세요!'}
          </span>
        </CustomModalDialog>
      )}
      {/* 길다는 이유로 이를 배열로 돌리면, 보수/유지가 어렵지 않을까? */}
      <div className={classNames(flex_container)}>
        <form onSubmit={handleSubmit}>
          <VaildationInputSet
            name="userName"
            placeholder="이름"
            value={`${userName}`}
            error={`${errors.userName}`}
            type="input"
            handleChange={handleChange}
          >
            <PermIdentityIcon />
          </VaildationInputSet>
          <VaildationInputSet
            name="nickname"
            placeholder="닉네임"
            value={`${nickname}`}
            error={`${errors.nickname}`}
            type="input"
            handleChange={handleChange}
            handleClick={handleClickCheckDuplicatedEmail}
          >
            <EmojiEmotionsIcon />
          </VaildationInputSet>
          <VaildationInputSet
            name="email"
            placeholder="이메일"
            value={`${email}`}
            error={`${errors.email}`}
            type="input"
            handleChange={handleChange}
            handleClick={handleClickCheckDuplicatedEmail}
          >
            <LocalPostOfficeIcon />
          </VaildationInputSet>
          <VaildationInputSet
            name="password"
            placeholder="비밀번호"
            value={`${password}`}
            error={`${errors.password}`}
            type="password"
            handleChange={handleChange}
          >
            <KeyIcon />
          </VaildationInputSet>
          {/* 장치를 통해서 password가 정상적으로 입력되었을 때를 받아보도록 하자. */}
          {password && (
            <VaildationInputSet
              name="confirmedPassword"
              placeholder="비밀번호 확인"
              value={`${confirmedPassword}`}
              error={`${errors.confirmedPassword}`}
              type="password"
              handleChange={handleChange}
            >
              <KeyIcon />
            </VaildationInputSet>
          )}
          <VaildationInputSet
            name="gender"
            value={`${gender}`}
            error={`${errors.gender}`}
            type="select"
            handleChange={handleChange}
            option={GENDER}
          />
          <VaildationInputSet
            name="ageGroup"
            value={`${ageGroup}`}
            error={`${errors.ageGroup}`}
            type="select"
            handleChange={handleChange}
            option={AGE}
          />
          <VaildationInputSet
            name="sports"
            value={`${sports}`}
            error={`${errors.sports}`}
            type="select"
            handleChange={handleChange}
            option={SPORTS}
          />
          <button type="submit" className={classNames(edit_info__btn)}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
