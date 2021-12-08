import React from 'react';
import classNames from 'classnames';
import styles from './InputDetail.module.scss';

interface Props {
  labelName: string;
  placeholder?: string;
  onChange: React.FormEventHandler<HTMLFormElement>;
}

const { inputBox, inputName, inputContent, input, inputText, inputTextContent } = styles;

const InputDetail = ({ labelName, placeholder, onChange }: Props) => {
  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputName)}>
        <h3>{labelName}</h3>
      </div>
      <div className={classNames(inputContent)}>
        <form className={classNames(input)} onChange={onChange}>
          <div className={classNames(inputText)}>
            <div
              className={classNames(inputTextContent)}
              contentEditable
              placeholder={placeholder && placeholder}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputDetail;
