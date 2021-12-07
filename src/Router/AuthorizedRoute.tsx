import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getItemFromStorage } from '@/utils/storage';

export interface AuthorizedRouterProps extends RouteProps {
  redirectPath: string;
}

// eslint-disable-next-line @typescript-eslint/no-shadow
const AuthorizedRouter = ({
  path,
  component,
  redirectPath = '/login',
  exact,
}: AuthorizedRouterProps) => {
  const token = getItemFromStorage('token') || null;

  return token ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route exact={exact} component={component} path={path} />
  ) : (
    <Redirect to={{ pathname: redirectPath }} />
  );
};

export default AuthorizedRouter;
