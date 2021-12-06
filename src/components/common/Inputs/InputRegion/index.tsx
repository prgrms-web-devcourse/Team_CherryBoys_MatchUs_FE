import React from 'react';
import classNames from 'classnames';
import styles from './InputRegion.module.scss';

interface Props {
  name: string;
  optionsCity?: string[];
  optionsRegion?: string[];
  optionsGroundName?: string[];
}

const InputRegion = ({ name, optionsCity, optionsRegion, optionsGroundName }: Props) => {
  const { inputBox, inputName, inputContent, input, input_City, input_Region, input_groundName } =
    styles;

  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputName)}>
        <h3>{name}</h3>
      </div>
      <div className={classNames(inputContent)}>
        <form className={classNames(input)}>
          <select name={name} className={classNames(input_City)}>
            {optionsCity?.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
          <select name={name} className={classNames(input_Region)}>
            {optionsRegion?.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
          <select name={name} className={classNames(input_groundName)}>
            {optionsGroundName?.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
};

export default InputRegion;
