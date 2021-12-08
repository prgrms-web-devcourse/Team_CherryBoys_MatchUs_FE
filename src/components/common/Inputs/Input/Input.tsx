import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface Props {
  labelName: string;
  inputId: string;
  type: 'text' | 'dropbox';
  placeholder?: string;
  icon?: string;
  options?: string[];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const {
  inputBox,
  inputName,
  inputContent,
  input,
  inputText,
  inputDropBox,
  inputButtonBox,
  inputButton,
} = styles;

const Input = ({ labelName, inputId, placeholder, type, icon, options, onSubmit }: Props) => {
  const ICON_COLLECTION = {
    CHECK: icon,
  };
  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputName)}>
        <label htmlFor={inputId}>{labelName}</label>
      </div>
      <div className={classNames(inputContent)}>
        <form className={classNames(input)} onSubmit={onSubmit}>
          {type === 'text' && (
            <div className={classNames(inputText)}>
              <input id={inputId} type="text" placeholder={placeholder && placeholder} />
              {icon && (
                <div className={classNames(inputButtonBox)}>
                  <button type="button" className={classNames(inputButton)}>
                    <i className={classNames(ICON_COLLECTION.CHECK)} />
                  </button>
                </div>
              )}
            </div>
          )}
          {type === 'dropbox' && (
            <select id={inputId} name={labelName} className={classNames(inputDropBox)}>
              {options?.map((option, index) => (
                <option value={option} key={`dropBoxOption${index}`}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </form>
      </div>
    </div>
  );
};

export default Input;
