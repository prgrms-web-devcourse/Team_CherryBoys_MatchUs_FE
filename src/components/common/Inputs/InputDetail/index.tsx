import React from 'react';
import classNames from 'classnames';
import styles from './InputDetail.module.scss';

interface Props {
  name: string;
  placeholder?: string;
}

const InputDetail = ({ name, placeholder }: Props) => {
  const { inputBox, inputName, inputContent, input, input_text, input_text_content } = styles;

  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputName)}>
        <h3>{name}</h3>
      </div>
      <div className={classNames(inputContent)}>
        <form className={classNames(input)}>
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
