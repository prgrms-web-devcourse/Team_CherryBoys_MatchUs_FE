/* eslint-disable no-nested-ternary */
import classNames from 'classnames';
import React, { ChangeEvent, ReactNode } from 'react';
import { CustomLabel } from '@/components';
import ValidInput from '@/pages/Signup/ValidInput';
import style from '@/pages/Signup/signup.module.scss';

interface Props {
  name: string;
  placeholder?: string;
  children?: ReactNode;
  value: string;
  error: string | undefined;
  type: 'input' | 'select' | 'password';
  option?: string[];
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleClick?: () => void;
}

const VaildationInput = ({
  name,
  placeholder,
  children,
  value,
  error,
  type,
  option,
  handleChange,
  handleClick,
}: Props) => {
  const {
    successInputIcon,
    failInputIcon,
    inputContainer,
    inputIcon,
    form__label,
    form__input,
    inValid_form,
    valid_form,
    checkBtnWithoutVaild,
    checkBtnWithVaild,
  } = style;

  return (
    <>
      <CustomLabel className={classNames(form__label)} htmlFor={`${name}`} />
      <div className={classNames(!option && inputContainer)}>
        {!option && (
          <div
            className={classNames(
              value ? (error !== 'undefined' ? failInputIcon : successInputIcon) : inputIcon,
              option === undefined ? '' : ''
            )}
          >
            {children}
          </div>
        )}
        <ValidInput
          id={`${name}`}
          name={`${name}`}
          className={classNames(form__input, error ? inValid_form : valid_form)}
          onChange={handleChange}
          value={`${value}`}
          type={type}
          placeholder={placeholder}
          selectOptions={option}
        />

        {handleClick && (
          <button
            type="button"
            onClick={handleClick}
            className={classNames(
              value && error === 'undefined' ? checkBtnWithVaild : checkBtnWithoutVaild
            )}
          >
            중복확인
          </button>
        )}
      </div>
    </>
  );
};
export default VaildationInput;
