import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Match, Matches } from '@/pages';

// TODO: Router관련 const 객체로 변경해 보기
import {
  HOME_PAGE,
  HIRES_PAGE,
  HIRES_DETAIL_PAGE,
  HIRES_POST_PAGE,
  HIRES_EDIT_PAGE,
  HIRES_CHAT_PAGE,
  HIRES_ACCEPT_PAGE,
  MATCHES_PAGE,
  MATCHES_POST_PAGE,
  MATCHES_DETAIL_PAGE,
  MATCHES_EDIT_PAGE,
  TEAM_PAGE,
  TEAM_CREATE_PAGE,
  TEAM_MATCHING_LIST_PAGE,
  TEAM_EDIT_PAGE,
  TEAM_SELECT_PAGE,
  TEAM_MEMBERS_PAGE,
  TEAM_MEMBERS_EDIT_PAGE,
  SIGNUP_PAGE,
  LOGIN_PAGE,
  SETTING_PAGE,
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
      {/* <Route path={MATCHES_EDIT_PAGE} exact component={} /> */}
      {/* <AuthorizedRouter path={MERCENARY_PAGE} exact component={} redirectPath="" />
      <Route path={HOME_PAGE} exact component={} />
      <Route path={HIRES_PAGE} exact component={} />
      <Route path={HIRES_DETAIL_PAGE} exact component={} />
      <Route path={HIRES_POST_PAGE} exact component={} />
      <Route path={HIRES_EDIT_PAGE} exact component={} />
      <Route path={HIRES_CHAT_PAGE} exact component={} />
      <Route path={HIRES_ACCEPT_PAGE} exact component={} /> */}
      <Route path={MATCHES_PAGE} exact component={Matches} />
      <Route path={MATCHES_DETAIL_PAGE} exact component={Match} />
      {/* <<Route path={MATCHES_POST_PAGE} exact component={NewMatch} />
      <Route path={MATCHES_EDIT_PAGE} exact component={EditMatch} />
      Route path={TEAM_PAGE} exact component={} />
      <Route path={TEAM_CREATE_PAGE} exact component={} />
      <Route path={TEAM_MATCHING_LIST_PAGE} exact component={} />
      <Route path={TEAM_EDIT_PAGE} exact component={} />
      <Route path={TEAM_SELECT_PAGE} exact component={} />
      <Route path={TEAM_MEMBERS_PAGE} exact component={} />
      <Route path={TEAM_MEMBERS_EDIT_PAGE} exact component={} />
      <Route path={SIGNUP_PAGE} exact component={} />
      <Route path={LOGIN_PAGE} exact component={} />
      <Route path={SETTING_PAGE} exact component={} />
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
