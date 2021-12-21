// 메인
export const HOME_PAGE = '/';

// 로그인 페이지
export const SIGNUP_PAGE = '/signup';
export const LOGIN_PAGE = '/login';
export const SETTING_PAGE = '/setting';

// 용병 페이지
export const HIRES_PAGE = '/hires';
export const HIRES_FILTER_PAGE = '/hires/filter'; // Todo(홍중) : 임시, 추후 모달로 변경하면서 삭제 예정 (2021.12.14)
export const HIRES_DETAIL_PAGE = '/hires/:postId';
export const HIRES_POST_PAGE = '/hires/post/new';
export const HIRES_EDIT_PAGE = '/hires/edit/:postId';
export const HIRES_CHAT_PAGE = '/hires/chat/:postId';
export const HIRES_ACCEPT_PAGE = '/hires/accept/:postId';

// 매치 페이지
export const MATCHES_PAGE = '/matches/';
export const MATCHES_POST_PAGE = '/matches/new';
export const MATCHES_DETAIL_PAGE = '/matches/post/:postId';
export const MATCHES_EDIT_PAGE = '/matches/edit/:postId';

// 팀 페이지
export const TEAM_CREATE_PAGE = '/team/new';
export const TEAM_SELECT_PAGE = '/team/select';
export const TEAM_PAGE = '/team/:teamId';
export const TEAM_MATCHING_LIST_PAGE = '/team/:teamId/match';
export const TEAM_EDIT_PAGE = '/team/:teamId/edit';
export const TEAM_MEMBERS_EDIT_PAGE = '/team/:teamId/member/edit';
export const TEAM_MEMBERS_PAGE = '/team/:teamId/:memberType';

// 유저 페이지
export const USER_PAGE = '/user';
export const USER_EDIT_PAGE = '/user/edit';
export const USER_MATCHING_LIST_PAGE = '/user/match';
export const USER_TEAM_INVITAION_LIST_PAGE = '/user/team/invitation';
export const USER_HIRE_REQUEST_LIST_PAGE = '/user/hire/invitation';
export const USER_DETAIL_BY_ID = '/user/:id';

// 기타 페이지
export const NOT_FOUND_PAGE = '/not-found';
