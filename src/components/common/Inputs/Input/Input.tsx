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
  onChange: React.ChangeEventHandler<HTMLInputElement> &
    React.ChangeEventHandler<HTMLSelectElement>;
}

const { inputBox, inputName, inputContent, inputText, inputDropBox, inputButtonBox, inputButton } =
  styles;

const ICON_COLLECTION = {
  CHECK: 'fas fa-comment',
};

const Input = ({ labelName, inputId, placeholder, type, icon, options, onChange }: Props) => {
  ICON_COLLECTION.CHECK = icon || '';
  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputName)}>
        <label htmlFor={inputId}>{labelName}</label>
      </div>
      <div className={classNames(inputContent)}>
        {type === 'text' && (
          <div className={classNames(inputText)}>
            <input id={inputId} type="text" placeholder={placeholder} onChange={onChange} />
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
          <select
            id={inputId}
            name={labelName}
            className={classNames(inputDropBox)}
            onChange={onChange}
          >
            {options?.map((option, index) => (
              <option value={option} key={`dropBoxOption${index}`}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default Input;
