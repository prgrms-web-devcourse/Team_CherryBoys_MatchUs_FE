import * as React from 'react';

type ValidInputProps = {
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  selectOptions?: string[];
  type: 'input' | 'select';
  validMsg: string;
};

const ValidInput = ({
  name,
  id,
  onChange,
  value,
  selectOptions,
  type,
  validMsg,
}: ValidInputProps) => {
  return (
    <>
      {type === 'input' ? (
        <input id={id} name={name} onChange={onChange} value={value} />
      ) : (
        <select id={id} name={name} onChange={onChange} value={value}>
          {selectOptions?.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      )}
      <div>{validMsg && <small>{validMsg}</small>}</div>
    </>
  );
};

export default ValidInput;
