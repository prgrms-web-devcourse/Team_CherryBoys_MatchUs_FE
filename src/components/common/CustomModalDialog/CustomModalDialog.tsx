import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Modal } from '@/components';
import style from './customModalDialog.module.scss';

interface Props {
  modalType?: string;
  buttonLabel?: string;
  handleApprove: React.MouseEventHandler<HTMLButtonElement>;
  handleCancel?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const { alertDialog, buttonContainer, approvalButton, cancelButton, alertButton } = style;

const CustomModalDialog = ({
  modalType,
  buttonLabel,
  handleApprove,
  handleCancel,
  children,
}: Props) => {
  return (
    <Modal>
      {modalType === 'confirm' ? (
        <div className={classNames(alertDialog)}>
          {children}
          <div className={classNames(buttonContainer)}>
            <button type="button" className={classNames(approvalButton)} onClick={handleApprove}>
              예
            </button>
            <button type="button" className={classNames(cancelButton)} onClick={handleCancel}>
              아니오
            </button>
          </div>
        </div>
      ) : (
        <div className={classNames(alertDialog)}>
          {children}
          <div className={classNames(buttonContainer)}>
            <button type="button" className={classNames(alertButton)} onClick={handleApprove}>
              {buttonLabel}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CustomModalDialog;
