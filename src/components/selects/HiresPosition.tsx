import React from 'react';

import { Input } from '../common';

const POSITION = ['윙백', '윙포워드'];

interface Props {
  handleChangePosition: React.ChangeEventHandler<HTMLInputElement> &
    React.ChangeEventHandler<HTMLSelectElement>;
}

const HiresPosition = ({ handleChangePosition }: Props) => {
  return (
    <>
      <section>
        <div>포지션</div>
        <Input
          inputId="hiresPlayerNumber"
          type="text"
          placeholder={`${POSITION[0]}`}
          onChange={handleChangePosition}
        />
      </section>
    </>
  );
};

export default HiresPosition;
