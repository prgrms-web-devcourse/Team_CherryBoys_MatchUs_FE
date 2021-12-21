import classNames from 'classnames';
import * as React from 'react';

type ValidInputProps = {
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  selectOptions?: string[];
  type: 'input' | 'select' | 'password';
  className?: string;
};

const ValidInput = ({
  name,
  id,
  onChange,
  value,
  selectOptions,
  type,
  className,
}: ValidInputProps) => {
  return (
    <>
      {type === 'input' || type === 'password' ? (
        <input
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          type={type}
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
    </>
  );
};

export default ValidInput;
