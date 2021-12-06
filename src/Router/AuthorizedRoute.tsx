import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Redirect, Route, RouteProps } from 'react-router';
import { getItemFromStorage } from '@/utils/storage';

export interface AuthorizedRouterProps extends RouteProps {
  redirectPath: string;
}

// eslint-disable-next-line @typescript-eslint/no-shadow
const AuthorizedRouter: React.FC<AuthorizedRouterProps> = (props) => {
  const token = getItemFromStorage('token') || null;
  const { component, redirectPath } = props;

  return token ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...props} component={component} />
  ) : (
    <Redirect to={{ pathname: redirectPath }} />
  );
};

export default AuthorizedRouter;
