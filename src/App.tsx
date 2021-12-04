import React from 'react';
import { Route, Switch } from 'react-router';
import { Matches, Hires, Teams, Users, Login, Setting } from '@/pages';
import DefaultTemplate from '@/components/DefaultTemplate';

const App = () => {
  // 라우터 세부설정 완료시 변경필요
  return (
    <DefaultTemplate>
      <Switch>
        <Route path="/" exact>
          <h1>Home</h1>
        </Route>
        <Route path="/matches" exact>
          <Matches />
        </Route>
        <Route path="/hires" exact>
          <Hires />
        </Route>
        <Route path="/teams" exact>
          <Teams />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/setting" exact>
          <Setting />
        </Route>
      </Switch>
    </DefaultTemplate>
  );
};

export default App;
