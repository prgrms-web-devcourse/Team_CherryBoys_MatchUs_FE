import React, { Dispatch } from 'react';
import classNames from 'classnames';
import styles from './InputDetail.module.scss';

interface Props {
  labelName: string;
  placeholder?: string;
  onChange: Dispatch<React.SetStateAction<string>>;
}

const { inputBox, inputName, inputContent, inputText, inputTextContent } = styles;

const InputDetail = ({ labelName, placeholder, onChange }: Props) => {
  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputName)}>
        <h3>{labelName}</h3>
      </div>
      <div className={classNames(inputContent)}>
        <div className={classNames(inputText)}>
          <div
            className={classNames(inputTextContent)}
            contentEditable
            placeholder={placeholder && placeholder}
            onInput={(e: React.ChangeEvent<HTMLDivElement>) => onChange(e.target.innerText)}
          />
        </div>
      </div>
    </div>
  );
};

export default InputDetail;
