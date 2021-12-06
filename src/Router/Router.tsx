import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  HOME_PAGE,
  MERCENARY_PAGE,
  MERCENARY_DETAIL_PAGE,
  MERCENARY_POST_PAGE,
  MERCENARY_EDIT_PAGE,
  MERCENARY_CHAT_PAGE,
  MERCENARY_ACCEPT_PAGE,
  MATCHING_PAGE,
  MATCHING_POST_PAGE,
  MATCHING_DETAIL_PAGE,
  MATCHING_EDIT_PAGE,
  TEAM_PAGE,
  TEAM_CREATE_PAGE,
  TEAM_MATCHING_LIST_PAGE,
  TEAM_EDIT_PAGE,
  TEAM_SELECT_PAGE,
  TEAM_MEMBERS_PAGE,
  TEAM_MEMBERS_EDIT_PAGE,
  SIGNUP_PAGE,
  LOGIN_PAGE,
  USER_PAGE,
  USER_EDIT_PAGE,
  USER_MATCHING_LIST_PAGE,
  USER_TEAM_INVITAION_LIST_PAGE,
  USER_MERCENARY_INVITAION_LIST_PAGE,
  NOT_FOUND_PAGE,
} from '../consts/routes';
import AuthorizedRouter from './AuthorizedRoute';

const Router: React.FC = () => {
  return (
    <Switch>
      {/* <AuthorizedRouter path={MERCENARY_PAGE} exact component={} redirectPath="" />
      <Route path={HOME_PAGE} exact component={} />
      <Route path={HOME_PAGE} exact component={} />
      <Route path={MERCENARY_PAGE} exact component={} />
      <Route path={MERCENARY_DETAIL_PAGE} exact component={} />
      <Route path={MERCENARY_POST_PAGE} exact component={} />
      <Route path={MERCENARY_EDIT_PAGE} exact component={} />
      <Route path={MERCENARY_CHAT_PAGE} exact component={} />
      <Route path={MERCENARY_ACCEPT_PAGE} exact component={} />
      <Route path={MATCHING_PAGE} exact component={} />
      <Route path={MATCHING_POST_PAGE} exact component={} />
      <Route path={MATCHING_DETAIL_PAGE} exact component={} />
      <Route path={MATCHING_EDIT_PAGE} exact component={} />
      <Route path={TEAM_PAGE} exact component={} />
      <Route path={TEAM_CREATE_PAGE} exact component={} />
      <Route path={TEAM_MATCHING_LIST_PAGE} exact component={} />
      <Route path={TEAM_EDIT_PAGE} exact component={} />
      <Route path={TEAM_SELECT_PAGE} exact component={} />
      <Route path={TEAM_MEMBERS_PAGE} exact component={} />
      <Route path={TEAM_MEMBERS_EDIT_PAGE} exact component={} />
      <Route path={SIGNUP_PAGE} exact component={} />
      <Route path={LOGIN_PAGE} exact component={} />
      <Route path={USER_PAGE} exact component={} />
      <Route path={USER_EDIT_PAGE} exact component={} />
      <Route path={USER_MATCHING_LIST_PAGE} exact component={} />
      <Route path={USER_TEAM_INVITAION_LIST_PAGE} exact component={} />
      <Route path={USER_MERCENARY_INVITAION_LIST_PAGE} exact component={} />
      <Route path={NOT_FOUND_PAGE} exact component={} /> */}
    </Switch>
  );
};

export default Router;
