import React from 'react';

import { Input } from '../common';

const POSITION = ['윙백', '윙포워드'];

interface Props {
  hiringPosition?: string;
  handleChangePosition: React.ChangeEventHandler<HTMLInputElement> &
    React.ChangeEventHandler<HTMLSelectElement>;
}
const HiresPosition = ({ hiringPosition, handleChangePosition }: Props) => {
  return (
    <>
      <section>
        <Input
          inputId="hiresPosition"
          labelName="포지션"
          type="dropbox"
          options={[hiringPosition || '', ...POSITION]}
          onChange={handleChangePosition}
        />
      </section>
    </>
  );
};

export default HiresPosition;