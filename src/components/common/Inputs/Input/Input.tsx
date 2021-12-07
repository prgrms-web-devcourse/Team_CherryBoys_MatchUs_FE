import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface Props {
  name: string;
  inputId: string;
  type: 'text' | 'dropbox';
  placeholder?: string;
  icon?: string;
  options?: string[];
  onChange: React.FormEventHandler<HTMLFormElement>;
}

const {
  inputBox,
  inputName,
  inputContent,
  input,
  input_text,
  input_dropBox,
  inputButtonBox,
  inputButton,
} = styles;

const Input = ({ name, inputId, placeholder, type, icon, options, onChange }: Props) => {
  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputName)}>
        <label htmlFor={inputId}>{name}</label>
      </div>
      <div className={classNames(inputContent)}>
        <form className={classNames(input)} onChange={onChange}>
          {type === 'text' && (
            <div className={classNames(input_text)}>
              <input id={inputId} type="text" placeholder={placeholder && placeholder} />
              {icon && (
                <div className={classNames(inputButtonBox)}>
                  <button type="button" className={classNames(inputButton)}>
                    <i className={classNames(icon)} />
                  </button>
                </div>
              )}
            </div>
          )}
          {type === 'dropbox' && (
            <select id={inputId} name={name} className={classNames(input_dropBox)}>
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
