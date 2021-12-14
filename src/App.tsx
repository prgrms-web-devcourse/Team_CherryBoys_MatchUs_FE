import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { DefaultTemplate } from '@/components';

const App = () => {
  return (
    <BrowserRouter>
      <DefaultTemplate>
        <Router />
      </DefaultTemplate>
    </BrowserRouter>
  );
};

export default App;
