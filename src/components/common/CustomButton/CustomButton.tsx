import React, { ReactNode } from 'react';

interface Props {
  buttonType: 'button' | 'submit' | 'reset' | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  children: ReactNode;
}

const CustomButton = ({ buttonType, onClick, isDisabled, children }: Props) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={buttonType}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
