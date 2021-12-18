import React from 'react';

import { AGE_GROUP } from '@/consts';

interface Props {
  handleChangeAge: React.ChangeEventHandler<HTMLSelectElement>;
}
const AgeGroup = ({ handleChangeAge }: Props) => {
  return (
    <div>
      <div>연령대</div>
      <select id="hiresAgeGroup" onChange={handleChangeAge}>
        <option>{`${AGE_GROUP[0]}`}</option>
        {AGE_GROUP.map(
          (group, index) =>
            index > 0 && (
              <option id={`${group}s`} key={`age-${group}`}>
                {group}
              </option>
            )
        )}
      </select>
    </div>
  );
};

export default AgeGroup;
