import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Main,
  TeamMemberManage,
  TeamDetail,
  TeamCreate,
  TeamInfoEdit,
  TeamChoice,
  Match,
  Matches,
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
  USER_EDIT_PAGE,
  USER_MATCHING_LIST_PAGE,
  USER_TEAM_INVITAION_LIST_PAGE,
  USER_HIRE_REQUEST_LIST_PAGE,
  NOT_FOUND_PAGE,
  HIRES_FILTER_PAGE, // Todo(홍중) : 임시, 추후 모달로 변경하면서 삭제 예정 (2021.12.14)
} from '../consts/routes';

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path={HOME_PAGE} exact component={Main} />

      {/* 로그인 페이지 */}
      <Route path={LOGIN_PAGE} exact component={Login} />
      <Route path={USER_EDIT_PAGE} exact component={UserInfoEdit} />
      <Route path={SIGNUP_PAGE} exact component={Signup} />

      {/* 용병 페이지 */}
      <Route path={HIRES_PAGE} exact component={Hires} />
      <Route path={HIRES_DETAIL_PAGE} exact component={HiresDetail} />
      <Route path={HIRES_POST_PAGE} exact component={HiresCreate} />
      <Route path={HIRES_EDIT_PAGE} exact component={HiresEdit} />
      <Route path={HIRES_ACCEPT_PAGE} exact component={HiresAccept} />
      <Route path={HIRES_FILTER_PAGE} exact component={HiresFilter} />

      {/* 매치 페이지 */}
      <Route path={MATCHES_PAGE} exact component={Matches} />
      <Route path={MATCHES_DETAIL_PAGE} exact component={Match} />
      <Route path={MATCHES_POST_PAGE} exact component={NewMatch} />
      <Route path={MATCHES_EDIT_PAGE} exact component={EditMatch} />

      {/* 팀 페이지 */}
      <Route path={TEAM_SELECT_PAGE} exact component={TeamChoice} />
      <Route path={TEAM_CREATE_PAGE} exact component={TeamCreate} />
      <Route path={TEAM_MATCHING_LIST_PAGE} exact component={TeamMatchDetail} />
      <Route path={TEAM_EDIT_PAGE} exact component={TeamInfoEdit} />
      <Route path={TEAM_MEMBERS_PAGE} exact component={TeamMemberManage} />
      <Route path={TEAM_SELECT_PAGE} exact component={TeamChoice} />
      <Route path={TEAM_PAGE} exact component={TeamDetail} />

      {/* 유저 페이지 */}
      <Route path={USER_PAGE} exact component={UserDetail} />
      <Route path={USER_MATCHING_LIST_PAGE} exact component={UserMatchDetail} />
      <Route path={USER_HIRE_REQUEST_LIST_PAGE} exact component={UserHireRequest} />
      <Route path={USER_TEAM_INVITAION_LIST_PAGE} exact component={UserTeamInvitation} />

      {/* 기타 페이지 */}
      <Route path={NOT_FOUND_PAGE} exact component={NotFound} />
      {/* <Route path={SETTING_PAGE} exact component={} /> */}
    </Switch>
  );
};

export default Router;
