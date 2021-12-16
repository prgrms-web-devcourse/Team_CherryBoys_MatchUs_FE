import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Router from './Router/Router';
import { DefaultTemplate } from '@/components';
import { getItemFromStorage } from '@/utils/storage';
import { login, reAuth } from './store/authSlice';
import { requestReAuth } from './api/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getItemFromStorage('accessToken');

    if (!accessToken) {
      return;
    }

    dispatch(reAuth());
  });

  return (
    <BrowserRouter>
      <DefaultTemplate>
        <Router />
      </DefaultTemplate>
    </BrowserRouter>
  );
};

export default App;
