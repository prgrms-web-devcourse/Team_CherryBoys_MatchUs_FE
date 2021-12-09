import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface StyleProps {
  [inputBoxWidth: string]: string | undefined;
  inputNameWidth?: string;
  inputNameFontColor?: string;
  inputContentWidth?: string;
  inputContentFontColor?: string;
  inputContentBackgroundColor?: string;
  inputContentCursor?: string;
}
interface Props {
  labelName?: string;
  inputId: string;
  type: 'text' | 'dropbox';
  placeholder?: string;
  options?: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement> &
    React.ChangeEventHandler<HTMLSelectElement>;
  styleProps?: StyleProps;
}

const { inputBox, inputName, inputContent, inputText, inputDropBox } = styles;

const styleFormat: StyleProps = {
  inputBoxWidth: '100%',
  inputNameWidth: '100%',
  inputNameFontColor: '#000',
  inputContentWidth: '100%',
  inputContentFontColor: '#000',
  inputContentBackgroundColor: '#fff',
  inputContentCursor: 'default',
};

const Input = ({ labelName, inputId, placeholder, type, options, onChange, styleProps }: Props) => {
  const defaultStyle = { ...styleFormat };

  if (styleProps) {
    Object.keys(styleProps).forEach((key) => {
      defaultStyle[key] = styleProps[key];
    });
  }

  const {
    inputBoxWidth,
    inputNameWidth,
    inputNameFontColor,
    inputContentWidth,
    inputContentFontColor,
    inputContentBackgroundColor,
    inputContentCursor,
  } = defaultStyle;

  return (
    <div className={classNames(inputBox)} style={{ width: inputBoxWidth }}>
      {labelName && (
        <div
          className={classNames(inputName)}
          style={{ width: inputNameWidth, color: inputNameFontColor }}
        >
          <label htmlFor={inputId}>{labelName}</label>
        </div>
      )}
      <div className={classNames(inputContent)} style={{ width: inputContentWidth }}>
        {type === 'text' && (
          <div className={classNames(inputText)}>
            <input
              id={inputId}
              type="text"
              placeholder={placeholder}
              onChange={onChange}
              style={{
                color: inputContentFontColor,
                background: inputContentBackgroundColor,
                cursor: inputContentCursor,
              }}
            />
          </div>
        )}
        {type === 'dropbox' && (
          <select
            id={inputId}
            name={labelName}
            className={classNames(inputDropBox)}
            onChange={onChange}
            style={{
              color: inputContentFontColor,
              background: inputContentBackgroundColor,
              cursor: inputContentCursor,
            }}
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
