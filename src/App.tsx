import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { DefaultTemplate } from '@/components';
import { useAppDispatch } from './store';
import { getItemFromStorage } from '@/utils/storage';
import { initiateAuth } from './store/userSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = getItemFromStorage('accessToken');

    if (!accessToken) {
      return;
    }

    dispatch(initiateAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <DefaultTemplate>
        <Router />
      </DefaultTemplate>
    </BrowserRouter>
  );
};

export default App;
