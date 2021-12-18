import classNames from 'classnames';
import * as React from 'react';
import style from './validInput.module.scss';

type ValidInputProps = {
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  selectOptions?: string[];
  type: 'input' | 'select';
  validMsg?: string;
  className?: string;
};

const ValidInput = ({
  name,
  id,
  onChange,
  value,
  selectOptions,
  type,
  validMsg,
  className,
}: ValidInputProps) => {
  // const { valid_msg } = style;
  return (
    <>
      {type === 'input' ? (
        <input
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          className={classNames(className)}
        />
      ) : (
        <select
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          className={classNames(className)}
        >
          {selectOptions?.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      )}
      {/* <div>{validMsg && <span className={classNames(valid_msg)}>{validMsg}</span>}</div> */}
    </>
  );
};

export default ValidInput;
