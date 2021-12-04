import React, { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header, TabBar } from '@/components/common';
import styles from './DefaultTemplate.module.scss';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
}

const DefaultTemplate = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <Header />
      <main className={classNames(styles.main)}>{children}</main>
      <TabBar />
    </BrowserRouter>
  );
};

export default DefaultTemplate;
