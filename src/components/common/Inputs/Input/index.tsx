import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface Props {
  name: string;
  type: 'text' | 'dropbox';
  placeholder?: string;
  icon?: string;
  options?: string[];
}

const Input = ({ name, placeholder, type, icon, options }: Props) => {
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

  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputName)}>
        <h3>{name}</h3>
      </div>
      <div className={classNames(inputContent)}>
        <form className={classNames(input)}>
          {type === 'text' && (
            <div className={classNames(input_text)}>
              <input type="text" placeholder={placeholder && placeholder} />
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
            <select name={name} className={classNames(input_dropBox)}>
              {options?.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>
          )}
        </form>
      </div>
    </div>
  );
};

export default Input;
