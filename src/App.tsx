import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { DefaultTemplate } from '@/components';
import useReAuth from './hooks/useReAuth';

const App = () => {
  useReAuth();

  return (
    <BrowserRouter>
      <DefaultTemplate>
        <Router />
      </DefaultTemplate>
    </BrowserRouter>
  );
};

export default App;
