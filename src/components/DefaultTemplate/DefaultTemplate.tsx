import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Header, TabBar } from '@/components/common';
import styles from './DefaultTemplate.module.scss';

interface Props {
  children: ReactNode;
}

const DefaultTemplate = ({ children }: Props) => {
  const { main } = styles;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
      />
      <Header />
      <main className={classNames(main)}>{children}</main>
      <TabBar />
    </>
  );
};

export default DefaultTemplate;
