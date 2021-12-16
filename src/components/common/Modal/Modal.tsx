import classNames from 'classnames';
import React, { ReactNode } from 'react';
import Portal from '../Portal/Portal';
import style from './modal.module.scss';

interface Props {
  children: ReactNode;
}

const { modal } = style;

const Modal = ({ children }: Props) => {
  return (
    <Portal elementId="modal-root">
      <div className={classNames(modal)}>{children}</div>
    </Portal>
  );
};

export default Modal;
