import React, { Dispatch } from 'react';
import classNames from 'classnames';
import styles from './InputDetail.module.scss';

interface StyleProps {
  [inputBoxWidth: string]: string | undefined;
  inputNameWidth?: string;
  inputNameFontColor?: string;
  inputContentWidth?: string;
  inputContentHeight?: string;
  inputContentFontColor?: string;
  inputContentBackgroundColor?: string;
}
interface Props {
  labelName: string;
  placeholder?: string;
  onChange: Dispatch<React.SetStateAction<string>>;
  styleProps?: StyleProps;
}

const styleFormat: StyleProps = {
  inputBoxWidth: '100%',
  inputNameWidth: '100%',
  inputNameFontColor: '#000',
  inputContentWidth: '100%',
  inputContentHeight: '100%',
  inputContentFontColor: '#000',
  inputContentBackgroundColor: '#fff',
};

const { inputBox, inputName, inputContent, inputText, inputTextContent } = styles;

const InputDetail = ({ labelName, placeholder, onChange, styleProps }: Props) => {
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
    inputContentHeight,
    inputContentFontColor,
    inputContentBackgroundColor,
    inputContentCursor,
  } = defaultStyle;

  return (
    <div className={classNames(inputBox)} style={{ width: inputBoxWidth }}>
      <div
        className={classNames(inputName)}
        style={{ width: inputNameWidth, color: inputNameFontColor }}
      >
        <h3>{labelName}</h3>
      </div>
      <div
        className={classNames(inputContent)}
        style={{ width: inputContentWidth, minHeight: inputContentHeight }}
      >
        <div className={classNames(inputText)}>
          <div
            className={classNames(inputTextContent)}
            contentEditable
            placeholder={placeholder && placeholder}
            onInput={(e: React.ChangeEvent<HTMLDivElement>) => onChange(e.target.innerHTML)}
            style={{
              color: inputContentFontColor,
              background: inputContentBackgroundColor,
              cursor: inputContentCursor,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputDetail;
