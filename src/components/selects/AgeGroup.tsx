import React from 'react';

import classNames from 'classnames';
import { AGE_GROUP } from '@/consts';
import style from './select.module.scss';

const { inputAgeGroupBox } = style;

interface Props {
  ageGroup?: number;
  handleChangeAge: React.ChangeEventHandler<HTMLSelectElement>;
}
const AgeGroup = ({ ageGroup, handleChangeAge }: Props) => {
  return (
    <div className={classNames(inputAgeGroupBox)}>
      <h3>연령대</h3>
      <div>
        <select id="hiresAgeGroup" onChange={handleChangeAge}>
          <option>{`${ageGroup || AGE_GROUP[0].slice(0, 2)}대`}</option>
          {AGE_GROUP.map((group) => (
            <option id={`${group}대`} key={`age-${group}`}>
              {group}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AgeGroup;
