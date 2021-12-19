import React from 'react';

import { AGE_GROUP } from '@/consts';

interface Props {
  ageGroup?: number;
  handleChangeAge: React.ChangeEventHandler<HTMLSelectElement>;
}
const AgeGroup = ({ ageGroup, handleChangeAge }: Props) => {
  return (
    <div>
      <div>연령대</div>
      <select id="hiresAgeGroup" onChange={handleChangeAge}>
        <option>{`${ageGroup || AGE_GROUP[0].slice(0, 2)}대`}</option>
        {AGE_GROUP.map((group) => (
          <option id={`${group}대`} key={`age-${group}`}>
            {group}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AgeGroup;
