import React from 'react';
import classNames from 'classnames';
import styles from './InputDetail.module.scss';

interface Props {
  name: string;
  placeholder?: string;
  onChange: React.FormEventHandler<HTMLFormElement>;
}

const { inputBox, inputName, inputContent, input, input_text, input_text_content } = styles;

const InputDetail = ({ name, placeholder, onChange }: Props) => {
  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputName)}>
        <h3>{name}</h3>
      </div>
      <div className={classNames(inputContent)}>
        <form className={classNames(input)} onChange={onChange}>
          <div className={classNames(input_text)}>
            <div
              className={classNames(input_text_content)}
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
