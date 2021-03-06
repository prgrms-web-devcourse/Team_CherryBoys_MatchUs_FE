import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Main,
  TeamMemberManage,
  TeamDetail,
  TeamCreate,
  TeamInfoEdit,
  TeamChoice,
  Matches,
  MatchDetail,
  NewMatch,
  EditMatch,
  Hires,
  HiresDetail,
  HiresCreate,
  HiresEdit,
  HiresAccept,
  HiresFilter,
  NotFound,
  Login,
  Signup,
  TeamMatchDetail,
  UserDetail,
  UserMatchDetail,
  UserHireRequest,
  UserInfoEdit,
  UserTeamInvitation,
  Setting,
} from '@/pages';
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
  USER_DETAIL_BY_ID,
  USER_EDIT_PAGE,
  USER_MATCHING_LIST_PAGE,
  USER_TEAM_INVITAION_LIST_PAGE,
  USER_HIRE_REQUEST_LIST_PAGE,
  NOT_FOUND_PAGE,
  HIRES_FILTER_PAGE, // Todo(홍중) : 임시, 추후 모달로 변경하면서 삭제 예정 (2021.12.14)
} from '../consts/routes';
import AuthorizedRouter from './AuthorizedRoute';

const Router = () => {
  return (
    <Switch>
      <Route path={HOME_PAGE} exact component={Main} />

      {/* 로그인 페이지 */}
      <Route path={LOGIN_PAGE} exact component={Login} />
      <Route path={SIGNUP_PAGE} exact component={Signup} />

      {/* 용병 페이지 */}
      <Route path={HIRES_PAGE} exact component={Hires} />
      <AuthorizedRouter path={HIRES_FILTER_PAGE} exact component={HiresFilter} />
      <AuthorizedRouter path={HIRES_DETAIL_PAGE} exact component={HiresDetail} />
      <AuthorizedRouter path={HIRES_POST_PAGE} exact component={HiresCreate} />
      <AuthorizedRouter path={HIRES_EDIT_PAGE} exact component={HiresEdit} />
      <AuthorizedRouter path={HIRES_ACCEPT_PAGE} exact component={HiresAccept} />

      {/* 매치 페이지 */}
      <Route path={MATCHES_PAGE} exact component={Matches} />
      <AuthorizedRouter path={MATCHES_POST_PAGE} exact component={NewMatch} />
      <Route path={MATCHES_DETAIL_PAGE} exact component={MatchDetail} />
      <AuthorizedRouter path={MATCHES_EDIT_PAGE} exact component={EditMatch} />

      {/* 팀 페이지 */}
      <AuthorizedRouter path={TEAM_SELECT_PAGE} exact component={TeamChoice} />
      <AuthorizedRouter path={TEAM_CREATE_PAGE} exact component={TeamCreate} />
      <AuthorizedRouter path={TEAM_MATCHING_LIST_PAGE} exact component={TeamMatchDetail} />
      <AuthorizedRouter path={TEAM_EDIT_PAGE} exact component={TeamInfoEdit} />
      <AuthorizedRouter path={TEAM_MEMBERS_PAGE} exact component={TeamMemberManage} />
      <AuthorizedRouter path={TEAM_PAGE} exact component={TeamDetail} />

      {/* 유저 페이지 */}
      <AuthorizedRouter path={USER_PAGE} exact component={UserDetail} />
      <AuthorizedRouter path={USER_MATCHING_LIST_PAGE} exact component={UserMatchDetail} />
      <AuthorizedRouter path={USER_EDIT_PAGE} exact component={UserInfoEdit} />
      <AuthorizedRouter path={USER_HIRE_REQUEST_LIST_PAGE} exact component={UserHireRequest} />
      <AuthorizedRouter path={USER_TEAM_INVITAION_LIST_PAGE} exact component={UserTeamInvitation} />
      <AuthorizedRouter path={USER_DETAIL_BY_ID} exact component={UserDetail} />

      {/* <Route path={USER_TEAM_INVITAION_LIST_PAGE} exact component={} />
      <Route path={USER_MERCENARY_INVITAION_LIST_PAGE} exact component={} /> */}

      {/* 기타 페이지 */}
      <Route path={NOT_FOUND_PAGE} exact component={NotFound} />
      <Route path={SETTING_PAGE} exact component={Setting} />
    </Switch>
  );
};

export default Router;
